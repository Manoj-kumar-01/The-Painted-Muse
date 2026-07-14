const fs = require('fs');

let content = fs.readFileSync('public/components/Sidebar.js', 'utf8');

if (content.includes('href="/artist-gallery"')) {
  content = content.replace(/href="\/artist-home"/g, 'href="#home" data-tab="home" class="sidebar-link');
  content = content.replace(/href="\/artist-gallery"/g, 'href="#gallery" data-tab="gallery" class="sidebar-link');
  content = content.replace(/href="\/artist-home#portfolio"/g, 'href="#portfolio" data-tab="portfolio" class="sidebar-link');
  content = content.replace(/href="\/artist-settings"/g, 'href="#settings" data-tab="settings" class="sidebar-link');
  
  content = content.replace(/class="sidebar-link class="sidebar-item/g, 'class="sidebar-link sidebar-item');
  
  fs.writeFileSync('public/components/Sidebar.js', content, 'utf8');
  console.log('Fixed Sidebar.js SPA links!');
} else {
  console.log('Could not find /artist-gallery in Sidebar.js');
}
