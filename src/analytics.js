const token = import.meta.env.VITE_MIXPANEL_TOKEN;

if (token) {
  const { default: mixpanel } = await import('mixpanel-browser/dist/mixpanel-core.cjs.js');
  mixpanel.init(token, {
    track_pageview: true,
    persistence: 'localStorage',
    ignore_dnt: false,
  });

  document.addEventListener('click', (event) => {
    const link = event.target.closest('[data-cta]');
    if (!link) return;
    mixpanel.track('CTA Clicked', {
      cta: link.dataset.cta,
      location: link.dataset.ctaLocation,
      href: link.getAttribute('href'),
    });
  });

  document.getElementById('film')?.addEventListener('aeros:film-progress', (event) => {
    mixpanel.track('Film Scrolled', { percent: event.detail.percent });
  });

  document.querySelectorAll('video[data-video]').forEach((video) => {
    const props = () => ({ video: video.dataset.video, position_s: Math.round(video.currentTime) });
    video.addEventListener('aeros:sound', () => mixpanel.track('Video Started', props()));
    video.addEventListener('pause', () => {
      if (!video.muted && !video.ended) mixpanel.track('Video Paused', props());
    });
    video.addEventListener('ended', () => {
      if (!video.muted) mixpanel.track('Video Completed', props());
    });
  });
}
