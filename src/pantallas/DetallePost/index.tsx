import { useState } from 'react';
// TextInput: el campo donde se escribe (el equivalente al <input> de HTML)
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Comentario from '../../componentes/Comentario';
import { usuarioLogueado } from '../../data/dataDeUsuario';
import { colores } from '../../estilos/tema';
import styles from './DetallePost.styles';

// la vista ampliada de un posteo, se abre desde el Feed o desde el Perfil.
// route.params trae el postId que mandamos al navegar.
const DetallePostPantalla = ({ route, posteos, onToggleLike, onAgregarComentario }) => {
  const { postId } = route.params;

  // lo que el usuario va escribiendo en el campo de comentario. A esto se le dice
  // "componente controlado": el texto vive en el estado de React, no en el campo
  const [textoComentario, setTextoComentario] = useState('');

  // buscamos el posteo por id en el array actualizado, en vez de recibirlo entero al navegar.
  // Por eso, si le diste like en el feed, acá ya aparece likeado: es el mismo dato, no una copia
  const post = posteos.find((posteo) => posteo.id === postId);

  if (!post) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom']}>
        <Text>No se encontró la publicación.</Text>
      </SafeAreaView>
    );
  }

  // .trim() saca los espacios de los costados: si el usuario solo apretó la barra
  // espaciadora, esto da false y el botón queda apagado
  const hayTextoEscrito = textoComentario.trim().length > 0;

  function publicarComentario() {
    if (!hayTextoEscrito) return;
    // App.js actualiza el array de posteos, eso baja de nuevo por props hasta acá
    // y la lista se redibuja sola con el comentario nuevo
    onAgregarComentario(post.id, textoComentario);
    setTextoComentario(''); // vaciamos el campo
  }

  return (
    // el header de esta pantalla lo pone React Navigation, así que solo protegemos abajo
    <SafeAreaView style={styles.pantalla} edges={['bottom']}>
      {/* la FlatList es de los COMENTARIOS: la foto y el caption van como ListHeaderComponent,
          así toda la pantalla hace scroll junta en una sola lista */}
      <FlatList
        style={styles.lista}
        data={post.comentarios}
        keyExtractor={(comentario) => String(comentario.id)}
        renderItem={({ item }) => <Comentario comentario={item} />}
        contentContainerStyle={styles.contenedor}
        ListHeaderComponent={
          <View>
            <View style={styles.header}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.headerInfo}>
                <Text style={styles.usuario}>{post.usuario}</Text>
                <Text style={styles.ubicacion}>{post.ubicacion}</Text>
              </View>
            </View>

            {/* "cover" llena el cuadrado recortando lo que sobra, sin deformar la foto */}
            <Image source={{ uri: post.url }} style={styles.foto} resizeMode="cover" />

            <View style={styles.acciones}>
              <View style={styles.accionesIzq}>
                <Pressable onPress={() => onToggleLike(post.id)} hitSlop={8} style={styles.accionBtn}>
                  <Ionicons
                    name={post.liked ? 'heart' : 'heart-outline'}
                    size={28}
                    color={post.liked ? colores.like : colores.textoPrincipal}
                  />
                </Pressable>
                <Pressable hitSlop={8} style={styles.accionBtn}>
                  <Ionicons name="chatbubble-outline" size={26} color={colores.textoPrincipal} />
                </Pressable>
                <Pressable hitSlop={8}>
                  <Ionicons name="paper-plane-outline" size={26} color={colores.textoPrincipal} />
                </Pressable>
              </View>
              <Ionicons name="bookmark-outline" size={26} color={colores.textoPrincipal} />
            </View>

            <Text style={styles.likes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

            <Text style={styles.caption}>
              <Text style={styles.usuario}>{post.usuario}</Text> {post.caption}
            </Text>

            <Text style={styles.comentariosTitulo}>
              Comentarios ({post.comentarios.length})
            </Text>
          </View>
        }
      />

      {/* la barra queda FUERA de la FlatList, así no se mueve al hacer scroll */}
      <View style={styles.barraComentario}>
        <Image source={{ uri: usuarioLogueado.fotoPerfil }} style={styles.avatarChico} />

        <TextInput
          style={styles.input}
          placeholder="Agregá un comentario..."
          placeholderTextColor={colores.textoSecundario}
          value={textoComentario} // el campo muestra lo que hay en el estado
          onChangeText={setTextoComentario} // y con cada letra el estado se actualiza
          onSubmitEditing={publicarComentario} // publicar al apretar Enter
          returnKeyType="send"
        />

        {/* el array de estilos aplica el segundo encima del primero solo si el campo está vacío */}
        <Pressable onPress={publicarComentario} disabled={!hayTextoEscrito} hitSlop={8}>
          <Text style={[styles.botonPublicar, !hayTextoEscrito && styles.botonPublicarApagado]}>
            Publicar
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DetallePostPantalla;
