/* Landing 3 · test de nivel (estimación N1-N5) */
addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('t-form');
  if (!form) return;

  const qs = [...form.querySelectorAll('.q')];
  const step = document.getElementById('t-step');
  const res = document.getElementById('t-res');
  const respuestas = [];

  const NIVELES = [
    { k: 'N1', t: 'Suspensión y base',
      d: 'Tu punto de partida está en construir el hombro: colgarte sin molestias y controlar la escápula. Es donde empieza la mayoría de la gente entre 35 y 55 años, y donde se arregla casi todo lo que arrastras.',
      next: 'Colgarte 20 s sin molestias' },
    { k: 'N2', t: 'Tracción asistida',
      d: 'Ya sostienes tu peso; toca convertir eso en fuerza de tracción con asistencias graduadas y negativas controladas. Es el nivel donde la primera dominada pasa de sueño a fecha en el calendario.',
      next: 'Tu primera dominada estricta' },
    { k: 'N3', t: 'Dominada estricta',
      d: 'Ya haces dominadas limpias. Aquí es donde se atasca casi todo el mundo que entrena por su cuenta: se repiten series sin plan y el número no sube en meses.',
      next: '8 dominadas y fondos completos' },
    { k: 'N4', t: 'Fuerza y transición',
      d: 'Tienes fuerza de sobra para empezar a trabajar la transición por encima de la barra. Con trabajo específico, el muscle-up es cuestión de semanas, no de años.',
      next: 'Tu primer muscle-up' },
    { k: 'N5', t: 'Muscle-up y habilidades',
      d: 'Ya estás por encima de la barra. A partir de aquí el trabajo va de limpiar la técnica, añadir lastre y elegir la siguiente habilidad.',
      next: 'Muscle-up lastrado y nuevas habilidades' }
  ];

  const mostrar = (i) => {
    qs.forEach((q, n) => q.classList.toggle('is-on', n === i));
    step.textContent = `${i + 1} / ${qs.length}`;
  };

  const calcular = () => {
    const [colgar, doms, extra] = respuestas;
    let n = 0;
    if (doms >= 3) n = 3; else if (doms === 2) n = 3; else if (doms === 1) n = 2; else n = colgar >= 2 ? 1 : 0;
    if (extra === 3 && doms >= 2) n = 4;
    if (colgar === 0) n = Math.min(n, 1);
    n = Math.max(0, Math.min(4, n));

    const lv = NIVELES[n];
    document.getElementById('r-lvl').textContent = lv.k;
    document.getElementById('r-title').textContent = lv.t;
    document.getElementById('r-txt').textContent = lv.d;
    document.getElementById('r-next').textContent = lv.next;
    document.getElementById('r-cta').href = PD.wa(
      `Hola 👋 He hecho el test de la web y me sale nivel ${lv.k} (${lv.t}). Quiero reservar la sesión de prueba para confirmarlo.`
    );
    form.hidden = true;
    res.hidden = false;
    step.textContent = 'Resultado';
  };

  form.addEventListener('click', e => {
    const b = e.target.closest('button[data-v]');
    if (!b) return;
    const q = b.closest('.q');
    [...q.querySelectorAll('button')].forEach(x => x.classList.toggle('is-on', x === b));
    respuestas[qs.indexOf(q)] = +b.dataset.v;
    const siguiente = qs.indexOf(q) + 1;
    setTimeout(() => (siguiente < qs.length ? mostrar(siguiente) : calcular()), 180);
  });

  document.getElementById('r-again').addEventListener('click', () => {
    respuestas.length = 0;
    form.querySelectorAll('button.is-on').forEach(b => b.classList.remove('is-on'));
    res.hidden = true;
    form.hidden = false;
    mostrar(0);
  });

  mostrar(0);
});
