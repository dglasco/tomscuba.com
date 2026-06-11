// Tom's Dive & Swim — main site JS
(function() {
  'use strict';

  // ============ STICKY NAV ============
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 60) nav.classList.add('scrolled');
      else nav.classList.remove('scrolled');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ============ MOBILE MENU TOGGLE ============
  const toggle = document.querySelector('.menu-toggle');
  const links = document.querySelector('.nav-links');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('open');
    });
    // close on link tap
    links.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => links.classList.remove('open'));
    });
  }

  // ============ BUBBLES IN HERO ============
  const hero = document.querySelector('.hero.with-bubbles');
  if (hero) {
    for (let i = 0; i < 14; i++) {
      const b = document.createElement('div');
      b.className = 'bubble';
      const size = Math.random() * 16 + 6;
      b.style.width = size + 'px';
      b.style.height = size + 'px';
      b.style.left = Math.random() * 100 + '%';
      b.style.animationDuration = (Math.random() * 8 + 10) + 's';
      b.style.animationDelay = (Math.random() * 8) + 's';
      hero.appendChild(b);
    }
  }

  // ============ UNDERWATER SCENERY: reef floor + fish + swimmers ============

  // ============ UNDERWATER FLOOR SCENERY (pool only) ============
  function addScenery(el) {
    if (!el.classList.contains('hero-pool')) return;
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    const floor = document.createElement('div');
    floor.className = 'pool-floor';
    floor.setAttribute('aria-hidden', 'true');
    el.appendChild(floor);
  }

  document.querySelectorAll('.hero').forEach(h => addScenery(h));
    // ============ SCROLL REVEAL ============
  if ('IntersectionObserver' in window) {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll('.reveal').forEach(el => ro.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('visible'));
  }

  // ============ HERO PHOTO BACKGROUND ============
  document.querySelectorAll('.hero-photo-bg').forEach(img => {
    if (img.complete) img.classList.add('loaded');
    else img.addEventListener('load', () => img.classList.add('loaded'));
  });

  // ============ MOBILE STICKY BAR ============
  const bar = document.createElement('div');
  bar.className = 'mobile-bar';
  bar.setAttribute('aria-label', 'Quick actions');
  bar.innerHTML =
    '<a href="tel:5124513425">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 012 1.18 2 2 0 014 0h3a2 2 0 012 1.72c.13.96.34 1.9.64 2.81a2 2 0 01-.45 2.11L8 7.91a16 16 0 006.09 6.09l1.27-1.27a2 2 0 012.11-.45c.91.3 1.85.51 2.81.64A2 2 0 0122 16.92z"/></svg>' +
      'Call' +
    '</a>' +
    '<a href="https://shop.tomsscuba.com/" class="primary">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/></svg>' +
      'Book Now' +
    '</a>' +
    '<a href="https://maps.google.com/?q=5909+Burnet+Rd+Austin+TX+78757">' +
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>' +
      'Directions' +
    '</a>';
  document.body.appendChild(bar);

  // ============ FAQ ACCORDION ============
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (q) {
      q.addEventListener('click', () => {
        const open = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
        if (!open) item.classList.add('open');
      });
    }
  });

})();
