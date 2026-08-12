import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Comentario from '../../componentes/Comentario';
import { colores } from '../../colores';
import styles from './DetallePost.styles';

// vista ampliada de un posteo (se abre como modal desde Feed o desde Perfil).
// "route" lo inyecta React Navigation: adentro trae "params", que es el objeto
// que le mandamos con navigation.navigate('DetallePost', { postId: ... }).
// "posteos" y "onToggleLike" le llegan por props desde App.js, igual que a Feed.
const DetallePostPantalla = ({ route, posteos, onToggleLike }) => {
  // sacamos el postId que viajó como parámetro de navegación
  const { postId } = route.params;

  // buscamos, DENTRO del array actualizado de posteos, el que tiene ese id.
  // find() devuelve el primer elemento que cumple la condición, o undefined si no hay ninguno.
  // Buscarlo acá (y no guardar el post recibido "congelado") es lo que hace que, si le diste
  // like en el feed, acá ya lo veas actualizado (es el mismo estado, no una copia vieja)
  const post = posteos.find((p) => p.id === postId);

  // por las dudas el post no exista (por ejemplo, si todavía no cargaron los posteos)
  if (!post) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom']}>
        <Text>No se encontró la publicación.</Text>
      </SafeAreaView>
    );
  }

  return (
    // edges={['bottom']}: acá el header nativo de la pantalla (que pone React Navigation)
    // ya se encarga de la parte de arriba, así que solo protegemos el borde de abajo
    <SafeAreaView style={{ flex: 1 }} edges={['bottom']}>
      {/* usamos FlatList para los COMENTARIOS (no para toda la pantalla), y le metemos
          la foto, los botones y el caption como "ListHeaderComponent" arriba de todo.
          Así toda la pantalla (foto + info + comentarios) hace scroll junta y en una sola lista */}
      <FlatList
        data={post.comentarios}
        keyExtractor={(comentario) => String(comentario.id)}
        renderItem={({ item }) => <Comentario comentario={item} />}
        contentContainerStyle={styles.contenedor}
        ListHeaderComponent={
          <View>
            {/* cabecera: avatar + usuario + ubicación, igual que en PostCard */}
            <View style={styles.header}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.headerInfo}>
                <Text style={styles.usuario}>{post.usuario}</Text>
                <Text style={styles.ubicacion}>{post.ubicacion}</Text>
              </View>
            </View>

            {/* la foto en grande */}
            <Image source={{ uri: post.url }} style={styles.foto} />

            {/* mismo botón de like que en PostCard: onToggleLike(post.id) actualiza App.js,
                que a su vez hace que "posteos" cambie, y por eso este componente se vuelve a
                dibujar con el corazón ya del color correcto y el contador actualizado */}
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

            {/* título chico antes de que empiecen a listarse los comentarios de abajo */}
            <Text style={styles.comentariosTitulo}>Comentarios</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
};

export default DetallePostPantalla;
