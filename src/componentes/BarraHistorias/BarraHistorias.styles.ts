import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({
  barra: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colores.borde,
    paddingVertical: 10,
  },

  // Ancho fijo para que todas las historias midan lo mismo.
  item: {
    alignItems: 'center',
    marginLeft: 12,
    width: 64,
  },

  // Círculo con borde rojo; la foto va centrada adentro y un poco más chica.
  anillo: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2,
    borderColor: colores.like,
    alignItems: 'center',
    justifyContent: 'center',
  },

  anilloTuya: {
    borderColor: colores.borde,
  },

  foto: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colores.superficie,
  },

  nombre: {
    fontSize: 11,
    color: colores.textoPrincipal,
    marginTop: 4,
  },
});
