const fs = require('fs');

const content = fs.readFileSync('views/artist-home.ejs', 'utf8');
const lines = content.split('\n');

// Keep everything up to and including line 938 (the content-loader script)
const keepLines = lines.slice(0, 938);

// Build the clean third script block
const newScript = `
<script>
// SPA Routing Logic
function switchTab(hash) {
    var validTabs = ['home', 'gallery', 'portfolio', 'settings'];
    var tabId = hash.replace('#', '');
    if (!validTabs.includes(tabId)) tabId = 'home';
    
    document.querySelectorAll('.spa-tab').forEach(el => el.classList.remove('active-tab'));
    var targetEl = document.getElementById('tab-' + tabId);
    if(targetEl) targetEl.classList.add('active-tab');
    
    document.querySelectorAll('.sidebar-item').forEach(el => {
        el.classList.remove('active');
        var dataTab = el.getAttribute('data-tab');
        if (dataTab === tabId) {
            el.classList.add('active');
        }
    });
    
    var mainContainer = document.querySelector('main');
    if (mainContainer) mainContainer.scrollTo({ top: 0, behavior: 'smooth' });
}
function handleHashChange() {
    switchTab(window.location.hash);
}
window.addEventListener('hashchange', handleHashChange);
window.addEventListener('DOMContentLoaded', () => {
    handleHashChange();
});

// ── Settings Tab Logic ──
function showTab(tab) {
  document.querySelectorAll('.section-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(b => { b.classList.remove('active'); b.style.background = ''; b.style.color = '' });
  var panelEl = document.getElementById('panel-' + tab);
  var btnEl = document.getElementById('btn-' + tab);
  if (panelEl) panelEl.classList.add('active');
  if (btnEl) btnEl.classList.add('active');
}
var profileLinks = [];
function loadLinks() {
  var _user = JSON.parse(localStorage.getItem('currentUser'));
  if (!_user) return;
  var stored = localStorage.getItem('artist_profile_links_' + _user.email);
  if (stored) {
    profileLinks = JSON.parse(stored);
  } else {
    profileLinks = [
      { title: 'Personal Website', url: 'https://amritaart.com' },
      { title: 'Instagram', url: 'https://instagram.com/amrita_madhubani' }
    ];
    localStorage.setItem('artist_profile_links_' + _user.email, JSON.stringify(profileLinks));
  }
  renderLinks();
}
function renderLinks() {
  var container = document.getElementById('links-container');
  if (!container) return;
  container.innerHTML = '';
  if (profileLinks.length === 0) {
    container.innerHTML = '<p class="text-sm text-on-surface-variant italic py-2">No custom links added yet.</p>';
    return;
  }
  profileLinks.forEach(function(link, idx) {
    var row = document.createElement('div');
    row.className = 'flex items-center justify-between bg-surface-container-lowest border border-outline-variant p-3 rounded-lg gap-4';
    row.innerHTML = '<div class="flex-1 min-w-0"><p class="font-bold text-sm text-on-surface truncate">' + link.title + '</p><a href="' + link.url + '" target="_blank" class="text-xs text-primary truncate block hover:underline">' + link.url + '</a></div><button onclick="deleteLink(' + idx + ')" class="text-error hover:bg-surface-container p-2 rounded-full flex items-center justify-center transition-colors"><span class="material-symbols-outlined text-lg">delete</span></button>';
    container.appendChild(row);
  });
}
function addUrl() {
  var titleInp = document.getElementById('new-link-title');
  var urlInp = document.getElementById('new-link-url');
  if (!titleInp || !urlInp) return;
  var title = titleInp.value.trim();
  var url = urlInp.value.trim();
  if (!title || !url) { alert('Please enter both a title and a URL.'); return; }
  try { new URL(url.startsWith('http') ? url : 'https://' + url); } catch (e) { alert('Please enter a valid URL.'); return; }
  var finalUrl = url.startsWith('http') ? url : 'https://' + url;
  profileLinks.push({ title: title, url: finalUrl });
  titleInp.value = '';
  urlInp.value = '';
  renderLinks();
}
function deleteLink(idx) {
  profileLinks.splice(idx, 1);
  renderLinks();
}
var profileData = {
  fullName: "Amrita Raghavan",
  displayName: "Amrita R.",
  email: "amrita@paintedmuse.com",
  phone: "+91 98765 43210",
  specialization: "Mithila (Madhubani)",
  cityState: "Madhubani, Bihar",
  bio: "Award-winning Madhubani artist with 15+ years of experience bridging traditional Mithila storytelling with contemporary themes.",
  photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIabFTe2elbqNDvSbk_V1qjKt2ZR36xlywpoooykLRM06Bx4qgQMtA_vAVQSPwwIOlQhilO3I3l8qTaxOXZBaJidGkn3-qDuAE8QgQBclDYLggmIPpiMKuj7j5Voj5SbTZTiMSWc88Ak5_fNVoLePxkKFH1hNiBoN1iOvqCXi62Axu2ey4qr0CWLf9teyZ7OR95gBaPm-V66VskTaOTrceZh2kIT-RxkPEtPC3mzD6-4papLrP5Iwhng3fHAd2r3eIH_F3g5mbM60T"
};
function loadProfile() {
  var _user = JSON.parse(localStorage.getItem('currentUser'));
  if (!_user) return;
  var profileKey = 'artist_profile_' + _user.email;
  var stored = localStorage.getItem(profileKey);
  if (stored) {
    profileData = JSON.parse(stored);
  } else {
    profileData = {
      fullName: _user.fullName || "Amrita Raghavan",
      displayName: _user.fullName ? _user.fullName.split(' ')[0] : "Amrita R.",
      email: _user.email || "amrita@paintedmuse.com",
      phone: "+91 98765 43210",
      specialization: _user.spec || "Mithila (Madhubani)",
      cityState: "Madhubani, Bihar",
      bio: "Award-winning traditional artist with years of experience.",
      photoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIabFTe2elbqNDvSbk_V1qjKt2ZR36xlywpoooykLRM06Bx4qgQMtA_vAVQSPwwIOlQhilO3I3l8qTaxOXZBaJidGkn3-qDuAE8QgQBclDYLggmIPpiMKuj7j5Voj5SbTZTiMSWc88Ak5_fNVoLePxkKFH1hNiBoN1iOvqCXi62Axu2ey4qr0CWLf9teyZ7OR95gBaPm-V66VskTaOTrceZh2kIT-RxkPEtPC3mzD6-4papLrP5Iwhng3fHAd2r3eIH_F3g5mbM60T"
    };
    localStorage.setItem(profileKey, JSON.stringify(profileData));
  }
  var el;
  el = document.getElementById('inp-full-name'); if(el) el.value = profileData.fullName;
  el = document.getElementById('inp-display-name'); if(el) el.value = profileData.displayName;
  el = document.getElementById('inp-email'); if(el) el.value = profileData.email;
  el = document.getElementById('inp-phone'); if(el) el.value = profileData.phone;
  el = document.getElementById('inp-specialization'); if(el) el.value = profileData.specialization;
  el = document.getElementById('inp-city-state'); if(el) el.value = profileData.cityState;
  el = document.getElementById('inp-bio'); if(el) el.value = profileData.bio;
  el = document.getElementById('profile-header-name'); if(el) el.textContent = profileData.fullName;
  el = document.getElementById('profile-header-role'); if(el) el.textContent = profileData.specialization + " \\u2022 Verified";
  el = document.getElementById('profile-img'); if(el) el.src = profileData.photoUrl;
}
function updateProfilePic(event) {
  var file = event.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function (e) {
    var base64Url = e.target.result;
    document.getElementById('profile-img').src = base64Url;
    profileData.photoUrl = base64Url;
    var _user = JSON.parse(localStorage.getItem('currentUser'));
    if (_user) {
      var profileKey = 'artist_profile_' + _user.email;
      localStorage.setItem(profileKey, JSON.stringify(profileData));
      var sbImg = document.getElementById('sidebar-img');
      if (sbImg) sbImg.src = base64Url;
    }
  };
  reader.readAsDataURL(file);
}
function saveProfile() {
  var _user = JSON.parse(localStorage.getItem('currentUser'));
  if (!_user) return;
  var profileKey = 'artist_profile_' + _user.email;
  localStorage.setItem('artist_profile_links_' + _user.email, JSON.stringify(profileLinks));
  profileData.fullName = document.getElementById('inp-full-name').value;
  profileData.displayName = document.getElementById('inp-display-name').value;
  profileData.email = document.getElementById('inp-email').value;
  profileData.phone = document.getElementById('inp-phone').value;
  profileData.specialization = document.getElementById('inp-specialization').value;
  profileData.cityState = document.getElementById('inp-city-state').value;
  profileData.bio = document.getElementById('inp-bio').value;
  localStorage.setItem(profileKey, JSON.stringify(profileData));
  _user.fullName = profileData.fullName;
  _user.spec = profileData.specialization;
  localStorage.setItem('currentUser', JSON.stringify(_user));
  var el;
  el = document.getElementById('profile-header-name'); if(el) el.textContent = profileData.fullName;
  el = document.getElementById('profile-header-role'); if(el) el.textContent = profileData.specialization + " \\u2022 Verified";
  var feedback = document.getElementById('save-feedback');
  if (feedback) {
    feedback.classList.remove('opacity-0');
    feedback.classList.add('opacity-100');
    setTimeout(function() { feedback.classList.remove('opacity-100'); feedback.classList.add('opacity-0'); }, 3000);
  }
}
function logout() {
  if (confirm('Sign out of your studio?')) {
    localStorage.removeItem('artistLoggedIn');
    localStorage.removeItem('artistEmail');
    localStorage.removeItem('currentUser');
    window.location.href = '/';
  }
}

// ── Gallery Tab Logic ──
function switchMedia(type) {
  document.querySelectorAll('.media-tab').forEach(function(t) { t.classList.remove('active'); });
  document.querySelectorAll('.media-grid').forEach(function(g) { g.classList.remove('active'); });
  var tabEl = document.getElementById('media-tab-' + type);
  var gridEl = document.getElementById('grid-' + type);
  if (tabEl) tabEl.classList.add('active');
  if (gridEl) gridEl.classList.add('active');
}
function openPreview(url, type, title) {
  var modal = document.getElementById('gallery-preview-modal');
  var mImg = document.getElementById('modal-img');
  var mVid = document.getElementById('modal-vid');
  document.getElementById('modal-title').textContent = title;
  if (type === 'image') {
    mImg.src = url; mImg.classList.remove('hidden'); mVid.classList.add('hidden'); mVid.pause();
  } else {
    mVid.src = url; mVid.classList.remove('hidden'); mImg.classList.add('hidden');
  }
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
function closePreview() {
  var modal = document.getElementById('gallery-preview-modal');
  modal.classList.add('hidden');
  modal.classList.remove('flex');
  var mVid = document.getElementById('modal-vid');
  if (mVid) mVid.pause();
}
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') { closePreview(); closeEditModal(); }
});

var defaultPosts = [
  { title: 'Eternal Echoes', category: 'Madhubani', dimensions: '24\\u00d736 in', price: 18000, status: 'Available', imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N' },
  { title: 'Tree of Life', category: 'Madhubani', dimensions: '30\\u00d740 in', price: 24500, status: 'Available', imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE85tliyBtatM4Sf9CGMCkZrJLQbMkAvenwVo9STCUkhlAfIfFaU5PR6Y48rZ-4KuIoI4eJK09WtYLHNewz2WrIJDF7vSM-QmXbO-njNqxgped5JbFyOnwVHgsDWZQERAp-dpFK6R30NrvKIMYqnkpxBetfDPqAHpWry3YDm8YSkPQM-KnvLHPRK0yBW8Y4uRF9NOADCjtyLuP8ZjuNSGP2x2zmQmYzZS3FzJ2_Td2xvEs6udYptzb_3IbEQmsQO6uBrO3MZdbXeua' },
  { title: 'Lotus Dreams', category: 'Madhubani', dimensions: '18\\u00d724 in', price: 12000, status: 'Sold', imgUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N' }
];
var defaultReels = [
  { title: 'Making of Eternal Echoes', videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N' },
  { title: 'Madhubani Brush Techniques', videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE85tliyBtatM4Sf9CGMCkZrJLQbMkAvenwVo9STCUkhlAfIfFaU5PR6Y48rZ-4KuIoI4eJK09WtYLHNewz2WrIJDF7vSM-QmXbO-njNqxgped5JbFyOnwVHgsDWZQERAp-dpFK6R30NrvKIMYqnkpxBetfDPqAHpWry3YDm8YSkPQM-KnvLHPRK0yBW8Y4uRF9NOADCjtyLuP8ZjuNSGP2x2zmQmYzZS3FzJ2_Td2xvEs6udYptzb_3IbEQmsQO6uBrO3MZdbXeua' },
  { title: 'Studio Tour', videoUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtntfX-Ln9Zw1VZ0Hpkb2gPLxVGo-8i2HCOQq8MuDWfMJ2R8rgP_bq6LuBgIgo3JgCiAL1gf7XMnMQnarbhaXApQCbdgiH5J6IEDNWep-L2TYfsPvnDvypEd-aqOQD1Cja_lGLbojN9phmbZ6mwRBP9PEOFZcjvFm_WXH7XdrbwO0pOyT242yuLXNIchrOTtBgei5F4QraRKm3KIVqWxT6AX6MpcVZgTW8r293ODOFXu-5fLVr9dMl3bbcU4vwotycF13aX7JWcw0N' }
];

async function initMedia() {
  if (!user) { return; }
  var postsKey = 'artist_posts_' + user.email;
  var postsStored = localStorage.getItem(postsKey);
  if (postsStored) { artistPosts = JSON.parse(postsStored); }
  else {
    if (user.isNewUser) { artistPosts = []; }
    else { artistPosts = defaultPosts; localStorage.setItem(postsKey, JSON.stringify(artistPosts)); }
  }
  try {
    await initDB();
    var transaction = db.transaction([storeName], "readonly");
    var store = transaction.objectStore(storeName);
    var request = store.getAll();
    request.onsuccess = function() {
      var allReels = request.result || [];
      artistReels = allReels.filter(function(r) { return r.userEmail === user.email; });
      if (artistReels.length === 0 && !user.isNewUser) { artistReels = defaultReels; }
      renderGrids();
    };
  } catch (err) {
    console.error("IDB Init failed:", err);
    artistReels = user.isNewUser ? [] : defaultReels;
    renderGrids();
  }
}

function renderGrids() {
  var countEl = document.getElementById('gallery-count');
  if (countEl) countEl.textContent = artistPosts.length + ' posts and ' + artistReels.length + ' reels in your collection';
  var gridPosts = document.getElementById('grid-posts');
  if (!gridPosts) return;
  gridPosts.innerHTML = '';
  artistPosts.forEach(function(post, idx) {
    var isSold = post.status === 'Sold';
    var postDiv = document.createElement('div');
    postDiv.className = 'bg-surface-container-lowest border border-outline-variant rounded-xl group cursor-pointer hover:shadow-lg transition-all overflow-hidden flex flex-col';
    postDiv.onclick = function() { openPreview(post.imgUrl, 'image', post.title); };
    postDiv.innerHTML = '<div class="aspect-square bg-surface-variant overflow-hidden relative"><img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ' + (isSold ? 'grayscale-[30%]' : '') + '" src="' + post.imgUrl + '" onerror="this.src=\\'https://placehold.co/600x600/F5F0E8/B5451B?text=Artwork+Preview\\'"/><span class="absolute top-2 right-2 ' + (isSold ? 'bg-on-surface text-surface' : 'bg-green-700 text-white') + ' text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">' + post.status + '</span></div><div class="p-3 flex-1 flex flex-col justify-between"><div><h4 class="font-headline-md text-sm mb-0.5 truncate">' + post.title + '</h4><p class="text-[10px] text-on-surface-variant mb-1">' + (post.category || 'Mithila') + ' \\u2022 ' + (post.dimensions || 'Custom Size') + '</p></div><div class="flex justify-between items-center mt-2 pt-2 border-t border-outline-variant/30"><span class="' + (isSold ? 'text-on-surface-variant line-through' : 'text-primary') + ' font-bold text-xs">\\u20b9' + Number(post.price).toLocaleString() + '</span><div class="flex gap-2 items-center text-[10px]"><button onclick="event.stopPropagation(); triggerEdit(\\'post\\', ' + idx + ')" class="hover:text-primary font-bold flex items-center gap-0.5 transition-colors"><span class="material-symbols-outlined text-xs">edit</span>Edit</button><button onclick="event.stopPropagation(); triggerDelete(\\'post\\', ' + idx + ')" class="hover:text-error font-bold flex items-center gap-0.5 transition-colors"><span class="material-symbols-outlined text-xs">delete</span>Delete</button></div></div></div>';
    gridPosts.appendChild(postDiv);
  });
  var uploadPostTrigger = document.createElement('div');
  uploadPostTrigger.onclick = function() { window.location.hash = '#home'; };
  uploadPostTrigger.className = 'bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center aspect-square cursor-pointer hover:border-primary transition-colors group';
  uploadPostTrigger.innerHTML = '<span class="material-symbols-outlined text-outline-variant text-4xl group-hover:text-primary transition-colors mb-2">add_photo_alternate</span><p class="font-body-md text-on-surface-variant text-xs group-hover:text-primary transition-colors">Upload Art</p>';
  gridPosts.appendChild(uploadPostTrigger);

  var gridReels = document.getElementById('grid-reels');
  if (!gridReels) return;
  gridReels.innerHTML = '';
  artistReels.forEach(function(reel, idx) {
    var reelUrl = reel.file ? URL.createObjectURL(reel.file) : reel.videoUrl;
    var reelDiv = document.createElement('div');
    reelDiv.className = 'bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden group cursor-pointer hover:shadow-lg transition-all relative aspect-[9/16]';
    reelDiv.onclick = function() { openPreview(reelUrl, 'video', reel.title); };
    reelDiv.innerHTML = '<div class="w-full h-full relative overflow-hidden">' + (reel.file ? '<video class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" src="' + reelUrl + '#t=0.1" muted></video>' : '<img class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src="' + reel.videoUrl + '" onerror="this.src=\\'https://placehold.co/400x711/F5F0E8/B5451B?text=Reel+Preview\\'"/>') + '<div class="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent"></div><div class="absolute top-2 left-2 flex gap-1.5 z-10"><button onclick="event.stopPropagation(); triggerEdit(\\'reel\\', ' + idx + ')" class="size-7 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors shadow-md"><span class="material-symbols-outlined text-xs">edit</span></button><button onclick="event.stopPropagation(); triggerDelete(\\'reel\\', ' + idx + ')" class="size-7 bg-black/60 hover:bg-error text-white rounded-full flex items-center justify-center transition-colors shadow-md"><span class="material-symbols-outlined text-xs">delete</span></button></div><div class="absolute bottom-3 left-2 right-2"><p class="text-white text-[10px] font-bold truncate">' + reel.title + '</p></div><span class="absolute top-2 right-2 material-symbols-outlined text-white text-lg">play_circle</span></div>';
    gridReels.appendChild(reelDiv);
  });
  var uploadReelTrigger = document.createElement('div');
  uploadReelTrigger.onclick = function() { window.location.hash = '#home'; };
  uploadReelTrigger.className = 'bg-surface-container-lowest border-2 border-dashed border-outline-variant rounded-xl flex flex-col items-center justify-center aspect-[9/16] cursor-pointer hover:border-primary transition-colors group';
  uploadReelTrigger.innerHTML = '<span class="material-symbols-outlined text-outline-variant text-4xl group-hover:text-primary transition-colors mb-2">video_call</span><p class="font-body-md text-on-surface-variant group-hover:text-primary transition-colors text-xs">New Reel</p>';
  gridReels.appendChild(uploadReelTrigger);
}

function triggerEdit(type, idx) {
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
  modal.classList.remove('hidden');
  modal.classList.add('flex');
}
function closeEditModal() {
  var modal = document.getElementById('gallery-edit-modal');
  if (modal) { modal.classList.add('hidden'); modal.classList.remove('flex'); }
}
function saveEdit(e) {
  e.preventDefault();
  var type = document.getElementById('edit-item-type').value;
  var idx = parseInt(document.getElementById('edit-item-idx').value);
  if (type === 'post') {
    artistPosts[idx].title = document.getElementById('edit-title').value;
    artistPosts[idx].category = document.getElementById('edit-category').value;
    artistPosts[idx].dimensions = document.getElementById('edit-dimensions').value;
    artistPosts[idx].price = parseFloat(document.getElementById('edit-price').value) || 0;
    artistPosts[idx].status = document.getElementById('edit-status').value;
    if (user) { localStorage.setItem('artist_posts_' + user.email, JSON.stringify(artistPosts)); }
  } else {
    artistReels[idx].title = document.getElementById('edit-title').value;
    if (artistReels[idx].id) {
      var transaction = db.transaction([storeName], "readwrite");
      transaction.objectStore(storeName).put(artistReels[idx]);
    }
  }
  closeEditModal();
  renderGrids();
}
function triggerDelete(type, idx) {
  var confirmed = confirm('Are you sure you want to delete this ' + (type === 'post' ? 'artwork post' : 'reel') + '?');
  if (!confirmed) return;
  if (type === 'post') {
    artistPosts.splice(idx, 1);
    if (user) { localStorage.setItem('artist_posts_' + user.email, JSON.stringify(artistPosts)); }
    renderGrids();
  } else {
    var reel = artistReels[idx];
    if (reel.id) {
      var transaction = db.transaction([storeName], "readwrite");
      var request = transaction.objectStore(storeName).delete(reel.id);
      request.onsuccess = function() { artistReels.splice(idx, 1); renderGrids(); };
    } else {
      artistReels.splice(idx, 1);
      renderGrids();
    }
  }
}
document.addEventListener('DOMContentLoaded', function() {
  initMedia();
  loadLinks();
  loadProfile();
});
<\/script>

<\/body>
<\/html>
`;

const newContent = keepLines.join('\n') + '\n' + newScript;
fs.writeFileSync('views/artist-home.ejs', newContent, 'utf8');
console.log('Rebuilt artist-home.ejs successfully!');
console.log('Total lines:', newContent.split('\n').length);
