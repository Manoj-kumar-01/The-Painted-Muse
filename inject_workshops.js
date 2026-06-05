const fs = require('fs');
let content = fs.readFileSync('views/admin-dashboard.ejs', 'utf-8');

const workshopHtml = `
<div id="view-workshops" class="view-section space-y-6">
<div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
<div>
<h1 class="text-3xl font-serif font-bold text-ink flex items-center gap-3">
<i data-lucide="calendar" class="w-7 h-7 text-saffron-dark"></i> Workshop Management
</h1>
<p class="text-ink-muted text-sm mt-1">Manage art retreats, events, and immersive workshops</p>
</div>
<button onclick="toggleAddWorkshopForm()" class="whitespace-nowrap px-4 py-2 bg-ink hover:bg-[#B5451B] text-[#FDFBF7] font-semibold text-sm rounded-xl transition-smooth flex items-center gap-1.5 shadow-soft">
<i data-lucide="plus" class="w-4 h-4"></i> Add Workshop
</button>
</div>

<!-- Add Workshop Form -->
<div id="add-workshop-form-container" class="hidden bg-bg border border-ink/10 rounded-2xl p-6 shadow-medium transition-smooth">
<h3 class="text-lg font-serif font-bold text-ink mb-4 flex items-center gap-2">
<i data-lucide="calendar-plus" class="w-5 h-5 text-saffron-dark"></i> Add New Workshop
</h3>
<form id="add-workshop-form" onsubmit="saveNewWorkshop(event)" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
<div class="flex flex-col gap-1">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Title</label>
<input type="text" id="new-ws-title" placeholder="e.g. Mithila Canvas Masterclass" required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark" />
</div>
<div class="flex flex-col gap-1">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Location</label>
<input type="text" id="new-ws-location" placeholder="e.g. Jaipur" required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark" />
</div>
<div class="flex flex-col gap-1">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Price (₹)</label>
<input type="number" id="new-ws-price" placeholder="e.g. 18000" required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark" />
</div>
<div class="flex flex-col gap-1">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Start Date</label>
<input type="text" id="new-ws-date" placeholder="e.g. Aug 12-15, 2026" required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark" />
</div>
<div class="flex flex-col gap-1">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Duration</label>
<input type="text" id="new-ws-duration" placeholder="e.g. 4 Days" required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark" />
</div>
<div class="flex flex-col gap-1">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Seats Available</label>
<input type="text" id="new-ws-seats" placeholder="e.g. 12 Seats Left" required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark" />
</div>
<div class="flex flex-col gap-1 lg:col-span-3">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Image URL</label>
<input type="text" id="new-ws-img" placeholder="e.g. https://images.unsplash.com/..." required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark" />
</div>
<div class="flex flex-col gap-1 lg:col-span-3">
<label class="text-xs font-semibold text-ink-muted uppercase tracking-wider">Description</label>
<textarea id="new-ws-desc" rows="3" required class="bg-bg border border-ink/20 rounded-xl px-3 py-2 text-sm focus:border-saffron-dark focus:ring-1 focus:ring-saffron-dark"></textarea>
</div>
<div class="lg:col-span-3 flex justify-end gap-2 mt-2">
<button type="button" onclick="toggleAddWorkshopForm()" class="px-4 py-2 border border-ink/20 text-ink-muted rounded-xl hover:bg-cream/50 transition-smooth text-sm font-semibold">Cancel</button>
<button type="submit" class="px-5 py-2 bg-ink text-white hover:bg-saffron-dark rounded-xl transition-smooth text-sm font-semibold">Save Workshop</button>
</div>
</form>
</div>
<div class="space-y-3" id="workshop-list-container">
</div>
</div>
`;

const workshopJs = `
<script>
let workshopsData = [];

function toggleAddWorkshopForm() {
    const formContainer = document.getElementById('add-workshop-form-container');
    if (formContainer.classList.contains('hidden')) {
        formContainer.classList.remove('hidden');
    } else {
        formContainer.classList.add('hidden');
        document.getElementById('add-workshop-form').reset();
    }
}

async function fetchWorkshops() {
    try {
        const res = await fetch('/api/admin/workshops');
        const data = await res.json();
        if (data.success) {
            workshopsData = data.workshops;
            renderWorkshops();
        }
    } catch (e) {
        console.error(e);
    }
}

function renderWorkshops() {
    const container = document.getElementById('workshop-list-container');
    if (!container) return;
    
    if (workshopsData.length === 0) {
        container.innerHTML = '<div class="p-8 text-center text-ink-muted bg-bg rounded-2xl border border-ink/10">No workshops found. Create one.</div>';
        return;
    }
    
    container.innerHTML = workshopsData.map(ws => \`
        <div class="bg-bg rounded-2xl border border-ink/10 p-5 flex flex-col md:flex-row items-center gap-6 shadow-soft hover:shadow-medium transition-smooth">
            <div class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border border-ink/10">
                <img src="\${ws.imageUrl}" class="w-full h-full object-cover">
            </div>
            <div class="flex-1 min-w-0">
                <h4 class="text-lg font-serif font-bold text-ink mb-1 truncate">\${ws.title}</h4>
                <div class="flex flex-wrap gap-4 text-xs font-medium text-ink-muted mb-2">
                    <span class="flex items-center gap-1"><i data-lucide="map-pin" class="w-3.5 h-3.5"></i> \${ws.location}</span>
                    <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i> \${ws.startDate}</span>
                    <span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i> \${ws.duration}</span>
                </div>
                <p class="text-sm text-ink/70 line-clamp-2">\${ws.description}</p>
            </div>
            <div class="flex flex-col items-end gap-3 flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <div class="text-lg font-bold text-saffron-dark">₹\${ws.price}</div>
                <button onclick="deleteWorkshop('\${ws._id}')" class="px-4 py-2 border border-destructive/20 text-destructive hover:bg-destructive/10 rounded-xl text-xs font-semibold transition-smooth flex items-center gap-1.5">
                    <i data-lucide="trash-2" class="w-4 h-4"></i> Delete
                </button>
            </div>
        </div>
    \`).join('');
    
    // Re-initialize lucide icons for new content
    if(typeof lucide !== 'undefined') lucide.createIcons();
}

async function saveNewWorkshop(e) {
    e.preventDefault();
    const payload = {
        title: document.getElementById('new-ws-title').value,
        description: document.getElementById('new-ws-desc').value,
        price: document.getElementById('new-ws-price').value,
        startDate: document.getElementById('new-ws-date').value,
        duration: document.getElementById('new-ws-duration').value,
        seatsAvailable: document.getElementById('new-ws-seats').value,
        location: document.getElementById('new-ws-location').value,
        imageUrl: document.getElementById('new-ws-img').value,
    };
    
    try {
        const res = await fetch('/api/admin/workshops', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(payload)
        });
        const data = await res.json();
        if (data.success) {
            toggleAddWorkshopForm();
            fetchWorkshops();
            alert('Workshop created successfully!');
        } else {
            alert('Failed to create workshop');
        }
    } catch(e) {
        console.error(e);
        alert('Server error');
    }
}

async function deleteWorkshop(id) {
    if(!confirm('Delete this workshop?')) return;
    try {
        const res = await fetch(\`/api/admin/workshops/\${id}\`, { method: 'DELETE' });
        const data = await res.json();
        if (data.success) {
            fetchWorkshops();
        } else {
            alert('Failed to delete');
        }
    } catch(e) {
        console.error(e);
        alert('Server error');
    }
}

// Hook into existing switchView logic to fetch workshops when tab is clicked
const originalSwitchView = window.switchView;
window.switchView = function(viewId) {
    if (viewId === 'workshops') {
        fetchWorkshops();
    }
    if (typeof originalSwitchView === 'function') {
        originalSwitchView(viewId);
    } else {
        document.querySelectorAll('.view-section').forEach(el => el.classList.remove('active'));
        document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active', 'bg-cream', 'text-ink'));
        
        const targetView = document.getElementById('view-' + viewId);
        if (targetView) targetView.classList.add('active');
        
        const btn = document.querySelector(\`button[onclick="switchView('\${viewId}')"]\`);
        if (btn) btn.classList.add('active', 'bg-cream', 'text-ink');
    }
};

// Initial fetch if active view is workshops (unlikely, but safe)
document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.nav-item.active[onclick*="workshops"]')) {
        fetchWorkshops();
    }
});
</script>
`;

content = content.replace('</main>', workshopHtml + '\n</main>');
content = content.replace('</body>', workshopJs + '\n</body>');
fs.writeFileSync('views/admin-dashboard.ejs', content);
console.log('Successfully injected Workshop code into admin-dashboard.ejs');
