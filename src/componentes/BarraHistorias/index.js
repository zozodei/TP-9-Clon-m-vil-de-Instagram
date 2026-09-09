import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { usuarioLogueado, historias } from '../../data/dataDeUsuario';
import styles from './BarraHistorias.styles';

// la tira de historias arriba del feed. Los datos los importa directo de dataDeUsuario.js
// porque son fijos. Solo recibe "onAbrirHistoria": este componente avisa qué historia
// tocaron, y el Feed es el que decide navegar al visor.
const BarraHistorias = ({ onAbrirHistoria }) => {
  return (
    <FlatList
      style={styles.barra}
      data={historias}
      horizontal // la lista se desplaza de izquierda a derecha en vez de hacia abajo
      showsHorizontalScrollIndicator={false}
      // keyExtractor tiene que devolver un texto, y el id es número: por eso el String()
      keyExtractor={(historia) => String(historia.id)}
      // ListHeaderComponent va antes de todos los items: lo usamos para "Tu historia".
      // Armamos un objeto con la misma forma que las del array, que es lo que el visor espera
      ListHeaderComponent={
        <Pressable
          style={styles.item}
          onPress={() =>
            onAbrirHistoria({
              fotoPerfil: usuarioLogueado.fotoPerfil,
              usuario: usuarioLogueado.usuario,
            })
          }
        >
          {/* el array combina el círculo base con el borde gris (en vez del rojo) */}
          <View style={[styles.anillo, styles.anilloTuya]}>
            <Image source={{ uri: usuarioLogueado.fotoPerfil }} style={styles.foto} />
          </View>
          <Text style={styles.nombre}>Tu historia</Text>
        </Pressable>
      }
      renderItem={({ item }) => (
        // va con flecha () => ... porque si no, la función se ejecutaría al dibujar la lista
        // en vez de al tocarla
        <Pressable style={styles.item} onPress={() => onAbrirHistoria(item)}>
          <View style={styles.anillo}>
            <Image source={{ uri: item.fotoPerfil }} style={styles.foto} />
          </View>
          {/* numberOfLines corta con "..." los nombres largos, para no romper el ancho fijo */}
          <Text style={styles.nombre} numberOfLines={1}>{item.usuario}</Text>
        </Pressable>
      )}
    />
  );
};

export default BarraHistorias;
