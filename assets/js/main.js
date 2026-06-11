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

  // kid swimmer silhouettes (facing right): freestyle with recovery arm, or kickboard
  function swimmerSvg(w, color, flip) {
    const h = Math.round(w * 0.43);
    const kickboard = Math.random() < 0.4;
    const body = kickboard
      ? // kickboard: head up, arms forward to the board, flutter kick
        '<circle cx="50" cy="10" r="5.6"/>' +
        '<path d="M54 13 C58 12 61 12 64 13" fill="none" stroke-width="4" stroke-linecap="round"/>' +
        '<rect x="62" y="9.5" width="10" height="6" rx="3"/>' +
        '<path d="M45 14 C38 17 31 17 25 16" fill="none" stroke-width="6.5" stroke-linecap="round"/>' +
        '<path d="M25 15 C20 12 16 10 12 9" fill="none" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M25 17 C20 20 16 23 12 25" fill="none" stroke-width="5" stroke-linecap="round"/>'
      : // freestyle: lead arm reaching, recovery arm arched over the back, scissor kick
        '<circle cx="52" cy="11" r="5.6"/>' +
        '<path d="M56 14 C61 12 66 12 70 14" fill="none" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M45 12 C41 4 34 2 28 6" fill="none" stroke-width="4" stroke-linecap="round"/>' +
        '<path d="M47 14 C40 17 33 17 26 15" fill="none" stroke-width="6.5" stroke-linecap="round"/>' +
        '<path d="M26 14 C21 11 17 9 13 8" fill="none" stroke-width="5" stroke-linecap="round"/>' +
        '<path d="M26 16 C21 19 17 22 13 24" fill="none" stroke-width="5" stroke-linecap="round"/>';
    const splash = '<circle cx="9" cy="11" r="1.8"/><circle cx="14" cy="6" r="1.4"/><circle cx="7" cy="18" r="1.4"/><circle cx="12" cy="22" r="1.2"/>';
    return '<svg width="' + w + '" height="' + h + '" viewBox="0 0 74 32"' +
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
