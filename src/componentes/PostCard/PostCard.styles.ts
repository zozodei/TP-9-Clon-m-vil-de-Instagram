// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  PostCard.styles.ts  —  LOS ESTILOS DE UNA PUBLICACIÓN                      ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ═══ ESTE BLOQUE EXPLICA CÓMO FUNCIONAN LOS ESTILOS EN TODO EL PROYECTO ═══
//
// En React Native no hay CSS. Los estilos son objetos de JavaScript: en vez de
// escribir "background-color: white" se escribe backgroundColor: 'white', en
// camelCase y con comillas.
//
// TRES DIFERENCIAS IMPORTANTES CON EL CSS DE LA WEB (buenas para la exposición):
//
//  1) TODO ES FLEXBOX, siempre. No hay display: block ni float. Cada View es
//     un contenedor flex por defecto.
//
//  2) La dirección por defecto es COLUMNA (de arriba hacia abajo), al revés que
//     en la web, donde flexbox va en fila. Por eso, cada vez que quiero poner
//     cosas una al lado de la otra, tengo que escribir flexDirection: 'row'.
//     Si no lo escribo, se apilan.
//
//  3) No hay herencia: si le pongo un color al View, los Text de adentro NO lo
//     heredan. Hay que estilar cada texto.
//
// LAS PROPIEDADES DE FLEXBOX QUE MÁS USO ACÁ:
//   flex: 1          → "agarrá todo el espacio libre que haya"
//   justifyContent   → cómo se reparten en la dirección principal
//   alignItems       → cómo se alinean en la dirección contraria (centrar)
//   space-between    → el primero pegado a un borde, el último al otro, y el
//                      espacio sobrante repartido en el medio

import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

// ¿Por qué StyleSheet.create y no un objeto suelto?
// Porque valida que las propiedades existan (si escribo backgrundColor me avisa)
// y porque le asigna un id interno a cada estilo. React Native le manda ese id
// al lado nativo en vez del objeto entero cada vez que dibuja: es más liviano.
export default StyleSheet.create({

  // El contenedor de toda la publicación.
  contenedor: {
    marginBottom: 12, // separación con la publicación siguiente
    backgroundColor: colores.fondo,
  },

  // La cabecera: avatar + textos + los tres puntitos, todo en una fila.
  header: {
    flexDirection: 'row', // sin esto quedarían uno debajo del otro
    alignItems: 'center', // los centra verticalmente entre sí
    paddingHorizontal: 12, // padding = espacio de adentro (izquierda y derecha)
    paddingVertical: 8,    // (arriba y abajo)
  },

  avatar: {
    width: 34,
    height: 34,
    // ⭐ EL TRUCO DEL CÍRCULO: borderRadius con la MITAD del ancho convierte el
    // cuadrado en un círculo perfecto. 34 / 2 = 17. Lo uso en toda la app.
    borderRadius: 17,
    marginRight: 10, // margin = espacio de AFUERA, separa del texto de al lado
    backgroundColor: colores.superficie, // el gris que se ve mientras carga la foto
  },

  headerInfo: {
    // ⭐ EL TRUCO DEL EMPUJÓN: este bloque agarra todo el espacio sobrante de la
    // fila, y al hacerlo empuja los "···" hasta el extremo derecho. Es más
    // prolijo que calcular márgenes a mano, porque funciona con cualquier ancho.
    flex: 1,
  },

  usuario: {
    fontWeight: '600', // semi-negrita (400 es normal, 700 es negrita)
    fontSize: 13,
    color: colores.textoPrincipal,
  },

  ubicacion: {
    fontSize: 11,
    color: colores.textoSecundario, // gris: es información menos importante
  },

  mas: {
    fontWeight: '700',
    color: colores.textoPrincipal,
  },

  foto: {
    width: '100%', // ocupa todo el ancho disponible
    // ⭐ aspectRatio: 1 significa "que el alto sea igual al ancho", o sea
    // cuadrada. Lo bueno es que se adapta solo a cualquier celular sin que yo
    // tenga que calcular píxeles. (Este es el motivo por el que hizo falta el
    // tope de ancho para la web: ver estilos/tema.ts)
    aspectRatio: 1,
    backgroundColor: colores.superficie,
  },

  acciones: {
    flexDirection: 'row',
    // ⭐ separa el grupo de la izquierda (corazón, comentario, compartir) del
    // de la derecha (guardar), mandando cada uno a su punta.
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },

  accionesIzq: {
    flexDirection: 'row', // los tres íconos de la izquierda, uno al lado del otro
  },

  accionBtn: {
    marginRight: 14, // separación entre íconos
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
