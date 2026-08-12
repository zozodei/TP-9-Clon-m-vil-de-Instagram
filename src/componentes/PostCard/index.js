// Image: para mostrar fotos (equivalente al <img> de HTML)
// Pressable: componente táctil, detecta cuándo el usuario toca algo (equivalente al onClick de un botón/div)
// Text: TODO texto en React Native tiene que ir adentro de un <Text>, no se puede poner texto suelto
// View: el contenedor genérico (equivalente al <div> de HTML)
import { Image, Pressable, Text, View } from 'react-native';
// Ionicons: los iconos vectoriales (corazón, comentario, etc.) de la librería de Expo
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../../colores';
// los estilos de este componente viven en un archivo aparte (PostCard.styles.js)
import styles from './PostCard.styles';

// PostCard es un componente de "presentación": no tiene useState propio, todo le llega por props.
// Recibe: el posteo a mostrar, y dos funciones que le pasa la pantalla que lo usa (Feed)
// para avisar cuándo el usuario toca la imagen o el botón de like.
const PostCard = ({ post, onClickImagen, onToggleLike }) => {
  return (
    // contenedor de toda la tarjeta (una publicación completa)
    <View style={styles.postcard}>

      {/* fila de arriba: avatar + usuario + ubicación + botón de "más opciones" */}
      <View style={styles.postcardHeader}>
        {/* Image necesita un objeto { uri: '...' } cuando la imagen viene de internet (no de un archivo local) */}
        <Image source={{ uri: post.avatar }} style={styles.postcardAvatar} />
        <View style={styles.postcardHeaderInfo}>
          {/* post.usuario y post.ubicacion son propiedades del objeto "post" que llegó por props */}
          <Text style={styles.postcardUsuario}>{post.usuario}</Text>
          <Text style={styles.postcardUbicacion}>{post.ubicacion}</Text>
        </View>
        {/* los tres puntitos, es solo decorativo, no hace nada al tocarlo */}
        <Text style={styles.postcardMas}>···</Text>
      </View>

      {/* la foto del gato. Pressable envuelve la imagen: al tocarla se ejecuta la función
          "onClickImagen" que llegó por props (en Feed, eso navega al detalle) */}
      <Pressable onPress={onClickImagen}>
        <Image source={{ uri: post.url }} style={styles.postcardFoto} />
      </Pressable>

      {/* barra de acciones: like, comentar, compartir (izquierda) y guardar (derecha) */}
      <View style={styles.postcardAcciones}>
        <View style={styles.postcardAccionesIzq}>

          {/* botón de like: al tocarlo llama a onToggleLike (que le llega por props desde Feed) */}
          <Pressable onPress={onToggleLike} hitSlop={8} style={styles.accionBtn}>
            {/* el ícono cambia según si el posteo está likeado o no:
                si post.liked es true, usamos el corazón relleno ("heart") y coloreado de rojo,
                si es false, usamos el corazón vacío ("heart-outline") en el color de texto normal.
                Esto es un operador ternario: condición ? valorSiTrue : valorSiFalse */}
            <Ionicons
              name={post.liked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.liked ? colores.like : colores.textoPrincipal}
            />
          </Pressable>

          {/* el ícono de comentario también lleva al detalle del posteo (reusa la misma función) */}
          <Pressable onPress={onClickImagen} hitSlop={8} style={styles.accionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>

          {/* compartir: solo visual, no tiene onPress porque no hace nada todavía */}
          <Pressable hitSlop={8}>
            <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>
        </View>

        {/* guardar (bookmark), a la derecha del todo, también solo visual */}
        <Pressable hitSlop={8}>
          <Ionicons name="bookmark-outline" size={24} color={colores.textoPrincipal} />
        </Pressable>
      </View>

      {/* cantidad de likes. toLocaleString('es-AR') le pone el punto de miles, ej: 1.234 en vez de 1234 */}
      <Text style={styles.postcardLikes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

      {/* el caption (descripción) con el usuario en negrita adelante, todo en el mismo renglón */}
      <Text style={styles.postcardCaption}>
        <Text style={styles.postcardUsuario}>{post.usuario}</Text> {post.caption}
      </Text>

      {/* link de "ver comentarios", también toca la misma función que la imagen (abre el detalle) */}
      <Pressable onPress={onClickImagen}>
        <Text style={styles.postcardVerComentarios}>
          {/* post.comentarios.length cuenta cuántos elementos tiene el array de comentarios */}
          Ver los {post.comentarios.length} comentarios
        </Text>
      </Pressable>
    </View>
  );
};

// exportamos el componente para poder importarlo en Feed con "import PostCard from '../../componentes/PostCard'"
export default PostCard;
