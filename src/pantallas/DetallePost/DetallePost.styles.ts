import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

// el mismo tope de ancho que usa el Feed, para que la publicación y la barra de
// comentario queden alineadas. Ver el porqué del tope en estilos/tema.ts
const anchoLimitado: ViewStyle = {
  width: '100%',
  maxWidth: medidas.anchoMaximoContenido,
  alignSelf: 'center',
};

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: colores.fondo, // si no, abajo del contenido se ve el gris del navegador
  },
  lista: {
    flex: 1, // deja la barra de comentario abajo en vez de empujarla fuera de la pantalla
  },
  contenedor: {
    ...anchoLimitado,
    backgroundColor: colores.fondo,
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
    borderRadius: 18, // la mitad del ancho: círculo
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
    aspectRatio: 1, // igual que en PostCard: foto cuadrada
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
  barraComentario: {
    ...anchoLimitado,
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
    flex: 1, // se queda con el ancho que sobra entre el avatar y el botón
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingVertical: 6,
    outlineWidth: 0, // saca el recuadro azul del navegador al hacer foco (en el celular se ignora)
  },
  botonPublicar: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.acento,
    marginLeft: 8,
  },
  botonPublicarApagado: {
    // se aplica ENCIMA del anterior cuando el campo está vacío: le pisa el color
    // por uno apagado, la señal de "todavía no se puede tocar"
    color: colores.textoSecundario,
  },
});
