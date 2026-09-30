// Pantalla de inicio: el header con el logo, las historias y la lista de posteos.
// Recibe los posteos y la función de like desde App.tsx (no tiene estado propio).

import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../PostCard';
import BarraHistorias from '../BarraHistorias';
import { colores } from '../../estilos/tema';
import type { Navegacion, Post } from '../../tipos';
import styles from './Feed.styles';

type Props = {
  posteos: Post[];
  onToggleLike: (id: string) => void;
};

const Feed = ({ posteos, onToggleLike }: Props) => {
  // useNavigation da el objeto navigation, que sirve para abrir otras
  // pantallas con navigation.navigate('NombreDePantalla', datos).
  const navigation = useNavigation<Navegacion>();

  // Mientras la API no responde, la lista está vacía: muestro un spinner.
  // Con el return corto acá y no se dibuja el resto.
  if (posteos.length === 0) {
    return (
      <SafeAreaView style={styles.centro}>
        {/* ActivityIndicator = la ruedita de carga */}
        <ActivityIndicator size="large" color={colores.textoPrincipal} />
        <Text>Cargando publicaciones...</Text>
      </SafeAreaView>
    );
  }

  return (
    // SafeAreaView evita que el contenido quede tapado por el notch del celular.
    // edges={['top']}: solo protege arriba (abajo ya está la barra de pestañas).
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      {/* Header fuera de la lista, así queda fijo al scrollear */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIconos}>
          <Ionicons name="heart-outline" size={26} color={colores.textoPrincipal} style={styles.headerIcono} />
          <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
        </View>
      </View>

      {/* FlatList es la lista con scroll de React Native (reemplaza al .map de la web).
          Solo dibuja los posteos que se ven en pantalla, así no se pone lenta.
          Necesita: data (la lista), keyExtractor (clave única) y renderItem (cómo dibujar cada uno). */}
      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id}
        // Las historias van como encabezado de la lista, así scrollean junto con los posteos.
        ListHeaderComponent={
          <BarraHistorias
            onAbrirHistoria={(historia) => navigation.navigate('VisorHistoria', { historia })}
          />
        }
        renderItem={({ item }) => (
          <PostCard
            post={item}
            // Al detalle le mando solo el id; el posteo lo busca App.tsx en el estado.
            onAbrirDetalle={() => navigation.navigate('DetallePost', { postId: item.id })}
            // PostCard llama a onToggleLike() sin saber el id; acá ya le digo cuál es.
            onToggleLike={() => onToggleLike(item.id)}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.lista}
      />
    </SafeAreaView>
  );
};

export default Feed;
