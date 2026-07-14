const fs = require('fs');

const home = fs.readFileSync('views/artist-home.ejs', 'utf8');
const gallery = fs.readFileSync('views/artist-gallery.ejs', 'utf8');
const portfolio = fs.readFileSync('views/artist-portfolio.ejs', 'utf8');
const settings = fs.readFileSync('views/artist-settings.ejs', 'utf8');

function extractMain(html) {
    const start = html.indexOf('<main');
    if (start === -1) return '';
    const end = html.indexOf('</main>', start);
    if (end === -1) return '';
    return html.substring(start, end + 7);
}

const homeMain = extractMain(home).replace('<main class="pt-24 pb-20 relative z-10">', '<main class="pt-24 pb-20 relative z-10" id="tab-home">');
const galleryMain = extractMain(gallery).replace('<main class="pt-24 pb-20 relative z-10">', '<main class="pt-24 pb-20 relative z-10 hidden" id="tab-gallery">');
const portfolioMain = extractMain(portfolio).replace('<main class="pt-24 pb-20 relative z-10">', '<main class="pt-24 pb-20 relative z-10 hidden" id="tab-portfolio">');
const settingsMain = extractMain(settings).replace('<main class="pt-24 pb-20 relative z-10">', '<main class="pt-24 pb-20 relative z-10 hidden" id="tab-settings">');

let newHome = home.replace(extractMain(home), homeMain + '\n' + galleryMain + '\n' + portfolioMain + '\n' + settingsMain);

// Add SPA logic
const spaLogic = \
<script>
function switchTab() {
    const hash = window.location.hash.substring(1) || 'home';
    const validTabs = ['home', 'gallery', 'portfolio', 'settings'];
    const activeTab = validTabs.includes(hash) ? hash : 'home';
    
    validTabs.forEach(tab => {
        const el = document.getElementById('tab-' + tab);
        if (el) {
            if (tab === activeTab) {
                el.classList.remove('hidden');
            } else {
                el.classList.add('hidden');
            }
        }
    });

    // Update Sidebar
    document.querySelectorAll('.sidebar-item').forEach(el => {
        el.classList.remove('active', 'text-[#B5451B]', 'bg-[#fff1ed]');
        const href = el.getAttribute('href');
        if (href === 'artist-home' && activeTab === 'home') {
            el.classList.add('active', 'text-[#B5451B]', 'bg-[#fff1ed]');
        } else if (href === 'artist-home#' + activeTab || href === 'artist-' + activeTab) {
            el.classList.add('active', 'text-[#B5451B]', 'bg-[#fff1ed]');
        }
    });
}
window.addEventListener('hashchange', switchTab);
window.addEventListener('DOMContentLoaded', switchTab);
</script>
\;

newHome = newHome.replace('</body>', spaLogic + '\n</body>');

fs.writeFileSync('views/artist-home.ejs', newHome);
console.log('Merged SPA successfully!');
