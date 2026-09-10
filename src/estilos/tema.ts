
// colores calcados de Instagram del modo claro
export const colores = {
  fondo: '#FFFFFF', 
  superficie: '#FAFAFA', 
  borde: '#DBDBDB', 
  textoPrincipal: '#262626', 
  textoSecundario: '#8E8E8E', 
  like: '#ED4956', 
  acento: '#0095F6', 
};

export const medidas = {
  // Las fotos usan width: '100%' + aspectRatio: 1 (cuadradas). En un celular está perfecto,
  // pero en la web la ventana puede medir 1400 de ancho y la foto mediría 1400 de alto.
  // Con este tope la publicación nunca pasa de 500 y se centra, como en Instagram web.
  // En el celular no cambia nada, porque la pantalla ya es más angosta que 500.

//ESTO ME LO RECOMENDO COPILOT PARA QUE SE ME DIMENSIONEN BIEN LAS COSAS EN LA PAGINA, ERA UN PROBLEMA QUE TENIA

  anchoMaximoContenido: 500,
};
//ok