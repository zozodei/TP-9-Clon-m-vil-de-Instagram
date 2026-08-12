import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  barra: {
    borderBottomWidth: StyleSheet.hairlineWidth, // la línea más fina posible según la pantalla (1px físico)
    borderBottomColor: colores.borde,
    paddingVertical: 10,
  },
  item: {
    alignItems: 'center', // centra el círculo y el nombre horizontalmente
    marginLeft: 12, // separación entre una historia y la siguiente
    width: 64, // ancho fijo para que todas las historias midan lo mismo
  },
  anillo: {
    width: 58,
    height: 58,
    borderRadius: 29, // círculo perfecto (mitad del width/height)
    borderWidth: 2, // grosor del "anillo" de color alrededor de la foto
    borderColor: colores.like, // rojo/rosa: simula el anillo de "historia no vista" de Instagram
    alignItems: 'center',
    justifyContent: 'center', // centra la foto adentro del círculo más grande
  },
  anilloTuya: {
    borderColor: colores.borde, // gris en vez de rojo: así se nota que es "tu" historia, no una ajena
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
