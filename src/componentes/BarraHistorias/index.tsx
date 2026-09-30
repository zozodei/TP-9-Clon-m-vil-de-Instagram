// La fila de historias de arriba del feed (el StoriesBar de la versión web).
// Primero va "Tu historia" y después las demás. Al tocar una, avisa al Feed
// con onAbrirHistoria y el Feed se encarga de abrirla. Este componente no
// navega: solo avisa qué historia se tocó.

import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { historias, usuarioLogueado } from '../../data/dataDeUsuario';
import type { Historia } from '../../tipos';
import styles from './BarraHistorias.styles';

// Props = lo que este componente recibe de su padre (el Feed).
type Props = {
  onAbrirHistoria: (historia: Historia) => void;
};

// Mi historia la armo con los datos del usuario logueado (no está en la lista de historias).
const miHistoria: Historia = {
  id: 0,
  fotoPerfil: usuarioLogueado.fotoPerfil,
  usuario: usuarioLogueado.usuario,
};

const BarraHistorias = ({ onAbrirHistoria }: Props) => {
  return (
    // FlatList con "horizontal": la fila se desliza de costado.
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false} // oculta la barrita de scroll
      style={styles.barra}
      data={historias}                        // la lista que se va a mostrar
      // keyExtractor da una clave única a cada item (como el key del .map en la web).
      // Tiene que ser texto, por eso String().
      keyExtractor={(historia) => String(historia.id)}
      // ListHeaderComponent va antes de todas: acá pongo mi historia.
      ListHeaderComponent={
        // Pressable = algo que se puede tocar (como un onClick en la web).
        // Va con flecha () => ... para que se ejecute al tocar y no al dibujar.
        <Pressable style={styles.item} onPress={() => onAbrirHistoria(miHistoria)}>
          {/* Array de estilos: el de la derecha pisa al de la izquierda.
              anilloTuya cambia el borde rojo por uno gris. */}
          <View style={[styles.anillo, styles.anilloTuya]}>
            <Image source={{ uri: miHistoria.fotoPerfil }} style={styles.foto} />
          </View>
          <Text style={styles.nombre}>Tu historia</Text>
        </Pressable>
      }
      // renderItem dibuja cada historia; item es la historia de esa posición.
      renderItem={({ item }) => (
        <Pressable style={styles.item} onPress={() => onAbrirHistoria(item)}>
          <View style={styles.anillo}>
            <Image source={{ uri: item.fotoPerfil }} style={styles.foto} />
          </View>
          {/* numberOfLines={1} corta los nombres largos con "..." */}
          <Text style={styles.nombre} numberOfLines={1}>{item.usuario}</Text>
        </Pressable>
      )}
    />
  );
};

export default BarraHistorias;
