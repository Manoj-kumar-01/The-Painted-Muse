const fs = require('fs');
let content = fs.readFileSync('views/artist-home.ejs', 'utf8');
const searchStr = `<input type="file" id="reelUploadInput" accept="video/*" capture="environment" class="hidden">\r\n</div>\r\n</div>\r\n</div>\r\n</section>`;
const searchStrUnix = `<input type="file" id="reelUploadInput" accept="video/*" capture="environment" class="hidden">\n</div>\n</div>\n</div>\n</section>`;
const replaceStr = `<input type="file" id="reelUploadInput" accept="video/*" capture="environment" class="hidden">\n</div>\n</div>\n</section>`;

if (content.includes(searchStr)) {
  content = content.replace(searchStr, replaceStr);
  fs.writeFileSync('views/artist-home.ejs', content, 'utf8');
  console.log('Fixed extra div in artist-home.ejs (Windows CLRF)');
} else if (content.includes(searchStrUnix)) {
  content = content.replace(searchStrUnix, replaceStr);
  fs.writeFileSync('views/artist-home.ejs', content, 'utf8');
  console.log('Fixed extra div in artist-home.ejs (Unix LF)');
} else {
  console.log('Could not find search string');
}
