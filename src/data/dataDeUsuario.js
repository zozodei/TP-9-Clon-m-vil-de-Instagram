// datos FIJOS (no vienen de ninguna API): simulan que ya hay un usuario logueado,
// sin tener que armar pantallas de login/registro (la consigna lo pide así)
export const usuarioLogueado = {
  usuario: 'flecha_michis', // el "@" que aparece en el perfil
  nombre: 'Flecha Michis 🐾', // el nombre "de fantasía" arriba de la biografía
  fotoPerfil: 'https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg', // avatar del usuario logueado
  // "\n" adentro del string es un salto de línea: la biografía se ve en dos renglones
  biografia: '🐾 Amante de los gatitos | Fotógrafo felino\nBuenos Aires, Argentina 🇦🇷',
  seguidores: 847, // número fijo, no cambia (no hay backend real de seguidores)
  seguidos: 123,
};

// array de historias que se muestran arriba del feed, en la BarraHistorias.
// cada objeto tiene id (para el keyExtractor de la lista), foto y usuario
export const historias = [
  { id: 1, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=101', usuario: 'ManunuGatito1' },
  { id: 2, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=102', usuario: 'ZoeeFotos_Gatitos' },
  { id: 3, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=103', usuario: 'Michi_Nao1' },
  { id: 4, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=104', usuario: 'Wolfus_fotografo' },
  { id: 5, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=105', usuario: 'Damian.GatiAsman' },
  { id: 6, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=106', usuario: 'Fran_Gatito' },
  { id: 7, fotoPerfil: 'https://loremflickr.com/600/600/kitten?lock=107', usuario: 'Mariana.Lopez3' },
];
