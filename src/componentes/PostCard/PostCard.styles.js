import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

// StyleSheet.create() no hace "magia": básicamente valida los estilos y les da un id numérico
// para que React Native los mande de forma más liviana al puente nativo (mejor rendimiento
// que mandar objetos sueltos cada vez que se dibuja la pantalla)
export default StyleSheet.create({
  postcard: {
    marginBottom: 12, // separación entre una publicación y la siguiente
    backgroundColor: colores.fondo,
  },
  postcardHeader: {
    flexDirection: 'row', // pone avatar + textos + "···" uno al lado del otro (por defecto es columna)
    alignItems: 'center', // centra todo verticalmente dentro de la fila
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  postcardAvatar: {
    width: 34,
    height: 34,
    borderRadius: 17, // la mitad del ancho/alto: así el cuadrado se ve como un círculo perfecto
    marginRight: 10,
    backgroundColor: colores.superficie, // color de fondo mientras la imagen todavía no cargó
  },
  postcardHeaderInfo: {
    flex: 1, // ocupa todo el espacio que sobra en la fila (empuja el "···" al extremo derecho)
  },
  postcardUsuario: {
    fontWeight: '600', // negrita (los valores van de '100' finito a '900' bien grueso)
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
    width: '100%', // ocupa todo el ancho disponible de la pantalla
    aspectRatio: 1, // fuerza que el alto sea igual al ancho (foto cuadrada), sin tener que calcularlo a mano
    backgroundColor: colores.superficie,
  },
  postcardAcciones: {
    flexDirection: 'row',
    justifyContent: 'space-between', // separa el grupo de la izquierda del de la derecha (guardar)
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  postcardAccionesIzq: {
    flexDirection: 'row', // like, comentar y compartir uno al lado del otro
  },
  accionBtn: {
    marginRight: 14, // separación entre cada ícono de acción
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
    color: colores.textoSecundario, // más clarito que el resto del texto, como un link secundario
    paddingHorizontal: 12,
    marginBottom: 4,
  },
});
