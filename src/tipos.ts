// Las "formas" que tienen los datos de la app, en un solo lugar.
//
// Un "type" en TypeScript no existe cuando la app corre: es solo un contrato que
// el editor y el compilador revisan mientras escribimos. Si a un componente le
// pasamos un dato que no cumple la forma, el error salta ANTES de abrir la app.

// Un comentario de una publicación
export type Comentario = {
  id: number;
  usuario: string;
  texto: string;
};

// Una publicación del feed: mezcla lo que trae la API (id, url) con lo que
// inventamos nosotros (usuario, ubicación, caption) y lo que cambia con el uso
// (liked, likes, comentarios)
export type Post = {
  id: string;
  url: string;
  avatar: string;
  usuario: string;
  ubicacion: string;
  caption: string;
  likes: number;
  liked: boolean;
  comentarios: Comentario[];
};

// El usuario dueño del perfil (no hay login, es fijo)
export type Usuario = {
  usuario: string;
  nombre: string;
  fotoPerfil: string;
  biografia: string;
  seguidores: number;
  seguidos: number;
};

// Una historia de la barra de arriba del feed
export type Historia = {
  id: number;
  fotoPerfil: string;
  usuario: string;
};

// Lo que el visor necesita para mostrar una historia en grande.
// Es aparte de "Historia" porque "Tu historia" se arma al vuelo con los datos del
// usuario logueado y no tiene id. Una Historia completa igual sirve acá, porque
// tiene esos dos campos y le sobra el id.
export type HistoriaParaVer = {
  fotoPerfil: string;
  usuario: string;
};

// Los datos inventados con los que completamos cada foto que llega de la API
export type Autor = {
  usuario: string;
  ubicacion: string;
  caption: string;
};

// La forma EXACTA de cada objeto que devuelve The Cat API.
// Nos sirve para avisarle a axios qué esperamos recibir: a partir de ahí, si
// escribimos imagen.URL en vez de imagen.url, TypeScript nos avisa.
export type ImagenDeLaApi = {
  id: string;
  url: string;
};
