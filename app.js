// ==========================================
// 1. DATA STORE (Official Launch & Articles)
// ==========================================

const articlesData = [
  {
    id: 1,
    category: "hukum",
    categoryLabel: "PENGENALAN & MANIFESTO",
    title: "Mengenal VIRAL FOR JUSTICE: Platform Jurnalisme Advokasi, Whistleblower, dan Pengawalan Keadilan Publik",
    excerpt: "Viral For Justice hadir sebagai wadah independen untuk menjembatani suara korban ketidakadilan, membongkar kebenaran melalui investigasi berbasis bukti, dan mengawal proses hukum bersama jutaan warganet secara transparan.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=1200&q=80",
    author: "Dewan Redaksi Viral For Justice",
    date: "21 Agustus 2026",
    timeAgo: "Baru Saja",
    readTime: "4 Menit Baca",
    viralScore: "100% Verifikasi",
    shares: 0,
    supports: 0,
    isVerified: true,
    urgency: "Manifesto Resmi",
    content: `
      <p class="lead"><strong>SURABAYA</strong> — Selamat datang di <strong>VIRAL FOR JUSTICE</strong>. Platform ini didirikan atas sebuah kesadaran bersama: bahwa di era digital saat ini, keterbukaan informasi dan solidaritas publik adalah pilar terkuat dalam menuntut kepastian hukum yang adil dan transparan bagi seluruh lapisan masyarakat.</p>
      
      <h3>Mengapa Viral For Justice Lahir?</h3>
      <p>Kita sering mendengar fenomena <em>"No Viral, No Justice"</em> — ketika suatu ketidakadilan, perampasan hak, atau tindak pidana baru mendapat atensi serius dari aparat penegak hukum setelah menjadi perbincangan luas di media sosial. Namun, viralisasi di media sosial sering kali simpang siur, rawan disusupi disinformasi (hoaks), dan kerap mereda begitu saja sebelum keadilan benar-benar tercapai.</p>
      
      <p><strong>Viral For Justice hadir untuk mengubah fenomena tersebut menjadi kekuatan advokasi hukum yang terstruktur, berbasis data, dan terverifikasi secara jurnalistik.</strong></p>

      <div class="evidence-quote-box">
        <strong><i class="fa-solid fa-scale-balanced"></i> MANIFESTO KAMI:</strong>
        "Kami percaya bahwa keadilan tidak boleh hanya milik mereka yang berkuasa atau berduit. Setiap warga berhak atas perlindungan hukum, dan setiap suara yang tertindas berhak untuk didengar dan dikawal bersama."
      </div>

      <h3>3 Pilar Utama Platform Viral For Justice:</h3>
      
      <div class="case-timeline-flow">
        <div class="timeline-entry">
          <div class="timeline-date">Pilar 01</div>
          <div class="timeline-title">Whistleblower & Pelaporan Masyarakat yang Aman</div>
          <p class="text-sm text-muted">Masyarakat, saksi, dan korban dapat mengirimkan bukti dokumen, video, atau rekaman secara <strong>100% Anonim dan Terenkripsi</strong> tanpa rasa takut terhadap ancaman kriminalisasi.</p>
        </div>
        <div class="timeline-entry">
          <div class="timeline-date">Pilar 02</div>
          <div class="timeline-title">Public Case Tracker (Papan Kawal Kasus)</div>
          <p class="text-sm text-muted">Setiap laporan yang lolos verifikasi redaksi akan masuk ke papan pantau publik. Warganet dapat memantau perkembangan kasus secara bertahap dari <strong>Investigasi ➔ Viralisasi ➔ Proses Hukum ➔ Tuntas</strong>.</p>
        </div>
        <div class="timeline-entry">
          <div class="timeline-date">Pilar 03</div>
          <div class="timeline-title">Jurnalisme Investigasi & Cek Fakta Independen</div>
          <p class="text-sm text-muted">Tim jurnalis kami memverifikasi keaslian dokumen, memeriksa metadata digital, dan berkolaborasi dengan jaringan Lembaga Bantuan Hukum (LBH) sebelum sebuah isu dipublikasikan.</p>
        </div>
      </div>

      <h3>Bagaimana Cara Anda Berpartisipasi?</h3>
      <p>Anda bisa berpartisipasi dengan tiga langkah nyata:</p>
      <ul>
        <li><strong>Laporkan:</strong> Jika Anda mengetahui atau mengalami ketidakadilan sosial, klik tombol <em>"Kirim Laporan"</em> di bagian atas.</li>
        <li><strong>Kawal:</strong> Tekan tombol <em>"Ikut Kawal"</em> pada kasus-kasus di Case Tracker untuk memberikan dukungan moral dan data atensi publik.</li>
        <li><strong>Viralkan Berita Terverifikasi:</strong> Bagikan artikel investigasi resmi kami ke media sosial agar kasus tidak menguap di tengah jalan.</li>
      </ul>

      <p class="mt-4"><em>Mari bersama-sama mengawal kebenaran dan menuntut keadilan. Karena keadilan yang tertunda adalah keadilan yang diingkari.</em></p>
    `
  }
];

// Case Tracker Database
const caseTrackerData = [
  {
    id: "TRK-001",
    ticketCode: "V4J-2026-89421",
    title: "Pengawalan Pembukaan Kanal Pengaduan Publik Viral For Justice",
    category: "Advokasi & Transparansi",
    status: "investigasi",
    statusLabel: "🟡 Investigasi",
    stage: 1, // 1: Investigasi, 2: Viral, 3: Proses Hukum, 4: Tuntas
    publicAttention: "Aktif Dipantau",
    supportersCount: 1,
    supporters: "1 Dukungan Kawal",
    updated: "Hari Ini",
    summary: "Sistem verifikasi laporan masyarakat telah resmi beroperasi untuk menerima bukti dan aduan publik."
  }
];

let activeCategory = "all";
let activeTrackerStatus = "all";
let uploadedFiles = [];

// ==========================================
// 2. INITIALIZATION & SYNC
// ==========================================

function loadStoredData() {
  const savedArticles = localStorage.getItem('v4j_custom_articles');
  if (savedArticles) {
    try {
      const parsed = JSON.parse(savedArticles);
      if (Array.isArray(parsed) && parsed.length > 0) {
        articlesData.length = 0;
        articlesData.push(...parsed);
      }
    } catch(e) {}
  }

  const savedTrackers = localStorage.getItem('v4j_custom_trackers');
  if (savedTrackers) {
    try {
      const parsed = JSON.parse(savedTrackers);
      if (Array.isArray(parsed) && parsed.length > 0) {
        caseTrackerData.length = 0;
        caseTrackerData.push(...parsed);
      }
    } catch(e) {}
  }
}

document.addEventListener("DOMContentLoaded", () => {
  loadStoredData();
  initClock();
  renderTrackerCards();
  renderNewsGrid();
  initCategoryChips();
  initTrackerFilterTabs();
  initSearch();
  initDropzone();
  initMobileMenu();
});

// Live Date & Clock
function initClock() {
  const update = () => {
    const now = new Date();
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit',
      second: '2-digit'
    };
    const el = document.getElementById("liveDateTime");
    if (el) {
      el.innerHTML = `<i class="fa-regular fa-clock"></i> ${now.toLocaleDateString('id-ID', options)} WIB`;
    }
  };
  update();
  setInterval(update, 1000);
}

// Mobile Menu
function initMobileMenu() {
  const btn = document.getElementById("mobileMenuBtn");
  const menu = document.getElementById("navMenu");
  if (btn && menu) {
    btn.addEventListener("click", () => {
      menu.classList.toggle("mobile-open");
    });
  }
}

// ==========================================
// 3. RENDER NEWS GRID & CATEGORY FILTER
// ==========================================

function renderNewsGrid(filter = "all", searchQuery = "") {
  const grid = document.getElementById("newsGrid");
  const resultsCount = document.getElementById("resultsCount");
  if (!grid) return;

  let filtered = articlesData.filter(item => {
    const matchCategory = filter === "all" || item.category === filter;
    const matchSearch = searchQuery === "" || 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  if (resultsCount) {
    resultsCount.textContent = `Menampilkan ${filtered.length} artikel`;
  }

  if (filtered.length === 0) {
    const categoryNames = {
      'all': 'Semua Kasus',
      'hukum': 'Hukum & Kriminal',
      'ham': 'Pelanggaran HAM',
      'korupsi': 'Korupsi & Bansos',
      'tanah': 'Konflik Agraria',
      'digital': 'Kejahatan Siber',
      'lingkungan': 'Kerusakan Lingkungan'
    };
    const catName = categoryNames[filter] || 'Kategori Ini';

    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 2rem; background: #FFFFFF; border-radius: 12px; border: 2px dashed #CBD5E1; box-shadow: var(--shadow-sm);">
        <div style="width: 64px; height: 64px; background: #FEE2E2; color: var(--color-crimson); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.75rem; margin: 0 auto 1.25rem;">
          <i class="fa-solid fa-folder-open"></i>
        </div>
        <h3 style="font-family: var(--font-heading); font-size: 1.5rem; color: #0B0E14; margin-bottom: 0.5rem;">Belum Ada Laporan Kasus di ${catName}</h3>
        <p class="text-muted" style="max-width: 520px; margin: 0 auto 1.5rem; font-size: 0.9rem;">
          Kategori ini masih kosong atau seluruh kasus terkait telah selesai diproses. Anda memiliki informasi, rekaman, atau bukti dugaan pelanggaran hukum terkait topik ini?
        </p>
        <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-crimson" onclick="openReportModal()">
            <i class="fa-solid fa-bullhorn"></i> Kirim Laporan Kasus Pertama
          </button>
          <button class="btn btn-secondary" onclick="filterByCategory('all')">
            <i class="fa-solid fa-arrows-rotate"></i> Lihat Semua Berita
          </button>
        </div>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => `
    <article class="news-card">
      <div class="news-card-img-wrap">
        <a href="article.html?id=${item.id}">
          <img src="${item.image}" alt="${item.title}" class="news-card-img" loading="lazy">
        </a>
        <span class="news-category-badge">${item.categoryLabel}</span>
        <span class="news-viral-pill"><i class="fa-solid fa-fire"></i> ${item.viralScore}</span>
      </div>
      <div class="news-card-body">
        <div class="news-meta">
          <span><i class="fa-regular fa-clock"></i> ${item.timeAgo}</span>
          <span><i class="fa-solid fa-book-reader"></i> ${item.readTime}</span>
        </div>
        <h3 class="news-title">
          <a href="article.html?id=${item.id}">${item.title}</a>
        </h3>
        <p class="news-excerpt">${item.excerpt}</p>
        
        <div class="news-card-footer">
          <a href="article.html?id=${item.id}" class="read-btn">
            Buka Kasus <i class="fa-solid fa-arrow-right"></i>
          </a>
          <div class="reaction-btns">
            <button class="btn-react" id="btn-support-${item.id}" onclick="reactArticle(${item.id}, 'support')" title="Kawal Kasus">
              <i class="fa-solid fa-hand-fist"></i> <span>${formatNumber(item.supports)}</span>
            </button>
            <button class="btn-react" onclick="shareArticle('${item.title.replace(/'/g, "\\'")}')" title="Bagikan Kasus">
              <i class="fa-solid fa-share-nodes"></i> <span>${formatNumber(item.shares)}</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  `).join("");
}

function initCategoryChips() {
  const chips = document.querySelectorAll(".category-chips .chip");
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      chips.forEach(c => c.classList.remove("active"));
      chip.classList.add("active");
      activeCategory = chip.getAttribute("data-cat");
      renderNewsGrid(activeCategory);
    });
  });
}

function filterByCategory(cat) {
  activeCategory = cat;
  const chips = document.querySelectorAll(".category-chips .chip");
  chips.forEach(chip => {
    if (chip.getAttribute("data-cat") === cat) {
      chip.classList.add("active");
    } else {
      chip.classList.remove("active");
    }
  });
  renderNewsGrid(cat);
  const target = document.getElementById("investigasiSection");
  if (target) target.scrollIntoView({ behavior: "smooth" });
}

function initSearch() {
  const input = document.getElementById("searchInput");
  const btn = document.getElementById("searchBtn");
  
  if (input) {
    input.addEventListener("input", (e) => {
      renderNewsGrid(activeCategory, e.target.value.trim());
    });
    input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        renderNewsGrid(activeCategory, input.value.trim());
        const target = document.getElementById("investigasiSection");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }
    });
  }

  if (btn && input) {
    btn.addEventListener("click", () => {
      renderNewsGrid(activeCategory, input.value.trim());
      const target = document.getElementById("investigasiSection");
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  }
}

// ==========================================
// 4. CASE TRACKER RENDER & FILTER
// ==========================================

function updateTrackerCounters() {
  const countAll = caseTrackerData.length;
  const countInv = caseTrackerData.filter(i => i.status === 'investigasi').length;
  const countVir = caseTrackerData.filter(i => i.status === 'viral').length;
  const countHuk = caseTrackerData.filter(i => i.status === 'hukum').length;
  const countTun = caseTrackerData.filter(i => i.status === 'tuntas').length;

  const tabs = document.querySelectorAll(".tracker-filter-tabs .tracker-tab");
  tabs.forEach(tab => {
    const status = tab.getAttribute("data-status");
    if (status === "all") tab.textContent = `Semua Status (${countAll})`;
    if (status === "investigasi") tab.textContent = `🟡 Investigasi (${countInv})`;
    if (status === "viral") tab.textContent = `🔴 Viralisasi (${countVir})`;
    if (status === "hukum") tab.textContent = `🔵 Proses Hukum (${countHuk})`;
    if (status === "tuntas") tab.textContent = `🟢 Keadilan Tercapai (${countTun})`;
  });

  const badge = document.querySelector(".nav-menu .badge-count");
  if (badge) badge.textContent = countAll;
}

function renderTrackerCards(filter = "all") {
  updateTrackerCounters();
  const grid = document.getElementById("trackerGrid");
  if (!grid) return;

  const filtered = caseTrackerData.filter(item => {
    return filter === "all" || item.status === filter;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; background: var(--color-black-card); border-radius: 12px; border: 1px dashed var(--color-black-border);">
        <i class="fa-solid fa-scale-balanced text-crimson" style="font-size: 2.5rem; margin-bottom: 0.75rem;"></i>
        <h4 style="color: #FFFFFF; font-family: var(--font-heading); font-size: 1.25rem;">Belum Ada Kasus di Tahap Status Ini</h4>
        <p class="text-muted text-sm mt-2">Seluruh laporan masyarakat yang masuk akan diverifikasi terlebih dahulu sebelum dipublikasikan ke papan pemantau.</p>
        <button class="btn btn-crimson mt-4" onclick="openReportModal()">
          <i class="fa-solid fa-bullhorn"></i> Kirim Laporan Pengaduan
        </button>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    return `
      <div class="tracker-card">
        <div class="tc-header">
          <div>
            <div class="tc-id">${item.id} • ${item.ticketCode}</div>
            <span class="text-xs text-muted font-bold">${item.category}</span>
          </div>
          <span class="tc-status-badge status-${item.status}">${item.statusLabel}</span>
        </div>

        <h3 class="tc-title" onclick="openTrackerDetail('${item.ticketCode}')">${item.title}</h3>
        <p class="tc-desc">${item.summary}</p>

        <!-- 4 Step Pipeline -->
        <div class="tc-pipeline">
          <div class="pipe-step ${item.stage >= 1 ? 'completed' : ''}">
            <div class="pipe-dot"><i class="fa-solid fa-check"></i></div>
            <span>Investigasi</span>
          </div>
          <div class="pipe-step ${item.stage >= 2 ? 'completed' : ''}">
            <div class="pipe-dot"><i class="fa-solid fa-check"></i></div>
            <span>Viral</span>
          </div>
          <div class="pipe-step ${item.stage >= 3 ? 'completed' : ''}">
            <div class="pipe-dot"><i class="fa-solid fa-check"></i></div>
            <span>Proses Hukum</span>
          </div>
          <div class="pipe-step ${item.stage >= 4 ? 'completed' : ''}">
            <div class="pipe-dot"><i class="fa-solid fa-check"></i></div>
            <span>Tuntas</span>
          </div>
        </div>

        <div class="tc-footer">
          <span><i class="fa-solid fa-eye text-crimson"></i> ${item.publicAttention}</span>
          <span><i class="fa-solid fa-users text-white"></i> ${item.supporters}</span>
          <button class="btn-kawal-action" onclick="supportCase('${item.id}')">
            <i class="fa-solid fa-hand-fist"></i> Ikut Kawal
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function initTrackerFilterTabs() {
  const tabs = document.querySelectorAll(".tracker-filter-tabs .tracker-tab");
  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeTrackerStatus = tab.getAttribute("data-status");
      renderTrackerCards(activeTrackerStatus);
    });
  });
}

function supportCase(id) {
  const caseItem = caseTrackerData.find(c => c.id === id);
  if (!caseItem) return;

  const key = `v4j_supported_case_${id}`;
  if (localStorage.getItem(key)) {
    showToast("ℹ️ Anda sudah memberikan dukungan kawal untuk kasus ini.");
    return;
  }

  caseItem.supportersCount = (caseItem.supportersCount || 1) + 1;
  caseItem.supporters = `${caseItem.supportersCount} Dukungan Kawal`;
  localStorage.setItem('v4j_custom_trackers', JSON.stringify(caseTrackerData));
  localStorage.setItem(key, "true");
  
  renderTrackerCards(activeTrackerStatus);
  showToast(`✊ Terima kasih! Dukungan nyata Anda telah tercatat (Total: ${caseItem.supportersCount} orang mengawal).`);
}

// ==========================================
// 5. ARTICLE NAVIGATION (Dedicated Page per News)
// ==========================================

function openArticleModal(id) {
  // Navigate to dedicated standalone news article page
  window.location.href = `article.html?id=${id || 1}`;
}

function closeArticleModal() {
  // Kept for backward compatibility
}

// ==========================================
// 6. WHISTLEBLOWER REPORT FORM
// ==========================================

function openReportModal() {
  const modal = document.getElementById("reportModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeReportModal() {
  const modal = document.getElementById("reportModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function initDropzone() {
  const dropzone = document.getElementById("dropzone");
  const fileInput = document.getElementById("fileInput");
  const preview = document.getElementById("fileListPreview");

  if (!dropzone || !fileInput) return;

  dropzone.addEventListener("click", () => fileInput.click());

  dropzone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--color-crimson)";
  });

  dropzone.addEventListener("dragleave", () => {
    dropzone.style.borderColor = "var(--color-gray-400)";
  });

  dropzone.addEventListener("drop", (e) => {
    e.preventDefault();
    dropzone.style.borderColor = "var(--color-gray-400)";
    handleFiles(e.dataTransfer.files);
  });

  fileInput.addEventListener("change", (e) => {
    handleFiles(e.target.files);
  });

  function handleFiles(files) {
    for (let file of files) {
      uploadedFiles.push(file);
    }
    renderFilePreview();
  }

  function renderFilePreview() {
    if (!preview) return;
    preview.innerHTML = uploadedFiles.map((file, idx) => `
      <div class="file-item">
        <span><i class="fa-solid fa-file-shield text-crimson"></i> ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
        <button type="button" class="btn-remove-file" onclick="removeFile(${idx})"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `).join("");
  }
}

function removeFile(index) {
  uploadedFiles.splice(index, 1);
  const preview = document.getElementById("fileListPreview");
  if (preview) {
    preview.innerHTML = uploadedFiles.map((file, idx) => `
      <div class="file-item">
        <span><i class="fa-solid fa-file-shield text-crimson"></i> ${file.name} (${(file.size / 1024).toFixed(1)} KB)</span>
        <button type="button" class="btn-remove-file" onclick="removeFile(${idx})"><i class="fa-solid fa-xmark"></i></button>
      </div>
    `).join("");
  }
}

function setPrivacy(type) {
  const cards = document.querySelectorAll(".privacy-card");
  cards.forEach(c => c.classList.remove("selected"));
  
  if (type === 'anon') {
    cards[0].classList.add("selected");
    document.getElementById("reporterNameGroup").style.display = "none";
  } else {
    cards[1].classList.add("selected");
    document.getElementById("reporterNameGroup").style.display = "block";
  }
}

function submitWhistleblowerReport(e) {
  e.preventDefault();
  const title = document.getElementById("caseTitle").value.trim();
  const category = document.getElementById("caseCategory").value;
  const chronology = document.getElementById("caseChronology").value.trim();
  const location = document.getElementById("caseLocation").value.trim();
  
  if (!title || !category) {
    showToast("⚠️ Mohon lengkapi judul dan kategori kasus.");
    return;
  }

  // Generate unique random ticket
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  const ticketCode = `V4J-2026-${randomNum}`;

  document.getElementById("generatedTicketCode").textContent = ticketCode;

  // Add into active Case Tracker
  const categoryLabels = {
    'korupsi': 'Korupsi & Anggaran',
    'hukum': 'Kriminalisasi & Aparat',
    'ham': 'Pelanggaran HAM',
    'tanah': 'Sengketa Agraria',
    'ketenagakerjaan': 'Hak Tenaga Kerja',
    'lainnya': 'Aduan Publik'
  };

  const newTracker = {
    id: `TRK-00${caseTrackerData.length + 1}`,
    ticketCode: ticketCode,
    title: title,
    category: categoryLabels[category] || 'Aduan Masyarakat',
    status: 'investigasi',
    statusLabel: '🟡 Investigasi',
    stage: 1,
    publicAttention: 'Laporan Baru',
    supportersCount: 1,
    supporters: '1 Dukungan Kawal',
    updated: 'Baru Saja',
    summary: chronology.substring(0, 120) + (chronology.length > 120 ? '...' : '')
  };

  caseTrackerData.unshift(newTracker);
  localStorage.setItem('v4j_custom_trackers', JSON.stringify(caseTrackerData));
  renderTrackerCards(activeTrackerStatus);

  // Close report modal & open success modal
  closeReportModal();
  document.getElementById("whistleblowerForm").reset();
  uploadedFiles = [];
  const preview = document.getElementById("fileListPreview");
  if (preview) preview.innerHTML = "";

  const successModal = document.getElementById("reportSuccessModal");
  if (successModal) {
    successModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeSuccessModal() {
  const modal = document.getElementById("reportSuccessModal");
  if (modal) modal.classList.remove("active");
  document.body.style.overflow = "";
}

function copyTicketCode() {
  const code = document.getElementById("generatedTicketCode").textContent;
  navigator.clipboard.writeText(code).then(() => {
    showToast("📋 Kode tiket berhasil disalin ke clipboard!");
  }).catch(() => {
    showToast(`Kode tiket: ${code}`);
  });
}

// ==========================================
// 7. TRACKER SEARCH MODAL
// ==========================================

function openTrackerSearchModal() {
  const modal = document.getElementById("ticketSearchModal");
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeTrackerSearchModal() {
  const modal = document.getElementById("ticketSearchModal");
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "";
  }
}

function checkTicketStatus() {
  const input = document.getElementById("ticketInput");
  const resBox = document.getElementById("ticketResultBox");
  if (!input || !resBox) return;

  const query = input.value.trim().toUpperCase();
  const match = caseTrackerData.find(c => c.ticketCode.toUpperCase() === query) || caseTrackerData[0];

  resBox.classList.remove("hidden");
  resBox.innerHTML = `
    <div style="border-left: 4px solid var(--color-crimson); padding-left: 0.75rem;">
      <div style="display: flex; justify-content: space-between; align-items: center;">
        <strong style="font-size: 0.9rem;">Tiket: ${match.ticketCode}</strong>
        <span class="tc-status-badge status-${match.status}">${match.statusLabel}</span>
      </div>
      <h4 style="font-size: 1rem; margin: 0.4rem 0;">${match.title}</h4>
      <p class="text-sm text-muted">${match.summary}</p>
      <div class="mt-3 text-xs text-muted">
        <span><i class="fa-solid fa-clock-rotate-left"></i> Pembaruan Terakhir: ${match.updated}</span>
      </div>
    </div>
  `;
}

function openTrackerDetail(ticketCode) {
  const match = caseTrackerData.find(c => c.ticketCode === ticketCode);
  if (match) {
    openTrackerSearchModal();
    document.getElementById("ticketInput").value = match.ticketCode;
    checkTicketStatus();
  }
}

// ==========================================
// 8. INTERACTIVITY HELPERS & TOAST
// ==========================================

function reactArticle(id, type) {
  const article = articlesData.find(a => a.id === id);
  if (!article) return;

  const key = `v4j_reacted_art_${id}_${type}`;
  if (localStorage.getItem(key)) {
    showToast("ℹ️ Anda sudah memberikan dukungan kawal untuk artikel ini.");
    return;
  }

  if (type === "support") {
    article.supports = (article.supports || 0) + 1;
    localStorage.setItem('v4j_custom_articles', JSON.stringify(articlesData));
    localStorage.setItem(key, "true");
    
    const btn = document.getElementById(`btn-support-${id}`);
    if (btn) {
      btn.querySelector("span").textContent = formatNumber(article.supports);
      btn.style.color = "var(--color-crimson)";
    }
    showToast(`✊ Terima kasih! Dukungan nyata Anda tercatat (Total: ${article.supports} dukungan).`);
  }
}

function shareArticle(title) {
  const url = window.location.href;
  if (articlesData.length > 0) {
    articlesData[0].shares = (articlesData[0].shares || 0) + 1;
    localStorage.setItem('v4j_custom_articles', JSON.stringify(articlesData));
    renderNewsGrid(activeCategory);
  }
  
  if (navigator.share) {
    navigator.share({
      title: `[VIRAL FOR JUSTICE] ${title}`,
      text: `Mari kawal keadilan bersama di Viral For Justice: ${title}`,
      url: url
    }).catch(() => {});
  } else {
    navigator.clipboard.writeText(`${title} - Baca selengkapnya di Viral For Justice: ${url}`);
    showToast("🔗 Tautan artikel berhasil disalin untuk dibagikan!");
  }
}

function loadMoreArticles() {
  const btn = document.getElementById("loadMoreBtn");
  if (btn) {
    btn.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Memuat Laporan Tambahan...`;
    setTimeout(() => {
      btn.innerHTML = `<i class="fa-solid fa-check"></i> Seluruh Kasus Telah Ditampilkan`;
      btn.disabled = true;
      showToast("Semua 6 laporan investigasi aktif telah dimuat.");
    }, 800);
  }
}

function subscribeNewsletter() {
  const input = document.getElementById("newsletterEmail");
  if (!input || !input.value.includes("@") || !input.value.includes(".")) {
    showToast("⚠️ Mohon masukkan alamat email yang valid.");
    return;
  }
  const email = input.value.trim().toLowerCase();
  let subs = [];
  try {
    subs = JSON.parse(localStorage.getItem('v4j_subscribers') || '[]');
  } catch(e) {}
  if (!subs.includes(email)) {
    subs.push(email);
    localStorage.setItem('v4j_subscribers', JSON.stringify(subs));
  }
  input.value = "";
  showToast("📬 Terima kasih! Email Anda telah terdaftar dalam buletin mingguan Viral For Justice.");
}

function formatNumber(num) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

function showToast(message) {
  const container = document.getElementById("toastContainer");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-info text-crimson"></i> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transform = "translateX(100%)";
    toast.style.transition = "all 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Close modals on clicking overlay outside card
window.addEventListener("click", (e) => {
  if (e.target.classList.contains("modal-overlay")) {
    e.target.classList.remove("active");
    document.body.style.overflow = "";
  }
});
