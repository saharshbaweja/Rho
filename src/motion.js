const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const clamp = (v) => Math.min(1, Math.max(0, v));

const nav = document.getElementById('nav');
const hero = document.getElementById('top');
const heroArt = hero.querySelector('.hero__art img');
const heroInner = hero.querySelector('.hero__inner');
const navLinks = [...nav.querySelectorAll('.nav__links a')];
let lastY = window.scrollY;

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    const link = navLinks.find((a) => a.getAttribute('href') === '#' + entry.target.id);
    link?.classList.toggle('is-active', entry.isIntersecting);
  });
}, { rootMargin: '-45% 0px -45% 0px' });
navLinks.forEach((a) => {
  const target = document.querySelector(a.getAttribute('href'));
  if (target) sectionObserver.observe(target);
});

const sectors = [...document.querySelectorAll('.sector')];
const demo = document.querySelector('.screen--app');

function onScroll() {
  const y = window.scrollY;
  const max = document.documentElement.scrollHeight - window.innerHeight;
  nav.style.setProperty('--p', String(clamp(y / max)));
  nav.classList.toggle('is-solid', y > hero.offsetHeight - 80);
  if (Math.abs(y - lastY) > 6) {
    nav.classList.toggle('is-hidden', y > lastY && y > hero.offsetHeight * 0.6);
    lastY = y;
  }
  if (reduceMotion) return;

  if (y < hero.offsetHeight) {
    const h = y / hero.offsetHeight;
    heroArt.style.transform = `translateY(${y * 0.3}px) scale(${1 + h * 0.06})`;
    heroInner.style.transform = `translateY(${y * -0.12}px)`;
    heroInner.style.opacity = String(1 - h * 1.2);
  }

  sectors.forEach((sector, i) => {
    const panel = sector.firstElementChild;
    const rect = panel.getBoundingClientRect();
    const img = panel.querySelector('img');
    const enter = clamp(1 - rect.top / window.innerHeight);
    img.style.transform = `scale(${1.12 - enter * 0.12})`;
    const next = sectors[i + 1];
    if (!next) return;
    const cover = clamp(1 - (next.getBoundingClientRect().top - rect.top) / rect.height);
    panel.style.transform = `scale(${1 - cover * 0.06})`;
    panel.style.filter = `brightness(${1 - cover * 0.55})`;
  });

  if (demo) {
    const r = demo.getBoundingClientRect();
    const t = clamp((window.innerHeight - r.top) / (window.innerHeight * 0.8));
    demo.style.transform = `scale(${0.86 + t * 0.14})`;
  }
}
onScroll();
window.addEventListener('scroll', onScroll, { passive: true });
window.addEventListener('resize', onScroll);

if (!reduceMotion) {
  const splitWords = (el) => {
    let i = 0;
    const walk = (node) => {
      [...node.childNodes].forEach((child) => {
        if (child.nodeType === Node.ELEMENT_NODE) return walk(child);
        if (child.nodeType !== Node.TEXT_NODE || !child.textContent.trim()) return;
        const frag = document.createDocumentFragment();
        child.textContent.split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) return frag.append(part);
          const outer = document.createElement('span');
          outer.className = 'w';
          const inner = document.createElement('span');
          inner.textContent = part;
          inner.style.setProperty('--i', String(i++));
          outer.append(inner);
          frag.append(outer);
        });
        child.replaceWith(frag);
      });
    };
    walk(el);
  };

  const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/■';
  const decode = (el) => {
    const final = el.textContent;
    const start = performance.now();
    const duration = Math.min(900, 300 + final.length * 22);
    const frame = (now) => {
      const p = clamp((now - start) / duration);
      const settled = Math.floor(p * final.length);
      el.textContent = [...final].map((ch, i) => (i < settled || ch === ' ' || ch === '·' ? ch : glyphs[(Math.random() * glyphs.length) | 0])).join('');
      if (p < 1) requestAnimationFrame(frame);
      else el.textContent = final;
    };
    requestAnimationFrame(frame);
  };

  const headings = document.querySelectorAll('.hero h1, .brief h2, .clock__title, .sector h2, .statement, .mission h2, .modules h2, .control .quote, .closing h2');
  headings.forEach(splitWords);
  const decoders = document.querySelectorAll('.hero__kicker, .label, .clock__label, .sector__top span, .hero__index a, .connects > .mono');
  decoders.forEach((el) => { el.dataset.decode = ''; });

  const rise = document.querySelectorAll('.brief__grid p, .intro, .three > div, .connects, .request, .steps li, .rows li, .closing .actions, .closing__cols > div');
  rise.forEach((el) => {
    el.dataset.rise = '';
    const siblings = [...el.parentElement.children].filter((c) => c.matches('[data-rise]'));
    el.style.setProperty('--d', String(siblings.indexOf(el)));
  });

  const seen = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      el.classList.add('is-in');
      if ('decode' in el.dataset) decode(el);
      seen.unobserve(el);
    });
  }, { rootMargin: '0px 0px -12% 0px' });
  [...headings, ...decoders, ...rise, document.querySelector('.footer__mark')].forEach((el) => el && seen.observe(el));
} else {
  document.querySelector('.footer__mark')?.classList.add('is-in');
}
