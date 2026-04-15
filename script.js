/* ─────────────────────────────────────
   script.js — Portfolio interactions
───────────────────────────────────── */

'use strict';

/* ════════════════════════════════════════
   1. LOADER
════════════════════════════════════════ */
const loader = document.getElementById('loader');
const loaderBar = document.getElementById('loaderBar');
const loaderText = document.getElementById('loaderText');

const loadSteps = [
  { pct: 20,  label: 'Loading assets…' },
  { pct: 45,  label: 'Rendering components…' },
  { pct: 70,  label: 'Finalising layout…' },
  { pct: 90,  label: 'Almost there…' },
  { pct: 100, label: 'Welcome 👋' },
];

let stepIdx = 0;

function runLoader() {
  if (stepIdx >= loadSteps.length) {
    setTimeout(hideLoader, 350);
    return;
  }
  const step = loadSteps[stepIdx++];
  loaderBar.style.width = step.pct + '%';
  loaderText.textContent = step.label;
  const delay = stepIdx === 1 ? 250 : stepIdx === loadSteps.length ? 300 : 400;
  setTimeout(runLoader, delay);
}

function hideLoader() {
  loader.classList.add('hidden');
  // kick off hero animations
  document.querySelectorAll('.animate-up').forEach(el => el.classList.add('visible'));
  startTyping();
  initReveal();
}

window.addEventListener('load', () => setTimeout(runLoader, 100));

/* ════════════════════════════════════════
   2. CUSTOM CURSOR
════════════════════════════════════════ */
const dot  = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');

let mouseX = 0, mouseY = 0;
let ringX  = 0, ringY  = 0;
let rafCursor;

document.addEventListener('mousemove', e => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  dot.style.left = mouseX + 'px';
  dot.style.top  = mouseY + 'px';
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.left = ringX + 'px';
  ring.style.top  = ringY + 'px';
  rafCursor = requestAnimationFrame(animateRing);
}
animateRing();

/* hover state for interactive elements */
document.querySelectorAll('a, button, .project-card, .cert-card, .skill-cat').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hover'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hover'));
});

/* ════════════════════════════════════════
   3. NAVBAR — scroll + mobile
════════════════════════════════════════ */
const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
  highlightNav();
}, { passive: true });

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// close mobile menu on link click
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

/* active nav link on scroll */
function highlightNav() {
  const sections = document.querySelectorAll('main section[id]');
  const scrollY  = window.scrollY + 100;
  sections.forEach(sec => {
    const top    = sec.offsetTop;
    const bottom = top + sec.offsetHeight;
    const link   = document.querySelector(`#nav-links a[href="#${sec.id}"]`);
    if (link) link.classList.toggle('active', scrollY >= top && scrollY < bottom);
  });
}

/* ════════════════════════════════════════
   4. TYPING EFFECT
════════════════════════════════════════ */
const phrases = [
  'Aspiring Software Engineer',
  'Backend Developer',
  'AI & Data Science Student',
  'API Builder',
];

let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function startTyping() {
  typeLoop();
}

function typeLoop() {
  const phrase = phrases[phraseIdx];
  if (!deleting) {
    typedEl.textContent = phrase.slice(0, ++charIdx);
    if (charIdx === phrase.length) {
      deleting = true;
      setTimeout(typeLoop, 2000);
      return;
    }
  } else {
    typedEl.textContent = phrase.slice(0, --charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
    }
  }
  setTimeout(typeLoop, deleting ? 50 : 80);
}

/* ════════════════════════════════════════
   5. SCROLL REVEAL
════════════════════════════════════════ */
function initReveal() {
  const els = document.querySelectorAll('.reveal');
  const obs = new IntersectionObserver(entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => entry.target.classList.add('visible'), idx * 80);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
}

/* ════════════════════════════════════════
   6. SKILLS SCROLLING TRACK
════════════════════════════════════════ */
const skills = [
  { label: 'Java',           icon: '☕' },
  { label: 'Spring Boot',    icon: '🌱' },
  { label: 'Python',         icon: '🐍' },
  { label: 'Flask',          icon: '🔥' },
  { label: 'JavaScript',     icon: '⚡' },
  { label: 'SQL',            icon: '🗄️' },
  { label: 'REST APIs',      icon: '🔗' },
  { label: 'HTML & CSS',     icon: '🎨' },
  { label: 'Docker',         icon: '🐳' },
  { label: 'Git / GitHub',   icon: '🔀' },
  { label: 'Postman',        icon: '📮' },
  { label: 'Scikit-learn',   icon: '📊' },
  { label: 'Pandas',         icon: '🐼' },
  { label: 'C++',            icon: '⚙️' },
  { label: 'Linux',          icon: '🐧' },
  { label: 'GitHub Actions', icon: '🚀' },
  { label: 'OOP',            icon: '🏗️' },
  { label: 'DSA',            icon: '🌲' },
  { label: 'Django',         icon: '🎸' },
  { label: 'LeetCode',       icon: '💡' },
];

const track = document.getElementById('skillsTrack');
const wrap  = document.getElementById('skillsTrackWrap');

function buildTrack() {
  // triple for infinite seamless loop
  const allSkills = [...skills, ...skills, ...skills];
  track.innerHTML = '';
  allSkills.forEach(s => {
    const tag = document.createElement('div');
    tag.className = 'skill-tag';
    tag.innerHTML = `<span class="tag-icon">${s.icon}</span>${s.label}`;
    track.appendChild(tag);
  });
}

buildTrack();

/* auto-scroll state */
let scrollPos   = 0;
let velocity    = 0.6;        // px per frame base speed
let paused      = false;
let dragging    = false;
let dragStartX  = 0;
let dragStartPos = 0;
let rafTrack;

const singleSetW = () => track.scrollWidth / 3;

function animateTrack() {
  if (!paused && !dragging) {
    scrollPos += velocity;
    // reset when one full set has passed
    if (scrollPos >= singleSetW()) {
      scrollPos -= singleSetW();
    }
  }
  track.style.transform = `translateX(-${scrollPos}px)`;
  rafTrack = requestAnimationFrame(animateTrack);
}
animateTrack();

/* pause on hover */
wrap.addEventListener('mouseenter', () => { paused = true; });
wrap.addEventListener('mouseleave', () => { paused = false; });

/* drag to scrub */
wrap.addEventListener('mousedown', e => {
  dragging    = true;
  dragStartX  = e.clientX;
  dragStartPos = scrollPos;
  wrap.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', e => {
  if (!dragging) return;
  const dx = dragStartX - e.clientX;
  scrollPos = dragStartPos + dx;
  // wrap negative
  if (scrollPos < 0) scrollPos += singleSetW();
  if (scrollPos >= singleSetW()) scrollPos -= singleSetW();
});

document.addEventListener('mouseup', () => {
  dragging = false;
  wrap.style.cursor = 'grab';
});

/* touch support */
let touchStartX = 0, touchStartPos = 0;
wrap.addEventListener('touchstart', e => {
  touchStartX   = e.touches[0].clientX;
  touchStartPos = scrollPos;
  paused = true;
}, { passive: true });

wrap.addEventListener('touchmove', e => {
  const dx = touchStartX - e.touches[0].clientX;
  scrollPos = touchStartPos + dx;
  if (scrollPos < 0) scrollPos += singleSetW();
  if (scrollPos >= singleSetW()) scrollPos -= singleSetW();
}, { passive: true });

wrap.addEventListener('touchend', () => { paused = false; });

/* ════════════════════════════════════════
   7. HERO GLOW FOLLOWS MOUSE
════════════════════════════════════════ */
const heroGlow = document.querySelector('.hero-glow');
const heroSection = document.getElementById('hero');

heroSection && heroSection.addEventListener('mousemove', e => {
  const rect = heroSection.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  heroGlow.style.left = x + 'px';
  heroGlow.style.top  = y + 'px';
  heroGlow.style.transform = 'translate(-50%, -50%)';
});

heroSection && heroSection.addEventListener('mouseleave', () => {
  heroGlow.style.left      = '50%';
  heroGlow.style.top       = '35%';
  heroGlow.style.transform = 'translate(-50%, -50%)';
});

/* ════════════════════════════════════════
   8. SMOOTH SCROLL for all anchor links
════════════════════════════════════════ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
