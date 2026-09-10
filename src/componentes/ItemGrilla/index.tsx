import { Image, Pressable } from 'react-native';
import type { Post } from '../../tipos';
import styles from './ItemGrilla.styles';

type Props = {
  post: Post;
  tamaño: number;
  onPress: () => void;
};

// un cuadradito de la grilla del perfil.
// El tamaño llega calculado desde la pantalla (ancho / 3), por eso el estilo va armado
// acá en línea y no en el archivo de estilos: depende de una prop, no es un valor fijo
const ItemGrilla = ({ post, tamaño, onPress }: Props) => {
  return (
    <Pressable onPress={onPress} style={{ width: tamaño, height: tamaño }}>
      <Image source={{ uri: post.url }} style={styles.imagen} />
    </Pressable>
  );
};

export default ItemGrilla;
