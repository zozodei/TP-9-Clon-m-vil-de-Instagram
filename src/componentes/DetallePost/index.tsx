// Detalle de un posteo (equivale al PostModal de la versión web).
// Muestra la foto en grande, los comentarios y abajo una barra para comentar.
// Es la única pantalla con estado propio: el texto que se va escribiendo.

import { useState } from 'react';
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { usuarioLogueado } from '../../data/dataDeUsuario';
import { colores } from '../../estilos/tema';
import type { Post } from '../../tipos';
import styles from './DetallePost.styles';

// post puede ser undefined si .find() no encontró el posteo (por eso el "| undefined").
type Props = {
  post: Post | undefined;
  onToggleLike: (id: string) => void;
  onAgregarComentario: (id: string, texto: string) => void;
};

const DetallePost = ({ post, onToggleLike, onAgregarComentario }: Props) => {
  // Lo que se va escribiendo en el campo de comentario.
  // Es estado local porque solo le importa a esta pantalla.
  const [texto, setTexto] = useState('');

  // Por si no se encontró el posteo: muestro un aviso y corto acá.
  if (!post) {
    return (
      <View style={styles.centro}>
        <Text>No se encontró la publicación.</Text>
      </View>
    );
  }

  // true si hay algo escrito que no sean solo espacios.
  const hayTexto = texto.trim().length > 0;

  function publicar() {
    if (!post || !hayTexto) return;
    // No agrego el comentario acá: le aviso a App.tsx, que actualiza el estado,
    // y el comentario nuevo vuelve a bajar por props hasta esta pantalla.
    onAgregarComentario(post.id, texto);
    setTexto(''); // vacío el campo
  }

  return (
    // edges={['bottom']}: arriba no hace falta, ya está la barra de título "Publicación".
    <SafeAreaView style={styles.pantalla} edges={['bottom']}>
      {/* La lista es de comentarios, y todo el posteo va como encabezado
          (ListHeaderComponent). Así la pantalla entera scrollea junta. */}
      <FlatList
        style={styles.scroll}
        contentContainerStyle={styles.contenido}
        data={post.comentarios}
        keyExtractor={(comentario) => String(comentario.id)}
        // Cada comentario: usuario en negrita y el texto al lado.
        renderItem={({ item }) => (
          <Text style={styles.texto}>
            <Text style={styles.usuario}>{item.usuario}</Text> {item.texto}
          </Text>
        )}
        ListHeaderComponent={
          <View>
            {/* Cabecera: avatar, usuario y ubicación */}
            <View style={styles.header}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View>
                <Text style={styles.usuario}>{post.usuario}</Text>
                <Text style={styles.ubicacion}>{post.ubicacion}</Text>
              </View>
            </View>

            <Image source={{ uri: post.url }} style={styles.foto} />

            <View style={styles.acciones}>
              <View style={styles.accionesIzq}>
                {/* Mismo corazón que en PostCard: llama a toggleLike de App.tsx */}
                <Pressable onPress={() => onToggleLike(post.id)} hitSlop={8} style={styles.accionBtn}>
                  <Ionicons
                    name={post.liked ? 'heart' : 'heart-outline'}
                    size={28}
                    color={post.liked ? colores.like : colores.textoPrincipal}
                  />
                </Pressable>
                {/* Decorativos */}
                <Ionicons name="chatbubble-outline" size={26} color={colores.textoPrincipal} style={styles.accionBtn} />
                <Ionicons name="paper-plane-outline" size={26} color={colores.textoPrincipal} />
              </View>
              <Ionicons name="bookmark-outline" size={26} color={colores.textoPrincipal} />
            </View>

            <Text style={styles.likes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

            <Text style={styles.texto}>
              <Text style={styles.usuario}>{post.usuario}</Text> {post.caption}
            </Text>

            <Text style={styles.comentariosTitulo}>Comentarios ({post.comentarios.length})</Text>
          </View>
        }
      />

      {/* Barra para comentar: está fuera de la lista para que quede fija abajo */}
      <View style={styles.barraComentario}>
        <Image source={{ uri: usuarioLogueado.fotoPerfil }} style={styles.avatarChico} />

        {/* TextInput = el <input> de la web.
            value muestra lo que hay en el estado y onChangeText lo actualiza con
            cada letra (componente controlado). onSubmitEditing publica con Enter. */}
        <TextInput
          style={styles.input}
          placeholder="Agregá un comentario..."
          placeholderTextColor={colores.textoSecundario}
          value={texto}
          onChangeText={setTexto}
          onSubmitEditing={publicar}
          returnKeyType="send"
        />

        {/* Con el campo vacío el botón queda gris y deshabilitado.
            !hayTexto && styles.botonApagado: solo aplica el gris si no hay texto. */}
        <Pressable onPress={publicar} disabled={!hayTexto} hitSlop={8}>
          <Text style={[styles.botonPublicar, !hayTexto && styles.botonApagado]}>Publicar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DetallePost;
