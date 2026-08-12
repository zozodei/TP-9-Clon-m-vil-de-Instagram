import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../../componentes/PostCard';
import BarraHistorias from '../../componentes/BarraHistorias';
import { colores } from '../../colores';
import styles from './Feed.styles';

// pantalla principal (Home). posteos y onToggleLike le llegan por props
// desde App.js (los pasa el navegador), no maneja estado propio.
// FlatList es obligatorio por consigna: nada de .map() en un scroll.
const FeedPantalla = ({ navigation, posteos, onToggleLike }) => {

  // por si todavía no respondió la API
  if (posteos.length === 0) {
    return (
      <SafeAreaView style={styles.centro} edges={['top']}>
        <ActivityIndicator size="large" color={colores.textoPrincipal} />
        <Text>Cargando publicaciones...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIconos}>
          <Ionicons name="heart-outline" size={26} color={colores.textoPrincipal} style={styles.headerIcono} />
          <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
        </View>
      </View>

      {/* mapea el array de posteos y le manda a PostCard cada uno por props */}
      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id}
        ListHeaderComponent={<BarraHistorias />}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onClickImagen={() => navigation.navigate('DetallePost', { postId: item.id })}
            onToggleLike={() => onToggleLike(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default FeedPantalla;
