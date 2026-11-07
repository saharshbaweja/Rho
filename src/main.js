import 'lenis/dist/lenis.css';
import './style.css';
import './analytics.js';
import Lenis from 'lenis';

const nav = document.getElementById('nav');
const hero = document.getElementById('top');
const updateNav = () => nav.classList.toggle('is-solid', hero.getBoundingClientRect().bottom < 80);
updateNav();
window.addEventListener('scroll', updateNav, { passive: true });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduceMotion) {
  const lenis = new Lenis({
    lerp: 0.1,
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    lenis.scrollTo(target, {
      duration: 1.2,
      easing: (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2),
    });
  });
}

const screens = document.querySelectorAll('.screen');
const inView = new IntersectionObserver(
  (entries) => {
    for (const { target, isIntersecting } of entries) {
      const video = target.querySelector('video');
      if (isIntersecting && !reduceMotion) video.play().catch(() => {});
      else if (!isIntersecting) video.pause();
    }
  },
  { threshold: 0.35 }
);

screens.forEach((screen) => inView.observe(screen));

document.querySelectorAll('[data-video-sound]').forEach((button) => {
  const video = document.querySelector(`video[data-video="${button.dataset.videoSound}"]`);
  const screen = video.closest('.screen');
  button.addEventListener('click', () => {
    screen.classList.add('is-live');
    button.classList.add('is-hidden');
    video.muted = false;
    video.loop = false;
    video.currentTime = 0;
    video.controls = true;
    video.play();
    video.dispatchEvent(new CustomEvent('aeros:sound', { bubbles: true }));
  });
});

const film = document.getElementById('film');
const filmVideo = film.querySelector('[data-scrub]');
const filmTrack = film.querySelector('.film__track');
const filmIntro = film.querySelector('.film__intro');
const filmBar = film.querySelector('.film__progress span');
const filmMobile = window.matchMedia('(max-width: 760px)').matches;
const filmSrc = filmMobile ? '/films/aeros-film-scrub-mobile.mp4' : '/films/aeros-film-scrub.mp4';
const filmCaps = filmMobile ? [...film.querySelectorAll('.film__cap li')] : [];
if (filmMobile) filmVideo.poster = '/films/aeros-film-poster-mobile.jpg';
const milestones = [0.25, 0.5, 0.75, 1];
let filmVisible = false;
let filmLoaded = false;

const loadFilm = () => {
  if (filmLoaded) return;
  filmLoaded = true;
  filmVideo.src = filmSrc;
  filmVideo.preload = 'auto';
  filmVideo.load();
  filmVideo.play().then(() => filmVideo.pause()).catch(() => {});
};

new IntersectionObserver(([entry]) => entry.isIntersecting && loadFilm(), { rootMargin: '150% 0px' }).observe(film);
new IntersectionObserver(([entry]) => {
  filmVisible = entry.isIntersecting;
  if (filmVisible) requestAnimationFrame(scrubFilm);
}).observe(filmTrack);

function scrubFilm() {
  if (!filmVisible) return;
  const rect = filmTrack.getBoundingClientRect();
  const progress = Math.min(1, Math.max(0, -rect.top / (rect.height - window.innerHeight)));
  filmBar.style.transform = `scaleX(${progress})`;
  const fade = Math.min(1, progress / 0.06);
  filmIntro.style.opacity = String(1 - fade);
  filmIntro.style.transform = `translateY(${fade * -24}px)`;
  const target = progress * ((filmVideo.duration || 62) - 0.05);
  filmCaps.forEach((cap) => cap.classList.toggle('is-on', target >= +cap.dataset.from && target < +cap.dataset.to));
  if (filmVideo.duration && !filmVideo.seeking) {
    if (Math.abs(filmVideo.currentTime - target) > 0.02) filmVideo.currentTime = target;
  }
  while (milestones.length && progress >= milestones[0]) {
    film.dispatchEvent(new CustomEvent('aeros:film-progress', { detail: { percent: Math.round(milestones.shift() * 100) } }));
  }
  requestAnimationFrame(scrubFilm);
}
