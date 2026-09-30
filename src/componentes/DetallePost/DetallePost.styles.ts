import { StyleSheet } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo,
  },

  // flex: 1 hace que el scroll ocupe todo el alto y la barra de comentar quede abajo
  scroll: {
    flex: 1,
  },

  contenido: {
    width: '100%',
    maxWidth: medidas.anchoMaximoContenido,
    alignSelf: 'center',
    paddingBottom: 24,
  },

  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.fondo,
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
    aspectRatio: 1,
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

  // Se usa para el caption y para cada comentario
  texto: {
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },

  comentariosTitulo: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoSecundario,
    paddingHorizontal: 12,
    marginTop: 8,
    marginBottom: 4,
  },

  // ── Barra de comentar ──
  barraComentario: {
    width: '100%',
    maxWidth: medidas.anchoMaximoContenido,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colores.borde,
    backgroundColor: colores.fondo,
  },

  avatarChico: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: colores.superficie,
  },

  input: {
    flex: 1,
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingVertical: 6,
    outlineWidth: 0, // saca el recuadro azul en la versión web
  },

  botonPublicar: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.acento,
    marginLeft: 8,
  },

  botonApagado: {
    color: colores.textoSecundario,
  },
});
