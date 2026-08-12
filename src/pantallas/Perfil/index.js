import { Dimensions, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usuarioLogueado } from '../../data/dataDeUsuario';
import CabeceraPerfil from '../../componentes/CabeceraPerfil';
import ItemGrilla from '../../componentes/ItemGrilla';
import styles from './Perfil.styles';

const COLUMNAS = 3;
// ancho de pantalla dividido 3, para que la grilla quede simétrica y no
// se desborde (numColumns={3} es requisito puntual de la consigna)
const tamañoItem = Dimensions.get('window').width / COLUMNAS;

const PerfilPantalla = ({ navigation, posteos }) => {
  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id}
        numColumns={COLUMNAS}
        ListHeaderComponent={
          <>
            <CabeceraPerfil usuario={usuarioLogueado} cantidadPosteos={posteos.length} />
            <View style={styles.tabs}>
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
