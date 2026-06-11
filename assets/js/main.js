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

  // Realistic fish: oval body + forked tail + dorsal/pectoral fins + eye
  function fishSvg(w, color, flip) {
    const h = Math.round(w * 0.52);
    const gid = 'fg' + (w * 100 + Math.floor(Math.random() * 9999)) | 0;
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 90 47"' +
      (flip ? ' style="transform:scaleX(-1)"' : '') + '>' +
      '<defs><radialGradient id="' + gid + '" cx="62%" cy="38%" r="52%">' +
        '<stop offset="0%" stop-color="' + color + '" stop-opacity="1.1"/>' +
        '<stop offset="100%" stop-color="' + color + '" stop-opacity="0.5"/>' +
      '</radialGradient></defs>' +
      // forked tail
      '<path d="M24 23 L4 9 L13 23 L4 37 Z" fill="' + color + '" opacity="0.85"/>' +
      // narrow caudal peduncle
      '<path d="M24 17 Q30 23 24 29 Q19 26 19 23 Q19 20 24 17 Z" fill="' + color + '" opacity="0.45"/>' +
      // body
      '<ellipse cx="51" cy="23" rx="27" ry="15" fill="url(#' + gid + ')"/>' +
      // dorsal fin
      '<path d="M37 8 Q50 2 62 9 L59 10 Q49 5 37 9 Z" fill="' + color + '" opacity="0.68"/>' +
      // pectoral fin
      '<path d="M52 30 Q60 38 54 37 Q47 34 52 30 Z" fill="' + color + '" opacity="0.56"/>' +
      // eye
      '<circle cx="68" cy="19" r="4" fill="#060e16" opacity="0.78"/>' +
      '<circle cx="69" cy="18" r="1.5" fill="white" opacity="0.52"/>' +
      // lateral line
      '<path d="M42 19 Q55 17 66 20" stroke="' + color + '" stroke-width="0.9" stroke-opacity="0.30" fill="none"/>' +
      '</svg>';
  }

  // Realistic child swimmer: proper head/body, cap, arms, flutter kick
  function swimmerSvg(w, color, flip) {
    const h = Math.round(w * 0.48);
    const kickboard = Math.random() < 0.38;
    if (kickboard) {
      return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 160 77"' +
        (flip ? ' style="transform:scaleX(-1)"' : '') + '>' +
        // flutter kick
        '<path d="M38 44 Q28 50 18 56" stroke="' + color + '" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.88"/>' +
        '<path d="M44 47 Q34 38 26 30" stroke="' + color + '" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.88"/>' +
        // torso — thick stroke = mass
        '<path d="M40 46 Q75 38 108 40 Q118 41 128 43" stroke="' + color + '" stroke-width="14" stroke-linecap="round" fill="none"/>' +
        // neck
        '<line x1="128" y1="43" x2="133" y2="40" stroke="' + color + '" stroke-width="8" stroke-linecap="round"/>' +
        // head (child: big relative to body)
        '<circle cx="142" cy="36" r="14" fill="' + color + '"/>' +
        // swim cap highlight
        '<path d="M130 27 Q142 21 154 27" stroke="white" stroke-width="3" stroke-opacity="0.28" fill="none" stroke-linecap="round"/>' +
        // arms on board
        '<path d="M128 42 Q136 43 146 42" stroke="' + color + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        // kickboard
        '<rect x="144" y="37" width="16" height="9" rx="3.5" fill="' + color + '" opacity="0.72"/>' +
        // splash
        '<circle cx="14" cy="46" r="3" fill="' + color + '" opacity="0.55"/>' +
        '<circle cx="22" cy="36" r="2.2" fill="' + color + '" opacity="0.45"/>' +
        '<circle cx="10" cy="56" r="2.5" fill="' + color + '" opacity="0.45"/>' +
        '</svg>';
    } else {
      return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 160 77"' +
        (flip ? ' style="transform:scaleX(-1)"' : '') + '>' +
        // flutter kick
        '<path d="M38 46 Q28 54 18 60" stroke="' + color + '" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.88"/>' +
        '<path d="M44 48 Q34 38 26 30" stroke="' + color + '" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.88"/>' +
        // torso
        '<path d="M40 47 Q75 40 110 42 Q120 43 130 46" stroke="' + color + '" stroke-width="14" stroke-linecap="round" fill="none"/>' +
        '<line x1="130" y1="46" x2="135" y2="42" stroke="' + color + '" stroke-width="8" stroke-linecap="round"/>' +
        // head
        '<circle cx="144" cy="38" r="14" fill="' + color + '"/>' +
        '<path d="M132 28 Q144 22 156 28" stroke="white" stroke-width="3" stroke-opacity="0.28" fill="none" stroke-linecap="round"/>' +
        // lead arm extended
        '<path d="M130 45 Q142 47 158 44" stroke="' + color + '" stroke-width="8" stroke-linecap="round" fill="none"/>' +
        '<ellipse cx="158" cy="44" rx="7" ry="4.5" fill="' + color + '" opacity="0.82" transform="rotate(-8 158 44)"/>' +
        // recovery arm arching over — the defining freestyle marker
        '<path d="M118 40 Q130 24 138 28" stroke="' + color + '" stroke-width="7" stroke-linecap="round" fill="none" opacity="0.82"/>' +
        // splash
        '<circle cx="14" cy="48" r="3" fill="' + color + '" opacity="0.55"/>' +
        '<circle cx="22" cy="37" r="2.2" fill="' + color + '" opacity="0.45"/>' +
        '<circle cx="10" cy="58" r="2.5" fill="' + color + '" opacity="0.45"/>' +
        '<circle cx="28" cy="29" r="1.8" fill="' + color + '" opacity="0.38"/>' +
        '</svg>';
    }
  }

  function addScenery(el, opts) {
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    const pool = el.classList.contains('hero-pool');

    // floor: tiled pool bottom on swim pages, coral reef elsewhere
    if (opts.reef) {
      const floor = document.createElement('div');
      floor.className = pool ? 'pool-floor' : 'reef-floor';
      floor.setAttribute('aria-hidden', 'true');
      el.appendChild(floor);
    }

    for (let i = 0; i < (opts.fish || 0); i++) {
      const wrap = document.createElement('div');
      const goingLeft = Math.random() < 0.5;
      wrap.className = (pool ? 'swimmer-kid' : 'swim-fish') + (goingLeft ? ' rtl' : '');
      wrap.setAttribute('aria-hidden', 'true');
      const flip = pool ? goingLeft : !goingLeft; // swimmers face right, fish face left

      if (pool) {
        // children swimming: a bit larger, ink-toned, mid-water
        wrap.style.top = (20 + Math.random() * 42) + '%';
        const size = 60 + Math.random() * 55;
        const a = 0.18 + (size / 115) * 0.16;
        wrap.innerHTML = swimmerSvg(size, 'rgba(10, 31, 46, ' + a.toFixed(2) + ')', flip);
      } else {
        wrap.style.top = (8 + Math.random() * 55) + '%';
        const size = 16 + Math.random() * 36;
        const a = 0.07 + (size / 52) * 0.11;
        const color = 'rgba(245, 237, 224, ' + a.toFixed(2) + ')';
        const school = Math.random() < 0.3;
        wrap.innerHTML = school
          ? fishSvg(size, color, flip) + fishSvg(size * 0.7, color, flip) + fishSvg(size * 0.5, color, flip)
          : fishSvg(size, color, flip);
      }

      const dur = pool ? (22 + Math.random() * 26) : (28 + Math.random() * 42);
      wrap.style.animation = (goingLeft ? 'swimLeft' : 'swimRight') + ' ' + dur + 's linear infinite';
      wrap.style.animationDelay = (-Math.random() * dur) + 's';
      wrap.querySelectorAll('svg').forEach(s => {
        s.style.animationDuration = (3 + Math.random() * 3) + 's';
        s.style.animationDelay = (-Math.random() * 3) + 's';
      });
      el.appendChild(wrap);
    }
  }

  document.querySelectorAll('.hero').forEach(h => {
    addScenery(h, { reef: true, fish: h.classList.contains('short') ? 5 : 8 });
  });
  document.querySelectorAll('.final-cta').forEach(s => {
    addScenery(s, { reef: true, fish: 4 });
  });

  // ============ FORM HANDLERS (placeholder) ============
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const formType = form.dataset.form;
      const btn = form.querySelector('button[type="submit"]');
      const orig = btn.innerHTML;
      btn.innerHTML = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '✓ Got it. We\'ll be in touch.';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = orig;
          btn.disabled = false;
        }, 3000);
      }, 800);
    });
  });

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
