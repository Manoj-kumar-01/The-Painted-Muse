const fs = require('fs');
let html = fs.readFileSync('c:/Users/manoj/Downloads/Ancient-souls (1).html', 'utf8');

// Replace nav
html = html.replace(/<nav[\s\S]*?<\/nav>/, '<app-navbar></app-navbar>');

// Replace mobile menu (it has specific content)
html = html.replace(/<div id="mobile-menu"[\s\S]*?<\/div>\s*<\/div>\s*<\/div>/, '');

// Replace footer
html = html.replace(/<footer id="footer">[\s\S]*?<\/footer>/, '<app-footer></app-footer>');

// Add Navbar and Footer components
html = html.replace('<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>', 
'<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>\n    <script src="/components/Navbar.js" defer></script>\n    <script src="/components/Footer.js" defer></script>');

fs.writeFileSync('c:/Users/manoj/OneDrive/Desktop/sathwik_repo/views/ancient-souls.ejs', html);
console.log('Conversion complete!');
