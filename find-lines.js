const fs = require('fs');
const lines = fs.readFileSync('views/partials/artist-portfolio-tab.ejs', 'utf8').split('\n');
lines.forEach((line, i) => {
  if(line.includes('id="edit-drawer"') || line.includes('<script>')) {
    console.log(i + 1, line.trim().substring(0, 50));
  }
});
