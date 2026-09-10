// Dimensions: para conocer el ancho de la pantalla del dispositivo
import { Dimensions, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usuarioLogueado } from '../../data/dataDeUsuario';
import CabeceraPerfil from '../../componentes/CabeceraPerfil';
import ItemGrilla from '../../componentes/ItemGrilla';
import { medidas } from '../../estilos/tema';
import type { Post } from '../../tipos';
import type { NavegacionDelStack } from '../../navegacion/tipos';
import styles from './Perfil.styles';

type Props = {
  navigation: NavegacionDelStack;
  posteos: Post[];
};

const COLUMNAS = 3;

// cada celda mide un tercio del ancho, así las 3 columnas quedan simétricas.
// Math.min se queda con el menor valor: el ancho real de la pantalla, o nuestro tope
// (que en la web evita que las fotos se agranden sin control).
// Se calcula una sola vez al cargar el archivo, porque la app está fijada en vertical
const anchoDeLaGrilla = Math.min(Dimensions.get('window').width, medidas.anchoMaximoContenido);
const tamañoItem = anchoDeLaGrilla / COLUMNAS;

// No recibe onToggleLike porque acá no se puede dar like: hay que entrar al detalle
const PerfilPantalla = ({ navigation, posteos }: Props) => {
  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id}
        numColumns={COLUMNAS} // esto es lo que convierte la lista en una grilla
        contentContainerStyle={styles.listaContenido}
        ListHeaderComponent={
          <>
            <CabeceraPerfil usuario={usuarioLogueado} cantidadPosteos={posteos.length} />
            <View style={styles.tabs}>
              {/* el array combina el estilo base con "tabActivo" encima, solo en esta pestaña */}
              <Text style={[styles.tab, styles.tabActivo]}>PUBLICACIONES</Text>
              <Text style={styles.tab}>GUARDADOS</Text>
              <Text style={styles.tab}>ETIQUETADOS</Text>
            </View>
          </>
        }
        ListEmptyComponent={<Text style={styles.vacio}>Todavía no hay publicaciones.</Text>}
        renderItem={({ item }) => (
          <ItemGrilla
            post={item}
            tamaño={tamañoItem}
            onPress={() => navigation.navigate('DetallePost', { postId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default PerfilPantalla;
