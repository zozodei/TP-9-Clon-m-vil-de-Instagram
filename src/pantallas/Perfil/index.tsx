// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  pantallas/Perfil  —  LA GRILLA DE 3 COLUMNAS                               ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// La segunda pestaña: mi perfil. Arriba los datos (foto, seguidores, bio) y
// abajo todas las publicaciones en una grilla de 3 columnas, como Instagram.
//
// COSA INTERESANTE PARA CONTAR EN LA EXPOSICIÓN:
// La grilla NO es un componente especial. Es la misma FlatList que uso en el
// Feed, con una sola prop de diferencia: numColumns={3}. Eso es todo lo que
// separa una lista vertical de una grilla.

// Dimensions me deja consultar el tamaño de la pantalla del dispositivo.
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

// Lo pongo en una constante con nombre en vez de escribir el 3 suelto por ahí.
// Si mañana quiero 4 columnas, cambio acá y se acomoda todo solo.
const COLUMNAS = 3;

// ── LA CUENTA DEL TAMAÑO DE CADA CUADRADITO ──────────────────────────────────
// Cada celda tiene que medir un tercio del ancho para que las 3 columnas queden
// parejas y llenen la pantalla sin dejar huecos.
//
// Math.min() se queda con el MENOR de los dos valores que le doy:
//   * el ancho real de la pantalla del celular, o
//   * mi tope de 500 (explicado en estilos/tema.ts)
//
// ¿Por qué el tope? Porque si abro la app en el navegador de la compu, la
// ventana puede medir 1400px y cada foto mediría 466px de lado: gigantes. El
// tope las mantiene con un tamaño razonable. En el celular no cambia nada,
// porque la pantalla ya es más angosta que 500.
//
// Esto se calcula UNA sola vez, cuando se carga el archivo, y no en cada render.
// Me lo puedo permitir porque la app está fijada en vertical (lo configuré en
// app.json con "orientation": "portrait"), así que el ancho nunca cambia. Si
// permitiera rotar el celular, esto tendría que ir adentro del componente.
const anchoDeLaGrilla = Math.min(Dimensions.get('window').width, medidas.anchoMaximoContenido);
const tamañoItem = anchoDeLaGrilla / COLUMNAS;

// Fijate que NO recibe onToggleLike: desde la grilla no se puede dar like,
// hay que entrar al detalle. Por eso no se lo paso desde TabsPrincipales.
const PerfilPantalla = ({ navigation, posteos }: Props) => {
  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id}

        // ESTA es la línea que convierte la lista en grilla. Una sola prop.
        numColumns={COLUMNAS}

        contentContainerStyle={styles.listaContenido}

        // Todo el encabezado del perfil va como header de la lista, así scrollea
        // junto con las fotos (igual que en Instagram, donde la foto de perfil
        // se va para arriba cuando bajás).
        //
        // Los <> </> son un "Fragment": un envoltorio invisible. Lo necesito
        // porque acá adentro tengo DOS elementos (la cabecera y los tabs) y esta
        // prop solo acepta uno. El Fragment los agrupa sin agregar ningún View
        // de más al resultado final.
        ListHeaderComponent={
          <>
            {/* Le paso la cantidad ya calculada desde acá afuera, para que el
                componente hijo no tenga que hacer cuentas: él solo muestra. */}
            <CabeceraPerfil usuario={usuarioLogueado} cantidadPosteos={posteos.length} />

            <View style={styles.tabs}>
              {/* Cuando a style le paso un ARRAY, React Native aplica los
                  estilos en orden y el de la derecha pisa al de la izquierda.
                  Acá: estilo base de tab + el de "activo" encima, solo en esta.
                  Los otros dos son decorativos, no se puede hacer clic. */}
              <Text style={[styles.tab, styles.tabActivo]}>PUBLICACIONES</Text>
              <Text style={styles.tab}>GUARDADOS</Text>
              <Text style={styles.tab}>ETIQUETADOS</Text>
            </View>
          </>
        }

        // Esto se muestra SOLO si la lista está vacía. Es una prop que ya trae
        // la FlatList: no tengo que escribir ningún if.
        ListEmptyComponent={<Text style={styles.vacio}>Todavía no hay publicaciones.</Text>}

        renderItem={({ item }) => (
          <ItemGrilla
            post={item}
            // le mando el tamaño calculado arriba, porque el componente no
            // puede saber solo cuánto mide un tercio de la pantalla
            tamaño={tamañoItem}
            // igual que en el Feed: mando solo el id, no el objeto entero
            onPress={() => navigation.navigate('DetallePost', { postId: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
};

export default PerfilPantalla;
