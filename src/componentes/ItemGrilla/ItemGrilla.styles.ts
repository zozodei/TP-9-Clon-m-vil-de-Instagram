import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({
  imagen: {
    flex: 1, // ocupa todo el Pressable, que ya tiene el width/height calculado
    margin: 1, // separación mínima entre celdas, para que se note la grilla
    backgroundColor: colores.superficie,
  },
});
