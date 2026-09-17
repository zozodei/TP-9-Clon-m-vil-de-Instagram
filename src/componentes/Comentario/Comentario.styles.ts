// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  Comentario.styles.ts  —  LOS ESTILOS DE UNA FILA DE COMENTARIO             ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// El archivo de estilos más chiquito del proyecto, porque un comentario es solo
// una línea de texto.
// (La explicación general de flexbox y estilos está en PostCard.styles.ts)

import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({

  // El contenedor de la fila. Solo le da aire: el mismo padding horizontal de
  // 12 que usan el caption y los likes, para que todo quede alineado en una
  // misma columna visual.
  fila: {
    paddingHorizontal: 12,
    paddingVertical: 6, // separación entre un comentario y el siguiente
  },

  // El nombre de quien comentó, en negrita. Va en el <Text> de adentro.
  usuario: {
    fontWeight: '600',
    color: colores.textoPrincipal,
  },

  // El texto del comentario, normal. Va en el <Text> de afuera.
  texto: {
    fontSize: 13,
    color: colores.textoPrincipal,
  },
});
