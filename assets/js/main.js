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
