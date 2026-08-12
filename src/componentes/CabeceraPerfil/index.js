import { Image, Pressable, Text, View } from 'react-native';
import styles from './CabeceraPerfil.styles';

// cabecera de la pantalla de Perfil: avatar, métricas y biografía.
// recibe "usuario" (el objeto fijo usuarioLogueado) y "cantidadPosteos" ya calculada
// desde afuera (en Perfil/index.js se le pasa posteos.length), para no repetir esa cuenta acá
const CabeceraPerfil = ({ usuario, cantidadPosteos }) => {
  return (
    <View style={styles.contenedor}>

      {/* fila de arriba: avatar grande a la izquierda + las 3 métricas a la derecha */}
      <View style={styles.filaTop}>
        <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />

        <View style={styles.stats}>
          {/* cada "stat" es un numerito grande arriba y una etiqueta chica abajo */}
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{cantidadPosteos}</Text>
            <Text style={styles.statLabel}>publicaciones</Text>
          </View>
          <View style={styles.stat}>
            {/* toLocaleString('es-AR') agrega el punto de miles: 847 se ve igual, pero 1200 sería "1.200" */}
            <Text style={styles.statNumero}>{usuario.seguidores.toLocaleString('es-AR')}</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{usuario.seguidos}</Text>
            <Text style={styles.statLabel}>seguidos</Text>
          </View>
        </View>
      </View>

      {/* nombre "de fantasía" y biografía, uno debajo del otro */}
      <Text style={styles.nombre}>{usuario.nombre}</Text>
      <Text style={styles.bio}>{usuario.biografia}</Text>

      {/* botón visual, no hace nada al tocarlo (la consigna solo pide que exista, no que funcione) */}
      <Pressable style={styles.botonEditar}>
        <Text style={styles.botonEditarTexto}>Editar perfil</Text>
      </Pressable>
    </View>
  );
};

export default CabeceraPerfil;
