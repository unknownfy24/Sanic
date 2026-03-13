// ═══════════════════════════════════════════════════════════
//  SANIC & KNACKLES HEDGEHAG ADAPTIAN - chaos scripts
//  hallowean island zone 7, act 3
// ═══════════════════════════════════════════════════════════

const CHAOS_PHRASES = [
  'gotta go fast',
  'u cant catch him',
  'hallowean island',
  'WOW',
  'hes goin 2 fast',
  'DA RINGS',
  'CHAOS CONTROL',
  'is dat a hedgehag',
  'i am da fastest',
  'go fast or go hoam',
  'SANIC',
  'knackles approovd',
  'too fast 4 u',
  'hedgehag powers',
  'hallowean zone',
];

// ── Speed lines ──────────────────────────────────────────────
function createSpeedLines() {
  const container = document.createElement('div');
  container.className = 'speed-lines-container';
  document.body.appendChild(container);

  for (let i = 0; i < 18; i++) {
    const line = document.createElement('div');
    line.className = 'speed-line';
    line.style.top   = (Math.random() * 100) + '%';
    line.style.width = (Math.random() * 220 + 60) + 'px';
    const dur = (Math.random() * 4 + 1.5).toFixed(2);
    const del = (Math.random() * 12).toFixed(2);
    line.style.animationDuration = dur + 's';
    line.style.animationDelay   = del + 's';
    line.style.opacity = (Math.random() * 0.18 + 0.04).toFixed(3);
    // occasional red speed line for knackles energy
    if (Math.random() < 0.25) {
      line.style.background =
        'linear-gradient(90deg, transparent, #FF2200, transparent)';
    }
    container.appendChild(line);
  }
}

// ── Chaos text popup (rare subliminal flashes) ───────────────
function maybeChaosText() {
  if (Math.random() > 0.008) return; // ~0.8% per second — rare

  const phrase = CHAOS_PHRASES[Math.floor(Math.random() * CHAOS_PHRASES.length)];
  const el = document.createElement('div');
  el.className = 'chaos-popup';
  el.textContent = phrase;

  // random position, keeping it readable
  el.style.left = (Math.random() * 70 + 15) + '%';
  el.style.top  = (Math.random() * 70 + 15) + '%';

  document.body.appendChild(el);
  setTimeout(() => el.remove(), 1100);
}

// ── Ring collect on click ─────────────────────────────────────
function spawnRing(x, y) {
  const el = document.createElement('div');
  el.className = 'ring-collect-el';
  el.textContent = '⭕';
  el.style.left = x + 'px';
  el.style.top  = y + 'px';
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 700);
}

document.addEventListener('click', (e) => {
  // don't spawn rings on interactive elements weirdly
  spawnRing(e.clientX, e.clientY);
});

// ── Konami code easter egg ────────────────────────────────────
const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a'
];
let konamiPos = 0;

document.addEventListener('keydown', (e) => {
  if (e.key === KONAMI[konamiPos]) {
    konamiPos++;
    if (konamiPos === KONAMI.length) {
      konamiPos = 0;
      triggerChaosMode();
    }
  } else {
    konamiPos = 0;
  }
});

function triggerChaosMode() {
  // ULTIMATE SANIC MODE
  document.body.style.transition = 'filter 0.3s ease';
  document.body.style.filter = 'hue-rotate(0deg)';

  let deg = 0;
  const interval = setInterval(() => {
    deg = (deg + 8) % 360;
    document.body.style.filter = `hue-rotate(${deg}deg)`;
  }, 30);

  // blast a ring storm
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      spawnRing(
        Math.random() * window.innerWidth,
        Math.random() * window.innerHeight
      );
    }, i * 80);
  }

  // show the chaos message
  const msg = document.createElement('div');
  msg.className = 'chaos-popup';
  msg.style.left = '50%';
  msg.style.top  = '50%';
  msg.style.fontSize = '4rem';
  msg.style.animationDuration = '2s';
  msg.textContent = 'CHAOS CONTROL !!';
  document.body.appendChild(msg);

  setTimeout(() => {
    clearInterval(interval);
    document.body.style.filter = '';
    msg.remove();
  }, 2000);
}

// ── Animate stat bars on page load ───────────────────────────
function animateStatBars() {
  const fills = document.querySelectorAll('.stat-fill');
  fills.forEach((fill) => {
    const target = fill.dataset.width || fill.style.width;
    fill.style.width = '0%';
    // small delay so transition fires
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = 'width 1s cubic-bezier(0.4, 0, 0.2, 1)';
        fill.style.width = target;
      });
    });
  });
}

// ── Donation tier selection ───────────────────────────────────
function initDonationTiers() {
  const tiers = document.querySelectorAll('.donation-tier');
  tiers.forEach((tier) => {
    tier.addEventListener('click', () => {
      tiers.forEach(t => t.classList.remove('selected'));
      tier.classList.add('selected');

      // update custom amount field if present
      const amountInput = document.getElementById('custom-amount');
      const tierVal = tier.dataset.amount;
      if (amountInput && tierVal) {
        amountInput.value = tierVal;
      }
    });
  });
}

// ── Active nav link ───────────────────────────────────────────
function setActiveNav() {
  const page = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('nav ul li a');
  links.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === page || (page === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ── Fade in sections on scroll ────────────────────────────────
function initScrollFade() {
  const cards = document.querySelectorAll(
    '.card, .hedgehog-card, .team-card, .donation-tier, .process-step, .faq-item'
  );

  if (!('IntersectionObserver' in window)) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.animation =
          'slide-in-left 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) forwards';
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  cards.forEach((card) => {
    card.style.opacity = '0';
    obs.observe(card);
  });
}

// ── Contact form fake submission ──────────────────────────────
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'SENDING 2 HALLOWEAN ISLAND...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '✅ MESSEGE RECEIVD AT SANIC SPEED';
      btn.style.background = '#006600';

      const thanks = document.createElement('p');
      thanks.style.cssText = `
        text-align:center;
        font-family:'Bangers',fantasy;
        font-size:1.1rem;
        color:var(--ring-gold);
        margin-top:14px;
        animation: chaos-popup-anim 0s none, float-ring 3s ease-in-out infinite;
      `;
      thanks.textContent =
        '🦔 ur messege has been deliverd 2 hallowean island at sanic speed. we will respond faster than u can blink. 🦔';
      form.appendChild(thanks);

      // ring storm
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          spawnRing(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight * 0.5
          );
        }, i * 100);
      }
    }, 1800);
  });
}

// ── Donation form fake submission ────────────────────────────
function initDonateForm() {
  const form = document.getElementById('donate-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = 'DONATING AT SANIC SPEED...';
    btn.disabled = true;

    setTimeout(() => {
      btn.textContent = '💛 RINGS RECEIVD!! TANK U!!';
      btn.style.background = 'var(--ring-gold)';
      btn.style.color = '#1A1000';

      for (let i = 0; i < 15; i++) {
        setTimeout(() => {
          spawnRing(
            Math.random() * window.innerWidth,
            Math.random() * window.innerHeight
          );
        }, i * 120);
      }
    }, 1500);
  });
}

// ── Hedgehog emoji cursor ─────────────────────────────────────
function initHedgehogCursor() {
  const canvas = document.createElement('canvas');
  canvas.width = 32;
  canvas.height = 32;
  const ctx = canvas.getContext('2d');
  ctx.font = '24px serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('🦔', 16, 16);
  const url = canvas.toDataURL();
  document.documentElement.style.cursor = `url(${url}) 16 16, auto`;
}

// ── Init ─────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  createSpeedLines();
  initHedgehogCursor();
  setActiveNav();
  animateStatBars();
  initDonationTiers();
  initContactForm();
  initDonateForm();
  initScrollFade();

  // start chaos text timer
  setInterval(maybeChaosText, 1000);

  // slight page entrance
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.3s ease';
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = '1';
    });
  });
});
