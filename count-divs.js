const fs = require('fs');

function countDivs(file) {
  const content = fs.readFileSync(file, 'utf8');
  const lines = content.split('\n');
  let opens = 0;
  let closes = 0;
  lines.forEach((line, i) => {
    const openMatches = line.match(/<div[\s>]/g);
    const closeMatches = line.match(/<\/div>/g);
    if (openMatches) opens += openMatches.length;
    if (closeMatches) closes += closeMatches.length;
  });
  console.log(`${file}: opens=${opens}, closes=${closes}, diff=${opens - closes}`);
}

countDivs('views/partials/artist-gallery-tab.ejs');
countDivs('views/partials/artist-portfolio-tab.ejs');
countDivs('views/partials/artist-settings-tab.ejs');
