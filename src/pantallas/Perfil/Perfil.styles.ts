// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  Perfil.styles.ts  —  LOS ESTILOS DE LA PANTALLA DE PERFIL                  ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// (La explicación general de flexbox y estilos está en PostCard.styles.ts)
//
// Ojo: el tamaño de los cuadraditos de la grilla NO está acá, se calcula en
// pantallas/Perfil/index.tsx. Es porque depende del ancho del celular, y estos
// archivos de estilos son solo para valores fijos.

import { StyleSheet } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

export default StyleSheet.create({

  contenedor: {
    flex: 1, // sin esto la lista quedaría con alto 0 y no se vería nada
    backgroundColor: colores.fondo,
  },

  // El mismo tope de ancho que el Feed, para que en la web la grilla no se
  // estire a lo ancho de todo el navegador y las fotos queden gigantes.
  // El porqué está explicado en estilos/tema.ts.
  listaContenido: {
    width: '100%',
    maxWidth: medidas.anchoMaximoContenido,
    alignSelf: 'center',
  },

  // La fila de PUBLICACIONES / GUARDADOS / ETIQUETADOS.
  tabs: {
    flexDirection: 'row',
    // space-around le da a cada uno el mismo espacio a los costados, así los
    // tres quedan repartidos parejo a lo ancho.
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth, // la línea que separa de la bio
    borderTopColor: colores.borde,
    paddingVertical: 10,
    marginBottom: 2,
  },

  tab: {
    fontSize: 11,
    letterSpacing: 0.5, // un poquito de aire entre letras, como el Instagram real
    color: colores.textoSecundario, // gris: es una pestaña NO seleccionada
  },

  // Este se aplica ENCIMA del anterior (con el array de estilos) solo en la
  // pestaña activa. Le pisa el color gris por el oscuro y le suma la rayita.
  tabActivo: {
    color: colores.textoPrincipal,
    fontWeight: '700',
    borderBottomWidth: 1,                  // la rayita de "estás acá"
    borderBottomColor: colores.textoPrincipal,
    paddingBottom: 8,                      // separa esa rayita del texto
  },

  // El cartel de "Todavía no hay publicaciones", que se muestra solo si la
  // lista está vacía (con la prop ListEmptyComponent de la FlatList).
  vacio: {
    textAlign: 'center',
    color: colores.textoSecundario,
    marginTop: 24,
  },
});
