// En React Native no hay CSS: los estilos son objetos. Todo es flexbox y la
// dirección por defecto es en columna, por eso para poner cosas una al lado
// de la otra se usa flexDirection: 'row'.

import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({
  contenedor: {
    marginBottom: 12,
    backgroundColor: colores.fondo,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },

  // borderRadius = mitad del ancho → círculo
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
    backgroundColor: colores.superficie,
  },

  // flex: 1 ocupa el espacio que sobra y empuja los "···" a la derecha
  headerInfo: {
    flex: 1,
  },

  usuario: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
  },

  ubicacion: {
    fontSize: 11,
    color: colores.textoSecundario,
  },

  mas: {
    fontWeight: '700',
    color: colores.textoPrincipal,
  },

  // aspectRatio: 1 → foto cuadrada de todo el ancho
  foto: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colores.superficie,
  },

  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  accionesIzq: {
    flexDirection: 'row',
  },

  accionBtn: {
    marginRight: 14,
  },

  likes: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingHorizontal: 12,
    marginBottom: 2,
  },

  caption: {
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingHorizontal: 12,
    marginBottom: 4,
  },

  verComentarios: {
    fontSize: 13,
    color: colores.textoSecundario,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
});
