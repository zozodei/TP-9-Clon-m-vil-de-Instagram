// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  DetallePost.styles.ts  —  LOS ESTILOS DEL DETALLE                          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// (La explicación general de flexbox y estilos está en PostCard.styles.ts)

import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

// El mismo tope de ancho que usa el Feed, para que la publicación y la barra de
// comentario queden alineadas entre sí. El porqué está en estilos/tema.ts.
const anchoLimitado: ViewStyle = {
  width: '100%',
  maxWidth: medidas.anchoMaximoContenido,
  alignSelf: 'center',
};

export default StyleSheet.create({

  pantalla: {
    flex: 1,
    // El fondo blanco es necesario acá: sin él, abajo del contenido se vería el
    // gris que el navegador pone por defecto detrás de las pantallas modales.
    backgroundColor: colores.fondo,
  },

  lista: {
    // ⭐ ESTE flex: 1 ES EL QUE HACE QUE LA BARRA DE COMENTAR QUEDE ABAJO.
    // La pantalla tiene dos hijos: la lista y la barra. Al decirle a la lista
    // "agarrá todo el espacio sobrante", la barra queda apretada abajo de todo,
    // fija. Sin esto, la lista crecería sin límite y empujaría la barra fuera de
    // la pantalla.
    flex: 1,
  },

  // El contenido de adentro de la lista (lo que scrollea).
  contenedor: {
    ...anchoLimitado,
    backgroundColor: colores.fondo,
    paddingBottom: 24, // aire al final, para que el último comentario respire
  },

  // La pantallita de "No se encontró la publicación".
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
    borderRadius: 18, // la mitad del ancho = círculo
    marginRight: 10,
    backgroundColor: colores.superficie,
  },

  headerInfo: {
    flex: 1, // agarra el espacio sobrante de la fila
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
    aspectRatio: 1, // cuadrada, igual que en el feed
    backgroundColor: colores.superficie,
  },

  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between', // íconos de la izquierda vs. guardar
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
  },

  accionesIzq: {
    flexDirection: 'row',
  },

  accionBtn: {
    // Un poquito más de separación que en el feed (16 contra 14), porque acá los
    // íconos son más grandes (28 contra 26).
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

  // ── LA BARRA DE ABAJO PARA ESCRIBIR ────────────────────────────────────────
  barraComentario: {
    ...anchoLimitado,
    flexDirection: 'row', // avatar + campo + botón, en una fila
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderTopWidth: StyleSheet.hairlineWidth, // la rayita que la separa de la lista
    borderTopColor: colores.borde,
    backgroundColor: colores.fondo, // opaco, para que el contenido no se
                                    // transparente por atrás al scrollear
  },

  avatarChico: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
    backgroundColor: colores.superficie,
  },

  input: {
    // El campo agarra todo el ancho que sobra entre el avatar (izquierda) y el
    // botón Publicar (derecha), sin que yo tenga que calcular nada.
    flex: 1,
    fontSize: 13,
    color: colores.textoPrincipal,
    paddingVertical: 6,
    // Esto saca el recuadro azul que los navegadores le ponen a los campos al
    // hacer foco, y que quedaba feo en la versión web. En el celular esta
    // propiedad simplemente se ignora, así que no molesta.
    outlineWidth: 0,
  },

  botonPublicar: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.acento, // el azul de Instagram: "esto se puede tocar"
    marginLeft: 8,
  },

  botonPublicarApagado: {
    // Este estilo se aplica ENCIMA del anterior (en un array) cuando el campo
    // está vacío, y le pisa el azul por un gris. Es la señal visual de
    // "todavía no se puede publicar". El botón además está disabled, así que no
    // es solo apariencia: de verdad no responde.
    color: colores.textoSecundario,
  },
});
