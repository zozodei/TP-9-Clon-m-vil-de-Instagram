// Una publicación del feed: cabecera, foto, botones, likes, caption y
// "Ver comentarios". No guarda nada (no tiene useState): muestra el post que
// recibe y, cuando tocan algo, llama a la función que le pasó el Feed.
// El Feed lo usa una vez por cada posteo, con datos distintos.

// En React Native no hay etiquetas HTML:
//   View = <div>, Text = <p>/<span> (todo texto va dentro de un Text),
//   Image = <img>, Pressable = algo que se puede tocar (como un botón).
import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // íconos que ya vienen con Expo
import { colores } from '../../estilos/tema';
import type { Post } from '../../tipos';
import styles from './PostCard.styles';

// Lo que recibe del Feed. "() => void" = función que no recibe ni devuelve nada,
// solo sirve para avisar "tocaron esto".
type Props = {
  post: Post;
  onAbrirDetalle: () => void;
  onToggleLike: () => void;
};

const PostCard = ({ post, onAbrirDetalle, onToggleLike }: Props) => {
  return (
    <View style={styles.contenedor}>
      {/* Cabecera: avatar, usuario y ubicación */}
      <View style={styles.header}>
        {/* Las imágenes de internet se pasan como { uri: 'url' } */}
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.usuario}>{post.usuario}</Text>
          <Text style={styles.ubicacion}>{post.ubicacion}</Text>
        </View>
        <Text style={styles.mas}>···</Text>
      </View>

      {/* Tocar la foto abre el detalle (Image solo no detecta toques, por eso el Pressable) */}
      <Pressable onPress={onAbrirDetalle}>
        <Image source={{ uri: post.url }} style={styles.foto} />
      </Pressable>

      <View style={styles.acciones}>
        <View style={styles.accionesIzq}>
          {/* Corazón: lleno y rojo si tiene mi like, de contorno si no.
              condición ? siEsVerdadero : siEsFalso (ternario = un if en una línea).
              hitSlop agranda la zona tocable para que sea más fácil apretar. */}
          <Pressable onPress={onToggleLike} hitSlop={8} style={styles.accionBtn}>
            <Ionicons
              name={post.liked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.liked ? colores.like : colores.textoPrincipal}
            />
          </Pressable>

          {/* El globito también abre el detalle, donde están los comentarios */}
          <Pressable onPress={onAbrirDetalle} hitSlop={8} style={styles.accionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>

          {/* Compartir y guardar son solo decorativos */}
          <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
        </View>

        <Ionicons name="bookmark-outline" size={24} color={colores.textoPrincipal} />
      </View>

      {/* toLocaleString('es-AR') agrega el punto de miles: 1.234 */}
      <Text style={styles.likes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

      {/* Un Text dentro de otro para tener el usuario en negrita en el mismo renglón */}
      <Text style={styles.caption}>
        <Text style={styles.usuario}>{post.usuario}</Text> {post.caption}
      </Text>

      {/* Este número se actualiza solo al comentar, porque cambia el estado en App.tsx */}
      <Pressable onPress={onAbrirDetalle}>
        <Text style={styles.verComentarios}>Ver los {post.comentarios.length} comentarios</Text>
      </Pressable>
    </View>
  );
};

export default PostCard;
