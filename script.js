window.addEventListener('load', () => {
  document.getElementById('pageLoader')?.classList.add('hidden');
});

document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const siteNav = document.getElementById('siteNav');
navToggle?.addEventListener('click', () => {
  const open = siteNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', String(open));
});
siteNav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  siteNav.classList.remove('open');
  navToggle?.setAttribute('aria-expanded', 'false');
}));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

let countersStarted = false;
const stats = document.querySelector('.stats');
const counterObserver = new IntersectionObserver((entries) => {
  if (!countersStarted && entries[0].isIntersecting) {
    countersStarted = true;
    document.querySelectorAll('[data-counter]').forEach(counter => {
      const target = Number(counter.dataset.counter);
      const duration = 1200;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        counter.textContent = Math.floor(progress * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }
}, { threshold: .35 });
if (stats) counterObserver.observe(stats);
