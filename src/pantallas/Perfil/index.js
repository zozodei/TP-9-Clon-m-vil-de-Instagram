// Dimensions: para conocer el ancho/alto de la pantalla del dispositivo
import { Dimensions, FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { usuarioLogueado } from '../../data/dataDeUsuario';
import CabeceraPerfil from '../../componentes/CabeceraPerfil';
import ItemGrilla from '../../componentes/ItemGrilla';
import styles from './Perfil.styles';

const COLUMNAS = 3; // la consigna pide exactamente 3 columnas en la grilla del perfil

// Dimensions.get('window').width devuelve el ancho de la pantalla en "puntos" (no píxeles físicos).
// Lo dividimos entre 3 para que cada celda de la grilla mida exactamente un tercio del ancho,
// así las 3 columnas quedan simétricas y no se desbordan hacia los costados.
// Esto se calcula UNA vez, cuando se carga el archivo (no se recalcula si el usuario rota el celular,
// pero acá no es un problema porque la app está fijada en orientación vertical en app.json)
const tamañoItem = Dimensions.get('window').width / COLUMNAS;

// PerfilPantalla recibe "navigation" (automático de React Navigation) y "posteos" por props.
// No recibe onToggleLike porque en esta pantalla no se puede dar like directamente,
// solo se puede tocar una foto para ir al detalle (ahí sí se puede likear)
const PerfilPantalla = ({ navigation, posteos }) => {
  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id}
        // numColumns={3} es lo que hace que FlatList reparta los items en una grilla
        // de 3 por fila en vez de una lista de una sola columna
        numColumns={COLUMNAS}
        // todo lo que va ANTES de la grilla de fotos: la cabecera con el avatar/bio/stats,
        // y la fila de "pestañas" (Publicaciones / Guardados / Etiquetados)
        ListHeaderComponent={
          <>
            <CabeceraPerfil usuario={usuarioLogueado} cantidadPosteos={posteos.length} />
            <View style={styles.tabs}>
              {/* combinamos dos estilos en el mismo Text: el estilo base "tab" + "tabActivo"
                  encima, para que se vea resaltada (con el subrayado) solo esta pestaña */}
              <Text style={[styles.tab, styles.tabActivo]}>PUBLICACIONES</Text>
              <Text style={styles.tab}>GUARDADOS</Text>
              <Text style={styles.tab}>ETIQUETADOS</Text>
            </View>
          </>
        }
        // si todavía no llegaron los posteos, mostramos un texto en vez de una grilla vacía
        ListEmptyComponent={<Text style={styles.vacio}>Todavía no hay publicaciones.</Text>}
        // por cada posteo dibujamos un ItemGrilla, pasándole el tamaño ya calculado
        // y una función que navega al detalle (igual que en Feed, mandando solo el id)
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
