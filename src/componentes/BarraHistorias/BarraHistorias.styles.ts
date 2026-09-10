import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({
  barra: {
    borderBottomWidth: StyleSheet.hairlineWidth, // la línea más fina posible según la pantalla
    borderBottomColor: colores.borde,
    paddingVertical: 10,
  },
  item: {
    alignItems: 'center',
    marginLeft: 12,
    width: 64, // ancho fijo para que todas las historias midan lo mismo
  },
  anillo: {
    width: 58,
    height: 58,
    borderRadius: 29, // la mitad del ancho: círculo
    borderWidth: 2,
    borderColor: colores.like, // el anillo de "historia no vista" de Instagram
    alignItems: 'center',
    justifyContent: 'center', // centra la foto adentro del anillo
  },
  anilloTuya: {
    borderColor: colores.borde, // gris en vez de rojo: se nota que es "tu" historia
  },
  foto: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colores.superficie,
  },
  nombre: {
    fontSize: 11,
    color: colores.textoPrincipal,
    marginTop: 4,
  },
});
