// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  ItemGrilla.styles.ts  —  LOS ESTILOS DE UN CUADRADITO DE LA GRILLA         ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// Acá hay UN solo estilo, porque el tamaño del cuadradito no está en este
// archivo: se calcula en la pantalla de Perfil (ancho de pantalla ÷ 3) y llega
// al componente por props. Los archivos .styles.ts son solo para valores fijos;
// lo que depende de un dato se escribe en línea. Está explicado en
// componentes/ItemGrilla/index.tsx.

import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({

  imagen: {
    // flex: 1 hace que la imagen llene todo el Pressable que la contiene, y ese
    // Pressable ya tiene el width y el height calculados. O sea: la imagen se
    // adapta sola al tamaño que le toque, sin saber cuál es.
    flex: 1,

    // Un solo píxel de margen por lado. Como los cuadraditos quedan pegados
    // entre sí, esto deja una línea finita blanca que marca la separación entre
    // fotos. Sin esto, la grilla se vería como un collage pegoteado.
    margin: 1,

    backgroundColor: colores.superficie, // gris mientras la foto carga
  },
});
