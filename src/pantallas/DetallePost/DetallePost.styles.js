import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  contenedor: {
    backgroundColor: colores.fondo,
    paddingBottom: 24, // espacio libre después del último comentario, para que no quede pegado al borde
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
    backgroundColor: colores.superficie,
  },
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
  foto: {
    width: '100%',
    aspectRatio: 1, // igual que en PostCard: fuerza que la foto sea cuadrada
    backgroundColor: colores.superficie,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  accionesIzq: {
    flexDirection: 'row',
  },
  accionBtn: {
    marginRight: 16,
  },
  likes: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  caption: {
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingHorizontal: 12,
    marginBottom: 8,
  },
  comentariosTitulo: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoSecundario,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
});
