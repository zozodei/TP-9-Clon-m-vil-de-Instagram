import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  imagen: {
    flex: 1, // ocupa todo el Pressable que la contiene (que ya tiene el tamaño width/height)
    margin: 1, // separación mínima entre celdas, para que se note la grilla (efecto "cuadriculado")
    backgroundColor: colores.superficie, // se ve mientras la imagen carga
  },
});
