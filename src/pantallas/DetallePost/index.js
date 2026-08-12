import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Comentario from '../../componentes/Comentario';
import { colores } from '../../colores';
import styles from './DetallePost.styles';

// vista ampliada de un posteo. Por parámetro de navegación solo recibe el
// "postId" (no el objeto entero) y lo busca en "posteos", que le llega por
// props igual que a Feed: así, si le das like acá, se actualiza también en
// el feed porque es el mismo array de estado, no una copia.
const DetallePostPantalla = ({ route, posteos, onToggleLike }) => {
  const { postId } = route.params;
  const post = posteos.find((p) => p.id === postId);

  if (!post) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom']}>
        <Text>No se encontró la publicación.</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      <FlatList
        data={post.comentarios}
        keyExtractor={(comentario) => String(comentario.id)}
        renderItem={({ item }) => <Comentario comentario={item} />}
        contentContainerStyle={styles.contenedor}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.headerInfo}>
                <Text style={styles.usuario}>{post.usuario}</Text>
                <Text style={styles.ubicacion}>{post.ubicacion}</Text>
              </View>
            </View>

            <Image source={{ uri: post.url }} style={styles.foto} />

            {/* mismo botón de like que en PostCard: cambia color y suma/resta */}
            <View style={styles.acciones}>
              <View style={styles.accionesIzq}>
                <Pressable onPress={() => onToggleLike(post.id)} hitSlop={8} style={styles.accionBtn}>
                  <Ionicons
                    name={post.liked ? 'heart' : 'heart-outline'}
                    size={28}
                    color={post.liked ? colores.like : colores.textoPrincipal}
                  />
                </Pressable>
                <Pressable hitSlop={8} style={styles.accionBtn}>
                  <Ionicons name="chatbubble-outline" size={26} color={colores.textoPrincipal} />
                </Pressable>
                <Pressable hitSlop={8}>
                  <Ionicons name="paper-plane-outline" size={26} color={colores.textoPrincipal} />
                </Pressable>
              </View>
              <Ionicons name="bookmark-outline" size={26} color={colores.textoPrincipal} />
            </View>

            <Text style={styles.likes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

            <Text style={styles.caption}>
              <Text style={styles.usuario}>{post.usuario}</Text> {post.caption}
            </Text>

            <Text style={styles.comentariosTitulo}>Comentarios</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default DetallePostPantalla;
