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
| **4** | `l4.html` | La autoridad | Hero centrado tipo coaching + bloques oscuros | Estructura de `kingofweighted.com`: promesa + prueba social, entrenador, test, 6 casos en foto y metodología |

**Landing 4** parte de una copia de la 1 (mismo menú, footer, FAQ y cierre) y cambia el cuerpo:

1. **Hero a dos columnas**: a la izquierda logo, promesa («fuerte y sin dolor en menos de 6 meses»),
   CTA y badge de reseñas; a la derecha foto vertical.
2. **Quién te entrena**: Juan Enguídanos, 2× campeón de España de Streetlifting, a dos columnas
   con foto y credenciales.
3. **Test de entrenamiento** (reutiliza `js/l3-test.js`, sobre bloque oscuro).
4. **Seis casos de éxito** en tarjetas-foto: marca grande, antes → ahora y cita que aparece al pasar el ratón.
5. **Metodología** de calistenia en 6 pilares + bloque «lo que no vas a encontrar / lo que sí».

Además, entre la sesión de prueba y las FAQ hay un **carrusel horizontal de reseñas a todo el ancho**
(scroll con snap) con la nota media y el enlace a Google. Son **reseñas reales** de la ficha de
Google (5,0 de 62). Ver «Actualizar las reseñas» más abajo.

⚠️ En la 4 solo queda un placeholder: `[X] años entrenando` en la sección del entrenador. El enlace
«Verlas todas en Google» apunta a una búsqueda genérica: conviene cambiarlo por la URL directa de
la ficha. Las fotos siguen siendo de relleno (ver más abajo).

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
l1.html l2.html l3.html l4.html
css/fonts.css         Fuentes autoalojadas (compartidas)
css/l1.css l2.css l3.css l4.css
js/common.js          WhatsApp declarativo, reveal, menú móvil, contadores
js/l3-test.js         Lógica del test de nivel (landings 3 y 4)
js/l4-resenas.js      Pinta el carrusel de reseñas de la landing 4 desde el JSON
data/resenas.json     Reseñas de Google + nota media (editable a mano)
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

**Actualizar las reseñas (landing 4)** — están en `data/resenas.json`, no en el HTML. La página lo
lee al cargar (`js/l4-resenas.js`) y repinta el carrusel, la nota media de la sección **y el badge
del hero**. Para añadir una reseña nueva basta con meter un objeto más en el array; no se toca ni
HTML ni CSS:

```json
{
  "nota": 5.0,
  "total": 62,
  "url": "https://…",         // enlace de «Verlas todas en Google»
  "resenas": [
    { "autor": "Nombre Apellido", "estrellas": 5, "fecha": "hace 2 meses", "texto": "Texto literal de la reseña." }
  ]
}
```

Las tarjetas que hay escritas dentro de `l4.html` son solo **respaldo**: se ven si el JSON falla o
si se abre el archivo con `file://` (ahí `fetch` está bloqueado). Si se editan las reseñas, conviene
actualizar también ese respaldo o dejarlo con dos o tres.

No es automático a propósito: se descartó tirar de la API de Google (Places solo devuelve 5 reseñas
y pide facturación; la de perfil de empresa exige OAuth de propietario) y los widgets de terceros
imponen su diseño. Si algún día se quiere automatizar, basta con un script que reescriba este mismo
JSON: la página no necesita ningún cambio.

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
