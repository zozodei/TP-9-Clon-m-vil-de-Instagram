// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  src/estilos/tema.ts  —  LA PALETA DE COLORES Y MEDIDAS                     ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Los colores y las medidas de toda la app, en un solo lugar.
//
// ¿PARA QUÉ SIRVE? Para no escribir '#262626' repetido en veinte archivos.
// Si mañana quiero hacer el modo oscuro, o el profesor me dice "cambiá el gris",
// toco SOLO este archivo y se actualiza la app entera. Si los hubiera escrito
// sueltos en cada estilo, tendría que ir archivo por archivo buscándolos.
//
// Además, escribir colores.textoPrincipal se entiende mucho mejor que '#262626':
// el nombre te dice PARA QUÉ sirve el color, no solo cuál es.
//
// PARA EXPONER: "esto es lo que se llama design tokens o sistema de diseño.
// Es la misma idea que las variables CSS."

// Los colores están sacados de Instagram en modo claro.
export const colores = {
  fondo: '#FFFFFF',            // blanco: el fondo de casi todas las pantallas
  superficie: '#FAFAFA',       // gris casi blanco: se ve atrás de las fotos
                               // mientras cargan, para que no parpadee en blanco
  borde: '#DBDBDB',            // gris clarito: las líneas divisorias
  textoPrincipal: '#262626',   // casi negro: el texto importante y los íconos.
                               // Ojo que NO es negro puro: Instagram usa este
                               // gris muy oscuro porque cansa menos la vista
  textoSecundario: '#8E8E8E',  // gris medio: ubicaciones, "Ver los N comentarios"
  like: '#ED4956',             // el rojo del corazón y del anillo de historias
  acento: '#0095F6',           // el azul de Instagram: el botón "Publicar"
};

export const medidas = {
  // ── EL TOPE DE ANCHO: por qué existe ───────────────────────────────────────
  // Las fotos están hechas con width: '100%' + aspectRatio: 1, o sea "ocupá todo
  // el ancho y que el alto sea igual al ancho" (cuadradas).
  //
  // En un celular eso queda perfecto. Pero si abro la app en el navegador de la
  // compu, la ventana puede medir 1400px de ancho... y entonces la foto mediría
  // 1400px de alto. Una sola publicación ocuparía tres pantallas.
  //
  // Con este tope, la publicación nunca pasa de 500px y queda centrada, igual
  // que en Instagram web. En el celular no cambia absolutamente nada, porque la
  // pantalla ya es más angosta que 500.
  //
  // (Este fue un problema real que tuve al probar en la web y lo resolví así.)
  anchoMaximoContenido: 500,
};
