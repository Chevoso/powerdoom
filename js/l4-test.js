/* Test de la web · pensado para el avatar de PowerDoom (conceptos/avatar.md)
   7 preguntas: objetivo, dominadas, flexiones, qué ha probado, molestias, días y horario.
   Devuelve: punto de partida, siguiente paso según su objetivo, por qué no le ha funcionado
   lo anterior, un caso real parecido a él, la tarifa que le encaja y un WhatsApp con todo. */
addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('t-form');
  if (!form) return;
  const qs = [...form.querySelectorAll('.q')];
  const step = document.getElementById('t-step');
  const res = document.getElementById('t-res');
  const r = {};   // respuestas: clave de la pregunta → { v, t }

  const FASES = [
    { t: 'Construir la base', d: 'Antes de la primera dominada toca aprender a colgarte y a empujar tu peso sin molestias. Es el punto de partida más habitual, y lo que se construye aquí es lo que evita las lesiones después.' },
    { t: 'A por la primera dominada', d: 'Ya aguantas colgado. Ahora se trata de convertir eso en fuerza de tracción con gomas, negativas e isométricos, hasta que la primera dominada salga sin ayuda.' },
    { t: 'Sumar dominadas', d: 'Ya haces dominadas. Aquí es donde se atasca casi todo el que entrena por su cuenta: repite series sin apuntar nada y el número no sube en meses.' },
    { t: 'Preparar el muscle up', d: 'Tienes fuerza de tracción de sobra para empezar a trabajar la transición por encima de la barra. A partir de aquí, lo que marca la diferencia es el trabajo específico del movimiento.' },
    { t: 'Por encima de la barra', d: 'Tu base de tracción es muy buena. Toca limpiar la técnica, meter lastre externo y elegir la siguiente habilidad.' }
  ];

  const SIGUIENTE = {
    mu:   ['Tu primera dominada: es el primer paso hacia el muscle up', 'Tu primera dominada sin goma', 'Llegar a 8 dominadas limpias', 'Tu primer muscle up', 'Muscle up limpio y después con lastre'],
    doms: ['Colgarte 30 segundos y tu primera negativa controlada', 'Tu primera dominada sin goma', 'Llegar a 10 dominadas seguidas', 'Tus primeras dominadas lastradas', 'Dominadas lastradas con más kg'],
    pino: ['Flexiones completas: el pino empieza por el empuje', 'Flexiones completas y pino contra la pared', 'Pino contra la pared con buena línea', 'Tus primeros segundos de pino libre', 'Pino libre y primeras variantes'],
    fl:   ['Tu primera dominada: sin tracción no hay front lever', 'Tu primera dominada sin goma', 'Llegar a 10 dominadas seguidas', 'Front lever encogido', 'Front lever con una pierna estirada'],
    salud:['Entrenar 2 días a la semana con un plan que respete tus molestias', 'Tu primera dominada sin goma', 'Ganar fuerza semana a semana, apuntada en tu libreta', 'Ganar fuerza semana a semana, apuntada en tu libreta', 'Mantener lo que tienes sin acumular molestias']
  };

  const FRENO = {
    gym:   'Si nadie apunta lo que haces, no sabes si esta semana toca subir, repetir o bajar. Por eso aquí todo va a la libreta desde el primer día.',
    clase: 'En una clase de veinte personas nadie te mira la técnica. Aquí somos máximo 4 por grupo y te corregimos en cada serie.',
    yt:    'Una rutina de YouTube está hecha para el nivel de quien la graba, no para el tuyo ni para tus molestias.',
    estancado: 'Si ya tienes fuerza y el movimiento no sale, lo normal es que falte trabajo específico.',
    cero:  'Empezar de cero es el punto de partida más habitual. No hace falta venir con base: se construye aquí.'
  };

  const MOLESTIA = {
    codo:    'Lo del codo o la muñeca lo miramos en la valoración y tu plan se monta a su alrededor desde el primer día.',
    hombro:  'El hombro lo valoramos en la clase de prueba y tu plan se monta a su alrededor desde el primer día. Si una sesión te molesta, se cambia el ejercicio en el momento.',
    espalda: 'La espalda la tenemos en cuenta desde la valoración. Es de las molestias que más mejoran cuando se gana fuerza con un plan.',
    no: ''
  };

  const CASOS = {
    clara:   { n: 'Clara · 43 años', t: 'Llegó con epicondilitis en los dos codos y medio año sin una dominada. En 38 días sacó 2 muscle ups en anillas.', u: 'https://www.instagram.com/p/DcRY-n1DtL_/' },
    miguel:  { n: 'Miguel · 45 años', t: 'Vino a por el muscle up y lo sacó. Por el camino se le fueron el dolor de espalda y los calambres.', u: '' },
    chevi:   { n: 'Chevi', t: 'Tenía sobrepeso y no estaba a gusto con su físico. Hoy se siente realizado y ha conseguido el muscle up.', u: 'https://youtu.be/fTvJttNjKJI' },
    alberto: { n: 'Alberto · 27 años · opositor a Policía Nacional', t: 'No hacía ni una dominada limpia y su oposición la puntúa. Hoy hace más de 15 estrictas y dominadas con más de 25kg de lastre.', u: '' }
  };

  const TARIFA = { 1: '1 día a la semana: 80€ al mes', 2: '2 días a la semana: 120€ al mes (15€ la sesión)', 3: '3 días a la semana: 180€ al mes (15€ la sesión)' };


  // Rutina de regalo (PowerDoom/wiki/negocio/rutinas-regalo/README.md)
  const RUTINAS = { '01': 'Primera dominada', '02': 'Entrenar sin dolor', '03': 'Sacar 10 dominadas', '04': 'Primer muscle up en anillas', '05': 'Tu primer pino', '06': 'Front lever y muscle up', '07': 'Muscle up y handstand push up' };
  const rutina = (obj, f, flex, mol) => {
    if (mol !== 'no' && f <= 2) return '02';
    if (obj === 'pino') return flex >= 2 ? '05' : '02';
    if (obj === 'salud') return f >= 3 && mol === 'no' ? '03' : '02';
    const tabla = { mu: ['02', '01', '03', '04', '04'], doms: ['02', '01', '03', '03', '04'], fl: ['02', '01', '03', '03', '04'] };
    return tabla[obj][f];
  };

  const mostrar = (i) => {
    qs.forEach((q, n) => q.classList.toggle('is-on', n === i));
    step.textContent = `${i + 1} / ${qs.length}`;
  };

  const calcular = () => {
    const doms = r.doms.v, flex = r.flex.v;
    let f = [0, 1, 2, 3, 4][doms];
    if (doms === 1 && flex === 0) f = 0;          // cuelga pero no empuja: base
    if (flex === 0 && f > 2) f = 2;               // tracción buena y empuje muy flojo
    const fase = FASES[f];

    let caso = 'miguel';
    if (r.molestia.v === 'codo') caso = 'clara';
    else if (r.molestia.v === 'espalda') caso = 'miguel';
    else if (r.freno.v === 'estancado' || f >= 3) caso = 'chevi';
    else if (f <= 1 && (r.obj.v === 'doms' || r.obj.v === 'fl')) caso = 'alberto';
    else if (r.obj.v === 'mu') caso = 'miguel';
    else caso = 'clara';
    const c = CASOS[caso];

    const $ = id => document.getElementById(id);
    $('r-title').textContent = fase.t;
    $('r-txt').textContent = fase.d;
    $('r-next').textContent = SIGUIENTE[r.obj.v][f];
    $('r-freno').textContent = FRENO[r.freno.v];
    $('r-mol').textContent = MOLESTIA[r.molestia.v];
    $('r-mol-w').hidden = !MOLESTIA[r.molestia.v];
    $('r-caso-n').textContent = c.n;
    $('r-caso-t').textContent = c.t;
    $('r-caso-u').hidden = !c.u;
    if (c.u) $('r-caso-u').href = c.u;
    $('r-tarifa').textContent = TARIFA[r.dias.v];
    const rut = rutina(r.obj.v, f, flex, r.molestia.v);
    $('r-rutina').textContent = `Rutina ${rut} · ${RUTINAS[rut]}`;

    $('r-cta').href = PD.wa(
      `Hola 👋 He hecho el test de la web.\n` +
      `· Objetivo: ${r.obj.t}\n· Dominadas: ${r.doms.t}\n· Flexiones: ${r.flex.t}\n` +
      `· He probado: ${r.freno.t}\n· Molestias: ${r.molestia.t}\n` +
      `· Podría venir: ${r.dias.t}, ${r.hora.t.toLowerCase()}\n` +
      `Me sale «${fase.t}» (rutina ${rut}). Quiero mi rutina y reservar la clase de prueba.`
    );
    form.hidden = true; res.hidden = false; step.textContent = 'Tu resultado';
  };

  form.addEventListener('click', e => {
    const b = e.target.closest('button[data-v]');
    if (!b) return;
    const q = b.closest('.q');
    [...q.querySelectorAll('button')].forEach(x => x.classList.toggle('is-on', x === b));
    const v = /^\d+$/.test(b.dataset.v) ? +b.dataset.v : b.dataset.v;
    r[q.dataset.k] = { v, t: b.dataset.t || b.textContent.trim() };
    const sig = qs.indexOf(q) + 1;
    setTimeout(() => (sig < qs.length ? mostrar(sig) : calcular()), 180);
  });

  form.addEventListener('click', e => {
    if (!e.target.closest('.q__back')) return;
    const i = qs.findIndex(q => q.classList.contains('is-on'));
    if (i > 0) mostrar(i - 1);
  });

  document.getElementById('r-again').addEventListener('click', () => {
    Object.keys(r).forEach(k => delete r[k]);
    form.querySelectorAll('button.is-on').forEach(b => b.classList.remove('is-on'));
    res.hidden = true; form.hidden = false; mostrar(0);
  });

  mostrar(0);
});
