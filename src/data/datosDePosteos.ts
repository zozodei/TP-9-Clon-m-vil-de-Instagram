import type { Autor, Comentario } from '../tipos';

// el ": Autor[]" obliga a que cada objeto tenga usuario, ubicacion y caption:
// si a una fila le falta uno o le sobra otro, TypeScript avisa acá mismo
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

// Los comentarios con los que arranca cada publicación
export const COMENTARIOS_INICIALES: Comentario[] = [
  { id: 1, usuario: 'gato_fan_01',    texto: '¡Qué hermoso! 😍' },
  { id: 2, usuario: 'luna_cat',       texto: 'Me robaste el corazón 🐾' },
  { id: 3, usuario: 'michi_watcher',  texto: 'Definitivamente el mejor día' },
];
