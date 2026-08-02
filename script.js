/**
 * WORD OF MOUTH — Award Winning Los Angeles Food Truck
 * Interactive Vanilla JavaScript Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // ================= 1. PRELOADER SEQUENCE =================
  initPreloader();

  // ================= 2. CUSTOM CURSOR EFFECTS =================
  initCustomCursor();

  // ================= 3. HERO CANVAS & ANIMATED TRUCK =================
  initHeroCanvas();

  // ================= 4. DRAGGABLE URBAN STICKERS =================
  initDraggableStickers();

  // ================= 5. WEB AUDIO SYNTHESIZER =================
  initAudioSynth();

  // ================= 6. INTERACTIVE MENU & CRAVING BAG =================
  initMenuSystem();

  // ================= 7. LA STREET GALLERY & LIGHTBOX =================
  initGallerySystem();

  // ================= 8. REVIEWS & USER RECOMMENDATIONS =================
  initReviewSystem();

  // ================= 9. RADAR MAP CANVAS =================
  initRadarCanvas();

  // ================= 10. SECRET VIP PASS GENERATOR =================
  initVIPPassGenerator();

  // ================= 11. LIVE LA CLOCK & UTILITIES =================
  initLAClock();
  initScrollAnimations();
});

/* ================= 1. PRELOADER SEQUENCE ================= */
function initPreloader() {
  const preloader = document.getElementById('preloader');
  const loaderBar = document.getElementById('loader-bar');
  const loaderPercent = document.getElementById('loader-percent');
  const loaderStatus = document.getElementById('loader-status');

  const statuses = [
    'STARTING IGNITION...',
    'HEATING SMOKER TO 700°F...',
    'MIXING SECRET ORANGE SAUCE...',
    'PARKING AT ARTS DISTRICT...',
    'SIZZLE READY.'
  ];

  let percent = 0;
  const interval = setInterval(() => {
    percent += Math.floor(Math.random() * 12) + 5;
    if (percent > 100) percent = 100;

    if (loaderBar) loaderBar.style.width = `${percent}%`;
    if (loaderPercent) loaderPercent.textContent = `${percent}%`;

    const statusIdx = Math.min(Math.floor((percent / 100) * statuses.length), statuses.length - 1);
    if (loaderStatus) loaderStatus.textContent = statuses[statusIdx];

    if (percent >= 100) {
      clearInterval(interval);
      setTimeout(() => {
        if (preloader) {
          preloader.style.opacity = '0';
          preloader.style.pointerEvents = 'none';
          setTimeout(() => preloader.remove(), 700);
        }
      }, 400);
    }
  }, 120);
}

/* ================= 2. CUSTOM CURSOR EFFECTS ================= */
function initCustomCursor() {
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  const spray = document.getElementById('cursor-spray');

  if (!dot || !ring) return;

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let ringX = mouseX;
  let ringY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
  });

  function renderCursor() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
    requestAnimationFrame(renderCursor);
  }
  renderCursor();

  // Hover states on interactive elements
  const hoverables = document.querySelectorAll('a, button, input, select, textarea, .menu-card, .gallery-item, .draggable-sticker');
  hoverables.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('active'));
  });

  // Click spray effect
  window.addEventListener('click', (e) => {
    if (!spray) return;
    spray.style.left = `${e.clientX}px`;
    spray.style.top = `${e.clientY}px`;
    spray.style.opacity = '1';
    spray.style.transform = 'translate(-50%, -50%) scale(3.5)';

    setTimeout(() => {
      spray.style.opacity = '0';
      spray.style.transform = 'translate(-50%, -50%) scale(0)';
    }, 300);
  });
}

/* ================= 3. HERO CANVAS & ANIMATED TRUCK ================= */
function initHeroCanvas() {
  const canvas = document.getElementById('street-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  // Animated Food Truck State
  let truckX = width + 200;
  const targetTruckX = width * 0.5;
  let neonBrightness = 1;
  let smokeParticles = [];

  // Generate background stars / city lights
  const lights = Array.from({ length: 60 }, () => ({
    x: Math.random() * width,
    y: Math.random() * (height * 0.6),
    size: Math.random() * 2 + 1,
    alpha: Math.random(),
    speed: Math.random() * 0.02 + 0.005
  }));

  function drawScene() {
    ctx.clearRect(0, 0, width, height);

    // Sky Gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, height);
    skyGradient.addColorStop(0, '#0A0B0C');
    skyGradient.addColorStop(0.6, '#181B20');
    skyGradient.addColorStop(1, '#0D0E0F');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, width, height);

    // Twinkling Lights
    lights.forEach(l => {
      l.alpha += l.speed;
      if (l.alpha > 1 || l.alpha < 0.2) l.speed = -l.speed;
      ctx.fillStyle = `rgba(255, 230, 0, ${l.alpha})`;
      ctx.beginPath();
      ctx.arc(l.x, l.y, l.size, 0, Math.PI * 2);
      ctx.fill();
    });

    // Silhouette Palm Trees & LA Buildings
    ctx.fillStyle = '#08090A';
    // Buildings
    ctx.fillRect(width * 0.05, height * 0.45, 120, height * 0.55);
    ctx.fillRect(width * 0.15, height * 0.38, 160, height * 0.62);
    ctx.fillRect(width * 0.75, height * 0.40, 180, height * 0.60);
    ctx.fillRect(width * 0.88, height * 0.32, 110, height * 0.68);

    // Street Road
    const roadY = height * 0.78;
    ctx.fillStyle = '#141618';
    ctx.fillRect(0, roadY, width, height - roadY);

    // Yellow Dashed Street Lines
    ctx.strokeStyle = '#FFE600';
    ctx.lineWidth = 4;
    ctx.setLineDash([30, 20]);
    ctx.beginPath();
    ctx.moveTo(0, roadY + 40);
    ctx.lineTo(width, roadY + 40);
    ctx.stroke();
    ctx.setLineDash([]);

    // Neon Billboard Glow
    ctx.save();
    ctx.shadowColor = '#FF5722';
    ctx.shadowBlur = 25 * neonBrightness;
    ctx.fillStyle = '#FF5722';
    ctx.font = 'bold 24px Syne, sans-serif';
    ctx.fillText('⚡ WORD OF MOUTH ⚡', width * 0.12, height * 0.42);
    ctx.restore();

    // Drive Food Truck towards target center
    if (truckX > targetTruckX) {
      truckX -= (truckX - targetTruckX) * 0.05;
    }

    // Draw Food Truck Canvas Silhouette
    const tWidth = 320;
    const tHeight = 160;
    const tY = roadY - tHeight + 15;
    const tX = truckX - tWidth / 2;

    // Truck Body
    ctx.fillStyle = '#1A1C1E';
    ctx.fillRect(tX, tY, tWidth, tHeight);

    // Truck Window & Order Counter
    ctx.fillStyle = '#FFE600';
    ctx.shadowColor = '#FFE600';
    ctx.shadowBlur = 15;
    ctx.fillRect(tX + 80, tY + 30, 140, 60);

    // Truck Neon Logo
    ctx.fillStyle = '#FF5722';
    ctx.shadowColor = '#FF5722';
    ctx.shadowBlur = 20 * neonBrightness;
    ctx.font = 'bold 18px Syne, sans-serif';
    ctx.fillText('WORD OF MOUTH', tX + 85, tY + 68);
    ctx.shadowBlur = 0;

    // Headlights
    ctx.fillStyle = '#FFFFFF';
    ctx.shadowColor = '#FFFFFF';
    ctx.shadowBlur = 30;
    ctx.beginPath();
    ctx.arc(tX + 10, tY + 110, 10, 0, Math.PI * 2);
    ctx.fill();

    // Headlight Beam
    const beamGrad = ctx.createLinearGradient(tX + 10, tY + 110, tX - 300, tY + 130);
    beamGrad.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
    beamGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(tX + 10, tY + 100);
    ctx.lineTo(tX - 300, tY + 50);
    ctx.lineTo(tX - 300, tY + 180);
    ctx.lineTo(tX + 10, tY + 120);
    ctx.closePath();
    ctx.fill();

    // Wheels
    ctx.fillStyle = '#000000';
    ctx.beginPath();
    ctx.arc(tX + 70, tY + tHeight, 25, 0, Math.PI * 2);
    ctx.arc(tX + 250, tY + tHeight, 25, 0, Math.PI * 2);
    ctx.fill();

    // Generate & Draw Smoke / Steam Particles
    if (Math.random() < 0.6) {
      smokeParticles.push({
        x: tX + 280 + (Math.random() * 20 - 10),
        y: tY + 10,
        radius: Math.random() * 8 + 4,
        alpha: 0.7,
        vy: -(Math.random() * 1.5 + 0.5),
        vx: Math.random() * 0.5 - 0.25
      });
    }

    smokeParticles.forEach((p, idx) => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.008;
      p.radius += 0.2;

      if (p.alpha <= 0) {
        smokeParticles.splice(idx, 1);
      } else {
        ctx.fillStyle = `rgba(200, 200, 200, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    requestAnimationFrame(drawScene);
  }

  drawScene();

  // Toggle Neon Lights Button
  const lightsBtn = document.getElementById('lights-btn');
  if (lightsBtn) {
    lightsBtn.addEventListener('click', () => {
      neonBrightness = neonBrightness === 1 ? 0.1 : 1;
    });
  }
}

/* ================= 4. DRAGGABLE URBAN STICKERS ================= */
function initDraggableStickers() {
  const stickers = document.querySelectorAll('.draggable-sticker');

  stickers.forEach(sticker => {
    let isDragging = false;
    let startX, startY, initialX = 0, initialY = 0;

    sticker.addEventListener('mousedown', (e) => {
      isDragging = true;
      startX = e.clientX - initialX;
      startY = e.clientY - initialY;
      sticker.style.zIndex = '35';
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      initialX = e.clientX - startX;
      initialY = e.clientY - startY;
      sticker.style.transform = `translate(${initialX}px, ${initialY}px) rotate(0deg)`;
    });

    window.addEventListener('mouseup', () => {
      isDragging = false;
    });
  });
}

/* ================= 5. WEB AUDIO SYNTHESIZER ================= */

function initAudioSynth() {
  let audioCtx = null;
  let ambientGain = null;
  let isSoundOn = false;

  const soundToggle = document.getElementById('sound-toggle');
  const soundLabel = document.getElementById('sound-label');
  const honkBtn = document.getElementById('honk-btn');
  const sizzleBtn = document.getElementById('play-sizzle-btn');

  function getAudioContext() {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesize Truck Horn
  function playHornSound() {
    const ctx = getAudioContext();
    const osc1 = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';
    osc1.frequency.setValueAtTime(320, ctx.currentTime);
    osc2.frequency.setValueAtTime(435, ctx.currentTime);

    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.25, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start();
    osc2.start();
    osc1.stop(ctx.currentTime + 0.85);
    osc2.stop(ctx.currentTime + 0.85);
  }

  // Synthesize Grill Sizzle Sound (Filtered White Noise)
  function playSizzleSound() {
    const ctx = getAudioContext();
    const bufferSize = ctx.sampleRate * 2;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = buffer;

    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3500, ctx.currentTime);
    filter.Q.setValueAtTime(3, ctx.currentTime);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);

    whiteNoise.start();
    whiteNoise.stop(ctx.currentTime + 2.1);
  }

  if (honkBtn) honkBtn.addEventListener('click', playHornSound);
  if (sizzleBtn) sizzleBtn.addEventListener('click', playSizzleSound);

  if (soundToggle) {
    soundToggle.addEventListener('click', () => {
      isSoundOn = !isSoundOn;
      if (soundLabel) soundLabel.textContent = `Street Ambience: ${isSoundOn ? 'ON' : 'OFF'}`;

      if (isSoundOn) {
        playHornSound();
        soundToggle.classList.add('border-green', 'text-green');
      } else {
        soundToggle.classList.remove('border-green', 'text-green');
      }
    });
  }
}

/* ================= 6. INTERACTIVE MENU & CRAVING BAG ================= */
function initMenuSystem() {
  const tabs = document.querySelectorAll('.menu-tab-btn');
  const cards = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const category = tab.dataset.category;
      cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
          card.style.opacity = '0';
        }
      });
    });
  });

  // Craving Bag State
  let cravingItems = [];
  const cravingBar = document.getElementById('craving-bar');
  const cravingCount = document.getElementById('craving-count');
  const cravingTotal = document.getElementById('craving-total');
  const addBtns = document.querySelectorAll('.add-craving-btn');
  const checkoutBtn = document.getElementById('checkout-btn');

  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);

      cravingItems.push({ name, price });
      updateCravingBar();

      // Button feedback animation
      btn.innerHTML = `<i data-lucide="check" class="w-4 h-4 text-green"></i> Added!`;
      if (window.lucide) window.lucide.createIcons();

      setTimeout(() => {
        btn.innerHTML = `<i data-lucide="plus" class="w-4 h-4"></i> Add To Craving List`;
        if (window.lucide) window.lucide.createIcons();
      }, 1200);
    });
  });

  function updateCravingBar() {
    if (!cravingBar) return;
    if (cravingItems.length > 0) {
      cravingBar.classList.remove('hidden');
      cravingBar.classList.add('flex');
    } else {
      cravingBar.classList.add('hidden');
    }

    const total = cravingItems.reduce((acc, item) => acc + item.price, 0);
    if (cravingCount) cravingCount.textContent = cravingItems.length;
    if (cravingTotal) cravingTotal.textContent = `$${total.toFixed(2)}`;
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      alert(`🎉 SIMULATED PICKUP ORDER CONFIRMED!\n\nYour items will be hot & ready at the Arts District Truck in 12 MINUTES.\nShow code #WOM-${Math.floor(Math.random() * 9000 + 1000)} at the window.`);
      cravingItems = [];
      updateCravingBar();
    });
  }
}

/* ================= 7. LA STREET GALLERY & LIGHTBOX ================= */
function initGallerySystem() {
  const filterBtns = document.querySelectorAll('.gallery-filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxTitle = document.getElementById('lightbox-title');
  const closeLightbox = document.getElementById('close-lightbox');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.galleryFilter;
      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.tag === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgSrc = item.dataset.img;
      const title = item.dataset.title;

      if (lightboxImg) lightboxImg.src = imgSrc;
      if (lightboxTitle) lightboxTitle.textContent = title;
      if (lightbox) {
        lightbox.classList.remove('hidden');
        lightbox.classList.add('flex');
      }
    });
  });

  if (closeLightbox && lightbox) {
    closeLightbox.addEventListener('click', () => {
      lightbox.classList.add('hidden');
      lightbox.classList.remove('flex');
    });
  }
}

/* ================= 8. REVIEWS & USER RECOMMENDATIONS ================= */
function initReviewSystem() {
  const addReviewBtn = document.getElementById('add-review-btn');
  const reviewModal = document.getElementById('review-modal');
  const closeReviewModal = document.getElementById('close-review-modal');
  const reviewForm = document.getElementById('review-form');
  const reviewsContainer = document.getElementById('reviews-container');

  if (addReviewBtn && reviewModal) {
    addReviewBtn.addEventListener('click', () => {
      reviewModal.classList.remove('hidden');
      reviewModal.classList.add('flex');
    });
  }

  if (closeReviewModal && reviewModal) {
    closeReviewModal.addEventListener('click', () => {
      reviewModal.classList.add('hidden');
      reviewModal.classList.remove('flex');
    });
  }

  if (reviewForm && reviewsContainer) {
    reviewForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('review-name').value;
      const text = document.getElementById('review-text').value;

      const newCard = document.createElement('div');
      newCard.className = 'bg-card p-8 rounded-3xl border border-yellow/50 relative shadow-2xl animate-bounce';
      newCard.innerHTML = `
        <div class="text-yellow text-xl mb-4">★★★★★</div>
        <p class="font-body text-gray-300 text-sm leading-relaxed mb-6 italic">"${text}"</p>
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-full bg-green text-black font-bold flex items-center justify-center font-mono text-sm">
            ${name.substring(0, 2).toUpperCase()}
          </div>
          <div>
            <span class="font-bold text-white text-sm block">${name}</span>
            <span class="font-mono text-[10px] text-gray-400">LA Local Reviewer</span>
          </div>
        </div>
      `;

      reviewsContainer.prepend(newCard);
      reviewForm.reset();
      if (reviewModal) {
        reviewModal.classList.add('hidden');
        reviewModal.classList.remove('flex');
      }
    });
  }
}

/* ================= 9. RADAR MAP CANVAS ================= */
function initRadarCanvas() {
  const canvas = document.getElementById('radar-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;

  function resize() {
    width = canvas.width = canvas.parentElement.clientWidth;
    height = canvas.height = canvas.parentElement.clientHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  let angle = 0;
  const pins = [
    { x: 0.35, y: 0.45, label: 'ARTS DISTRICT', active: true },
    { x: 0.65, y: 0.30, label: 'MELROSE' },
    { x: 0.25, y: 0.75, label: 'VENICE' },
    { x: 0.70, y: 0.65, label: 'ECHO PARK' }
  ];

  function drawRadar() {
    ctx.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const maxRadius = Math.min(width, height) * 0.42;

    // Concentric Green Grid Circles
    ctx.strokeStyle = 'rgba(0, 230, 118, 0.2)';
    ctx.lineWidth = 1;

    for (let r = 0.2; r <= 1; r += 0.25) {
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * r, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Crosshairs
    ctx.beginPath();
    ctx.moveTo(centerX - maxRadius, centerY);
    ctx.lineTo(centerX + maxRadius, centerY);
    ctx.moveTo(centerX, centerY - maxRadius);
    ctx.lineTo(centerX, centerY + maxRadius);
    ctx.stroke();

    // Sweeping Radar Line
    angle += 0.02;
    ctx.fillStyle = 'rgba(0, 230, 118, 0.15)';
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, maxRadius, angle - 0.4, angle);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = '#00E676';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.lineTo(centerX + Math.cos(angle) * maxRadius, centerY + Math.sin(angle) * maxRadius);
    ctx.stroke();

    // Draw Pins
    pins.forEach(p => {
      const px = width * p.x;
      const py = height * p.y;

      ctx.fillStyle = p.active ? '#00E676' : '#FFE600';
      ctx.beginPath();
      ctx.arc(px, py, p.active ? 7 : 5, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = '10px Space Grotesk, monospace';
      ctx.fillText(p.label, px + 10, py + 4);
    });

    requestAnimationFrame(drawRadar);
  }

  drawRadar();
}

/* ================= 10. SECRET VIP PASS GENERATOR ================= */
function initVIPPassGenerator() {
  const nameInput = document.getElementById('pass-name-input');
  const sauceSelect = document.getElementById('pass-sauce-select');
  const nameDisplay = document.getElementById('ticket-name-display');
  const sauceDisplay = document.getElementById('ticket-sauce-display');
  const downloadBtn = document.getElementById('download-pass-btn');

  if (nameInput && nameDisplay) {
    nameInput.addEventListener('input', (e) => {
      nameDisplay.textContent = e.target.value.toUpperCase() || 'LA FOODIE #1';
    });
  }

  if (sauceSelect && sauceDisplay) {
    sauceSelect.addEventListener('change', (e) => {
      sauceDisplay.textContent = e.target.value;
    });
  }

  if (downloadBtn) {
    downloadBtn.addEventListener('click', () => {
      alert(`🎟️ VIP SECRET PASS SAVED TO PHONE!\n\nTicket Code: WOM-849201-LA\nShow this screen at the truck order window for your free sauce dip!`);
    });
  }
}

/* ================= 11. LIVE LA CLOCK & UTILITIES ================= */
function initLAClock() {
  const clockEl = document.getElementById('la-clock');

  function updateClock() {
    if (!clockEl) return;
    const now = new Date();
    const options = { timeZone: 'America/Los_Angeles', hour: '2-digit', minute: '2-digit', second: '2-digit' };
    clockEl.textContent = `${now.toLocaleTimeString('en-US', options)} PST`;
  }

  updateClock();
  setInterval(updateClock, 1000);
}

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section, .menu-card, .schedule-card').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
  });
}
