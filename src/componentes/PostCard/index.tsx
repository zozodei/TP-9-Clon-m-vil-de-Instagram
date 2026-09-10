// Pressable: componente táctil (el equivalente al onClick de HTML)
// Text: en React Native todo texto va adentro de un <Text>, no puede quedar suelto
// View: el contenedor genérico (el equivalente al <div>)
import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../../estilos/tema';
import type { Post } from '../../tipos';
import styles from './PostCard.styles';

// "() => void" es el tipo de una función que no recibe nada y no devuelve nada:
// justo lo que necesitamos para avisar "el usuario tocó esto"
type Props = {
  post: Post;
  onAbrirDetalle: () => void;
  onToggleLike: () => void;
};

// una publicación del feed. Es un componente de presentación: no tiene estado propio,
// todo le llega por props. Recibe el posteo y dos funciones que le pasa el Feed para
// avisarle cuándo el usuario quiere abrir el detalle o dar like.
// Se llama "onAbrirDetalle" (y no "onClickImagen") porque no la usa solo la imagen:
// el ícono de comentario y "Ver los N comentarios" hacen lo mismo.
const PostCard = ({ post, onAbrirDetalle, onToggleLike }: Props) => {
  return (
    <View style={styles.contenedor}>

      <View style={styles.header}>
        {/* Image necesita { uri: '...' } cuando la foto viene de internet */}
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.usuario}>{post.usuario}</Text>
          <Text style={styles.ubicacion}>{post.ubicacion}</Text>
        </View>
        <Text style={styles.mas}>···</Text>
      </View>

      <Pressable onPress={onAbrirDetalle}>
        <Image source={{ uri: post.url }} style={styles.foto} />
      </Pressable>

      <View style={styles.acciones}>
        <View style={styles.accionesIzq}>

          {/* el ícono y su color cambian según post.liked, con un ternario:
              condición ? valorSiEsTrue : valorSiEsFalse */}
          <Pressable onPress={onToggleLike} hitSlop={8} style={styles.accionBtn}>
            <Ionicons
              name={post.liked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.liked ? colores.like : colores.textoPrincipal}
            />
          </Pressable>

          <Pressable onPress={onAbrirDetalle} hitSlop={8} style={styles.accionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>

          {/* compartir y guardar son solo visuales: no tienen onPress */}
          <Pressable hitSlop={8}>
            <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>
        </View>

        <Pressable hitSlop={8}>
          <Ionicons name="bookmark-outline" size={24} color={colores.textoPrincipal} />
        </Pressable>
      </View>

      {/* toLocaleString('es-AR') pone el punto de miles: 1.234 en vez de 1234 */}
      <Text style={styles.likes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

      {/* un <Text> adentro de otro es la forma de mezclar dos estilos en el mismo renglón */}
      <Text style={styles.caption}>
        <Text style={styles.usuario}>{post.usuario}</Text> {post.caption}
      </Text>

      {/* el número se actualiza solo: al comentar cambia el array en App.tsx y esto se redibuja */}
      <Pressable onPress={onAbrirDetalle}>
        <Text style={styles.verComentarios}>
          Ver los {post.comentarios.length} comentarios
        </Text>
      </Pressable>
    </View>
  );
};

export default PostCard;
