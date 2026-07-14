const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'views', 'artist-home.ejs');

const content = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8"/>
<meta content="width=device-width, initial-scale=1.0" name="viewport"/>
<title>Home | The Painted Muse Studio</title>
<script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"><\/script>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Outfit:wght@400;500;700&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet"/>
<link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet"/>
<script src="components/Navbar.js" defer><\/script>
<script src="components/Sidebar.js" defer><\/script>
<script src="components/Footer.js" defer><\/script>
<script>
tailwind.config={darkMode:"class",theme:{extend:{colors:{"on-background":"#241915",outline:"#8b7169","outline-variant":"#dfc0b6","on-error":"#ffffff","surface-bright":"#fff8f6",surface:"#fff8f6","surface-container-low":"#fff1ed",primary:"#942e02",background:"#fff8f6","on-surface":"#241915","surface-container":"#ffe9e3","on-primary":"#ffffff",secondary:"#795900","primary-container":"#b5451b","surface-dim":"#ebd5cf","surface-variant":"#f4ded7","on-primary-container":"#ffe4dc",error:"#ba1a1a","surface-container-highest":"#f4ded7","secondary-container":"#ffc641","on-surface-variant":"#58423b","surface-container-high":"#fae3dd","surface-container-lowest":"#ffffff","secondary-fixed":"#ffdfa0","primary-fixed":"#ffdbd0"},borderRadius:{DEFAULT:"12px",lg:"16px",xl:"20px",full:"9999px"},fontFamily:{"label-sm":["Outfit"],"headline-lg":["Cormorant Garamond"],"headline-md":["Cormorant Garamond"],"body-lg":["Outfit"],"body-md":["Outfit"]}}}};
<\/script>
<style>
/* ── Base ── */
body{background:#fff8f6;color:#241915;font-family:'Outfit',sans-serif;margin:0}
*,*::before,*::after{box-sizing:border-box}
.material-symbols-outlined{font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24}
.font-calligraphy{font-family:'Great Vibes',cursive}
.paper-grain{background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");opacity:.03;pointer-events:none}

/* ── SPA Tab System ── */
@keyframes tabFadeIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
.spa-tab{display:none}
.spa-tab.active-tab{display:flex;flex-direction:column;min-height:100%;animation:tabFadeIn .4s ease forwards}

/* ── Gallery Media Toggle ── */
.media-tab{position:relative;color:#58423b;transition:color .2s}
.media-tab.active{color:#942e02}
.media-tab.active::after{content:'';position:absolute;bottom:-1px;left:0;right:0;height:3px;background:#942e02;border-radius:3px 3px 0 0}
.media-grid{display:none}
.media-grid.active{display:grid}

/* ── Settings Sub-tabs ── */
@keyframes panelFadeIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.section-panel{display:none}
.section-panel.active{display:block;animation:panelFadeIn .35s ease forwards}
.tab-btn{transition:all .25s ease}
.tab-btn.active{background:#942e02!important;color:#fff!important;box-shadow:0 4px 12px rgba(148,46,2,.25);border-color:#942e02!important}

/* ── Portfolio Styles ── */
.glass-panel{background:rgba(255,255,255,.72);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border:1px solid rgba(212,175,55,.15)}
.warli-border{border:1px solid rgba(212,175,55,.35);position:relative}
.warli-border::before{content:"";position:absolute;inset:4px;border:1px solid rgba(212,175,55,.15);pointer-events:none}
.color-swatch{width:32px;height:32px;border-radius:50%;cursor:pointer;border:2px solid transparent;transition:all .3s ease}
.color-swatch.active{border-color:#B5451B;transform:scale(1.15)}

/* ── Sidebar Active ── */
.sidebar-item.active{background-color:rgba(255,255,255,.08);color:#fff;border-left:3px solid #D4AF37}

/* ── Custom Scrollbar ── */
.custom-scrollbar::-webkit-scrollbar{width:6px;height:6px}
.custom-scrollbar::-webkit-scrollbar-track{background:rgba(26,18,8,.05)}
.custom-scrollbar::-webkit-scrollbar-thumb{background:#D4AF37;border-radius:9999px}

/* ── Footer ── */
footer{background:#FDFBF7;color:#241915;padding:80px 0 40px;position:relative;width:100%}
footer::before{content:'';position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,#942e02,transparent)}
.foot-top{display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr 1fr;gap:48px;margin-bottom:60px}
.foot-brand p{color:rgba(26,18,8,.7);font-size:14px;margin:20px 0 24px;max-width:320px;line-height:1.6}
.socials{display:flex;gap:12px}
.socials a{width:40px;height:40px;border:1px solid rgba(26,18,8,.15);border-radius:50%;display:grid;place-items:center;color:#241915;transition:all .3s ease}
.socials a:hover{background:#942e02;color:white;border-color:#942e02;transform:translateY(-3px)}
.foot-col h5{font-family:'Cormorant Garamond',serif;font-style:italic;font-size:15px;margin-bottom:24px;color:#942e02;font-weight:700;letter-spacing:.05em}
.foot-col ul{list-style:none;padding:0}
.foot-col li{margin-bottom:12px}
.foot-col a{font-size:14px;color:rgba(26,18,8,.75);transition:color .3s ease;text-decoration:none}
.foot-col a:hover{color:#942e02}
.foot-bot{border-top:1px solid rgba(26,18,8,.1);padding-top:32px;display:flex;justify-content:space-between;align-items:center;color:rgba(26,18,8,.5);font-size:13px;flex-wrap:wrap;gap:16px}
@media(max-width:1024px){.foot-top{grid-template-columns:repeat(3,1fr)}.foot-brand{grid-column:span 3;margin-bottom:20px}}
@media(max-width:768px){.foot-top{grid-template-columns:repeat(2,1fr)}.foot-brand{grid-column:span 2}}
</style>
</head>
<body>
<div class="fixed inset-0 paper-grain z-0"></div>

<!-- ═══ APP SHELL ═══ -->
<div class="relative flex h-screen w-full overflow-hidden z-10">
<dashboard-sidebar type="artist"></dashboard-sidebar>

<main class="flex-1 flex flex-col min-w-0 bg-surface-bright overflow-y-auto custom-scrollbar">

<!-- ═══════════════════════════════════════ -->
<!-- TAB: HOME                              -->
<!-- ═══════════════════════════════════════ -->
<div id="tab-home" class="spa-tab active-tab">
<div class="lg:hidden flex items-center bg-surface p-4 border-b border-outline-variant justify-between">
  <span class="material-symbols-outlined text-on-surface cursor-pointer mobile-menu-btn-toggle">menu</span>
  <h2 class="text-on-surface font-headline-md text-xl font-bold flex-1 text-center">Home</h2>
  <div class="size-10"></div>
</div>
<div class="max-w-5xl mx-auto w-full px-6 md:px-10 py-12 flex-1">
  <div id="approval-status-banner" class="hidden mb-6 p-4 rounded-lg flex items-center gap-3">
    <span class="material-symbols-outlined text-2xl" id="approval-banner-icon"></span>
    <div><p class="font-bold text-sm" id="approval-banner-title"></p><p class="text-xs" id="approval-banner-desc"></p></div>
  </div>
  <header class="mb-10 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
    <div>
      <p class="font-label-sm text-primary uppercase tracking-widest mb-2">Welcome back</p>
      <h1 class="font-headline-lg text-on-background text-4xl"><%= user ? user.fullName : 'Artist' %></h1>
      <p class="font-body-lg text-on-surface-variant mt-2">Here's how your art is performing today.</p>
    </div>
    <button onclick="window.location.hash='#gallery'" class="h-12 px-8 bg-primary text-on-primary font-body-md font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg rounded-lg flex items-center gap-2">
      <span class="material-symbols-outlined text-lg">add</span> New Artwork
    </button>
  </header>
  <!-- Stats Cards -->
  <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
    <div class="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
      <div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-primary">palette</span><span class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Total Artworks</span></div>
      <p id="stat-artworks" class="font-headline-md text-4xl text-on-surface">47</p>
      <p id="stat-artworks-sub" class="text-xs text-green-700 mt-1 font-bold">+3 this month</p>
    </div>
    <div class="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
      <div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-primary">visibility</span><span class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Profile Views</span></div>
      <p id="stat-views" class="font-headline-md text-4xl text-on-surface">1,248</p>
      <p id="stat-views-sub" class="text-xs text-green-700 mt-1 font-bold">\u2191 12% vs last month</p>
    </div>
    <div class="bg-surface-container-low border border-outline-variant p-6 rounded-xl">
      <div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-primary">shopping_bag</span><span class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Artworks Sold</span></div>
      <p id="stat-sold" class="font-headline-md text-4xl text-on-surface">34</p>
      <p id="stat-sold-sub" class="text-xs text-green-700 mt-1 font-bold">+5 this month</p>
    </div>
    <div class="bg-primary-container border border-outline-variant p-6 rounded-xl">
      <div class="flex items-center gap-2 mb-3"><span class="material-symbols-outlined text-on-primary-container">payments</span><span class="font-label-sm text-on-primary-container/70 uppercase tracking-widest text-[10px]">Total Earnings</span></div>
      <p id="stat-earnings" class="font-headline-md text-4xl text-on-primary-container">\u20b92.4L</p>
      <p id="stat-earnings-sub" class="text-xs text-on-primary-container/70 mt-1 font-bold">\u20b945K this month</p>
    </div>
  </div>
  <!-- Recent Uploads -->
  <section class="mb-12">
    <div class="flex items-center justify-between mb-6">
      <h2 class="font-headline-md text-2xl text-on-background">Recent Uploads</h2>
      <a href="#gallery" class="font-label-sm text-primary uppercase tracking-widest text-xs hover:underline">View All \u2192</a>
    </div>
    <div id="recent-uploads-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <div class="bg-surface-container-lowest border border-outline-variant group cursor-pointer hover:shadow-lg transition-shadow rounded-xl" onclick="document.getElementById('reelUploadInput').click()">
        <div class="aspect-square bg-surface-variant overflow-hidden flex items-center justify-center rounded-t-xl"><span class="material-symbols-outlined text-primary text-6xl">videocam</span></div>
        <div class="p-4 text-center"><h4 class="font-body-md text-on-surface-variant">Upload New Reel</h4></div>
        <input type="file" id="reelUploadInput" accept="video/*" capture="environment" class="hidden">
      </div>
    </div>
  </section>
  <!-- Recent Activity -->
  <section class="mb-12">
    <h2 class="font-headline-md text-2xl text-on-background mb-6">Recent Activity</h2>
    <div class="bg-surface-container-low border border-outline-variant divide-y divide-outline-variant rounded-xl">
      <div class="flex items-center gap-4 p-5"><span class="material-symbols-outlined text-green-700">shopping_bag</span><div class="flex-1"><p class="font-body-md text-on-surface"><strong>Eternal Echoes</strong> was purchased by a collector</p><p class="text-xs text-on-surface-variant">2 hours ago</p></div><span class="text-primary font-bold">\u20b918,000</span></div>
      <div class="flex items-center gap-4 p-5"><span class="material-symbols-outlined text-green-700">shopping_bag</span><div class="flex-1"><p class="font-body-md text-on-surface"><strong>Lotus Dreams</strong> was purchased by a collector</p><p class="text-xs text-on-surface-variant">3 days ago</p></div><span class="text-primary font-bold">\u20b912,000</span></div>
      <div class="flex items-center gap-4 p-5"><span class="material-symbols-outlined text-secondary">event_available</span><div class="flex-1"><p class="font-body-md text-on-surface"><strong>Sacred Rivers</strong> was booked for private viewing</p><p class="text-xs text-on-surface-variant">5 days ago</p></div><span class="text-primary font-bold">\u20b935,000</span></div>
      <div class="flex items-center gap-4 p-5"><span class="material-symbols-outlined text-green-700">shopping_bag</span><div class="flex-1"><p class="font-body-md text-on-surface"><strong>Morning Raaga</strong> was purchased by a collector</p><p class="text-xs text-on-surface-variant">1 week ago</p></div><span class="text-primary font-bold">\u20b915,500</span></div>
    </div>
  </section>
</div>
<app-footer></app-footer>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- TAB: GALLERY                           -->
<!-- ═══════════════════════════════════════ -->
<div id="tab-gallery" class="spa-tab">
<div class="lg:hidden flex items-center bg-surface p-4 border-b border-outline-variant justify-between">
  <span class="material-symbols-outlined text-on-surface cursor-pointer mobile-menu-btn-toggle">menu</span>
  <h2 class="text-on-surface font-headline-md text-xl font-bold flex-1 text-center">Gallery</h2>
  <div class="size-10"></div>
</div>
<div class="max-w-6xl mx-auto w-full px-6 md:px-10 py-12 flex-1">
  <header class="mb-6 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
    <div>
      <h1 class="font-headline-lg text-on-background text-4xl mb-2">My Gallery</h1>
      <p class="font-body-lg text-on-surface-variant" id="gallery-count">Loading collection...</p>
    </div>
    <button onclick="window.location.hash='#home'" class="h-12 px-8 bg-primary text-on-primary font-body-md font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg rounded-lg flex items-center gap-2">
      <span class="material-symbols-outlined text-lg">add</span>Upload
    </button>
  </header>
  <!-- Posts / Reels Toggle -->
  <div class="flex gap-0 border-b border-outline-variant mb-8">
    <button onclick="switchMedia('posts')" id="media-tab-posts" class="media-tab active flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest">
      <span class="material-symbols-outlined text-lg">grid_on</span>Posts
    </button>
    <button onclick="switchMedia('reels')" id="media-tab-reels" class="media-tab flex items-center gap-2 px-6 py-4 text-sm font-bold uppercase tracking-widest">
      <span class="material-symbols-outlined text-lg">movie</span>Reels
    </button>
  </div>
  <div id="grid-posts" class="media-grid active grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"></div>
  <div id="grid-reels" class="media-grid grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"></div>
</div>
<!-- Gallery Preview Modal -->
<div id="gallery-preview-modal" class="fixed inset-0 z-50 bg-black/85 hidden items-center justify-center p-8" onclick="closePreview()">
  <button class="absolute top-6 right-6 text-white hover:text-primary transition-colors" onclick="closePreview()"><span class="material-symbols-outlined text-4xl">close</span></button>
  <div class="max-w-4xl max-h-[90vh] w-full flex flex-col items-center justify-center" onclick="event.stopPropagation()">
    <h3 id="modal-title" class="text-white font-headline-md text-2xl mb-4">Preview</h3>
    <img id="modal-img" class="max-w-full max-h-[75vh] object-contain hidden rounded-xl shadow-2xl"/>
    <video id="modal-vid" class="max-w-full max-h-[75vh] object-contain hidden rounded-xl shadow-2xl" controls autoplay></video>
  </div>
</div>
<!-- Gallery Edit Modal -->
<div id="gallery-edit-modal" class="fixed inset-0 z-50 bg-black/60 hidden items-center justify-center p-6" onclick="closeEditModal()">
  <div class="bg-surface-container border border-outline-variant rounded-2xl max-w-md w-full p-8 shadow-2xl relative" onclick="event.stopPropagation()">
    <button class="absolute top-4 right-4 text-on-surface-variant hover:text-primary transition-colors" onclick="closeEditModal()"><span class="material-symbols-outlined">close</span></button>
    <h3 id="edit-modal-headline" class="font-headline-md text-2xl text-on-background mb-6">Edit Detail</h3>
    <form id="edit-form" class="flex flex-col gap-4" onsubmit="saveEdit(event)">
      <input type="hidden" id="edit-item-type"/>
      <input type="hidden" id="edit-item-idx"/>
      <div class="flex flex-col gap-1">
        <label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Title</label>
        <input id="edit-title" class="bg-transparent border border-outline text-on-surface p-3 font-body-md rounded-lg focus:border-primary focus:ring-0" type="text" required/>
      </div>
      <div id="post-edit-fields" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Category</label><input id="edit-category" class="bg-transparent border border-outline text-on-surface p-3 font-body-md rounded-lg focus:border-primary focus:ring-0" type="text"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Dimensions</label><input id="edit-dimensions" class="bg-transparent border border-outline text-on-surface p-3 font-body-md rounded-lg focus:border-primary focus:ring-0" placeholder="e.g. 24\u00d736 in" type="text"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Price (INR)</label><input id="edit-price" class="bg-transparent border border-outline text-on-surface p-3 font-body-md rounded-lg focus:border-primary focus:ring-0" type="number"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Status</label><select id="edit-status" class="bg-transparent border border-outline text-on-surface p-3 font-body-md rounded-lg focus:border-primary focus:ring-0"><option value="Available">Available</option><option value="Sold">Sold</option></select></div>
      </div>
      <button type="submit" class="h-12 w-full bg-primary text-on-primary font-body-md font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg rounded-lg mt-4">Save Changes</button>
    </form>
  </div>
</div>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- TAB: PORTFOLIO                         -->
<!-- ═══════════════════════════════════════ -->
<div id="tab-portfolio" class="spa-tab">
<div class="lg:hidden flex items-center bg-surface p-4 border-b border-outline-variant justify-between">
  <span class="material-symbols-outlined text-on-surface cursor-pointer mobile-menu-btn-toggle">menu</span>
  <h2 class="text-on-surface font-headline-md text-xl font-bold flex-1 text-center">My Portfolio</h2>
  <div class="size-10"></div>
</div>
<header class="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-outline-variant px-8 py-4 flex justify-between items-center">
  <h1 class="font-headline-md text-2xl text-on-surface">Portfolio <span class="italic text-primary">Showcase</span></h1>
  <div class="flex items-center gap-4">
    <div class="relative inline-block text-left" id="share-dropdown-container">
      <button onclick="toggleShareDropdown()" class="bg-[#F5F0E8] text-[#B5451B] border border-outline-variant px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-sm hover:bg-[#B5451B]/5 transition-all flex items-center gap-2">
        <span class="material-symbols-outlined text-sm font-bold">share</span> Share Portfolio
      </button>
      <div id="share-dropdown" class="hidden absolute right-0 mt-2 w-56 rounded-xl shadow-xl bg-white border border-outline-variant ring-1 ring-black ring-opacity-5 z-[100] p-2 space-y-1">
        <button onclick="shareAction('copy')" class="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface hover:bg-[#F5F0E8] rounded-lg transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-sm text-[#B5451B]">content_copy</span> Copy Link</button>
        <button onclick="shareAction('whatsapp')" class="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface hover:bg-[#F5F0E8] rounded-lg transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-sm text-[#25D366]">chat</span> WhatsApp</button>
        <button onclick="shareAction('twitter')" class="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface hover:bg-[#F5F0E8] rounded-lg transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-sm text-[#1DA1F2]">share</span> Twitter / X</button>
        <button onclick="shareAction('facebook')" class="w-full text-left px-4 py-2 text-xs font-bold uppercase tracking-wider text-on-surface hover:bg-[#F5F0E8] rounded-lg transition-colors flex items-center gap-3"><span class="material-symbols-outlined text-sm text-[#1877F2]">thumb_up</span> Facebook</button>
      </div>
    </div>
    <button onclick="togglePortfolioDrawer(true)" class="bg-primary text-on-primary border border-primary px-5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider shadow-lg hover:brightness-110 transition-all flex items-center gap-2">
      <span class="material-symbols-outlined text-sm font-bold">edit</span> Edit Theme & Profile
    </button>
  </div>
</header>
<div id="portfolio-showcase-container" class="transition-colors duration-500 w-full flex-1 pb-12">
  <div class="relative h-64 w-full bg-[#FDFBF7] overflow-hidden">
    <div id="showcase-cover-pattern" class="absolute inset-0 opacity-[0.08] pointer-events-none bg-cover bg-center"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"></div>
  </div>
  <div class="max-w-5xl mx-auto px-8 -mt-56 relative z-10 space-y-12">
    <!-- Artist Card -->
    <div class="glass-panel p-8 rounded-2xl flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl">
      <div class="size-32 rounded-2xl overflow-hidden border-4 border-[#D4AF37]/45 shadow-md flex-shrink-0 bg-white">
        <img id="showcase-avatar" class="w-full h-full object-cover" src="/pics/logoo.png"/>
      </div>
      <div class="text-center md:text-left flex-1 space-y-3">
        <div class="flex flex-col sm:flex-row items-center gap-2 justify-center md:justify-start">
          <h2 id="showcase-name" class="font-headline-md text-3xl font-bold tracking-tight text-on-surface">Amrita Raghavan</h2>
          <span class="font-calligraphy text-2xl text-primary transform translate-y-1" id="showcase-calligraphy">Artistic Excellence</span>
        </div>
        <p id="showcase-spec" class="text-primary font-bold text-xs uppercase tracking-widest">Madhubani Master Artisan</p>
        <p class="text-on-surface-variant text-xs flex items-center justify-center md:justify-start gap-1">
          <span class="material-symbols-outlined text-sm">location_on</span> <span id="showcase-location">Madhubani, Bihar</span>
        </p>
        <div class="flex flex-wrap gap-4 justify-center md:justify-start pt-2" id="showcase-links"></div>
      </div>
      <div class="border-t md:border-t-0 md:border-l border-outline-variant/40 pt-6 md:pt-0 md:pl-8 flex flex-row md:flex-col gap-6 justify-center text-center">
        <div><h5 class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/45">Views</h5><p class="font-headline-md text-2xl text-primary font-bold">1.2K</p></div>
        <div><h5 class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/45">Followers</h5><p class="font-headline-md text-2xl text-primary font-bold">240</p></div>
      </div>
    </div>
    <!-- Bio & Achievements -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div class="glass-panel p-8 rounded-2xl shadow-md space-y-4 relative overflow-hidden">
        <div class="bio-pattern absolute inset-0 opacity-[0.08] pointer-events-none bg-cover bg-center"></div>
        <h3 class="font-headline-md text-xl font-bold border-b border-outline-variant/30 pb-2 text-on-surface relative z-10">Artist Biography</h3>
        <p id="showcase-bio" class="text-sm text-on-surface/80 leading-relaxed italic relative z-10">"Crafting heritage art forms with meticulous devotion."</p>
      </div>
      <div class="glass-panel p-8 rounded-2xl shadow-md space-y-4 relative overflow-hidden">
        <div class="ach-pattern absolute inset-0 opacity-[0.08] pointer-events-none bg-cover bg-center"></div>
        <h3 class="font-headline-md text-xl font-bold border-b border-outline-variant/30 pb-2 text-on-surface relative z-10">Exhibitions & Milestones</h3>
        <ul id="showcase-achievements" class="space-y-3 text-sm text-on-surface/80 leading-relaxed relative z-10"></ul>
      </div>
    </div>
    <!-- Masterpieces -->
    <div class="space-y-6">
      <div class="space-y-4 pt-2">
        <div class="flex items-center justify-between border-b border-outline-variant/30 pb-3">
          <h3 class="font-headline-md text-2xl font-bold text-on-surface">Masterpieces Collection</h3>
          <button onclick="window.location.hash='#gallery'" class="text-xs font-bold text-primary uppercase tracking-widest hover:underline flex items-center gap-1 group">
            View More <span class="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>
        </div>
        <p class="text-sm text-on-surface-variant/60 italic leading-relaxed">Click "View More" above to explore the artist's full collection of paintings, sketches, and cinematic tribal process videos in our immersive fullscreen exhibition gallery.</p>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8" id="featured-uploads-grid">
        <div id="featured-image-card" class="warli-border bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group cursor-pointer" onclick="openLightbox()">
          <div class="aspect-video bg-[#FDFBF7] overflow-hidden relative">
            <img id="featured-image-img" class="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" src="/pics/madhubani_bg.png"/>
            <span class="absolute top-3 left-3 bg-[#B5451B] text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">Latest Image</span>
          </div>
          <div class="p-6">
            <h4 id="featured-image-title" class="font-headline-md text-lg font-bold text-on-surface">Madhubani Lotus Pond</h4>
            <div class="flex justify-between items-center mt-3 pt-3 border-t border-outline-variant/20">
              <span id="featured-image-category" class="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant/60">Mithila Traditional</span>
              <span id="featured-image-price" class="text-primary font-bold text-sm">\u20b918,000</span>
            </div>
          </div>
        </div>
        <div id="featured-video-card" class="warli-border bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group flex flex-col">
          <div class="aspect-video bg-[#FDFBF7] overflow-hidden relative flex-1">
            <video id="featured-video-player" class="w-full h-full object-cover" controls src="/pics/video.mp4"></video>
            <span class="absolute top-3 left-3 bg-secondary text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-md z-10">Latest Video Reel</span>
          </div>
          <div class="p-6">
            <h4 id="featured-video-title" class="font-headline-md text-lg font-bold text-on-surface">Making of Lotus Pond</h4>
            <div class="flex justify-between items-center mt-3 pt-3 border-t border-outline-variant/20">
              <span class="text-[9px] font-bold uppercase tracking-wider text-on-surface-variant/60">Process Reel</span>
              <span class="text-green-700 font-bold text-xs uppercase tracking-wider">New Reel</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<app-footer></app-footer>
</div>

<!-- ═══════════════════════════════════════ -->
<!-- TAB: SETTINGS                          -->
<!-- ═══════════════════════════════════════ -->
<div id="tab-settings" class="spa-tab">
<div class="lg:hidden flex items-center bg-surface p-4 border-b border-outline-variant justify-between">
  <span class="material-symbols-outlined text-on-surface cursor-pointer mobile-menu-btn-toggle">menu</span>
  <h2 class="text-on-surface font-headline-md text-xl font-bold flex-1 text-center">Settings</h2>
  <div class="size-10"></div>
</div>
<div class="max-w-4xl mx-auto w-full px-6 md:px-10 py-12 flex-1">
  <header class="mb-10">
    <h1 class="font-headline-lg text-on-background text-4xl mb-2">Settings</h1>
    <p class="font-body-lg text-on-surface-variant">Manage your artist profile, sales & account.</p>
  </header>
  <!-- Sub-tab buttons -->
  <div class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
    <button onclick="showSettingsTab('profile')" id="btn-profile" class="tab-btn active flex items-center gap-4 p-6 rounded-xl border border-outline-variant bg-surface-container-lowest cursor-pointer hover:shadow-lg transition-shadow">
      <span class="material-symbols-outlined text-3xl">person</span><div class="text-left"><h3 class="font-headline-md text-lg">Profile</h3><p class="text-xs opacity-70">Edit your details</p></div>
    </button>
    <button onclick="showSettingsTab('sales')" id="btn-sales" class="tab-btn flex items-center gap-4 p-6 rounded-xl border border-outline-variant bg-surface-container-lowest cursor-pointer hover:shadow-lg transition-shadow">
      <span class="material-symbols-outlined text-3xl">payments</span><div class="text-left"><h3 class="font-headline-md text-lg">Sales</h3><p class="text-xs opacity-70">Earnings & payouts</p></div>
    </button>
    <button onclick="showSettingsTab('logout')" id="btn-logout" class="tab-btn flex items-center gap-4 p-6 rounded-xl border border-outline-variant bg-surface-container-lowest cursor-pointer hover:shadow-lg transition-shadow">
      <span class="material-symbols-outlined text-3xl">logout</span><div class="text-left"><h3 class="font-headline-md text-lg">Logout</h3><p class="text-xs opacity-70">Sign out safely</p></div>
    </button>
  </div>
  <!-- Panel: Profile -->
  <div id="panel-profile" class="section-panel active">
    <div class="bg-surface-container-low border border-outline-variant p-8 rounded-xl">
      <div class="flex flex-col sm:flex-row items-center gap-8 mb-10 pb-8 border-b border-outline-variant">
        <div class="relative group cursor-pointer" onclick="document.getElementById('inp-file').click()">
          <div class="size-32 bg-surface-dim overflow-hidden border-2 border-primary rounded-2xl">
            <img id="profile-img" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCIabFTe2elbqNDvSbk_V1qjKt2ZR36xlywpoooykLRM06Bx4qgQMtA_vAVQSPwwIOlQhilO3I3l8qTaxOXZBaJidGkn3-qDuAE8QgQBclDYLggmIPpiMKuj7j5Voj5SbTZTiMSWc88Ak5_fNVoLePxkKFH1hNiBoN1iOvqCXi62Axu2ey4qr0CWLf9teyZ7OR95gBaPm-V66VskTaOTrceZh2kIT-RxkPEtPC3mzD6-4papLrP5Iwhng3fHAd2r3eIH_F3g5mbM60T"/>
          </div>
          <div class="absolute inset-0 bg-black/40 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"><span class="material-symbols-outlined text-white text-3xl">photo_camera</span></div>
          <input type="file" id="inp-file" accept="image/*" class="hidden" onchange="updateProfilePic(event)"/>
        </div>
        <div class="text-center sm:text-left">
          <h3 id="profile-header-name" class="font-headline-md text-2xl text-on-surface mb-1">Amrita Raghavan</h3>
          <p id="profile-header-role" class="font-label-sm text-primary uppercase tracking-widest mb-2">Mithila (Madhubani) \u2022 Verified</p>
          <p class="text-sm text-on-surface-variant">Member since January 2023</p>
          <button onclick="document.getElementById('inp-file').click()" class="mt-3 text-sm text-primary font-bold uppercase tracking-widest hover:underline">Change Photo</button>
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Full Name</label><input id="inp-full-name" class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="Amrita Raghavan" type="text"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Display Name</label><input id="inp-display-name" class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="Amrita R." type="text"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Email Address</label><input id="inp-email" class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="amrita@paintedmuse.com" type="email"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Phone Number</label><input id="inp-phone" class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="+91 98765 43210" type="tel"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Art Specialization</label><select id="inp-specialization" class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md appearance-none"><option selected value="Mithila (Madhubani)">Mithila (Madhubani)</option><option value="Tanjore Painting">Tanjore Painting</option><option value="Warli Art">Warli Art</option><option value="Pattachitra">Pattachitra</option></select></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">City, State</label><input id="inp-city-state" class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="Madhubani, Bihar" type="text"/></div>
      </div>
      <div class="flex flex-col gap-1 mb-8"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Artist Bio</label><textarea id="inp-bio" class="bg-transparent border border-outline-variant text-on-surface focus:border-primary focus:ring-0 p-4 font-body-md resize-none rounded-lg" rows="3">Award-winning Madhubani artist with 15+ years of experience bridging traditional Mithila storytelling with contemporary themes.</textarea></div>
      <div class="flex justify-end gap-4 items-center">
        <p id="save-feedback" class="text-green-700 font-bold text-sm opacity-0 transition-opacity">Saved successfully!</p>
        <button onclick="saveProfile()" class="h-12 px-10 bg-primary text-on-primary font-body-md font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg rounded-lg">Save Profile</button>
      </div>
    </div>
  </div>
  <!-- Panel: Sales -->
  <div id="panel-sales" class="section-panel">
    <div class="bg-surface-container-low border border-outline-variant p-8 rounded-xl">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8 pb-8 border-b border-outline-variant">
        <div class="bg-surface-container-lowest p-5 border border-outline-variant text-center rounded-xl"><p class="font-headline-md text-3xl text-primary mb-1">\u20b92.4L</p><p class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Total Earnings</p></div>
        <div class="bg-surface-container-lowest p-5 border border-outline-variant text-center rounded-xl"><p class="font-headline-md text-3xl text-on-surface mb-1">34</p><p class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Artworks Sold</p></div>
        <div class="bg-surface-container-lowest p-5 border border-outline-variant text-center rounded-xl"><p class="font-headline-md text-3xl text-on-surface mb-1">8</p><p class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Pending Orders</p></div>
        <div class="bg-surface-container-lowest p-5 border border-outline-variant text-center rounded-xl"><p class="font-headline-md text-3xl text-on-surface mb-1">\u20b945K</p><p class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">This Month</p></div>
      </div>
      <h3 class="font-label-sm text-on-surface uppercase tracking-widest mb-4 flex items-center gap-2"><span class="material-symbols-outlined text-primary text-lg">account_balance</span>Bank / Payout Details</h3>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Bank Name</label><input class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="State Bank of India" type="text"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">Account Number</label><input class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md tracking-widest" value="\u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 \u2022\u2022\u2022\u2022 7890" type="text"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">IFSC Code</label><input class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="SBIN0001234" type="text"/></div>
        <div class="flex flex-col gap-1"><label class="font-label-sm text-on-surface-variant uppercase tracking-widest text-[10px]">UPI ID</label><input class="bg-transparent border-b border-outline text-on-surface focus:border-primary focus:ring-0 px-0 py-2 font-body-md" value="amrita@upi" type="text"/></div>
      </div>
      <div class="flex justify-end"><button class="h-12 px-10 bg-primary text-on-primary font-body-md font-bold uppercase tracking-widest hover:brightness-110 transition-all shadow-lg rounded-lg">Update Payout Info</button></div>
    </div>
  </div>
  <!-- Panel: Logout -->
  <div id="panel-logout" class="section-panel">
    <div class="bg-surface-container-low border border-outline-variant p-10 rounded-xl text-center max-w-md mx-auto">
      <span class="material-symbols-outlined text-error text-6xl mb-4">logout</span>
      <h2 class="font-headline-md text-2xl text-on-surface mb-3">Sign Out?</h2>
      <p class="font-body-md text-on-surface-variant mb-8">You will be redirected to the homepage. Your data is safely saved.</p>
      <div class="flex flex-col gap-3">
        <button onclick="doLogout()" class="w-full h-14 bg-error text-on-error font-body-md font-bold uppercase tracking-widest hover:brightness-110 transition-all rounded-lg flex items-center justify-center gap-2"><span class="material-symbols-outlined">logout</span>Logout</button>
        <button onclick="showSettingsTab('profile')" class="w-full h-14 border border-outline-variant text-on-surface font-body-md font-bold uppercase tracking-widest hover:bg-surface-container-high transition-all rounded-lg">Cancel</button>
      </div>
    </div>
  </div>
</div>
</div>

</main>
</div>

<!-- ═══ Portfolio Edit Drawer ═══ -->
<div id="edit-drawer-overlay" class="fixed inset-0 bg-black/50 z-[110] hidden transition-opacity duration-300" onclick="togglePortfolioDrawer(false)"></div>
<div id="edit-drawer" class="fixed top-0 right-0 h-full w-full max-w-md bg-white border-l border-outline-variant shadow-2xl z-[120] translate-x-full transition-transform duration-300 flex flex-col">
  <div class="p-6 border-b border-outline-variant flex justify-between items-center bg-surface">
    <h3 class="font-headline-md text-xl font-bold text-on-surface flex items-center gap-2"><span class="material-symbols-outlined text-primary">edit</span> Edit Portfolio Profile</h3>
    <button onclick="togglePortfolioDrawer(false)" class="text-on-surface-variant hover:text-primary transition-colors"><span class="material-symbols-outlined text-2xl">close</span></button>
  </div>
  <div class="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
    <div class="space-y-3">
      <label class="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Showcase Accent/Theme Color</label>
      <div class="flex gap-4 items-center flex-wrap" id="swatch-container">
        <div class="color-swatch active bg-[#FDFBF7]" data-color="#FDFBF7" title="Classic Cream"></div>
        <div class="color-swatch bg-[#F5F0E8]" data-color="#F5F0E8" title="Antique Paper"></div>
        <div class="color-swatch bg-[#FFF8F0]" data-color="#FFF8F0" title="Warm Silk"></div>
        <div class="color-swatch bg-[#E8E4D9]" data-color="#E8E4D9" title="Desert Sand"></div>
        <div class="color-swatch bg-[#ebd5cf]" data-color="#ebd5cf" title="Soft Terracotta"></div>
        <div class="color-swatch bg-[#ffe9e3]" data-color="#ffe9e3" title="Rose Clay"></div>
      </div>
      <div class="flex items-center gap-3 pt-2">
        <input type="color" id="custom-color" class="w-8 h-8 rounded-md border border-outline-variant cursor-pointer">
        <span class="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant/60">Choose Custom Color</span>
      </div>
    </div>
    <div class="space-y-3">
      <label class="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Cover Pattern Background</label>
      <div class="grid grid-cols-3 gap-3">
        <button onclick="selectPattern('/pics/warli_pattern_1778230295803.png',this)" class="border-2 border-primary p-2 rounded-xl bg-surface overflow-hidden transition-all text-center"><img src="/pics/warli_pattern_1778230295803.png" class="w-full h-10 object-cover opacity-20 mx-auto" alt="Warli"><span class="text-[8px] font-bold uppercase mt-1 block">Warli</span></button>
        <button onclick="selectPattern('/pics/madhubani_pattern_1778230275283.png',this)" class="border-2 border-outline-variant p-2 rounded-xl bg-surface overflow-hidden hover:border-primary/50 transition-all text-center"><img src="/pics/madhubani_pattern_1778230275283.png" class="w-full h-10 object-cover opacity-20 mx-auto" alt="Madhubani"><span class="text-[8px] font-bold uppercase mt-1 block">Madhubani</span></button>
        <button onclick="selectPattern('/pics/gond_pattern_1778230315090.png',this)" class="border-2 border-outline-variant p-2 rounded-xl bg-surface overflow-hidden hover:border-primary/50 transition-all text-center"><img src="/pics/gond_pattern_1778230315090.png" class="w-full h-10 object-cover opacity-20 mx-auto" alt="Gond"><span class="text-[8px] font-bold uppercase mt-1 block">Gond Art</span></button>
      </div>
    </div>
    <div class="space-y-2">
      <label class="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Calligraphy Flourish Tag</label>
      <input type="text" id="inp-calligraphy" placeholder="e.g. Traditional Masterpiece" class="w-full bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-sm">
    </div>
    <div class="space-y-2">
      <label class="block text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">Exhibitions & Key Achievements (one per line)</label>
      <textarea id="inp-achievements" rows="5" placeholder="Exhibitions and milestones..." class="w-full bg-surface-container-low border-outline-variant rounded-lg px-4 py-3 focus:ring-primary focus:border-primary text-sm"></textarea>
    </div>
  </div>
  <div class="p-6 border-t border-outline-variant bg-surface flex gap-4">
    <button onclick="togglePortfolioDrawer(false)" class="flex-1 py-3 border border-outline-variant text-on-surface font-bold uppercase text-xs tracking-wider rounded-lg hover:bg-surface-container-low transition-colors">Cancel</button>
    <button onclick="savePortfolioSettings()" class="flex-1 py-3 bg-primary text-white font-bold uppercase text-xs tracking-wider rounded-lg hover:brightness-110 transition-all shadow-md">Save Changes</button>
  </div>
</div>

<!-- Lightbox Modal -->
<div id="lightbox-modal" class="fixed inset-0 z-[130] bg-black/90 hidden items-center justify-center p-6 transition-all duration-300" onclick="closeLightbox()">
  <button class="absolute top-6 right-6 text-white/70 hover:text-white transition-colors cursor-pointer" onclick="closeLightbox()"><span class="material-symbols-outlined text-4xl">close</span></button>
  <div class="max-w-4xl max-h-[85vh] w-full flex flex-col items-center justify-center space-y-4" onclick="event.stopPropagation()">
    <img id="lightbox-img" class="max-w-full max-h-[75vh] object-contain rounded-lg shadow-2xl" src=""/>
    <h4 id="lightbox-title" class="text-white font-headline-md text-xl font-bold">Artwork</h4>
  </div>
</div>

<!-- ═══════════════════════════════════════════════ -->
<!-- SINGLE UNIFIED SCRIPT BLOCK                    -->
<!-- ═══════════════════════════════════════════════ -->
<script>
// ── Global State ──
var user = null;
var db = null;
var dbName = "ReelsDB";
var storeName = "videos";
var artistPosts = [];
var artistReels = [];
var selectedPatternUrl = '/pics/warli_pattern_1778230295803.png';
var selectedBgColor = '#FDFBF7';

// ══════════════════════════════════════════
// SPA ROUTER
// ══════════════════════════════════════════
function switchTab(hash) {
  var validTabs = ['home','gallery','portfolio','settings'];
  var tabId = hash.replace('#','');
  if (validTabs.indexOf(tabId) === -1) tabId = 'home';
  document.querySelectorAll('.spa-tab').forEach(function(el){ el.classList.remove('active-tab'); });
  var target = document.getElementById('tab-' + tabId);
  if (target) target.classList.add('active-tab');
  // Update sidebar active
  document.querySelectorAll('.sidebar-item').forEach(function(el){
    el.classList.remove('active');
    if (el.getAttribute('data-tab') === tabId) el.classList.add('active');
  });
  // Scroll main to top
  var main = document.querySelector('main');
  if (main) main.scrollTo({top:0,behavior:'smooth'});
}
window.addEventListener('hashchange', function(){ switchTab(window.location.hash); });

// ══════════════════════════════════════════
// INIT ON DOM READY
// ══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function(){
  // Get user from server-rendered EJS
  user = <%- JSON.stringify(user || null) %>;
  if (!user) {
    try { user = JSON.parse(localStorage.getItem('currentUser')); } catch(e) {}
  }
  if (!user) { window.location.href = '/?error=auth'; return; }
  localStorage.setItem('currentUser', JSON.stringify(user));
  localStorage.setItem('artistLoggedIn', 'true');

  // Apply profile overrides
  applyProfileToUI();

  // Init IndexedDB then load data
  initDB().then(function(){
    loadRecentUploads();
    loadPortfolioShowcase();
    initMedia();
    loadSettingsProfile();
  }).catch(function(err){
    console.error("DB Init failed", err);
    loadRecentUploads();
    loadPortfolioShowcase();
    initMedia();
    loadSettingsProfile();
  });

  // Route to correct tab based on hash
  switchTab(window.location.hash);

  // Color swatch listeners
  document.querySelectorAll('.color-swatch').forEach(function(swatch){
    swatch.addEventListener('click', function(){
      selectedBgColor = swatch.getAttribute('data-color');
      document.querySelectorAll('.color-swatch').forEach(function(s){ s.classList.remove('active'); });
      swatch.classList.add('active');
    });
  });
  var customColorInput = document.getElementById('custom-color');
  if (customColorInput) {
    customColorInput.addEventListener('input', function(e){
      selectedBgColor = e.target.value;
      document.querySelectorAll('.color-swatch').forEach(function(s){ s.classList.remove('active'); });
    });
  }
});

// ══════════════════════════════════════════
// DATABASE
// ══════════════════════════════════════════
function initDB(){
  return new Promise(function(resolve, reject){
    var request = indexedDB.open(dbName, 1);
    request.onupgradeneeded = function(event){
      var d = event.target.result;
      if (!d.objectStoreNames.contains(storeName)) d.createObjectStore(storeName, {keyPath:"id",autoIncrement:true});
    };
    request.onsuccess = function(event){ db = event.target.result; resolve(db); };
    request.onerror = function(event){ reject(event.target.error); };
  });
}

// ══════════════════════════════════════════
// HOME TAB LOGIC
// ══════════════════════════════════════════
function applyProfileToUI(){
  var storedProfile = localStorage.getItem('artist_profile_' + user.email);
  if (storedProfile) {
    try {
      var profile = JSON.parse(storedProfile);
      var welcomeHeader = document.querySelector('#tab-home h1.font-headline-lg');
      if (welcomeHeader && profile.fullName) welcomeHeader.textContent = profile.fullName;
    } catch(e){}
  }
}

function saveVideo(file){
  if (!db || !user) return;
  var artistName = user.fullName;
  var handle = "@" + user.fullName.toLowerCase().replace(/\\s+/g, '_');
  try {
    var storedProfile = localStorage.getItem('artist_profile_' + user.email);
    if (storedProfile) {
      var profile = JSON.parse(storedProfile);
      if (profile.displayName) { artistName = profile.displayName; handle = "@" + profile.displayName.toLowerCase().replace(/\\s+/g, '_'); }
    }
  } catch(e){}
  var transaction = db.transaction([storeName], "readwrite");
  var store = transaction.objectStore(storeName);
  var record = {file:file,timestamp:Date.now(),artistName:artistName,handle:handle,title:"Uploaded Reel",userEmail:user.email};
  var request = store.add(record);
  request.onsuccess = function(){ loadRecentUploads(); };
}

function createPostCard(post){
  var div = document.createElement('div');
  div.className = "bg-surface-container-lowest border border-outline-variant group cursor-pointer hover:shadow-lg transition-shadow rounded-xl overflow-hidden";
  div.onclick = function(){ window.location.hash = '#gallery'; };
  div.innerHTML = '<div class="aspect-square bg-surface-variant overflow-hidden"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="'+post.imgUrl+'" onerror="this.src=\\'https://placehold.co/600x600/F5F0E8/B5451B?text=Artwork\\'"/></div><div class="p-4"><h4 class="font-headline-md text-lg mb-1">'+post.title+'</h4><div class="flex justify-between"><span class="text-xs text-on-surface-variant">'+(post.category||'Artwork')+'</span><span class="text-sm text-primary font-bold">\\u20b9'+Number(post.price).toLocaleString()+'</span></div></div>';
  return div;
}

function createReelCard(reel){
  var reelUrl = reel.file ? URL.createObjectURL(reel.file) : reel.videoUrl;
  var div = document.createElement('div');
  div.className = "bg-surface-container-lowest border border-outline-variant group cursor-pointer hover:shadow-lg transition-shadow relative overflow-hidden rounded-xl";
  div.onclick = function(){ window.location.hash = '#gallery'; };
  div.innerHTML = '<div class="aspect-square bg-surface-variant overflow-hidden relative">' + (reel.file ? '<video class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src="'+reelUrl+'#t=0.1" muted></video>' : '<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="'+reel.videoUrl+'"/>') + '<div class="absolute inset-0 bg-black/20 flex items-center justify-center"><span class="material-symbols-outlined text-white text-5xl opacity-80">play_circle</span></div></div><div class="p-4"><h4 class="font-headline-md text-lg mb-1">'+(reel.title||'Uploaded Reel')+'</h4><div class="flex justify-between"><span class="text-xs text-on-surface-variant">Reel</span><span class="text-sm text-primary font-bold text-green-700">New</span></div></div>';
  return div;
}

async function loadRecentUploads(){
  var grid = document.getElementById('recent-uploads-grid');
  if (!grid || !user) return;
  var posts = [];
  try { posts = JSON.parse(localStorage.getItem('artist_posts_' + user.email) || '[]'); if (!Array.isArray(posts)) posts = []; } catch(e){ posts = []; }
  var reels = [];
  if (db) {
    var transaction = db.transaction([storeName], "readonly");
    var store = transaction.objectStore(storeName);
    var allReels = await new Promise(function(resolve){ var req = store.getAll(); req.onsuccess = function(){ resolve(req.result || []); }; });
    reels = allReels.filter(function(r){ return r.userEmail === user.email; });
  }
  grid.innerHTML = '';
  // Upload button
  var uploadBtn = document.createElement('div');
  uploadBtn.className = "bg-surface-container-lowest border border-outline-variant group cursor-pointer hover:shadow-lg transition-shadow rounded-xl overflow-hidden";
  uploadBtn.onclick = function(){ document.getElementById('reelUploadInput').click(); };
  uploadBtn.innerHTML = '<div class="aspect-square bg-surface-variant overflow-hidden flex items-center justify-center"><span class="material-symbols-outlined text-primary text-6xl">videocam</span></div><div class="p-4 text-center"><h4 class="font-body-md text-on-surface-variant">Upload New Reel</h4></div><input type="file" id="reelUploadInput" accept="video/*" capture="environment" class="hidden">';
  grid.appendChild(uploadBtn);
  var fileInput = uploadBtn.querySelector('#reelUploadInput');
  fileInput.addEventListener('change', function(e){ var file = e.target.files[0]; if (file) { saveVideo(file); alert('Reel uploaded successfully!'); } });

  // Approval banner
  var approvalBanner = document.getElementById('approval-status-banner');
  if (approvalBanner) {
    approvalBanner.className = "mb-6 p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 flex items-center gap-3";
    var icon = document.getElementById('approval-banner-icon'); if (icon) icon.textContent = "check_circle";
    var title = document.getElementById('approval-banner-title'); if (title) title.textContent = "Profile Approved";
    var desc = document.getElementById('approval-banner-desc'); if (desc) desc.textContent = "Your profile is verified and active! Your artworks are visible to the public.";
    approvalBanner.classList.remove('hidden');
  }

  var combined = posts.map(function(p){ return Object.assign({},p,{type:'post'}); }).concat(reels.map(function(r){ return Object.assign({},r,{type:'reel'}); })).sort(function(a,b){ return (b.timestamp||0)-(a.timestamp||0); });
  combined.slice(0,5).forEach(function(item){ grid.appendChild(item.type === 'post' ? createPostCard(item) : createReelCard(item)); });

  // Update stats for new users
  if (user.isNewUser) {
    var el;
    el = document.getElementById('stat-artworks'); if(el) el.textContent = reels.length + posts.length;
    el = document.getElementById('stat-artworks-sub'); if(el) el.textContent = 'Uploaded by you';
    el = document.getElementById('stat-views'); if(el) el.textContent = '0';
    el = document.getElementById('stat-views-sub'); if(el) el.textContent = 'No views yet';
    el = document.getElementById('stat-sold'); if(el) el.textContent = '0';
    el = document.getElementById('stat-sold-sub'); if(el) el.textContent = 'No sales yet';
    el = document.getElementById('stat-earnings'); if(el) el.textContent = '\\u20b90';
    el = document.getElementById('stat-earnings-sub'); if(el) el.textContent = '\\u20b90 this month';
  }
}

// ══════════════════════════════════════════
// GALLERY TAB LOGIC
// ══════════════════════════════════════════
var defaultPosts = [
  {title:'Eternal Echoes',category:'Madhubani',dimensions:'24\\u00d736 in',price:18000,status:'Available',imgUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N'},
  {title:'Tree of Life',category:'Madhubani',dimensions:'30\\u00d740 in',price:24500,status:'Available',imgUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuCE85tliyBtatM4Sf9CGMCkZrJLQbMkAvenwVo9STCUkhlAfIfFaU5PR6Y48rZ-4KuIoI4eJK09WtYLHNewz2WrIJDF7vSM-QmXbO-njNqxgped5JbFyOnwVHgsDWZQERAp-dpFK6R30NrvKIMYqnkpxBetfDPqAHpWry3YDm8YSkPQM-KnvLHPRK0yBW8Y4uRF9NOADCjtyLuP8ZjuNSGP2x2zmQmYzZS3FzJ2_Td2xvEs6udYptzb_3IbEQmsQO6uBrO3MZdbXeua'},
  {title:'Lotus Dreams',category:'Madhubani',dimensions:'18\\u00d724 in',price:12000,status:'Sold',imgUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N'}
];
var defaultReels = [
  {title:'Making of Eternal Echoes',videoUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N'},
  {title:'Madhubani Brush Techniques',videoUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuCE85tliyBtatM4Sf9CGMCkZrJLQbMkAvenwVo9STCUkhlAfIfFaU5PR6Y48rZ-4KuIoI4eJK09WtYLHNewz2WrIJDF7vSM-QmXbO-njNqxgped5JbFyOnwVHgsDWZQERAp-dpFK6R30NrvKIMYqnkpxBetfDPqAHpWry3YDm8YSkPQM-KnvLHPRK0yBW8Y4uRF9NOADCjtyLuP8ZjuNSGP2x2zmQmYzZS3FzJ2_Td2xvEs6udYptzb_3IbEQmsQO6uBrO3MZdbXeua'},
  {title:'Studio Tour',videoUrl:'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N'}
];

function switchMedia(type){
  document.querySelectorAll('.media-tab').forEach(function(t){ t.classList.remove('active'); });
  document.querySelectorAll('.media-grid').forEach(function(g){ g.classList.remove('active'); });
  var tabEl = document.getElementById('media-tab-' + type);
  var gridEl = document.getElementById('grid-' + type);
  if (tabEl) tabEl.classList.add('active');
  if (gridEl) gridEl.classList.add('active');
}

function openPreview(url, type, title){
  var modal = document.getElementById('gallery-preview-modal');
  var mImg = document.getElementById('modal-img');
  var mVid = document.getElementById('modal-vid');
  document.getElementById('modal-title').textContent = title;
  if (type === 'image') { mImg.src = url; mImg.classList.remove('hidden'); mVid.classList.add('hidden'); mVid.pause(); }
  else { mVid.src = url; mVid.classList.remove('hidden'); mImg.classList.add('hidden'); }
  modal.classList.remove('hidden'); modal.classList.add('flex');
}
function closePreview(){
  var modal = document.getElementById('gallery-preview-modal');
  modal.classList.add('hidden'); modal.classList.remove('flex');
  var mVid = document.getElementById('modal-vid'); if(mVid) mVid.pause();
}

async function initMedia(){
  if (!user) return;
  var postsKey = 'artist_posts_' + user.email;
  var postsStored = localStorage.getItem(postsKey);
  if (postsStored) { artistPosts = JSON.parse(postsStored); }
  else { artistPosts = user.isNewUser ? [] : defaultPosts; if (!user.isNewUser) localStorage.setItem(postsKey, JSON.stringify(artistPosts)); }
  try {
    if (!db) await initDB();
    var transaction = db.transaction([storeName], "readonly");
    var store = transaction.objectStore(storeName);
    var request = store.getAll();
    request.onsuccess = function(){
      var allReels = request.result || [];
      artistReels = allReels.filter(function(r){ return r.userEmail === user.email; });
      if (artistReels.length === 0 && !user.isNewUser) artistReels = defaultReels;
      renderGrids();
    };
  } catch(err){
    console.error("IDB Init failed:", err);
    artistReels = user.isNewUser ? [] : defaultReels;
    renderGrids();
  }
}

function renderGrids(){
  var countEl = document.getElementById('gallery-count');
  if (countEl) countEl.textContent = artistPosts.length + ' posts and ' + artistReels.length + ' reels in your collection';
  var gridPosts = document.getElementById('grid-posts');
  if (!gridPosts) return;
  gridPosts.innerHTML = '';
  artistPosts.forEach(function(post, idx){
    var isSold = post.status === 'Sold';
    var postDiv = document.createElement('div');
    postDiv.className = 'bg-surface-container-lowest border border-outline-variant rounded-xl group cursor-pointer hover:shadow-lg transition-all overflow-hidden flex flex-col';
    postDiv.onclick = function(){ openPreview(post.imgUrl, 'image', post.title); };
    postDiv.innerHTML = '<div class="aspect-square bg-surface-variant overflow-hidden relative"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 '+(isSold?'grayscale-[30%]':'')+'" src="'+post.imgUrl+'" onerror="this.src=\\'https://placehold.co/600x600/F5F0E8/B5451B?text=Artwork\\'"/><span class="absolute top-2 right-2 '+(isSold?'bg-on-surface text-surface':'bg-green-700 text-white')+' text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">'+post.status+'</span></div><div class="p-3 flex-1 flex flex-col justify-between"><div><h4 class="font-headline-md text-sm mb-0.5 truncate">'+post.title+'</h4><p class="text-[10px] text-on-surface-variant mb-1">'+(post.category||'Mithila')+' \\u2022 '+(post.dimensions||'Custom Size')+'</p></div><div class="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant/30"><span class="'+(isSold?'text-on-surface-variant line-through':'text-primary')+' font-bold text-xs">\\u20b9'+Number(post.price).toLocaleString()+'</span><div class="flex gap-2 items-center text-[10px]"><button onclick="event.stopPropagation();triggerEdit(\\'post\\','+idx+')" class="hover:text-primary font-bold flex items-center gap-0.5 transition-colors"><span class="material-symbols-outlined text-xs">edit</span>Edit</button><button onclick="event.stopPropagation();triggerDelete(\\'post\\','+idx+')" class="hover:text-error font-bold flex items-center gap-0.5 transition-colors"><span class="material-symbols-outlined text-xs">delete</span>Delete</button></div></div></div>';
    gridPosts.appendChild(postDiv);
  });
  var uploadPostTrigger = document.createElement('div');
  uploadPostTrigger.onclick = function(){ window.location.hash = '#home'; };
  uploadPostTrigger.className = 'bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center aspect-square cursor-pointer hover:border-primary transition-colors group';
  uploadPostTrigger.innerHTML = '<span class="material-symbols-outlined text-outline-variant text-4xl group-hover:text-primary transition-colors mb-2">add_photo_alternate</span><p class="font-body-md text-on-surface-variant text-xs group-hover:text-primary transition-colors">Upload Art</p>';
  gridPosts.appendChild(uploadPostTrigger);

  var gridReels = document.getElementById('grid-reels');
  if (!gridReels) return;
  gridReels.innerHTML = '';
  artistReels.forEach(function(reel, idx){
    var reelUrl = reel.file ? URL.createObjectURL(reel.file) : reel.videoUrl;
    var reelDiv = document.createElement('div');
    reelDiv.className = 'bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-all relative aspect-[9/16]';
    reelDiv.onclick = function(){ openPreview(reelUrl, 'video', reel.title); };
    reelDiv.innerHTML = '<div class="w-full h-full relative overflow-hidden">'+(reel.file?'<video class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src="'+reelUrl+'#t=0.1" muted></video>':'<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="'+reel.videoUrl+'" onerror="this.src=\\'https://placehold.co/400x711/F5F0E8/B5451B?text=Reel\\'"  />')+'<div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div><div class="absolute top-2 left-2 flex gap-1.5 z-10"><button onclick="event.stopPropagation();triggerEdit(\\'reel\\','+idx+')" class="size-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors shadow-md"><span class="material-symbols-outlined text-xs">edit</span></button><button onclick="event.stopPropagation();triggerDelete(\\'reel\\','+idx+')" class="size-7 bg-black/60 hover:bg-error text-white rounded-full flex items-center justify-center transition-colors shadow-md"><span class="material-symbols-outlined text-xs">delete</span></button></div><div class="absolute bottom-3 left-2 right-2"><p class="text-white text-[10px] font-bold truncate">'+reel.title+'</p></div><span class="absolute top-2 right-2 material-symbols-outlined text-white text-lg">play_circle</span></div>';
    gridReels.appendChild(reelDiv);
  });
  var uploadReelTrigger = document.createElement('div');
  uploadReelTrigger.onclick = function(){ window.location.hash = '#home'; };
  uploadReelTrigger.className = 'bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center aspect-[9/16] cursor-pointer hover:border-primary transition-colors group';
  uploadReelTrigger.innerHTML = '<span class="material-symbols-outlined text-outline-variant text-4xl group-hover:text-primary transition-colors mb-2">video_call</span><p class="font-body-md text-on-surface-variant group-hover:text-primary transition-colors text-xs">New Reel</p>';
  gridReels.appendChild(uploadReelTrigger);
}

function triggerEdit(type, idx){
  var modal = document.getElementById('gallery-edit-modal');
  document.getElementById('edit-item-type').value = type;
  document.getElementById('edit-item-idx').value = idx;
  if (type === 'post') {
    var item = artistPosts[idx];
    document.getElementById('edit-modal-headline').textContent = 'Edit Artwork Details';
    document.getElementById('edit-title').value = item.title;
    document.getElementById('edit-category').value = item.category || 'Madhubani';
    document.getElementById('edit-dimensions').value = item.dimensions || '24\\u00d736 in';
    document.getElementById('edit-price').value = item.price;
    document.getElementById('edit-status').value = item.status || 'Available';
    document.getElementById('post-edit-fields').classList.remove('hidden');
  } else {
    var reelItem = artistReels[idx];
    document.getElementById('edit-modal-headline').textContent = 'Edit Reel Title';
    document.getElementById('edit-title').value = reelItem.title;
    document.getElementById('post-edit-fields').classList.add('hidden');
  }
  modal.classList.remove('hidden'); modal.classList.add('flex');
}
function closeEditModal(){
  var modal = document.getElementById('gallery-edit-modal');
  if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}
function saveEdit(e){
  e.preventDefault();
  var type = document.getElementById('edit-item-type').value;
  var idx = parseInt(document.getElementById('edit-item-idx').value);
  if (type === 'post') {
    artistPosts[idx].title = document.getElementById('edit-title').value;
    artistPosts[idx].category = document.getElementById('edit-category').value;
    artistPosts[idx].dimensions = document.getElementById('edit-dimensions').value;
    artistPosts[idx].price = parseFloat(document.getElementById('edit-price').value) || 0;
    artistPosts[idx].status = document.getElementById('edit-status').value;
    if (user) localStorage.setItem('artist_posts_' + user.email, JSON.stringify(artistPosts));
  } else {
    artistReels[idx].title = document.getElementById('edit-title').value;
    if (artistReels[idx].id && db) { var t = db.transaction([storeName],"readwrite"); t.objectStore(storeName).put(artistReels[idx]); }
  }
  closeEditModal(); renderGrids();
}
function triggerDelete(type, idx){
  if (!confirm('Are you sure you want to delete this ' + (type==='post'?'artwork post':'reel') + '?')) return;
  if (type === 'post') {
    artistPosts.splice(idx, 1);
    if (user) localStorage.setItem('artist_posts_' + user.email, JSON.stringify(artistPosts));
    renderGrids();
  } else {
    var reel = artistReels[idx];
    if (reel.id && db) {
      var t = db.transaction([storeName],"readwrite");
      var req = t.objectStore(storeName).delete(reel.id);
      req.onsuccess = function(){ artistReels.splice(idx,1); renderGrids(); };
    } else { artistReels.splice(idx,1); renderGrids(); }
  }
}
document.addEventListener('keydown', function(e){ if(e.key==='Escape'){closePreview();closeEditModal();} });

// ══════════════════════════════════════════
// PORTFOLIO TAB LOGIC
// ══════════════════════════════════════════
function togglePortfolioDrawer(show){
  var drawer = document.getElementById('edit-drawer');
  var overlay = document.getElementById('edit-drawer-overlay');
  if (!user) return;
  if (show) {
    var profileKey = 'artist_profile_' + user.email;
    var profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
    document.getElementById('inp-calligraphy').value = profile.calligraphy || 'Artistic Excellence';
    document.getElementById('inp-achievements').value = profile.achievements || "\\u2022 Solo Exhibition, Visual Arts Gallery, New Delhi (2023)\\n\\u2022 State Award for Traditional Crafts, Government of Bihar (2021)\\n\\u2022 National Traditional Conclave Participant (2020)";
    selectedBgColor = profile.themeBgColor || '#FDFBF7';
    selectedPatternUrl = profile.themePattern || '/pics/warli_pattern_1778230295803.png';
    drawer.classList.remove('translate-x-full');
    overlay.classList.remove('hidden');
  } else {
    drawer.classList.add('translate-x-full');
    overlay.classList.add('hidden');
  }
}
function selectPattern(url, btn){
  selectedPatternUrl = url;
  var buttons = btn.parentElement.querySelectorAll('button');
  buttons.forEach(function(b){ b.classList.remove('border-primary'); b.classList.add('border-outline-variant'); });
  btn.classList.remove('border-outline-variant');
  btn.classList.add('border-primary');
}
function savePortfolioSettings(){
  if (!user) return;
  var profileKey = 'artist_profile_' + user.email;
  var profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
  profile.calligraphy = document.getElementById('inp-calligraphy').value.trim();
  profile.achievements = document.getElementById('inp-achievements').value.trim();
  profile.themeBgColor = selectedBgColor;
  profile.themePattern = selectedPatternUrl;
  localStorage.setItem(profileKey, JSON.stringify(profile));
  togglePortfolioDrawer(false);
  loadPortfolioShowcase();
}

async function loadPortfolioShowcase(){
  if (!user) return;
  var profileKey = 'artist_profile_' + user.email;
  var profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
  var displayName = profile.displayName || user.fullName;
  var spec = profile.specialization || user.spec || 'Traditional Artist';
  var location = profile.cityState || 'India';
  var photoUrl = profile.photoUrl || '/pics/logoo.png';
  var bio = profile.bio || 'Crafting heritage art forms with meticulous devotion.';
  var calligraphy = profile.calligraphy || 'Artistic Excellence';
  var achievements = profile.achievements || "\\u2022 Solo Exhibition, Visual Arts Gallery, New Delhi (2023)\\n\\u2022 State Award for Traditional Crafts, Government of Bihar (2021)\\n\\u2022 National Traditional Conclave Participant (2020)";
  var bgColor = profile.themeBgColor || '#FDFBF7';
  var pattern = profile.themePattern || '/pics/warli_pattern_1778230295803.png';

  var container = document.getElementById('portfolio-showcase-container');
  if (container) container.style.backgroundColor = bgColor;
  var coverPattern = document.getElementById('showcase-cover-pattern');
  if (coverPattern) coverPattern.style.backgroundImage = "url('" + pattern + "')";
  var bioPattern = document.querySelector('.bio-pattern');
  var achPattern = document.querySelector('.ach-pattern');
  if (bioPattern) bioPattern.style.backgroundImage = "url('" + pattern + "')";
  if (achPattern) achPattern.style.backgroundImage = "url('" + pattern + "')";

  var setTextById = function(id, text){ var el = document.getElementById(id); if(el) el.textContent = text; };
  var setSrcById = function(id, src){ var el = document.getElementById(id); if(el) el.src = src; };

  setSrcById('showcase-avatar', photoUrl);
  setTextById('showcase-name', displayName);
  setTextById('showcase-calligraphy', calligraphy);
  setTextById('showcase-spec', spec);
  setTextById('showcase-location', location);
  setTextById('showcase-bio', '"' + bio + '"');

  // Achievements
  var achContainer = document.getElementById('showcase-achievements');
  if (achContainer) {
    achContainer.innerHTML = achievements.split('\\n').filter(function(l){return l.trim()!=='';}).map(function(l){return '<li class="flex items-start gap-2.5"><span class="text-primary mt-1">\\u2022</span><span>'+l.replace(/^[\\u2022\\-\\*\\s]+/,'')+'</span></li>';}).join('');
  }

  // Featured image
  var postsKey = 'artist_posts_' + user.email;
  artistPosts = JSON.parse(localStorage.getItem(postsKey) || '[]');
  var imgCard = document.getElementById('featured-image-card');
  if (imgCard) {
    if (artistPosts.length > 0) {
      var latestImg = artistPosts[artistPosts.length - 1];
      setSrcById('featured-image-img', latestImg.imgUrl);
      setTextById('featured-image-title', latestImg.title);
      setTextById('featured-image-category', latestImg.category || 'Artwork');
      var priceEl = document.getElementById('featured-image-price');
      if (priceEl) priceEl.textContent = '\\u20b9' + Number(latestImg.price).toLocaleString();
    }
  }

  // Featured video
  var videoUrl = '/pics/video.mp4';
  var videoTitle = 'Process Reel';
  var hasVideo = false;
  if (db) {
    try {
      var transaction = db.transaction([storeName], "readonly");
      var store = transaction.objectStore(storeName);
      var request = store.getAll();
      await new Promise(function(resolve){
        request.onsuccess = function(){
          var allReels = request.result || [];
          var userReels = allReels.filter(function(r){ return r.userEmail === user.email; });
          if (userReels.length > 0) {
            var latestReel = userReels[userReels.length - 1];
            videoUrl = latestReel.file ? URL.createObjectURL(latestReel.file) : latestReel.videoUrl;
            videoTitle = latestReel.title || 'Process Reel';
            hasVideo = true;
          }
          resolve();
        };
      });
    } catch(e){}
  }
  var player = document.getElementById('featured-video-player');
  if (player) { player.src = videoUrl; setTextById('featured-video-title', hasVideo ? videoTitle : 'Mithila Clay Painting Demo'); }
}

function openLightbox(){
  if (artistPosts.length === 0) return;
  var latestImg = artistPosts[artistPosts.length - 1];
  var modal = document.getElementById('lightbox-modal');
  document.getElementById('lightbox-img').src = latestImg.imgUrl;
  document.getElementById('lightbox-title').textContent = latestImg.title;
  modal.classList.remove('hidden'); modal.classList.add('flex');
}
function closeLightbox(){
  var modal = document.getElementById('lightbox-modal');
  modal.classList.add('hidden'); modal.classList.remove('flex');
}
function toggleShareDropdown(){
  document.getElementById('share-dropdown').classList.toggle('hidden');
}
window.addEventListener('click', function(e){
  var container = document.getElementById('share-dropdown-container');
  if (container && !container.contains(e.target)) document.getElementById('share-dropdown').classList.add('hidden');
});
function shareAction(platform){
  if (!user) return;
  var shareUrl = window.location.origin + '/?artist=' + encodeURIComponent(user.email) + '#portfolio';
  var title = 'Exquisite Heritage Art Portfolio by ' + user.fullName;
  var message = 'Explore my portfolio and masterpieces at The Painted Muse: ' + shareUrl;
  document.getElementById('share-dropdown').classList.add('hidden');
  switch(platform){
    case 'copy': navigator.clipboard.writeText(shareUrl).then(function(){alert('Portfolio link copied!');}); break;
    case 'whatsapp': window.open('https://api.whatsapp.com/send?text='+encodeURIComponent(message),'_blank'); break;
    case 'twitter': window.open('https://twitter.com/intent/tweet?url='+encodeURIComponent(shareUrl)+'&text='+encodeURIComponent(title),'_blank'); break;
    case 'facebook': window.open('https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(shareUrl),'_blank'); break;
  }
}

// ══════════════════════════════════════════
// SETTINGS TAB LOGIC
// ══════════════════════════════════════════
function showSettingsTab(tab){
  document.querySelectorAll('.section-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  var panel = document.getElementById('panel-' + tab);
  var btn = document.getElementById('btn-' + tab);
  if (panel) panel.classList.add('active');
  if (btn) btn.classList.add('active');
}

function loadSettingsProfile(){
  if (!user) return;
  var profileKey = 'artist_profile_' + user.email;
  var stored = localStorage.getItem(profileKey);
  var profileData;
  if (stored) {
    profileData = JSON.parse(stored);
  } else {
    profileData = {
      fullName: user.fullName || "Artist",
      displayName: user.fullName ? user.fullName.split(' ')[0] : "Artist",
      email: user.email || "",
      phone: "+91 98765 43210",
      specialization: user.spec || "Mithila (Madhubani)",
      cityState: "Madhubani, Bihar",
      bio: "Award-winning traditional artist with years of experience.",
      photoUrl: "/pics/logoo.png"
    };
    localStorage.setItem(profileKey, JSON.stringify(profileData));
  }
  var el;
  el=document.getElementById('inp-full-name');if(el)el.value=profileData.fullName||'';
  el=document.getElementById('inp-display-name');if(el)el.value=profileData.displayName||'';
  el=document.getElementById('inp-email');if(el)el.value=profileData.email||'';
  el=document.getElementById('inp-phone');if(el)el.value=profileData.phone||'';
  el=document.getElementById('inp-specialization');if(el)el.value=profileData.specialization||'';
  el=document.getElementById('inp-city-state');if(el)el.value=profileData.cityState||'';
  el=document.getElementById('inp-bio');if(el)el.value=profileData.bio||'';
  el=document.getElementById('profile-header-name');if(el)el.textContent=profileData.fullName;
  el=document.getElementById('profile-header-role');if(el)el.textContent=(profileData.specialization||'Artist')+' \\u2022 Verified';
  el=document.getElementById('profile-img');if(el)el.src=profileData.photoUrl||'/pics/logoo.png';
}

function updateProfilePic(event){
  var file = event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(e){
    var base64Url = e.target.result;
    document.getElementById('profile-img').src = base64Url;
    if (user) {
      var profileKey = 'artist_profile_' + user.email;
      var profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
      profile.photoUrl = base64Url;
      localStorage.setItem(profileKey, JSON.stringify(profile));
    }
  };
  reader.readAsDataURL(file);
}

function saveProfile(){
  if (!user) return;
  var profileKey = 'artist_profile_' + user.email;
  var profile = JSON.parse(localStorage.getItem(profileKey) || '{}');
  profile.fullName = document.getElementById('inp-full-name').value;
  profile.displayName = document.getElementById('inp-display-name').value;
  profile.email = document.getElementById('inp-email').value;
  profile.phone = document.getElementById('inp-phone').value;
  profile.specialization = document.getElementById('inp-specialization').value;
  profile.cityState = document.getElementById('inp-city-state').value;
  profile.bio = document.getElementById('inp-bio').value;
  localStorage.setItem(profileKey, JSON.stringify(profile));
  user.fullName = profile.fullName;
  user.spec = profile.specialization;
  localStorage.setItem('currentUser', JSON.stringify(user));
  var el;
  el=document.getElementById('profile-header-name');if(el)el.textContent=profile.fullName;
  el=document.getElementById('profile-header-role');if(el)el.textContent=(profile.specialization||'Artist')+' \\u2022 Verified';
  var feedback = document.getElementById('save-feedback');
  if (feedback) {
    feedback.classList.remove('opacity-0'); feedback.classList.add('opacity-100');
    setTimeout(function(){ feedback.classList.remove('opacity-100'); feedback.classList.add('opacity-0'); }, 3000);
  }
}

function doLogout(){
  if (confirm('Sign out of your artist studio?')) {
    localStorage.removeItem('artistLoggedIn');
    localStorage.removeItem('artistEmail');
    localStorage.removeItem('currentUser');
    window.location.href = '/signin';
  }
}
<\/script>
<script src="content-loader.js"><\/script>
</body>
</html>`;

fs.writeFileSync(file, content, 'utf8');
console.log('Artist Studio rebuilt successfully!');
console.log('File size:', content.length, 'bytes');
console.log('Total lines:', content.split('\\n').length);
