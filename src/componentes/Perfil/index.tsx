// Pantalla de perfil: arriba mis datos (foto, números, bio) y abajo todas las
// publicaciones en una grilla de 3 columnas (el ProfilePage de la versión web).

import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { usuarioLogueado } from '../../data/dataDeUsuario';
import { medidas } from '../../estilos/tema';
import type { Navegacion, Post } from '../../tipos';
import styles from './Perfil.styles';

type Props = {
  posteos: Post[];
};

// Cada foto de la grilla mide un tercio del ancho de la pantalla.
// Dimensions da el ancho del celular; Math.min pone un tope de 500 para la web.
// Se calcula una vez porque la app está fija en vertical (app.json).
const anchoGrilla = Math.min(Dimensions.get('window').width, medidas.anchoMaximoContenido);
const tamañoFoto = anchoGrilla / 3;


const Perfil = ({ posteos }: Props) => {
  const navigation = useNavigation<Navegacion>();
  const usuario = usuarioLogueado;

  return (
    <SafeAreaView style={styles.contenedor} edges={['top']}>
      {/* Es la misma FlatList que en el Feed: numColumns={3} la convierte en grilla */}
      <FlatList
        data={posteos}
        keyExtractor={(post) => post.id}
        numColumns={3}
        contentContainerStyle={styles.lista}
        // Los datos del perfil van como encabezado, así scrollean junto con las fotos.
        ListHeaderComponent={
          <View>
            <View style={styles.cabecera}>
              {/* Foto a la izquierda y los tres números a la derecha */}
              <View style={styles.filaTop}>
                <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />

                <View style={styles.stats}>
                  <View style={styles.stat}>
                    {/* Cantidad real de posteos que trajo la API */}
                    <Text style={styles.statNumero}>{posteos.length}</Text>
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

              {/* Botón decorativo, no hace nada */}
              <View style={styles.botonEditar}>
                <Text style={styles.botonEditarTexto}>Editar perfil</Text>
              </View>
            </View>

            {/* Solo "PUBLICACIONES" está activa, las otras son decorativas.
                [styles.tab, styles.tabActivo]: el segundo estilo pisa al primero. */}
            <View style={styles.tabs}>
              <Text style={[styles.tab, styles.tabActivo]}>PUBLICACIONES</Text>
              <Text style={styles.tab}>GUARDADOS</Text>
              <Text style={styles.tab}>ETIQUETADOS</Text>
            </View>
          </View>
        }
        // Cada foto de la grilla: al tocarla abre el mismo detalle que en el Feed.
        // El tamaño va en línea (no en el .styles.ts) porque se calcula con el ancho del celular.
        renderItem={({ item }) => (
          <Pressable
            style={{ width: tamañoFoto, height: tamañoFoto }}
            onPress={() => navigation.navigate('DetallePost', { postId: item.id })}
          >
            <Image source={{ uri: item.url }} style={styles.fotoGrilla} />
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
};

export default Perfil;
