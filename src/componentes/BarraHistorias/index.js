// FlatList: la lista optimizada de RN (acá la usamos horizontal, para las historias)
import { FlatList, Image, Text, View } from 'react-native';
import { usuarioLogueado, historias } from '../../data/dataDeUsuario';
import styles from './BarraHistorias.styles';

// tira de historias arriba del feed. No recibe props: importa los datos fijos
// directamente de dataDeUsuario.js porque nunca cambian (no hace falta pasarlos por props)
const BarraHistorias = () => {
  return (
    <FlatList
      style={styles.barra}
      data={historias} // el array que se va a recorrer
      horizontal // hace que la lista se desplace de izquierda a derecha en vez de hacia abajo
      showsHorizontalScrollIndicator={false} // oculta la barrita de scroll gris (más prolijo)
      // keyExtractor le dice a React cómo identificar cada elemento de forma única.
      // String(...) porque keyExtractor tiene que devolver siempre un texto, y el id es un número
      keyExtractor={(historia) => String(historia.id)}
      // ListHeaderComponent se dibuja UNA sola vez, antes que todos los items de la lista:
      // lo usamos para mostrar "Tu historia" (la del usuario logueado) primero, separada del resto
      ListHeaderComponent={
        <View style={styles.item}>
          {/* el array styles.anillo, styles.anilloTuya combina dos estilos en un mismo elemento:
              "anillo" (el círculo base) + "anilloTuya" (el borde gris en vez de rojo) */}
          <View style={[styles.anillo, styles.anilloTuya]}>
            <Image source={{ uri: usuarioLogueado.fotoPerfil }} style={styles.foto} />
          </View>
          <Text style={styles.nombre}>Tu historia</Text>
        </View>
      }
      // renderItem se ejecuta una vez POR CADA elemento del array "historias".
      // recibe un objeto { item } con el elemento actual (así lo pide FlatList)
      renderItem={({ item }) => (
        <View style={styles.item}>
          <View style={styles.anillo}>
            <Image source={{ uri: item.fotoPerfil }} style={styles.foto} />
          </View>
          {/* numberOfLines={1} corta el texto con "..." si el nombre de usuario es muy largo,
              para que no rompa el ancho fijo de cada historia */}
          <Text style={styles.nombre} numberOfLines={1}>{item.usuario}</Text>
        </View>
      )}
    />
  );
};

export default BarraHistorias;
