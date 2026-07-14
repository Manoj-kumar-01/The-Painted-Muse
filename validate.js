const fs = require('fs');
const vm = require('vm');
const content = fs.readFileSync('views/artist-home.ejs', 'utf8');

// Count overall divs in artist-home.ejs
const openDivs = (content.match(/<div[\s>]/g) || []).length;
const closeDivs = (content.match(/<\/div>/g) || []).length;
console.log('artist-home.ejs div balance:', openDivs - closeDivs, '(opens:', openDivs, 'closes:', closeDivs, ')');

// Count main tags
const openMains = (content.match(/<main[\s>]/g) || []).length;
const closeMains = (content.match(/<\/main>/g) || []).length;
console.log('main tag balance:', openMains - closeMains, '(opens:', openMains, 'closes:', closeMains, ')');

// Count script tags
const scriptStarts = content.split('<script>').length - 1 + content.split('<script ').length - 1;
const scriptEnds = (content.match(/<\/script>/g) || []).length;
console.log('script tags:', scriptStarts, 'starts,', scriptEnds, 'ends');

// Validate last script block syntax
const lastScriptStart = content.lastIndexOf('<script>');
const lastScriptEnd = content.lastIndexOf('</script>');
if (lastScriptStart !== -1 && lastScriptEnd !== -1) {
  const scriptBody = content.substring(lastScriptStart + 8, lastScriptEnd)
    .replace(/<%-.*?%>/g, 'null'); // stub out EJS
  try {
    new vm.Script(scriptBody);
    console.log('Last script block: Syntax OK!');
  } catch (e) {
    console.log('Last script block SYNTAX ERROR:', e.message);
  }
}

// Validate second script block
const secondScriptStart = content.indexOf('<script>', content.indexOf('</script>') + 1);
const secondScriptEnd = content.indexOf('</script>', secondScriptStart);
if (secondScriptStart !== -1 && secondScriptEnd !== -1) {
  const scriptBody2 = content.substring(secondScriptStart + 8, secondScriptEnd)
    .replace(/<%-.*?%>/g, 'null');
  try {
    new vm.Script(scriptBody2);
    console.log('Second script block: Syntax OK!');
  } catch (e) {
    console.log('Second script block SYNTAX ERROR:', e.message);
  }
}
