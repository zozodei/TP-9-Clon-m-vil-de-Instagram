import { FlatList, Image, Text, View } from 'react-native';
import { usuarioLogueado, historias } from '../../data/dataDeUsuario';
import styles from './BarraHistorias.styles';

// tira de historias arriba del feed, igual que en el TP web pero armada
// con FlatList horizontal en vez de un simple .map() en un div
const BarraHistorias = () => {
  return (
    <FlatList
      style={styles.barra}
      data={historias}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={(historia) => String(historia.id)}
      ListHeaderComponent={
        <View style={styles.item}>
          <View style={[styles.anillo, styles.anilloTuya]}>
            <Image source={{ uri: usuarioLogueado.fotoPerfil }} style={styles.foto} />
          </View>
          <Text style={styles.nombre}>Tu historia</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.anillo}>
            <Image source={{ uri: item.fotoPerfil }} style={styles.foto} />
          </View>
          <Text style={styles.nombre} numberOfLines={1}>{item.usuario}</Text>
        </View>
      )}
    />
  );
};

export default BarraHistorias;
