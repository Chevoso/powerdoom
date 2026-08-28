/* Landing 4 · reseñas dinámicas
   Lee data/resenas.json y repinta el carrusel y la nota media.
   Si el JSON no está disponible, se queda lo que ya hay escrito en el HTML. */
addEventListener('DOMContentLoaded', async () => {
  const lista = document.querySelector('[data-resenas]');
  if (!lista) return;

  const esc = (s) => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  try {
    const r = await fetch('data/resenas.json', { cache: 'no-cache' });
    if (!r.ok) return;
    const d = await r.json();
    if (!Array.isArray(d.resenas) || !d.resenas.length) return;

    lista.innerHTML = d.resenas.map(x => {
      const n = Math.max(1, Math.min(5, Math.round(x.estrellas || 5)));
      return `<article class="resena">
        <span class="resena__stars" aria-label="${n} de 5">${'★'.repeat(n)}</span>
        <p class="resena__t">«${esc(x.texto)}»</p>
        <p class="resena__a"><b>${esc(x.autor)}</b><span>${esc(d.fuente || 'Google')}${x.fecha ? ' · ' + esc(x.fecha) : ''}</span></p>
      </article>`;
    }).join('');

    // Nota media: en la cabecera de la sección y en el badge del hero
    const nota = Number(d.nota).toLocaleString('es-ES', { minimumFractionDigits: 1 });
    document.querySelectorAll('[data-resenas-nota]').forEach(el => (el.textContent = nota));
    document.querySelectorAll('[data-resenas-total]').forEach(el => (el.textContent = `${d.total} reseñas`));
    if (d.url) document.querySelectorAll('[data-resenas-url]').forEach(el => (el.href = d.url));
  } catch { /* sin conexión o JSON inválido: se mantiene el contenido estático */ }
});
