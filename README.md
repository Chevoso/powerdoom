# PowerDoom · Landings de calistenia (3 versiones a comparar)

Tres landings distintas para el **mismo** negocio, el mismo avatar y el mismo objetivo:
que la persona reserve la **sesión de prueba** por WhatsApp.

- **Avatar**: 30-50 años, de Albacete, trabaja, muchos con hijos o cargas familiares. Ha pasado
  por gimnasios o clases masificadas y se ha aburrido o no ha conseguido nada.
- **Foco**: calistenia. Nada de powerlifting ni streetlifting.
- **Enfoque de copy**: dolor y deseo del cliente (colgarse de una barra, el muscle-up, el tiempo,
  no saber si progresa). No se compara con otros gimnasios ni se enseña el material del centro.
- **CTA único**: «haz tu sesión de prueba y te decimos desde qué nivel partes».

## Las tres versiones

Las tres comparten la misma base visual **light** de la landing 2 (papel `#F4F0E9`, tinta `#14130F`,
rojo de marca `#D62424`, Bebas + Barlow). Cambia el ángulo y el ritmo de la página, no la marca.

| | Archivo | Ángulo | Estética | Gancho diferencial |
|---|---|---|---|---|
| **1** | `l1.html` | El objetivo | Editorial: titular enorme, foto a todo ancho, bloque rojo | Ruta por fases hasta el muscle-up, con plazos reales |
| **2** | `l2.html` | El tiempo | Tarjetas redondeadas, cercana | La semana dibujada hueco a hueco + selector que escribe el WhatsApp por ti |
| **3** | `l3.html` | El diagnóstico | Tipo informe: tarjetas blancas, etiquetas monoespaciadas | Test de nivel en 30 s (N1-N5) con resultado y WhatsApp prerrellenado |

**Nota sobre el avatar**: las tres están escritas para alguien de 30-50 años con trabajo y cargas
familiares, pero **en ningún sitio se dice la edad**. Se transmite por contexto (guardias, hijos,
«el tiempo que te queda es sagrado») y por frases del tipo «cualquier punto de partida». Si se
edita el copy, mantener ese criterio.

`index.html` es una **página temporal de comparación** con las tres. Además, dentro de cada landing
hay un **selector flotante abajo a la izquierda** para saltar entre versiones (1 / 2 / 3).

## Ver en local

```bash
python3 -m http.server 8765
# http://localhost:8765
```

## Archivos

```
index.html            Selector temporal de versiones
l1.html l2.html l3.html
css/fonts.css         Fuentes autoalojadas (compartidas)
css/l1.css l2.css l3.css
js/common.js          WhatsApp declarativo, reveal, menú móvil, contadores
js/l3-test.js         Lógica del test de nivel de la landing 3
js/switch.js          Selector flotante de versiones (TEMPORAL)
assets/               Fotos, logo y fuentes
old-generalista.html  Versión anterior (enfoque gimnasio generalista), por si sirve de referencia
```

## Al elegir la versión definitiva

1. Borrar `js/switch.js` y su `<script src="js/switch.js" defer>` de la landing elegida.
2. Renombrar esa landing a `index.html` (y borrar las otras dos + `old-generalista.html`).
3. Quitar `<meta name="robots" content="noindex,nofollow">` del `<head>`: ahora mismo las tres
   están bloqueadas para Google a propósito, para no indexar borradores duplicados.
4. Añadir `canonical`, `og:url` y datos estructurados con el dominio final, y actualizar
   `sitemap.xml` y `robots.txt`.

## Personalizar

**WhatsApp** — número y mensajes en `js/common.js`:

```js
const WA_PHONE = '34626428569';
```

Cualquier enlace con `data-wa="mensaje"` se convierte solo en un enlace de WhatsApp con ese
mensaje escrito. Para un botón nuevo:

```html
<a class="btn btn--red" data-wa="Hola 👋 Quiero...">Texto del botón</a>
```

**Casos de éxito** — en las tres landings están entre los comentarios `▼▼ EDITA AQUÍ` y
`▲▲ FIN casos editables`. Ahora son ejemplos coherentes con el avatar (enfermero con guardias y
muscle-up en 4 meses, madre de dos con su primera dominada en 11 semanas, autónomo con el hombro
tocado). **Sustituir por casos reales antes de publicar.**

**Colores** — bloque `:root` de cada CSS, idéntico en las tres:

```css
--red:#D62424;   /* rojo de marca */
--paper:#F4F0E9; /* fondo */
--card:#FFFDF9;  /* tarjetas */
--ink:#14130F;   /* texto y bloques oscuros */
--line:#DBD4C7;
```

## Pendiente / a tener en cuenta

- **Faltan fotos de calistenia.** Las imágenes actuales vienen de la web antigua y son casi todas
  de barra y material de fuerza. Para que la landing definitiva sea creíble hacen falta fotos de
  gente entrenando dominadas, fondos, anillas y muscle-ups, y a poder ser del perfil del avatar
  (30-50 años), no solo de veinteañeros.
- **Horarios de los grupos**: se mencionan pero no se concretan. Si hay horarios fijos, ponerlos.
- **Precio**: ninguna de las tres muestra precio a propósito (el objetivo es la sesión de prueba).
  Si prefieres mostrarlo, se añade una sección.
