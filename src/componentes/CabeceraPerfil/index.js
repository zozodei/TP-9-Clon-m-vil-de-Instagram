import { Image, Pressable, Text, View } from 'react-native';
import styles from './CabeceraPerfil.styles';

// cabecera del perfil: avatar, biografía y métricas. cantidadPosteos se
// calcula afuera (en la pantalla) a partir de los posteos que ya trajimos
// de la API, para que el número no quede fijo/inventado
const CabeceraPerfil = ({ usuario, cantidadPosteos }) => {
  return (
    <View style={styles.contenedor}>
      <View style={styles.filaTop}>
        <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />

        <View style={styles.stats}>
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{cantidadPosteos}</Text>
            <Text style={styles.statLabel}>publicaciones</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{usuario.seguidores.toLocaleString('es-AR')}</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{usuario.seguidos}</Text>
            <Text style={styles.statLabel}>seguidos</Text>
          </View>
        </View>
      </View>

      <Text style={styles.nombre}>{usuario.nombre}</Text>
      <Text style={styles.bio}>{usuario.biografia}</Text>

      <Pressable style={styles.botonEditar}>
        <Text style={styles.botonEditarTexto}>Editar perfil</Text>
      </Pressable>
    </View>
  );
};

export default CabeceraPerfil;
