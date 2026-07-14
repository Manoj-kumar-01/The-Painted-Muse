const fs = require('fs');
const path = require('path');

const viewsDir = path.join(__dirname, 'views');
const files = fs.readdirSync(viewsDir).filter(f => f.endsWith('.ejs'));

for (const file of files) {
    const filePath = path.join(viewsDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // 1. Remove checkArtistAuth IIFE
    content = content.replace(/\(function checkArtistAuth\(\) \{\s*if \(localStorage\.getItem\('artistLoggedIn'\) !== 'true'\) \{\s*window\.location\.href = '\/\?error=auth';\s*\}\s*\}\)\(\);/g, '');

    // 2. Remove usersDb checks. Usually looks like:
    // const usersDb = JSON.parse(localStorage.getItem('users') || '{}');
    // const userInDb = usersDb[user.email];
    // if (!userInDb || !userInDb.isApproved) { window.location.href = '/?error=pending'; return; }
    
    // We'll use a regex that matches the usersDb variable declaration down to the return; } block
    const userDbRegex = /const\s+usersDb\s*=\s*JSON\.parse\(localStorage\.getItem\('users'\)\s*\|\|\s*'\{\}'\);[\s\S]*?(?:return;|window\.location\.href\s*=\s*'[^']+';)\s*\}/g;
    content = content.replace(userDbRegex, '');

    // Also remove the standalone checking if(!user) ... return; just in case it breaks.
    // Wait, if (!user) window.location.href = '/' is sometimes needed if currentUser isn't injected, but the backend Node server already does requireArtist.
    // So we can leave `if (!user)` as it just protects null refs in JS, but wait, the backend injects `<%- JSON.stringify(user) %>`.
    // Let's just remove the usersDb block since that's the one definitely failing.
    
    if (content !== original) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log('Fixed:', file);
    }
}
console.log('Done fixing artist auth.');
