/* Base compartida por las tres landings: WhatsApp, reveal, menú, año */
addEventListener('error', () => document.documentElement.classList.remove('js'));

window.PD = (() => {
  'use strict';

  const WA_PHONE = '34626428569';
  const WA_DEFAULT = 'Hola PowerDoom 👋 Quiero información sobre las clases de calistenia.';

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const wa = (msg) => `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg || WA_DEFAULT)}`;

  // Enlaces declarativos: <a data-wa="mensaje">
  const bindWa = (root = document) => $$('[data-wa]', root).forEach(el => {
    el.href = wa(el.dataset.wa);
    el.target = '_blank';
    el.rel = 'noopener';
  });
  bindWa();

  // Aparición al hacer scroll
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((es, obs) => {
      es.forEach((e, i) => {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = Math.min(i * 55, 220) + 'ms';
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -6% 0px', threshold: 0.06 });
    $$('.reveal').forEach(el => io.observe(el));

    // Contadores
    const cio = new IntersectionObserver((es, obs) => {
      es.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, end = +el.dataset.count, t0 = performance.now();
        const step = now => {
          const p = Math.min((now - t0) / 1000, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: .5 });
    $$('[data-count]').forEach(el => cio.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-in'));
  }

  // Cabecera con fondo al hacer scroll
  const nav = $('[data-nav]');
  if (nav) addEventListener('scroll', () => nav.classList.toggle('is-stuck', scrollY > 40), { passive: true });

  // Menú móvil
  const burger = $('[data-burger]'), menu = $('[data-menu]');
  if (burger && menu) {
    burger.addEventListener('click', () => {
      const open = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!open));
      menu.hidden = open;
    });
    $$('a', menu).forEach(a => a.addEventListener('click', () => {
      burger.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }));
  }

  const y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();

  return { $, $$, wa, bindWa };
})();
