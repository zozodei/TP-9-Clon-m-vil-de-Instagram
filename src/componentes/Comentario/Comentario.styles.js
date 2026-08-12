import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  fila: {
    paddingHorizontal: 12, // separación del borde izquierdo/derecho de la pantalla
    paddingVertical: 6, // separación entre un comentario y el siguiente
  },
  usuario: {
    fontWeight: '600', // negrita, para que se distinga del texto del comentario
    color: colores.textoPrincipal,
  },
  texto: {
    fontSize: 13,
    color: colores.textoPrincipal,
  },
});
