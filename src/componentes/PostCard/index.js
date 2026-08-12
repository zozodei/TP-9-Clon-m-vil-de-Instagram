import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../../colores';
import styles from './PostCard.styles';

// una publicación del feed. No guarda nada por su cuenta: le llega todo por
// props (el posteo, y las funciones para cuando lo tocan o le dan like)
const PostCard = ({ post, onClickImagen, onToggleLike }) => {
  return (
    <View style={styles.postcard}>

      {/* cabecera: avatar, usuario y ubicación simulada */}
      <View style={styles.postcardHeader}>
        <Image source={{ uri: post.avatar }} style={styles.postcardAvatar} />
        <View style={styles.postcardHeaderInfo}>
          <Text style={styles.postcardUsuario}>{post.usuario}</Text>
          <Text style={styles.postcardUbicacion}>{post.ubicacion}</Text>
        </View>
        <Text style={styles.postcardMas}>···</Text>
      </View>

      {/* la foto del gato, tocarla abre el detalle */}
      <Pressable onPress={onClickImagen}>
        <Image source={{ uri: post.url }} style={styles.postcardFoto} />
      </Pressable>

      {/* barra de me gusta / comentar / compartir */}
      <View style={styles.postcardAcciones}>
        <View style={styles.postcardAccionesIzq}>
          <Pressable onPress={onToggleLike} hitSlop={8} style={styles.accionBtn}>
            <Ionicons
              name={post.liked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.liked ? colores.like : colores.textoPrincipal}
            />
          </Pressable>
          <Pressable onPress={onClickImagen} hitSlop={8} style={styles.accionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>
          <Pressable hitSlop={8}>
            <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>
        </View>
        <Pressable hitSlop={8}>
          <Ionicons name="bookmark-outline" size={24} color={colores.textoPrincipal} />
        </Pressable>
      </View>

      <Text style={styles.postcardLikes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

      <Text style={styles.postcardCaption}>
        <Text style={styles.postcardUsuario}>{post.usuario}</Text> {post.caption}
      </Text>

      <Pressable onPress={onClickImagen}>
        <Text style={styles.postcardVerComentarios}>
          Ver los {post.comentarios.length} comentarios
        </Text>
      </Pressable>
    </View>
  );
};

export default PostCard;
