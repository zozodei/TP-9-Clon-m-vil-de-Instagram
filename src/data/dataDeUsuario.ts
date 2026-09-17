// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  src/data/dataDeUsuario.ts  —  DATOS FIJOS: MI PERFIL Y LAS HISTORIAS       ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Datos escritos a mano, que no cambian nunca durante el uso de la app.
//
// ¿Por qué están acá y no adentro de los componentes? Para separar los datos de
// la lógica. Si mañana quiero cambiar mi biografía o agregar una historia,
// vengo acá y no toco ni una línea de código de verdad.
//
// PARA EXPONER: hay dos clases de datos en este proyecto y conviene marcar la
// diferencia:
//   * FIJOS (este archivo)   → los importo directo donde los necesito
//   * QUE CAMBIAN (posteos)  → viven en el estado de App.tsx y bajan por props
// La regla es: si algo se puede modificar mientras la app corre, tiene que
// estar en un estado. Si no, alcanza con importarlo.

import type { Historia, Usuario } from '../tipos';

// ── EL DUEÑO DEL PERFIL ──────────────────────────────────────────────────────
// No hay sistema de login en el trabajo práctico, así que el usuario es siempre
// el mismo y está escrito acá. Lo uso en tres lugares: la pantalla de Perfil,
// "Tu historia" en la barra, y el avatar de la barra de comentarios.
//
// El ": Usuario" del final obliga a que este objeto cumpla el molde que definí
// en src/tipos.ts: si me olvido un campo o escribo mal un nombre, salta el error.
export const usuarioLogueado: Usuario = {
  usuario: 'flecha_michis',
  nombre: 'Flecha Michis 🐾',
  fotoPerfil: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg',
  // El \n es el carácter de "salto de línea": hace que la bio se muestre en dos
  // renglones, igual que las biografías de Instagram.
  biografia: '🐾 Amante de los gatitos | Fotógrafo felino\nBuenos Aires, Argentina 🇦🇷',
  seguidores: 847,
  seguidos: 123,
};

// ── LAS HISTORIAS DE LA BARRA DE ARRIBA ──────────────────────────────────────
// Los [] en "Historia[]" significan "una lista de Historia".
//
// Las fotos vienen de loremflickr, una página que devuelve imágenes al azar
// según la palabra que le pidas (acá "kitten", gatito).
// El ?lock=101 es importante: sin ese número, la página devolvería una foto
// DISTINTA cada vez que se recarga y las historias cambiarían solas todo el
// tiempo. Con el lock, cada historia se queda siempre con la misma foto.
export const historias: Historia[] = [
  { id: 1, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=101', usuario: 'ManunuGatito1' },
  { id: 2, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=102', usuario: 'ZoeeFotos_Gatitos' },
  { id: 3, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=103', usuario: 'Michi_Nao1' },
  { id: 4, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=104', usuario: 'Wolfus_fotografo' },
  { id: 5, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=105', usuario: 'Damian.GatiAsman' },
  { id: 6, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=106', usuario: 'Fran_Gatito' },
  { id: 7, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=107', usuario: 'Mariana.Lopez3' },
];
