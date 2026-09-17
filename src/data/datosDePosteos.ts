// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  src/data/datosDePosteos.ts  —  EL RELLENO DE LAS PUBLICACIONES             ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Los textos inventados con los que completo cada publicación.
//
// ¿POR QUÉ HACE FALTA? Porque la API de gatos (thecatapi.com) me devuelve
// SOLAMENTE una id y una url de la foto. No me da usuario, ni ubicación, ni
// caption, ni likes: eso no existe en esa API. Así que la parte "de Instagram"
// de cada publicación la invento yo acá y la pego con la foto en App.tsx.
//
// PARA EXPONER: "la app combina dos fuentes: los datos reales que bajo de una
// API por internet, y estos datos de relleno escritos a mano. En App.tsx los
// uno con un .map() para armar cada publicación completa."

import type { Autor, Comentario } from '../tipos';

// ── LOS 12 AUTORES ───────────────────────────────────────────────────────────
// ⚠️ EL ORDEN Y LA CANTIDAD IMPORTAN ⚠️
// En App.tsx le pido a la API exactamente AUTORES.length fotos (o sea 12) y
// después las emparejo por posición: la foto 0 con el autor 0, la foto 1 con el
// autor 1, y así. Si agrego un autor más acá, automáticamente se pide una foto
// más, sin tocar nada de App.tsx. Por eso uso AUTORES.length y no un 12 escrito
// a mano: el código se acomoda solo.
//
// El ": Autor[]" obliga a que cada objeto de la lista tenga exactamente usuario,
// ubicacion y caption. Si a una fila le falta uno, o le pongo uno de más, o me
// equivoco al escribir el nombre de un campo, TypeScript me lo marca acá mismo.
export const AUTORES: Autor[] = [
  { usuario: 'michi_lover',    ubicacion: 'Buenos Aires, Argentina',  caption: 'Cuando es lunes pero igual estás feliz 😸' },
  { usuario: 'gato_curioso',   ubicacion: 'Córdoba, Argentina',       caption: 'El sol me llama pero el sueño me retiene 😴' },
  { usuario: 'pelusa_oficial', ubicacion: 'Rosario, Argentina',       caption: 'Listo para conquistar el mundo 🐾' },
  { usuario: 'felix_jr',       ubicacion: 'Mendoza, Argentina',       caption: 'Nadie me entiende como mi almohada 💤' },
  { usuario: 'bigotes_pro',    ubicacion: 'Bariloche, Argentina',     caption: 'Día perfecto para no hacer nada 🌿' },
  { usuario: 'ronroneo_max',   ubicacion: 'Mar del Plata, Argentina', caption: 'Estoy en modo zen 🧘' },
  { usuario: 'zarpazo_suave',  ubicacion: 'Salta, Argentina',         caption: 'Juzgándote en silencio desde aquí 👀' },
  { usuario: 'michi_zen',      ubicacion: 'La Plata, Argentina',      caption: 'Detective en servicio activo 🔍' },
  { usuario: 'gatito_bueno',   ubicacion: 'Ushuaia, Argentina',       caption: 'Cuando encontrás el rayo de sol perfecto ☀️' },
  { usuario: 'patas_lindas',   ubicacion: 'Neuquén, Argentina',       caption: 'Solo paso por aquí a ser hermoso 🌟' },
  { usuario: 'colita_tiesa',   ubicacion: 'Tucumán, Argentina',       caption: 'No me interrumpas, estoy ocupado 💅' },
  { usuario: 'miau_forever',   ubicacion: 'Posadas, Argentina',       caption: 'El universo me debe una siesta 😤' },
];

// ── LOS COMENTARIOS CON LOS QUE ARRANCA CADA PUBLICACIÓN ─────────────────────
// Las 12 publicaciones arrancan con estos mismos tres comentarios.
//
// ⚠️ DETALLE CLAVE: en App.tsx no le paso esta lista directamente a cada
// publicación, le paso una COPIA con [...COMENTARIOS_INICIALES]. Si les pasara
// la misma lista a las 12, todas estarían apuntando al mismo lugar en memoria y
// al comentar en una aparecería el comentario en las 12 a la vez.
// Es un error clásico de JavaScript con arrays y objetos, y vale la pena
// mencionarlo en la exposición.
export const COMENTARIOS_INICIALES: Comentario[] = [
  { id: 1, usuario: 'gato_fan_01',    texto: '¡Qué hermoso! 😍' },
  { id: 2, usuario: 'luna_cat',       texto: 'Me robaste el corazón 🐾' },
  { id: 3, usuario: 'michi_watcher',  texto: 'Definitivamente el mejor día' },
];
