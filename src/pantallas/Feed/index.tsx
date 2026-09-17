// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  pantallas/Feed  —  LA PANTALLA PRINCIPAL                                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// La pantalla de inicio: el header con el logo, la barra de historias arriba y
// la lista de publicaciones scrolleando hacia abajo.
//
// DATO IMPORTANTE PARA LA EXPOSICIÓN: esta pantalla NO TIENE ESTADO PROPIO.
// No guarda nada, no usa useState. Los posteos y las funciones para modificarlos
// le llegan por props desde App.tsx. Ella solo los muestra y avisa cuándo el
// usuario toca algo.
//
// A los componentes así se les dice "tontos" o de presentación, y es algo bueno:
// como no guardan nada, no pueden desincronizarse con el resto de la app.

// FlatList es la lista con scroll optimizada de React Native.
// ¿Por qué no uso un .map() como en la web? Porque .map() dibujaría las 12
// publicaciones de una, y si fueran 5000 la app se arrastraría. FlatList monta
// solo las filas que se ven en pantalla y las va reciclando a medida que hago
// scroll. Es LA forma correcta de hacer listas largas en React Native.
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
// SafeAreaView deja un margen automático para que el header no quede tapado por
// el notch o la barra de estado del celular.
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import PostCard from '../../componentes/PostCard';
import BarraHistorias from '../../componentes/BarraHistorias';
import { colores } from '../../estilos/tema';
import type { Post } from '../../tipos';
import type { NavegacionDelStack } from '../../navegacion/tipos';
import styles from './Feed.styles';

// Las props vienen de dos lados distintos:
//   * navigation → me lo inyecta React Navigation automáticamente
//   * posteos y onToggleLike → se los paso yo desde TabsPrincipales
type Props = {
  navigation: NavegacionDelStack;
  posteos: Post[];
  onToggleLike: (id: string) => void;
};

const FeedPantalla = ({ navigation, posteos, onToggleLike }: Props) => {

  // ── PANTALLA DE CARGA ──────────────────────────────────────────────────────
  // Mientras la lista siga vacía significa que la API todavía no contestó, así
  // que muestro un spinner girando y corto acá con un return.
  //
  // Este truco se llama "early return" o retorno temprano: si se cumple la
  // condición, devuelvo esto y el resto de la función ni se ejecuta. Queda más
  // limpio que meter todo el feed adentro de un if gigante.
  if (posteos.length === 0) {
    return (
      <SafeAreaView style={styles.centro} edges={['top']}>
        {/* ActivityIndicator es la ruedita de carga que ya trae React Native */}
        <ActivityIndicator size="large" color={colores.textoPrincipal} />
        <Text>Cargando publicaciones...</Text>
      </SafeAreaView>
    );
  }

  // ── LA PANTALLA DE VERDAD ──────────────────────────────────────────────────
  return (
    // edges={['top']} le dice: protegeme SOLO el borde de arriba. El de abajo no
    // hace falta porque ahí está la barra de pestañas, que ya deja su espacio.
    <SafeAreaView style={styles.contenedor} edges={['top']}>

      {/* El header con el logo y los iconitos. Está fuera de la FlatList a
          propósito: así queda fijo y no se va para arriba cuando hago scroll. */}
      <View style={styles.header}>
        <Text style={styles.logo}>Instagram</Text>
        <View style={styles.headerIconos}>
          {/* Estos dos íconos son decorativos: no tienen onPress, no hacen nada */}
          <Ionicons name="heart-outline" size={26} color={colores.textoPrincipal} style={styles.headerIcono} />
          <Ionicons name="paper-plane-outline" size={24} color={colores.textoPrincipal} />
        </View>
      </View>

      {/* ── LA LISTA DE PUBLICACIONES ────────────────────────────────────────
          Una FlatList necesita tres cosas sí o sí: data, keyExtractor y renderItem. */}
      <FlatList
        // 1) data: de dónde saco la información (mi lista de publicaciones)
        data={posteos}

        // 2) keyExtractor: cómo identifico cada fila de forma única.
        // React usa esta clave para saber qué filas cambiaron y redibujar solo
        // esas. Sin clave única, al agregar o sacar elementos se confunde y
        // redibuja cosas que no tocó.
        keyExtractor={(post) => post.id}

        // ListHeaderComponent se dibuja UNA sola vez, arriba de la primera foto,
        // y scrollea junto con la lista. Perfecto para la barra de historias:
        // en Instagram las historias también se van para arriba al scrollear.
        //
        // Fijate quién decide qué: la BarraHistorias solo avisa "tocaron esta
        // historia". NAVEGAR es decisión de esta pantalla. Así la barra se puede
        // reutilizar en otro lado sin arrastrar la navegación con ella.
        ListHeaderComponent={
          <BarraHistorias
            onAbrirHistoria={(historia) => navigation.navigate('VisorHistoria', { historia })}
          />
        }

        // 3) renderItem: cómo dibujo CADA fila. La FlatList me entrega un objeto
        // y yo saco de ahí "item", que es una publicación de la lista.
        renderItem={({ item }) => (
          <PostCard
            post={item}

            // ⚠️ DETALLE IMPORTANTE: al navegar mando SOLO EL ID, no el objeto
            // entero. ¿Por qué? Porque si mandara el objeto, el detalle se
            // quedaría con una FOTOCOPIA congelada del momento en que navegué.
            // Mandando el id, el detalle va y busca la versión actualizada en la
            // lista de App.tsx. Por eso los likes están siempre sincronizados
            // entre las dos pantallas.
            onAbrirDetalle={() => navigation.navigate('DetallePost', { postId: item.id })}

            // Acá "cierro" el id adentro de la función. PostCard no sabe ni le
            // importa a qué publicación pertenece: solo llama a onToggleLike()
            // y esta función de acá ya sabe de cuál se trata.
            onToggleLike={() => onToggleLike(item.id)}
          />
        )}

        showsVerticalScrollIndicator={false} // sin la barrita de scroll a la derecha
        contentContainerStyle={styles.listaContenido}
      />
    </SafeAreaView>
  );
};

export default FeedPantalla;
