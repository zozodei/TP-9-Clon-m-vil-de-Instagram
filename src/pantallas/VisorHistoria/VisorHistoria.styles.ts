// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  VisorHistoria.styles.ts  —  LOS ESTILOS DE LA HISTORIA EN GRANDE           ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// (La explicación general de flexbox y estilos está en PostCard.styles.ts)
//
// Este es el único archivo de estilos que NO importa la paleta de colores.
// Es a propósito: la paleta es toda de modo claro (blancos y grises) y esta
// pantalla es al revés, negra con texto blanco, como las historias de
// Instagram. Son dos colores puntuales que no se repiten en ningún otro lado,
// así que no tenía sentido meterlos en el tema.

import { StyleSheet } from 'react-native';

export default StyleSheet.create({

  pantalla: {
    flex: 1,                    // ocupa absolutamente toda la pantalla
    backgroundColor: '#000000', // negro puro, como las historias reales
  },

  encabezado: {
    flexDirection: 'row', // avatar, nombre y la X, los tres en una fila
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,           // la mitad del ancho = círculo
    marginRight: 8,
    backgroundColor: '#333333', // gris oscuro mientras la foto carga: sobre
                                // fondo negro, un gris claro pegaría un flash
  },

  usuario: {
    // ⭐ El mismo truco del empujón que uso en el feed: este texto agarra todo
    // el espacio sobrante de la fila y, al hacerlo, manda la X hasta el extremo
    // derecho sin que yo tenga que calcular márgenes.
    flex: 1,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  zonaFoto: {
    // Agarra todo el alto que sobra debajo del encabezado. Como es un Pressable,
    // eso significa que casi toda la pantalla es tocable para cerrar.
    flex: 1,
  },

  foto: {
    width: '100%',
    height: '100%',
    // La foto llena esta zona entera, pero con resizeMode="contain" (puesto en
    // el componente) entra completa sin recortarse: si la proporción no coincide
    // quedan franjas negras arriba y abajo, que sobre fondo negro ni se notan.
  },
});
