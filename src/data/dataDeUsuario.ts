// Datos fijos del usuario y de las historias. Como no cambian nunca, se
// importan directo donde se necesitan (no hace falta guardarlos en un estado).
// Los posteos, en cambio, sí cambian (likes, comentarios), por eso esos
// están en el useState de App.tsx.

import type { Historia, Usuario } from '../tipos';

export const usuarioLogueado: Usuario = {
  usuario: 'flecha_michis',
  nombre: 'Flecha Michis 🐾',
  fotoPerfil: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
  // \n es un salto de línea: la bio se ve en dos renglones
  biografia: '🐾 Amante de los gatitos | Fotógrafo felino\nBuenos Aires, Argentina 🇦🇷',
  seguidores: 847,
  seguidos: 123,
};

// loremflickr da fotos al azar de gatitos. El "lock" hace que cada historia
// tenga siempre la misma foto (sin él cambiaría cada vez que se recarga).
export const historias: Historia[] = [
  { id: 1, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=101', usuario: 'ManunuGatito1' },
  { id: 2, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=102', usuario: 'ZoeeFotos_Gatitos' },
  { id: 3, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=103', usuario: 'Michi_Nao1' },
  { id: 4, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=104', usuario: 'Wolfus_fotografo' },
  { id: 5, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=105', usuario: 'Damian.GatiAsman' },
  { id: 6, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=106', usuario: 'Fran_Gatito' },
  { id: 7, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=107', usuario: 'Mariana.Lopez3' },
];
