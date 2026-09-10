// FlatList: la lista con scroll optimizada. A diferencia de un .map(), solo monta las filas
// visibles en pantalla y las va reciclando a medida que se hace scroll
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
// SafeAreaView: evita que el header choque con el notch o la barra de estado
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../../componentes/PostCard';
import BarraHistorias from '../../componentes/BarraHistorias';
import { colores } from '../../estilos/tema';
import type { Post } from '../../tipos';
import type { NavegacionDelStack } from '../../navegacion/tipos';
import styles from './Feed.styles';

// "navigation" lo inyecta React Navigation; "posteos" y "onToggleLike" se los pasamos
// nosotros desde TabsPrincipales
type Props = {
  navigation: NavegacionDelStack;
  posteos: Post[];
  onToggleLike: (id: string) => void;
};

// la pantalla principal. No tiene estado propio: los posteos y las funciones que los
// modifican le llegan por props desde App.tsx.
const FeedPantalla = ({ navigation, posteos, onToggleLike }: Props) => {

  // mientras el array siga vacío, la API todavía no respondió: mostramos el spinner
  if (posteos.length === 0) {
    return (
      <SafeAreaView style={styles.centro} edges={['top']}>
        <ActivityIndicator size="large" color={colores.textoPrincipal} />
        <Text>Cargando publicaciones...</Text>
      </SafeAreaView>
    );
  }

  return (
    // edges={['top']}: solo hay que proteger el borde de arriba en esta pantalla
    <SafeAreaView style={styles.contenedor} edges={['top']}>

      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIconos}>
          <Ionicons name="heart-outline" size={26} color={colores.textoPrincipal} style={styles.headerIcono} />
          <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
        </View>
      </View>

      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id} // identifica cada fila de forma única
        // ListHeaderComponent se dibuja una sola vez, arriba de la primera foto.
        // La barra solo avisa qué historia tocaron; navegar es decisión de esta pantalla
        ListHeaderComponent={
          <BarraHistorias
            onAbrirHistoria={(historia) => navigation.navigate('VisorHistoria', { historia })}
          />
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            // mandamos solo el id, no el objeto: así el detalle siempre lee la versión
            // más actualizada del posteo desde App.tsx
            onAbrirDetalle={() => navigation.navigate('DetallePost', { postId: item.id })}
            onToggleLike={() => onToggleLike(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listaContenido}
      />
    </SafeAreaView>
  );
};

export default FeedPantalla;
