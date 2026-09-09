import { Image, Pressable, Text, View } from 'react-native';
import styles from './CabeceraPerfil.styles';

// avatar, métricas y biografía del perfil.
// "cantidadPosteos" llega ya calculada desde afuera (posteos.length), para no repetir la cuenta acá
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
            {/* toLocaleString('es-AR') pone el punto de miles: 1.200 en vez de 1200 */}
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

      {/* botón solo visual, no hace nada al tocarlo */}
      <Pressable style={styles.botonEditar}>
        <Text style={styles.botonEditarTexto}>Editar perfil</Text>
      </Pressable>
    </View>
  );
};

export default CabeceraPerfil;
