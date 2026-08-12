import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  fila: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  usuario: {
    fontWeight: '600',
    color: colores.textoPrincipal,
  },
  texto: {
    fontSize: 13,
    color: colores.textoPrincipal,
  },
});
