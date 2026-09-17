// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  componentes/PostCard  —  UNA PUBLICACIÓN DEL FEED                          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Una sola publicación del feed: la cabecera con el usuario, la foto, la fila de
// botones, los likes, el caption y el "Ver los N comentarios".
//
// El Feed lo usa 12 veces, una por publicación, y cada vez le pasa datos
// distintos. Esa es la idea de un componente: lo escribo una vez y lo reutilizo.
//
// ES UN COMPONENTE "TONTO" O DE PRESENTACIÓN: no tiene estado, no guarda nada,
// no sabe nada de navegación ni de dónde salieron los datos. Recibe una
// publicación, la dibuja, y cuando tocan algo avisa hacia arriba. Nada más.
//
// PARA EXPONER: "hacerlo tonto tiene una ventaja concreta: lo podría pegar en
// cualquier otra pantalla y funcionaría igual, porque no depende de nada de
// afuera. Toda la lógica está concentrada en App.tsx."

// Pressable → cualquier cosa que se pueda tocar (el equivalente al onClick)
// Text      → en React Native TODO texto va adentro de un <Text>. No existe el
//             texto suelto como en HTML: si lo dejo suelto, la app da error.
// View      → el contenedor genérico, el equivalente al <div> de HTML
// Image     → el equivalente al <img>
import { Image, Pressable, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colores } from '../../estilos/tema';
import type { Post } from '../../tipos';
import styles from './PostCard.styles';

// "() => void" es el tipo de una función que no recibe nada y no devuelve nada.
// Es exactamente lo que necesito para avisar "che, el usuario tocó esto".
// Estas funciones que llegan por props se llaman CALLBACKS: el padre me presta
// una función para que yo la llame cuando pase algo.
type Props = {
  post: Post;
  onAbrirDetalle: () => void;
  onToggleLike: () => void;
};

// Un detalle de nombres: la prop se llama "onAbrirDetalle" y no "onClickImagen"
// a propósito. El nombre describe QUÉ PASA, no DÓNDE se hizo clic. Y es lo
// correcto, porque acá abajo hay tres cosas distintas que llaman a la misma
// función: la imagen, el globito de comentario y el "Ver los N comentarios".
const PostCard = ({ post, onAbrirDetalle, onToggleLike }: Props) => {
  return (
    <View style={styles.contenedor}>

      {/* ── CABECERA: avatar + usuario + ubicación + los tres puntitos ────── */}
      <View style={styles.header}>
        {/* Cuando la imagen viene de internet, Image necesita un objeto
            { uri: '...' }. Si fuera una imagen local del proyecto, iría
            source={require('./foto.png')}, que es otra sintaxis distinta. */}
        <Image source={{ uri: post.avatar }} style={styles.avatar} />
        <View style={styles.headerInfo}>
          <Text style={styles.usuario}>{post.usuario}</Text>
          <Text style={styles.ubicacion}>{post.ubicacion}</Text>
        </View>
        <Text style={styles.mas}>···</Text>
      </View>

      {/* ── LA FOTO ─────────────────────────────────────────────────────────
          Envuelvo la imagen en un Pressable para que se pueda tocar y se abra
          el detalle. Un Image por sí solo no detecta toques. */}
      <Pressable onPress={onAbrirDetalle}>
        <Image source={{ uri: post.url }} style={styles.foto} />
      </Pressable>

      {/* ── LA FILA DE BOTONES ──────────────────────────────────────────── */}
      <View style={styles.acciones}>
        <View style={styles.accionesIzq}>

          {/* EL CORAZÓN: el botón más importante de la app.
              Tanto el ícono como el color cambian según post.liked, usando un
              ternario, que se lee así:
                  condición ? valorSiEsVerdadero : valorSiEsFalso
              Es un if escrito en una línea. Lo uso porque adentro del JSX no
              puedo escribir un if normal. */}
          <Pressable onPress={onToggleLike} hitSlop={8} style={styles.accionBtn}>
            <Ionicons
              name={post.liked ? 'heart' : 'heart-outline'}
              size={26}
              color={post.liked ? colores.like : colores.textoPrincipal}
            />
          </Pressable>

          {/* El globito también abre el detalle: es donde están los comentarios */}
          <Pressable onPress={onAbrirDetalle} hitSlop={8} style={styles.accionBtn}>
            <Ionicons name="chatbubble-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>

          {/* Compartir y guardar son SOLO VISUALES: fijate que no tienen
              onPress, así que no hacen nada al tocarlos. Están porque sin ellos
              no se parecía a Instagram. */}
          <Pressable hitSlop={8}>
            <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
          </Pressable>
        </View>

        <Pressable hitSlop={8}>
          <Ionicons name="bookmark-outline" size={24} color={colores.textoPrincipal} />
        </Pressable>
      </View>

      {/* toLocaleString('es-AR') formatea el número al estilo argentino: le pone
          el punto de miles, o sea muestra 1.234 en vez de 1234. */}
      <Text style={styles.likes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

      {/* Un <Text> adentro de otro <Text>: así mezclo dos estilos en el mismo
          renglón. El usuario va en negrita y el caption normal, seguidos. */}
      <Text style={styles.caption}>
        <Text style={styles.usuario}>{post.usuario}</Text> {post.caption}
      </Text>

      {/* Este número se actualiza SOLO. No tengo que hacer nada: cuando comento
          en el detalle, cambia la lista en App.tsx, esa lista baja hasta acá por
          props y React redibuja este texto con el número nuevo. */}
      <Pressable onPress={onAbrirDetalle}>
        <Text style={styles.verComentarios}>
          Ver los {post.comentarios.length} comentarios
        </Text>
      </Pressable>
    </View>
  );
};

export default PostCard;
