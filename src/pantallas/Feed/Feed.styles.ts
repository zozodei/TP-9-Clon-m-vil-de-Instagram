// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  Feed.styles.ts  —  LOS ESTILOS DE LA PANTALLA PRINCIPAL                    ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// (La explicación general de cómo funcionan los estilos y flexbox en React
//  Native está en componentes/PostCard/PostCard.styles.ts)

import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

// ── UN ESTILO COMPARTIDO ─────────────────────────────────────────────────────
// El header y la lista usan el MISMO tope de ancho, para que el logo
// "Instagram" quede alineado con el borde de las fotos y no flotando solo a la
// izquierda cuando se abre en el navegador. El porqué del tope está explicado
// en estilos/tema.ts.
//
// Lo declaro en una constante aparte porque lo necesito en dos estilos
// distintos de este mismo archivo, así no repito las tres líneas.
//
// ¿Y por qué le tengo que poner ": ViewStyle"? Porque este objeto está SUELTO,
// fuera de StyleSheet.create(). Cuando está adentro, React Native ya sabe que es
// un estilo. Acá afuera, sin la anotación, TypeScript vería '100%' y 'center'
// como simple texto y no como los valores concretos que acepta un estilo, y me
// tiraría error al usarlo. Con ViewStyle le aclaro qué es.
const anchoLimitado: ViewStyle = {
  width: '100%',
  maxWidth: medidas.anchoMaximoContenido, // no más de 500px
  alignSelf: 'center',                    // y si sobra lugar, centrado
};

export default StyleSheet.create({

  contenedor: {
    // ⚠️ SIN ESTE flex: 1 LA LISTA NO SE VE.
    // Es el error más común de React Native: si el contenedor no reclama alto,
    // queda con alto 0 y todo lo de adentro desaparece, sin ningún mensaje de
    // error. Siempre que una pantalla se ve en blanco, lo primero que reviso es
    // si le falta un flex: 1.
    flex: 1,
    backgroundColor: colores.fondo,
  },

  // La pantalla de "Cargando publicaciones..." con la ruedita.
  centro: {
    flex: 1,                  // ocupa toda la pantalla...
    justifyContent: 'center', // ...y centra verticalmente (eje principal)
    alignItems: 'center',     // ...y horizontalmente (eje cruzado)
    backgroundColor: colores.fondo,
  },

  header: {
    // Los "..." copian acá adentro las tres propiedades del estilo compartido
    // que declaré arriba. Es el mismo spread que uso con los objetos en App.tsx.
    ...anchoLimitado,
    flexDirection: 'row',
    justifyContent: 'space-between', // logo a la izquierda, íconos a la derecha
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    // hairlineWidth es "la línea más fina que esta pantalla puede dibujar".
    // Depende de la densidad de píxeles del celular. Si pusiera 1 fijo, en las
    // pantallas de alta densidad se vería un borde grueso y berreta.
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colores.borde,
  },

  logo: {
    fontSize: 26,
    fontStyle: 'italic', // el logo de Instagram es en cursiva
    fontWeight: '700',
    color: colores.textoPrincipal,
  },

  headerIconos: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerIcono: {
    marginRight: 16, // separa el corazón del avioncito
  },

  // Este va en el "contentContainerStyle" de la FlatList, no en "style".
  // La diferencia es importante:
  //   style                 → estiliza la lista en sí (la ventanita con scroll)
  //   contentContainerStyle → estiliza el bloque que contiene TODAS las filas
  //                           juntas, o sea lo que se mueve al scrollear
  // Como quiero limitar el ancho del contenido y no de la ventana, va acá.
  listaContenido: anchoLimitado,
});
