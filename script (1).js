// ===== CUSTOM CURSOR =====
const dot  = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
document.addEventListener('mousemove', e => {
  dot.style.left  = e.clientX + 'px';
  dot.style.top   = e.clientY + 'px';
  setTimeout(() => { ring.style.left = e.clientX+'px'; ring.style.top = e.clientY+'px'; }, 80);
});
document.querySelectorAll('a,button,.service-card,.project-card,.skill-card,.contact-link').forEach(el => {
  el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
  el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

// ===== ACTIVE NAV ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if(window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(a => { a.classList.remove('active'); if(a.getAttribute('href') === '#'+current) a.classList.add('active'); });
  // navbar shrink
  document.getElementById('navbar').style.padding = window.scrollY > 60 ? '.75rem 6%' : '1.1rem 6%';
  // back to top
  document.getElementById('btt').classList.toggle('show', window.scrollY > 400);
});

// ===== SCROLL REVEAL =====
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('visible');
      // skill bars
      e.target.querySelectorAll('.skill-bar-fill').forEach(b => b.style.width = b.dataset.pct+'%');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Also observe skill fills directly
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.style.width = e.target.dataset.pct+'%'; });
}, { threshold: 0.2 });
document.querySelectorAll('.skill-bar-fill').forEach(b => skillObs.observe(b));

// ===== COUNTER ANIMATION =====
function animateCounter(el, target, duration=1800) {
  let start = 0; const step = target/duration*16;
  const tick = () => {
    start = Math.min(start+step, target);
    el.textContent = Math.floor(start)+(el.dataset.suffix||'');
    if(start < target) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counterObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.querySelectorAll('[data-count]').forEach(el => {
        animateCounter(el, parseInt(el.dataset.count));
      });
      counterObs.unobserve(e.target);
    }
  });
}, {threshold:.3});
const statsEl = document.querySelector('.hero-stats');
if(statsEl) counterObs.observe(statsEl);

// ===== MOBILE MENU =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');
hamburger.addEventListener('click', () => mobileNav.classList.toggle('open'));
document.getElementById('mobileClose').addEventListener('click', () => mobileNav.classList.remove('open'));
document.querySelectorAll('.mobile-nav a').forEach(a => a.addEventListener('click', () => mobileNav.classList.remove('open')));

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e){
  e.preventDefault();
  const btn = document.getElementById('submitBtn');
  btn.textContent = '✓ Message Sent!';
  btn.style.background = '#22c55e';
  setTimeout(() => { btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message'; btn.style.background = ''; }, 3500);
  this.reset();
});

// ===== TYPED ROLE =====
const roles = ['Web Developer', 'CSE Student', 'Python Developer', 'AI/ML Enthusiast', 'Intern @ GBU'];
let ri=0, ci=0, deleting=false;
const typed = document.getElementById('typedRole');
function typeLoop(){
  const word = roles[ri];
  if(!deleting){ typed.textContent = word.slice(0,++ci); if(ci===word.length){ deleting=true; setTimeout(typeLoop,1800); return; } }
  else{ typed.textContent = word.slice(0,--ci); if(ci===0){ deleting=false; ri=(ri+1)%roles.length; } }
  setTimeout(typeLoop, deleting?60:110);
}
typeLoop();
