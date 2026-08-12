import { Image, Pressable } from 'react-native';
import styles from './ItemGrilla.styles';

// un cuadradito de la grilla de 3 columnas del perfil.
// "tamaño" llega calculado desde Perfil/index.js (ancho de la pantalla dividido 3),
// así cada celda mide siempre lo mismo, sin importar el tamaño del celular
const ItemGrilla = ({ post, tamaño, onPress }) => {
  return (
    // el estilo { width, height } se arma "al vuelo" acá porque depende de una prop
    // que cambia según el dispositivo (no se puede poner un número fijo en el archivo de estilos)
    <Pressable onPress={onPress} style={{ width: tamaño, height: tamaño }}>
      <Image source={{ uri: post.url }} style={styles.imagen} />
    </Pressable>
  );
};

export default ItemGrilla;
