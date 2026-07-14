const fs = require('fs');

function removeDrawer(file) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Find where the Edit Drawer Overlay starts
  const drawerStart = content.indexOf('<!-- ═══ Portfolio Edit Drawer ═══ -->');
  if (drawerStart !== -1) {
    // Keep everything before the drawer (which includes the main content)
    // AND keep the scripts at the bottom!
    const scriptStart = content.indexOf('<script>', drawerStart);
    if (scriptStart !== -1) {
      content = content.substring(0, drawerStart) + content.substring(scriptStart);
      fs.writeFileSync(file, content, 'utf8');
      console.log('Removed duplicate drawers from', file);
    }
  } else {
    // Try finding the div directly if the comment is missing
    const divStart = content.indexOf('<div id="edit-drawer-overlay"');
    if (divStart !== -1) {
      const scriptStart = content.indexOf('<script>', divStart);
      if (scriptStart !== -1) {
        content = content.substring(0, divStart) + content.substring(scriptStart);
        fs.writeFileSync(file, content, 'utf8');
        console.log('Removed duplicate drawers (no comment) from', file);
      }
    }
  }
}

removeDrawer('views/partials/artist-portfolio-tab.ejs');
removeDrawer('views/partials/artist-gallery-tab.ejs');
