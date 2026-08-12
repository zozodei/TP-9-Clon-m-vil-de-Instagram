import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  postcard: {
    marginBottom: 12,
    backgroundColor: colores.fondo,
  },
  postcardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postcardAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    marginRight: 10,
    backgroundColor: colores.superficie,
  },
  postcardHeaderInfo: {
    flex: 1,
  },
  postcardUsuario: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
  },
  postcardUbicacion: {
    fontSize: 11,
    color: colores.textoSecundario,
  },
  postcardMas: {
    fontWeight: '700',
    color: colores.textoPrincipal,
  },
  postcardFoto: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: colores.superficie,
  },
  postcardAcciones: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  postcardAccionesIzq: {
    flexDirection: 'row',
  },
  accionBtn: {
    marginRight: 14,
  },
  postcardLikes: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingHorizontal: 12,
    marginBottom: 2,
  },
  postcardCaption: {
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
  postcardVerComentarios: {
    fontSize: 13,
    color: colores.textoSecundario,
    paddingHorizontal: 12,
    marginBottom: 4,
  },
});
