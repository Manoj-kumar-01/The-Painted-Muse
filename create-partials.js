const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const partialsDir = path.join(viewsDir, 'partials');

if (!fs.existsSync(partialsDir)) {
    fs.mkdirSync(partialsDir);
}

const files = ['artist-gallery.ejs', 'artist-portfolio.ejs', 'artist-settings.ejs'];

for (const file of files) {
    const filePath = path.join(viewsDir, file);
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Extract everything inside <main ...> and </main>
    const mainStart = content.indexOf('<main');
    if (mainStart === -1) continue;
    
    const mainEnd = content.indexOf('</main>');
    const mainContent = content.substring(mainStart, mainEnd + 7);
    
    // Extract scripts that come after </main>
    // but filter out Navbar.js, Sidebar.js, Footer.js, content-loader.js
    let scriptsContent = content.substring(mainEnd + 7);
    
    // Basic stripping of known script src lines we don't want in the partial
    scriptsContent = scriptsContent.replace(/<script src="components\/.*?"><\/script>/g, '');
    scriptsContent = scriptsContent.replace(/<script src="content-loader.js"><\/script>/g, '');
    scriptsContent = scriptsContent.replace(/<\/body>/g, '');
    scriptsContent = scriptsContent.replace(/<\/html>/g, '');
    
    const partialContent = mainContent + '\n' + scriptsContent;
    const partialName = file.replace('.ejs', '-tab.ejs');
    
    fs.writeFileSync(path.join(partialsDir, partialName), partialContent, 'utf8');
    console.log('Created partial:', partialName);
}
