# PowerDoom · Landing de calistenia

Una sola página (`index.html`) para el negocio de calistenia de PowerDoom en Albacete. Objetivo:
que la persona reserve la **sesión de prueba** por WhatsApp.

Tres landings distintas para el **mismo** negocio, el mismo avatar y el mismo objetivo:
que la persona reserve la **sesión de prueba** por WhatsApp.

- **Avatar**: 30-50 años, de Albacete, trabaja, muchos con hijos o cargas familiares. Ha pasado
  por gimnasios o clases masificadas y se ha aburrido o no ha conseguido nada.
- **Foco**: calistenia. Nada de powerlifting ni streetlifting.
- **Enfoque de copy**: dolor y deseo del cliente (colgarse de una barra, el muscle-up, el tiempo,
  no saber si progresa). No se compara con otros gimnasios ni se enseña el material del centro.
- **CTA único**: «haz tu sesión de prueba y te decimos desde qué nivel partes».

## La página

Estructura de `kingofweighted.com`, ajustada por el cliente (Juan) en su versión editable del Drive
(«03 · Web»):

1. **Hero a dos columnas**: logo, promesa («fuerte y sin dolor en menos de 6 meses»), CTA y badge de
   reseñas; a la derecha foto de muscle-up con el entrenador.
2. **Quién te entrena**: Juan Gason (fundador) y Ángel Fernández (entrenador en sala).
3. **Test de entrenamiento** de 7 preguntas (`js/l4-test.js`): punto de partida, qué le ha frenado,
   caso real parecido, tarifa según días y rutina de regalo, todo prerrellenado en WhatsApp.
4. **Seis casos de éxito** en tarjetas-foto.
5. **Metodología**, sesión de prueba, **carrusel de reseñas** reales de Google, FAQ y cierre.

## Ver en local

```bash
python3 -m http.server 8765
# http://localhost:8765
```

## Archivos

```
index.html            La landing
css/fonts.css         Fuentes autoalojadas
css/l4.css            Estilos de la landing
js/common.js          WhatsApp declarativo, reveal, menú móvil, contadores
js/l4-test.js         Test de nivel (7 preguntas)
js/l4-resenas.js      Pinta el carrusel de reseñas desde el JSON
data/resenas.json     Reseñas de Google + nota media (editable a mano)
assets/img/fotos/     Fotos originales del cliente
assets/img/icon/      Logo e iconos
```

## Antes de abrirla a Google

1. Quitar `<meta name="robots" content="noindex,nofollow">` del `<head>`: sigue bloqueada a propósito
   mientras haya pendientes.
2. Añadir `canonical`, `og:url`, `og:image` y datos estructurados con el dominio final, y revisar
   `sitemap.xml` y `robots.txt` (apuntan a `powerdoom.com`).

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

**Casos de éxito** — en `index.html`, entre los comentarios `▼▼ EDITA AQUÍ` y `▲▲ FIN casos editables`.
Clara, Miguel, Chevi y Alberto son reales; los casos 5 y 6 están por elegir (foto de relleno).

**Actualizar las reseñas** — están en `data/resenas.json`, no en el HTML. La página lo
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

Las tarjetas que hay escritas dentro de `index.html` son solo **respaldo**: se ven si el JSON falla o
si se abre el archivo con `file://` (ahí `fetch` está bloqueado). Si se editan las reseñas, conviene
actualizar también ese respaldo o dejarlo con dos o tres.

No es automático a propósito: se descartó tirar de la API de Google (Places solo devuelve 5 reseñas
y pide facturación; la de perfil de empresa exige OAuth de propietario) y los widgets de terceros
imponen su diseño. Si algún día se quiere automatizar, basta con un script que reescriba este mismo
JSON: la página no necesita ningún cambio.

**Colores** — bloque `:root` de `css/l4.css`:

```css
--red:#D62424;   /* rojo de marca */
--paper:#F4F0E9; /* fondo */
--card:#FFFDF9;  /* tarjetas */
--ink:#14130F;   /* texto y bloques oscuros */
--line:#DBD4C7;
```

## Pendiente / a tener en cuenta

- **De Juan**: meses que tardó Miguel y su cesión de imagen firmada, permiso de Chevi para salir con
  nombre, y elegir los casos 5 y 6.
- Clara y Chevi son fotogramas de vídeo (baja resolución): si hay original mejor, sustituir.
- El enlace «Verlas todas en Google» apunta a una búsqueda genérica: cambiarlo por la URL de la ficha.
- **Horarios de los grupos**: se mencionan pero no se concretan.
