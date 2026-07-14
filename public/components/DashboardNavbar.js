/**
 * DashboardNavbar.js — Unified top navigation for Dashboard portals
 * native Custom Web Component (<dashboard-navbar>)
 */
class DashboardNavbar extends HTMLElement {
  connectedCallback() {
    const type = this.getAttribute('type') || 'user';
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    
    // Auth Check
    if (type === 'artist' && localStorage.getItem('artistLoggedIn') !== 'true') {
      window.location.href = '/signin';
      return;
    }
    if (type === 'user' && localStorage.getItem('userLoggedIn') !== 'true') {
      window.location.href = '/user-signin';
      return;
    }

    const currentPath = window.location.pathname.split('/').pop() || '';

    // Artist Active States
    const isArtistOverview = currentPath.includes('artist-home');
    const isArtistGallery = currentPath.includes('artist-gallery');
    const isArtistPortfolio = currentPath.includes('artist-portfolio');
    const isArtistSettings = currentPath.includes('artist-settings');
    const isArtistMessages = currentPath.includes('artist-messages');

    // User Active States
    const isOverview = currentPath === 'dashboard' || currentPath === '';
    const isArts = currentPath === 'dashboard-arts';
    const isArtists = currentPath === 'dashboard-artists';
    const isCommissions = currentPath === 'dashboard-commissions';
    const isWorkshops = currentPath === 'dashboard-workshops';
    const isMessages = currentPath === 'dashboard-messages';

    let profileName, profileImg, logoutAction, menuHtml, mobileMenuHtml;

    if (type === 'artist') {
      profileName = currentUser.fullName || 'Artist';
      profileImg = 'pics/user_profile.png';
      logoutAction = 'DashboardNavbar.logoutArtist()';

      if (currentUser.email) {
        const storedProfile = localStorage.getItem('artist_profile_' + currentUser.email);
        if (storedProfile) {
          try {
            const profile = JSON.parse(storedProfile);
            if (profile.displayName) profileName = profile.displayName;
            if (profile.photoUrl) profileImg = profile.photoUrl;
          } catch(e) {}
        }
      }

      menuHtml = `
        <div class="hidden lg:flex items-center gap-6">
          <a href="/artist-home" class="${isArtistOverview ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Home</a>
          <a href="/artist-gallery" class="${isArtistGallery ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Gallery</a>
          <a href="/artist-portfolio" class="${isArtistPortfolio ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Portfolio</a>
          <a href="/artist-messages" class="${isArtistMessages ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Messages</a>
          <a href="/artist-settings" class="${isArtistSettings ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Settings</a>
        </div>
      `;

      mobileMenuHtml = `
        <div class="flex flex-col gap-6 p-8">
          <a href="/artist-home" class="${isArtistOverview ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Home</a>
          <a href="/artist-gallery" class="${isArtistGallery ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Gallery</a>
          <a href="/artist-portfolio" class="${isArtistPortfolio ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Portfolio</a>
          <a href="/artist-messages" class="${isArtistMessages ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Messages</a>
          <a href="/artist-settings" class="${isArtistSettings ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Settings</a>
        </div>
      `;

    } else {
      profileName = currentUser.fullName || 'Collector';
      profileImg = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';
      logoutAction = 'DashboardNavbar.logoutUser()';

      menuHtml = `
        <div class="hidden lg:flex items-center gap-6">
          <a href="/dashboard" class="${isOverview ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Overview</a>
          <a href="/dashboard-arts" class="${isArts ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Arts</a>
          <a href="/dashboard-artists" class="${isArtists ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Meet Masters</a>
          <a href="/dashboard-commissions" class="${isCommissions ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Commissions</a>
          <a href="/dashboard-workshops" class="${isWorkshops ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Workshops</a>
          <a href="/dashboard-messages" class="${isMessages ? 'text-[#B5451B] font-bold border-b-2 border-[#B5451B]' : 'text-stone-600 hover:text-[#B5451B] font-medium'} pb-1 transition-all text-sm uppercase tracking-widest">Messages</a>
        </div>
      `;

      mobileMenuHtml = `
        <div class="flex flex-col gap-6 p-8">
          <a href="/dashboard" class="${isOverview ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Overview</a>
          <a href="/dashboard-arts" class="${isArts ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Arts</a>
          <a href="/dashboard-artists" class="${isArtists ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Meet Masters</a>
          <a href="/dashboard-commissions" class="${isCommissions ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Commissions</a>
          <a href="/dashboard-workshops" class="${isWorkshops ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Workshops</a>
          <a href="/dashboard-messages" class="${isMessages ? 'text-[#B5451B] font-bold' : 'text-stone-600'} text-lg uppercase tracking-widest">Messages</a>
        </div>
      `;
    }

    this.innerHTML = `
      <header class="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-stone-200/50 shadow-sm w-full">
        <div class="max-w-7xl mx-auto px-6 lg:px-10 py-3 flex items-center justify-between">
          <!-- Logo -->
          <a href="/" class="flex items-center gap-3 shrink-0">
            <img src="/pics/logoo.png" alt="The Painted Muse" class="h-12 w-auto object-contain" />
          </a>

          <!-- Desktop Navigation -->
          ${menuHtml}

          <!-- Desktop Profile & Actions -->
          <div class="hidden lg:flex items-center gap-5">
            <button onclick="window.location.href='/${type === 'artist' ? 'artist-messages' : 'dashboard-messages'}'" class="relative text-stone-500 hover:text-[#B5451B] transition-colors group">
                <span class="material-symbols-outlined">notifications</span>
                <span id="nav-notification-badge" data-count="0" class="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#B5451B] text-white text-[9px] font-bold rounded-full flex items-center justify-center hidden shadow-sm group-hover:scale-110 transition-transform">0</span>
            </button>
            <div class="flex items-center gap-3 border-l border-stone-200 pl-5">
              <div class="w-10 h-10 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shadow-sm">
                <img src="${profileImg}" alt="Profile" class="w-full h-full object-cover">
              </div>
              <div class="flex flex-col">
                <span class="text-sm font-bold text-stone-900">${profileName}</span>
                <button onclick="${logoutAction}" class="text-[10px] text-stone-400 hover:text-red-500 uppercase tracking-widest font-bold text-left transition-colors">Sign Out</button>
              </div>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button id="mobile-dashboard-menu-btn" class="lg:hidden text-stone-900 p-2">
            <span class="material-symbols-outlined text-3xl">menu</span>
          </button>
        </div>

        <!-- Mobile Menu Drawer -->
        <div id="mobile-dashboard-menu" class="fixed inset-0 z-[100] bg-white translate-x-full transition-transform duration-500 lg:hidden flex flex-col h-screen">
          <div class="flex justify-between items-center p-6 border-b border-stone-100 bg-stone-50">
            <img src="/pics/logoo.png" alt="The Painted Muse Logo" class="h-10 w-auto object-contain" />
            <button id="close-dashboard-menu-btn" class="text-stone-900 p-2 bg-white rounded-full shadow-sm">
              <span class="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>
          
          <div class="flex-1 overflow-y-auto">
            ${mobileMenuHtml}
          </div>

          <div class="p-6 border-t border-stone-100 bg-stone-50">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37]/50 shadow-sm">
                <img src="${profileImg}" alt="Profile" class="w-full h-full object-cover">
              </div>
              <div class="flex flex-col">
                <span class="text-base font-bold text-stone-900">${profileName}</span>
                <span class="text-[10px] text-stone-500 uppercase tracking-widest">${type === 'artist' ? 'Artist Studio' : 'Collector Portal'}</span>
              </div>
            </div>
            <button onclick="${logoutAction}" class="w-full py-4 rounded-xl border border-stone-300 text-stone-700 hover:bg-stone-100 hover:text-red-600 font-bold uppercase tracking-widest text-xs transition-colors flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-sm">logout</span> Sign Out
            </button>
          </div>
        </div>
      </header>
    `;

    // Mobile Menu Toggle
    const mobileBtn = this.querySelector('#mobile-dashboard-menu-btn');
    const closeBtn = this.querySelector('#close-dashboard-menu-btn');
    const mobileMenu = this.querySelector('#mobile-dashboard-menu');

    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.remove('translate-x-full');
      });
    }

    if (closeBtn && mobileMenu) {
      closeBtn.addEventListener('click', () => {
        mobileMenu.classList.add('translate-x-full');
      });
    }

    // Initialize real-time notifications
    this.initNotifications();
  }

  async initNotifications() {
    try {
      // 1. Fetch unread count
      const res = await fetch('/api/chat/unread-count');
      const data = await res.json();
      if (data.success) {
        this.updateBadge(data.count || 0);
      }

      // 2. Load Socket.IO if not already loaded
      if (typeof io === 'undefined') {
        const script = document.createElement('script');
        script.src = '/socket.io/socket.io.js';
        script.onload = () => this.setupSocket();
        document.head.appendChild(script);
      } else {
        this.setupSocket();
      }
    } catch(e) {
      console.error('Notification init error', e);
    }
  }

  updateBadge(count) {
    const badge = this.querySelector('#nav-notification-badge');
    if (!badge) return;
    
    let currentCount = parseInt(badge.dataset.count || '0');
    if (count !== undefined) {
       currentCount = count;
    } else {
       currentCount += 1;
    }
    
    badge.dataset.count = currentCount;
    badge.textContent = currentCount > 99 ? '99+' : currentCount;
    
    if (currentCount > 0) {
      badge.classList.remove('hidden');
    } else {
      badge.classList.add('hidden');
    }
  }

  setupSocket() {
    const socket = io();
    socket.on('newMessage', (msg) => {
      const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      // If we sent the message, don't alert
      if (msg.senderId === currentUser._id || msg.senderId === currentUser.id) return;

      this.updateBadge();
      this.showToast('New message from ' + (msg.senderModel === 'Artist' ? 'an Artist' : 'a Collector'));
    });

    // Handle Back-Forward Cache (bfcache) to prevent websocket errors
    window.addEventListener('pagehide', () => {
      socket.disconnect();
    });
    window.addEventListener('pageshow', (e) => {
      if (e.persisted) {
        socket.connect();
      }
    });
  }

  showToast(message) {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-3';
      document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'bg-white border border-stone-200 shadow-xl rounded-xl p-4 flex items-center gap-4 transform translate-y-10 opacity-0 transition-all duration-300';
    toast.innerHTML = `
      <div class="w-10 h-10 bg-[#D4AF37]/20 text-[#D4AF37] rounded-full flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined">forum</span>
      </div>
      <div>
        <p class="text-sm font-bold text-stone-900">${message}</p>
        <p class="text-[10px] text-stone-500 uppercase tracking-widest mt-1 text-left">Check your inbox</p>
      </div>
    `;
    
    container.appendChild(toast);
    
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-10', 'opacity-0');
    });
    
    setTimeout(() => {
      toast.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => toast.remove(), 300);
    }, 5000);
  }

  static logoutArtist() {
    if (confirm('Sign out of your artist studio?')) {
      fetch('/auth/logout', { method: 'POST' })
        .finally(() => {
          localStorage.removeItem('artistLoggedIn');
          localStorage.removeItem('artistEmail');
          localStorage.removeItem('currentUser');
          window.location.href = '/signin';
        });
    }
  }

  static logoutUser() {
    if (confirm('Sign out of your art collector account?')) {
      fetch('/auth/logout', { method: 'POST' })
        .finally(() => {
          localStorage.removeItem('userLoggedIn');
          localStorage.removeItem('userEmail');
          localStorage.removeItem('currentUser');
          window.location.href = '/user-signin';
        });
    }
  }
}

customElements.define('dashboard-navbar', DashboardNavbar);

// Expose logout actions to global window for inline onclick handlers
window.DashboardNavbar = DashboardNavbar;
window.artistLogout = DashboardNavbar.logoutArtist;
window.userLogout = DashboardNavbar.logoutUser;
