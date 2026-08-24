/* PowerDoom · landing — vanilla, sin dependencias */
// Red de seguridad: si algo falla, se muestra todo el contenido igualmente
addEventListener('error', () => document.documentElement.classList.remove('js'));

(() => {
  'use strict';

  // ── Configuración editable ────────────────────────────────
  const WA_PHONE = '34626428569';                  // WhatsApp del centro
  const WA_DEFAULT = 'Hola PowerDoom 👋 Quiero información sobre el gimnasio.';

  // Mensaje y etiqueta del botón flotante según la sección visible
  const WA_BY_SECTION = {
    top:           ['¿Hablamos?',        'Hola PowerDoom 👋 Quiero información para empezar a entrenar.'],
    disciplinas:   ['Dudas de tu nivel', 'Hola PowerDoom 👋 Me interesa entrenar {sec}. ¿Qué me recomendáis según mi nivel?'],
    diferencial:   ['¿Te lo enseñamos?', 'Hola PowerDoom 👋 Vengo de otro gimnasio y quiero saber cómo funciona el vuestro.'],
    nosotros:      ['Ven a conocernos',  'Hola PowerDoom 👋 Me gustaría pasarme a conocer el centro. ¿Cuándo puedo ir?'],
    instalaciones: ['Ver la sala',       'Hola PowerDoom 👋 He visto las fotos de las instalaciones. ¿Puedo ir a verlas en persona?'],
    resultados:    ['Empieza tu caso',   'Hola PowerDoom 👋 He visto los casos de éxito y quiero empezar. ¿Cómo lo hago?'],
    tarifas:       ['Reservar plaza',    'Hola PowerDoom 👋 Quiero información sobre las tarifas y darme de alta.'],
    empezar:       ['Empezar ahora',     'Hola PowerDoom 👋 Quiero dar el primer paso y empezar a entrenar.'],
    faq:           ['Otra pregunta',     'Hola PowerDoom 👋 Tengo una duda que no aparece en las preguntas frecuentes:'],
    ubicacion:     ['Cómo llegar',       'Hola PowerDoom 👋 ¿Me confirmáis la ubicación y cómo acceder al centro?']
  };

  const waLink = (msg) =>
    `https://wa.me/${WA_PHONE}?text=${encodeURIComponent(msg || WA_DEFAULT)}`;

  const $  = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // ── Enlaces de WhatsApp declarativos: [data-wa="mensaje"] ──
  $$('[data-wa]').forEach(el => {
    el.setAttribute('href', waLink(el.dataset.wa));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener');
  });

  // ── Nav: fondo al hacer scroll + sección activa ───────────
  const nav = $('#nav');
  const navLinks = $$('.nav__links a');
  const sections = $$('main section[id]');
  const fab = $('#wafab');
  const fabLabel = $('#wafab-label');

  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      nav.classList.toggle('is-stuck', scrollY > 40);
      fab.classList.toggle('is-in', scrollY > 380);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });

  // ── Botón flotante de WhatsApp, dinámico por sección ──────
  const setFab = (id) => {
    const [label, msg] = WA_BY_SECTION[id] || WA_BY_SECTION.top;
    fabLabel.textContent = label;
    fab.href = waLink(msg.replace('{sec}', 'powerlifting, streetlifting o calistenia'));
    fab.dataset.section = id;
  };
  setFab('top');

  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const id = e.target.id;
        if (WA_BY_SECTION[id]) setFab(id);
        navLinks.forEach(a => a.classList.toggle('is-active', a.hash === '#' + id));
      });
    }, { rootMargin: '-45% 0px -45% 0px' });
    sections.forEach(s => spy.observe(s));

    // ── Reveal al hacer scroll ──────────────────────────────
    const rev = new IntersectionObserver((entries, obs) => {
      entries.forEach((e, i) => {
        if (!e.isIntersecting) return;
        e.target.style.transitionDelay = Math.min(i * 60, 240) + 'ms';
        e.target.classList.add('is-in');
        obs.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    $$('.reveal').forEach(el => rev.observe(el));

    // ── Contadores de las estadísticas ──────────────────────
    const cnt = new IntersectionObserver((entries, obs) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target, end = +el.dataset.count, t0 = performance.now(), dur = 1100;
        const step = (now) => {
          const p = Math.min((now - t0) / dur, 1);
          el.textContent = Math.round(end * (1 - Math.pow(1 - p, 3))).toLocaleString('es-ES');
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        obs.unobserve(el);
      });
    }, { threshold: 0.5 });
    $$('[data-count]').forEach(el => cnt.observe(el));
  } else {
    $$('.reveal').forEach(el => el.classList.add('is-in'));
  }

  // ── Menú móvil ────────────────────────────────────────────
  const burger = $('#burger'), mobile = $('#mobile-menu');
  const closeMenu = () => { burger.setAttribute('aria-expanded', 'false'); mobile.hidden = true; };
  burger.addEventListener('click', () => {
    const open = burger.getAttribute('aria-expanded') === 'true';
    burger.setAttribute('aria-expanded', String(!open));
    mobile.hidden = open;
  });
  $$('a', mobile).forEach(a => a.addEventListener('click', closeMenu));

  // ── Filtros de galería ────────────────────────────────────
  const items = $$('.gal__i');
  $$('.chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const f = chip.dataset.filter;
      $$('.chip').forEach(c => { c.classList.toggle('is-on', c === chip); c.setAttribute('aria-selected', String(c === chip)); });
      items.forEach(i => i.classList.toggle('is-hidden', f !== 'all' && i.dataset.cat !== f));
    });
  });

  // ── Lightbox ──────────────────────────────────────────────
  const lb = $('#lb'), lbImg = $('#lb-img'), lbCap = $('#lb-cap');
  let idx = 0;
  const visible = () => items.filter(i => !i.classList.contains('is-hidden'));
  const show = (i) => {
    const list = visible();
    idx = (i + list.length) % list.length;
    const fig = list[idx], img = $('img', fig);
    lbImg.src = img.dataset.full || img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = $('figcaption', fig)?.textContent || '';
  };
  const open = (i) => { show(i); lb.hidden = false; document.body.style.overflow = 'hidden'; };
  const close = () => { lb.hidden = true; lbImg.src = ''; document.body.style.overflow = ''; };

  items.forEach(fig => fig.addEventListener('click', () => open(visible().indexOf(fig))));
  $('.lb__x').addEventListener('click', close);
  $('.lb__prev').addEventListener('click', () => show(idx - 1));
  $('.lb__next').addEventListener('click', () => show(idx + 1));
  lb.addEventListener('click', e => { if (e.target === lb) close(); });
  addEventListener('keydown', e => {
    if (lb.hidden) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowRight') show(idx + 1);
    if (e.key === 'ArrowLeft') show(idx - 1);
  });

  // ── Mapa diferido: solo se carga al pulsar ────────────────
  const map = $('#map');
  map?.addEventListener('click', () => {
    if ($('iframe', map)) return;
    const f = document.createElement('iframe');
    f.src = map.dataset.src;
    f.loading = 'lazy';
    f.title = 'Ubicación de PowerDoom en Albacete';
    f.referrerPolicy = 'no-referrer-when-downgrade';
    f.allowFullscreen = true;
    map.append(f);
  }, { once: false });

  // ── Año del footer ────────────────────────────────────────
  $('#year').textContent = new Date().getFullYear();
})();
