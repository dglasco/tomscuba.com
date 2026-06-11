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

  // ============ UNDERWATER SCENERY: reef floor + drifting fish ============
  const FISH_PATH = 'M2 12 Q12 2 24 5 Q32 7 36 12 L46 5 Q43 12 46 19 L36 12 Q32 17 24 19 Q12 22 2 12 Z';

  function fishSvg(w, color, flip) {
    const h = Math.round(w / 2);
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 48 24"' +
      (flip ? ' style="transform: scaleX(-1);"' : '') +
      '><path d="' + FISH_PATH + '" fill="' + color + '"/></svg>';
  }

  // kid swimmer glyphs (facing right): freestyle + kickboard poses
  function swimmerSvg(w, color, flip) {
    const h = Math.round(w * 0.34);
    const kickboard = Math.random() < 0.45;
    const body = kickboard
      ? '<circle cx="49" cy="8" r="4.6"/>' +
        '<rect x="55" y="5.5" width="9" height="5" rx="2.5"/>' +
        '<path d="M44 11 C36 13 26 12 16 14 C12 15 8 13 4 15" fill="none" stroke-width="5" stroke-linecap="round"/>'
      : '<circle cx="50" cy="7" r="4.6"/>' +
        '<path d="M46 10 C52 6 58 5 63 7" fill="none" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M44 11 C36 15 26 15 18 12 C12 10 8 12 3 14" fill="none" stroke-width="5" stroke-linecap="round"/>';
    const splash = '<circle cx="6" cy="8" r="1.6"/><circle cx="11" cy="5" r="1.2"/><circle cx="3" cy="12" r="1.1"/>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 66 22"' +
      (flip ? ' style="transform: scaleX(-1);"' : '') +
      '><g fill="' + color + '" stroke="' + color + '">' + body + splash + '</g></svg>';
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
        wrap.style.top = (22 + Math.random() * 42) + '%';
        const size = 46 + Math.random() * 44;
        const a = 0.12 + (size / 90) * 0.12;
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
