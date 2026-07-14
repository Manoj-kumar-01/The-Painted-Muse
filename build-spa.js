const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'views', 'artist-home.ejs');
let content = fs.readFileSync(file, 'utf8');

// 1. Inject SPA Styles
if (!content.includes('.spa-tab {')) {
    const styleEnd = content.indexOf('</style>');
    const spaStyles = `
/* SPA Tab Styles */
@keyframes pageFadeIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }
.spa-tab { display: none; animation: pageFadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
.spa-tab.active-tab { display: block; }
`;
    content = content.substring(0, styleEnd) + spaStyles + content.substring(styleEnd);
}

// 2. Wrap main content and inject partials
const mainRegex = /(<main[^>]*>)([\s\S]*?)(<\/main>)/;
const match = content.match(mainRegex);

if (match) {
    const mainOpen = match[1];
    let mainInner = match[2];
    const mainClose = match[3];

    // Wrap existing content in #tab-home ONLY if not already wrapped
    if (!mainInner.includes('id="tab-home"')) {
        mainInner = `\n<div id="tab-home" class="spa-tab active-tab">\n` + mainInner + `\n</div>\n`;
        
        // Add other tabs
        mainInner += `
<div id="tab-gallery" class="spa-tab">
<%- include('partials/artist-gallery-tab') %>
</div>
<div id="tab-portfolio" class="spa-tab">
<%- include('partials/artist-portfolio-tab') %>
</div>
<div id="tab-settings" class="spa-tab">
<%- include('partials/artist-settings-tab') %>
</div>
`;
        content = content.replace(mainRegex, mainOpen + mainInner + mainClose);
    }
}

// 3. Inject SPA Script
if (!content.includes('function switchTab')) {
    const scriptTag = `
<script>
// SPA Routing Logic
function switchTab(hash) {
    const validTabs = ['home', 'gallery', 'portfolio', 'settings'];
    let tabId = hash.replace('#', '');
    if (!validTabs.includes(tabId)) tabId = 'home';
    
    // Switch tabs
    document.querySelectorAll('.spa-tab').forEach(el => el.classList.remove('active-tab'));
    const targetEl = document.getElementById('tab-' + tabId);
    if(targetEl) targetEl.classList.add('active-tab');
    
    // Update Sidebar Active State
    document.querySelectorAll('.sidebar-item').forEach(el => {
        el.classList.remove('active');
        const href = el.getAttribute('href');
        if(href === '/artist-home#' + tabId || (tabId === 'home' && href === '/artist-home')) {
            el.classList.add('active');
        }
    });
    
    // Scroll to top
    const mainContainer = document.querySelector('main');
    if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
}
function handleHashChange() {
    switchTab(window.location.hash);
}
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
});
</script>
`;
    content = content.replace('</body>', scriptTag + '\n</body>');
}

fs.writeFileSync(file, content, 'utf8');
console.log('Successfully injected SPA logic into artist-home.ejs');
