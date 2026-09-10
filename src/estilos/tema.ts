// el "tema" visual de la app: un solo lugar con los colores y las medidas que se repiten.
// Si mañana queremos cambiar, por ejemplo, el rojo del corazón de like, lo tocamos ACÁ
// y se actualiza en todos los componentes que lo usan.

// colores calcados de Instagram (modo claro)
export const colores = {
  fondo: '#FFFFFF', // blanco: el fondo general de toda la app
  superficie: '#FAFAFA', // gris clarito: fondo de las imágenes mientras cargan
  borde: '#DBDBDB', // gris para líneas separadoras (header, tabs)
  textoPrincipal: '#262626', // casi negro: nombres de usuario, captions
  textoSecundario: '#8E8E8E', // gris medio: ubicación, "ver comentarios"
  like: '#ED4956', // el rojo del corazón de Instagram cuando está likeado
  acento: '#0095F6', // el celeste de los botones de acción (el "Publicar" del comentario)
};

export const medidas = {
  // Las fotos usan width: '100%' + aspectRatio: 1 (cuadradas). En un celular está perfecto,
  // pero en la web la ventana puede medir 1400 de ancho y la foto mediría 1400 de alto.
  // Con este tope la publicación nunca pasa de 500 y se centra, como en Instagram web.
  // En el celular no cambia nada, porque la pantalla ya es más angosta que 500.
  anchoMaximoContenido: 500,
};
