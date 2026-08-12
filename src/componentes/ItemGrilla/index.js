import { Image, Pressable } from 'react-native';
import styles from './ItemGrilla.styles';

// un cuadradito de la grilla de 3 columnas del perfil. "tamaño" llega
// calculado desde la pantalla de Perfil (ancho de pantalla / 3)
const ItemGrilla = ({ post, tamaño, onPress }) => {
  return (
    <Pressable onPress={onPress} style={{ width: tamaño, height: tamaño }}>
      <Image source={{ uri: post.url }} style={styles.imagen} />
    </Pressable>
  );
};

export default ItemGrilla;
