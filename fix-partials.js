const fs = require('fs');
const path = require('path');

const partials = ['artist-gallery-tab.ejs', 'artist-portfolio-tab.ejs', 'artist-settings-tab.ejs'];
const partialsDir = path.join(__dirname, 'views', 'partials');

for (const file of partials) {
    const filePath = path.join(partialsDir, file);
    if (!fs.existsSync(filePath)) continue;
    
    let content = fs.readFileSync(filePath, 'utf8');
    
    // 1. Remove <main ...> and </main>
    content = content.replace(/<main[^>]*>/, '');
    content = content.replace(/<\/main>/, '');
    
    // 2. Change let and const to var in scripts to prevent redeclaration errors
    // Since scripts are at the end, we can just replace all 'let ' and 'const ' 
    // after the first <script> tag.
    const scriptStart = content.indexOf('<script>');
    if (scriptStart !== -1) {
        let htmlPart = content.substring(0, scriptStart);
        let scriptPart = content.substring(scriptStart);
        
        scriptPart = scriptPart.replace(/\bconst\s+/g, 'var ');
        scriptPart = scriptPart.replace(/\blet\s+/g, 'var ');
        
        content = htmlPart + scriptPart;
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed partial:', file);
}

// ALSO fix artist-home.ejs scripts to use var
const homeFile = path.join(__dirname, 'views', 'artist-home.ejs');
let homeContent = fs.readFileSync(homeFile, 'utf8');
const scriptStartHome = homeContent.indexOf('<script>');
if (scriptStartHome !== -1) {
    let htmlPart = homeContent.substring(0, scriptStartHome);
    let scriptPart = homeContent.substring(scriptStartHome);
    scriptPart = scriptPart.replace(/\bconst\s+/g, 'var ');
    scriptPart = scriptPart.replace(/\blet\s+/g, 'var ');
    homeContent = htmlPart + scriptPart;
    fs.writeFileSync(homeFile, homeContent, 'utf8');
    console.log('Fixed artist-home.ejs scripts');
}
