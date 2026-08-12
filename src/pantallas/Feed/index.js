// ActivityIndicator: el "spinner" giratorio de carga
// FlatList: la lista con scroll optimizada (obligatoria por consigna en vez de .map())
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
// SafeAreaView: evita que el header choque con el notch o la barra de estado
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../../componentes/PostCard';
import BarraHistorias from '../../componentes/BarraHistorias';
import { colores } from '../../colores';
import styles from './Feed.styles';

// FeedPantalla es la pantalla "Home". No tiene useState propio: "posteos" y "onToggleLike"
// le llegan por props desde App.js (pasando por NavegadorRaiz y TabsPrincipales).
// "navigation" se lo inyecta automáticamente React Navigation, sirve para cambiar de pantalla.
const FeedPantalla = ({ navigation, posteos, onToggleLike }) => {

  // mientras "posteos" sigue siendo el array vacío inicial (todavía no respondió la API),
  // mostramos un spinner en vez del feed vacío
  if (posteos.length === 0) {
    return (
      // edges={['top']} le dice a SafeAreaView que solo empuje el contenido hacia abajo del notch,
      // no hace falta protegerlo abajo/costados en esta pantalla
      <SafeAreaView style={styles.centro} edges={['top']}>
        <ActivityIndicator size="large" color={colores.textoPrincipal} />
        <Text>Cargando publicaciones...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>

      {/* header fijo arriba de todo: el logo tipo Instagram + dos iconitos a la derecha */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIconos}>
          <Ionicons name="heart-outline" size={26} color={colores.textoPrincipal} style={styles.headerIcono} />
          <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
        </View>
      </View>

      {/* FlatList recorre el array "posteos" y por cada uno arma una fila.
          Nada de esto se dibuja "de una" como con .map(): FlatList solo monta
          las filas visibles en pantalla (más un colchón), y va reciclando a medida que se hace scroll */}
      <FlatList
        data={posteos} // el array a recorrer
        keyExtractor={(post) => post.id} // identifica cada fila de forma única (id que trae la API)
        ListHeaderComponent={<BarraHistorias />} // se dibuja una sola vez, arriba de la primera foto
        // renderItem: qué se dibuja por cada elemento. Le pasamos el posteo (item) a PostCard,
        // y dos funciones "flecha" que capturan el id de ESE posteo puntual
        renderItem={({ item }) => (
          <PostCard
            post={item}
            // al tocar la imagen o "ver comentarios" navegamos a la pantalla DetallePost,
            // mandándole el id del posteo como parámetro (no el objeto completo)
            onClickImagen={() => navigation.navigate('DetallePost', { postId: item.id })}
            // al tocar el corazón, llamamos a la función que vive en App.js, pasándole el id
            onToggleLike={() => onToggleLike(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false} // oculta la barrita de scroll del costado
      />
    </SafeAreaView>
  );
};

export default FeedPantalla;
