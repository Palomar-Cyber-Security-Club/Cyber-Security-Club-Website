/* main.js */

// ── HAMBURGER ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');
if (hamburger) {
  hamburger.addEventListener('click', () => navLinks.classList.toggle('open'));
}

// ── COMET CANVAS ──
const canvas = document.getElementById('comets');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W, H, comets = [];

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Comet {
    constructor() { this.reset(true); }
    reset(initial = false) {
      this.x     = initial ? Math.random() * W : -50;
      this.y     = initial ? Math.random() * H * 0.6 : Math.random() * H * 0.5;
      this.vx    = 3 + Math.random() * 5;
      this.vy    = 0.5 + Math.random() * 2;
      this.len   = 80 + Math.random() * 120;
      this.alpha = 0.4 + Math.random() * 0.5;
      this.color = Math.random() > 0.5 ? '0,200,255' : '57,255,20';
      this.size  = 0.5 + Math.random() * 1.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x > W + 100) this.reset();
    }
    draw() {
      const grad = ctx.createLinearGradient(this.x - this.len, this.y - this.len * 0.3, this.x, this.y);
      grad.addColorStop(0, `rgba(${this.color},0)`);
      grad.addColorStop(1, `rgba(${this.color},${this.alpha})`);
      ctx.beginPath();
      ctx.moveTo(this.x - this.len, this.y - this.len * 0.3);
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = grad;
      ctx.lineWidth   = this.size;
      ctx.stroke();
      // head glow
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < 18; i++) comets.push(new Comet());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    // dark bg gradient
    const bg = ctx.createRadialGradient(W/2, H/2, 0, W/2, H/2, Math.max(W,H)*0.75);
    bg.addColorStop(0, 'rgba(13,20,40,1)');
    bg.addColorStop(1, 'rgba(7,10,18,1)');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, W, H);

    comets.forEach(c => { c.update(); c.draw(); });
    requestAnimationFrame(loop);
  }
  loop();
}

// ── SCROLL FADE IN ──
const fadeEls = document.querySelectorAll('.fade-up');
if (fadeEls.length) {
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
  }, { threshold: 0.12 });
  fadeEls.forEach(el => obs.observe(el));
}

// ── ACTIVE NAV LINK ──
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === currentPage || (currentPage === '' && href === 'index.html')) {
    a.classList.add('active');
  } else {
    a.classList.remove('active');
  }
});
