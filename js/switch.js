/* Selector temporal de landings — BORRAR antes de publicar la versión definitiva */
(() => {
  const OPCIONES = [
    { href: 'l1.html', n: '1', t: 'El objetivo' },
    { href: 'l2.html', n: '2', t: 'Tu tiempo' },
    { href: 'l3.html', n: '3', t: 'Tu nivel' }
  ];
  const actual = location.pathname.split('/').pop() || 'index.html';

  const css = `
  .pd-switch{position:fixed;left:14px;bottom:14px;z-index:9999;
    display:flex;align-items:center;gap:4px;padding:5px;border-radius:99px;
    background:rgba(12,12,14,.86);backdrop-filter:blur(14px);
    border:1px solid rgba(255,255,255,.16);box-shadow:0 10px 34px -12px rgba(0,0,0,.8);
    font:600 12px/1 'Barlow',system-ui,sans-serif;letter-spacing:.08em;text-transform:uppercase;
    transition:opacity .25s,transform .25s}
  .pd-switch.pd-min{opacity:.25}
  .pd-switch:hover{opacity:1}
  .pd-switch a{display:flex;align-items:center;gap:6px;color:#c9c9d0;text-decoration:none;
    padding:7px 12px;border-radius:99px;white-space:nowrap;transition:.18s}
  .pd-switch a:hover{color:#fff;background:rgba(255,255,255,.09)}
  .pd-switch a.on{background:#E02828;color:#fff}
  .pd-switch a b{font-weight:800}
  .pd-switch span.pd-tag{color:#6d6d76;padding-left:9px;padding-right:3px;font-size:10px}
  .pd-switch .pd-x{color:#6d6d76;padding:7px 10px;cursor:pointer;background:none;border:0;font:inherit}
  @media (max-width:640px){
    .pd-switch{left:10px;bottom:10px;font-size:11px}
    .pd-switch a i{display:none}
    .pd-switch span.pd-tag{display:none}
  }`;

  const style = document.createElement('style');
  style.textContent = css;
  document.head.append(style);

  const bar = document.createElement('nav');
  bar.className = 'pd-switch';
  bar.setAttribute('aria-label', 'Cambiar de versión de landing');
  bar.innerHTML = '<span class="pd-tag">Versiones</span>' + OPCIONES.map(o =>
    `<a href="${o.href}" class="${o.href === actual ? 'on' : ''}"><b>${o.n}</b><i>${o.t}</i></a>`
  ).join('') + '<button class="pd-x" title="Ocultar">✕</button>';
  document.body.append(bar);

  bar.querySelector('.pd-x').addEventListener('click', () => bar.remove());

  // Se atenúa al hacer scroll para no molestar; vuelve al pasar el ratón
  addEventListener('scroll', () => bar.classList.toggle('pd-min', scrollY > 200), { passive: true });
})();
