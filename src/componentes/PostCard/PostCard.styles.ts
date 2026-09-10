import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

// StyleSheet.create valida los estilos y les da un id interno, para que React Native
// los mande de forma más liviana al lado nativo que un objeto suelto en cada render
export default StyleSheet.create({
  contenedor: {
    marginBottom: 12,
    backgroundColor: colores.fondo,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17, // la mitad del ancho: así el cuadrado se ve como un círculo
    marginRight: 10,
    backgroundColor: colores.superficie, // se ve mientras la imagen carga
  },
  headerInfo: {
    flex: 1, // ocupa el espacio que sobra y empuja el "···" al extremo derecho
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
  mas: {
    fontWeight: '700',
    color: colores.textoPrincipal,
  },
  foto: {
    width: '100%',
    aspectRatio: 1, // fuerza que el alto sea igual al ancho (foto cuadrada), sin calcularlo a mano
    backgroundColor: colores.superficie,
  },
  acciones: {
    flexDirection: 'row',
    justifyContent: 'space-between', // separa el grupo de la izquierda del de guardar
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  accionesIzq: {
    flexDirection: 'row',
  },
  accionBtn: {
    marginRight: 14,
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
