// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  pantallas/DetallePost  —  LA VISTA AMPLIADA + LOS COMENTARIOS              ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// La pantalla que se abre cuando toco una foto, sea desde el Feed o desde la
// grilla del Perfil. Muestra la publicación entera, la lista de comentarios y
// abajo de todo la barrita para escribir uno nuevo.
//
// ES LA PANTALLA MÁS COMPLETA DEL TRABAJO, porque acá pasan tres cosas juntas:
//   1) LEO un parámetro de navegación (el postId que me mandaron)
//   2) TENGO estado propio (el texto que se va escribiendo en el campo)
//   3) MANDO un aviso hacia arriba (cuando publico el comentario)

import { useState } from 'react';
// TextInput es el campo donde se escribe: el equivalente al <input> de HTML.
import { FlatList, Image, Pressable, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Comentario from '../../componentes/Comentario';
import { usuarioLogueado } from '../../data/dataDeUsuario';
import { colores } from '../../estilos/tema';
import type { Post } from '../../tipos';
import type { PropsDetallePost } from '../../navegacion/tipos';
import styles from './DetallePost.styles';

// Esta pantalla sí lee route.params, así que necesito juntar dos grupos de props:
//   * PropsDetallePost → lo que me da React Navigation (navigation + route)
//   * el objeto de abajo → lo que le paso yo desde NavegadorRaiz
//
// El "&" en TypeScript junta dos tipos en uno solo: el resultado tiene que
// cumplir los dos a la vez. Se lee "y además".
type Props = PropsDetallePost & {
  posteos: Post[];
  onToggleLike: (id: string) => void;
  onAgregarComentario: (id: string, texto: string) => void;
};

const DetallePostPantalla = ({ route, posteos, onToggleLike, onAgregarComentario }: Props) => {
  // Abro el "sobre" que me mandaron al navegar y saco el postId de adentro.
  // Esto es desestructuración: equivale a const postId = route.params.postId
  const { postId } = route.params;

  // ── ESTADO PROPIO: EL TEXTO QUE SE VA ESCRIBIENDO ──────────────────────────
  // Este es el único estado local de toda la app, y está bien que esté acá:
  // es un dato que no le importa a ninguna otra pantalla, es basura temporal
  // hasta que la persona aprieta "Publicar".
  //
  // A esto se le dice COMPONENTE CONTROLADO: el texto no vive adentro del campo
  // como pasaría en HTML, vive en el estado de React. El campo solo MUESTRA lo
  // que hay en el estado, y cada letra que se tipea actualiza el estado primero.
  // Gracias a eso puedo, por ejemplo, apagar el botón cuando está vacío.
  const [textoComentario, setTextoComentario] = useState('');

  // ── ACÁ ESTÁ LA CLAVE DE POR QUÉ LOS LIKES SE MANTIENEN SINCRONIZADOS ──────
  // En vez de recibir la publicación entera al navegar, recibí solo el id y
  // ahora la busco en la lista actualizada que baja de App.tsx.
  //
  // .find() recorre la lista y devuelve el PRIMER elemento que cumpla la
  // condición (o undefined si no encuentra ninguno).
  //
  // Si me hubiera pasado el objeto entero al navegar, tendría una fotocopia
  // congelada del momento del clic. Así, en cambio, estoy mirando el original:
  // si le di like en el feed, acá ya aparece con el corazón rojo.
  const post = posteos.find((posteo) => posteo.id === postId);

  // Red de seguridad: si por algún motivo no existe esa publicación, muestro un
  // cartel y corto acá. Además esto tiene un efecto secundario buenísimo: de acá
  // para abajo TypeScript ya sabe que "post" existe seguro, y me deja escribir
  // post.likes sin quejarse de que podría ser undefined.
  if (!post) {
    return (
      <SafeAreaView style={styles.centro} edges={['bottom']}>
        <Text>No se encontró la publicación.</Text>
      </SafeAreaView>
    );
  }

  // ¿Hay algo escrito de verdad? .trim() saca los espacios de los costados, así
  // que si la persona solo apretó la barra espaciadora esto da false y el botón
  // "Publicar" queda apagado.
  const hayTextoEscrito = textoComentario.trim().length > 0;

  // ── ¿POR QUÉ ESTA FUNCIÓN VA COMO "const" Y NO COMO "function"? ────────────
  // Es por el "if (!post)" de arriba. Con const, TypeScript sabe que esta
  // función recién existe desde esta línea hacia abajo, o sea, en una zona donde
  // post ya está garantizado.
  //
  // Si la declarara con "function publicarComentario()", JavaScript la subiría
  // arriba de todo (eso se llama hoisting) y se podría llamar ANTES del if. Como
  // ahí post todavía podría ser undefined, TypeScript me marcaría error en la
  // línea del post.id. Es un detalle chiquito pero es exactamente el tipo de
  // cosa que TypeScript te obliga a pensar.
  const publicarComentario = () => {
    if (!hayTextoEscrito) return;

    // Acá NO agrego el comentario yo: le aviso a App.tsx que lo agregue.
    // App.tsx actualiza la lista de posteos, esa lista baja de nuevo por props
    // hasta acá, y la FlatList se redibuja sola con el comentario nuevo.
    // Ese viaje de ida y vuelta es el "flujo de datos unidireccional" de React.
    onAgregarComentario(post.id, textoComentario);

    setTextoComentario(''); // vacío el campo para el próximo comentario
  };

  return (
    // Solo protejo el borde de abajo: el de arriba ya lo cubre la barra de
    // título que pone React Navigation en esta pantalla.
    <SafeAreaView style={styles.pantalla} edges={['bottom']}>

      {/* ── TRUCO DE ARMADO IMPORTANTE ────────────────────────────────────────
          Esta FlatList es la lista de los COMENTARIOS. La foto, los botones y
          el caption van adentro de ListHeaderComponent.

          ¿Por qué lo hice así? Porque quiero que TODA la pantalla scrollee
          junta, como en Instagram. Si pusiera la foto arriba y la lista abajo
          por separado, tendría dos zonas de scroll independientes y quedaría
          horrible. Y no puedo meter una FlatList adentro de un ScrollView,
          porque React Native avisa que rompe la optimización de la lista.
          Solución: una sola lista, con todo lo fijo como encabezado. */}
      <FlatList
        style={styles.lista}
        data={post.comentarios}
        // String() porque el id del comentario es un número y keyExtractor
        // exige devolver texto sí o sí.
        keyExtractor={(comentario) => String(comentario.id)}
        renderItem={({ item }) => <Comentario comentario={item} />}
        contentContainerStyle={styles.contenedor}

        ListHeaderComponent={
          <View>

            {/* Cabecera: avatar, nombre de usuario y ubicación */}
            <View style={styles.header}>
              <Image source={{ uri: post.avatar }} style={styles.avatar} />
              <View style={styles.headerInfo}>
                <Text style={styles.usuario}>{post.usuario}</Text>
                <Text style={styles.ubicacion}>{post.ubicacion}</Text>
              </View>
            </View>

            {/* resizeMode="cover" llena todo el cuadrado recortando lo que
                sobra, sin deformar la foto. Si usara "stretch" la aplastaría. */}
            <Image source={{ uri: post.url }} style={styles.foto} resizeMode="cover" />

            {/* La fila de botones */}
            <View style={styles.acciones}>
              <View style={styles.accionesIzq}>

                {/* El único botón que funciona de verdad: el corazón.
                    hitSlop agranda el área tocable 8px para todos lados sin
                    agrandar el ícono, así es más fácil pegarle con el dedo. */}
                <Pressable onPress={() => onToggleLike(post.id)} hitSlop={8} style={styles.accionBtn}>
                  <Ionicons
                    // Ternario: si tiene like, corazón relleno y rojo;
                    // si no, corazón de contorno y negro.
                    name={post.liked ? 'heart' : 'heart-outline'}
                    size={28}
                    color={post.liked ? colores.like : colores.textoPrincipal}
                  />
                </Pressable>

                {/* Estos son decorativos: no tienen onPress. Los puse porque
                    sin ellos la pantalla no se parecía a Instagram. */}
                <Pressable hitSlop={8} style={styles.accionBtn}>
                  <Ionicons name="chatbubble-outline" size={26} color={colores.textoPrincipal} />
                </Pressable>
                <Pressable hitSlop={8}>
                  <Ionicons name="paper-plane-outline" size={26} color={colores.textoPrincipal} />
                </Pressable>
              </View>

              <Ionicons name="bookmark-outline" size={26} color={colores.textoPrincipal} />
            </View>

            {/* toLocaleString('es-AR') formatea el número al estilo argentino:
                pone el punto de miles, o sea 1.234 en vez de 1234. */}
            <Text style={styles.likes}>{post.likes.toLocaleString('es-AR')} Me gusta</Text>

            {/* Un <Text> adentro de otro <Text> es la forma de mezclar dos
                estilos en el mismo renglón: el usuario en negrita y el caption
                normal, uno al lado del otro. */}
            <Text style={styles.caption}>
              <Text style={styles.usuario}>{post.usuario}</Text> {post.caption}
            </Text>

            {/* Este número se actualiza solo al publicar, porque la lista de
                comentarios cambió y React redibuja lo que dependa de ella. */}
            <Text style={styles.comentariosTitulo}>
              Comentarios ({post.comentarios.length})
            </Text>
          </View>
        }
      />

      {/* ── LA BARRA PARA COMENTAR ────────────────────────────────────────────
          Está AFUERA de la FlatList, como hermana. Por eso queda pegada abajo y
          no se mueve cuando hago scroll, igual que en Instagram. */}
      <View style={styles.barraComentario}>
        <Image source={{ uri: usuarioLogueado.fotoPerfil }} style={styles.avatarChico} />

        <TextInput
          style={styles.input}
          placeholder="Agregá un comentario..." // el texto gris de cuando está vacío
          placeholderTextColor={colores.textoSecundario}

          // Estas dos props juntas son las que forman el "componente controlado":
          value={textoComentario}           // el campo MUESTRA lo que hay en el estado
          onChangeText={setTextoComentario} // y cada letra ACTUALIZA el estado

          // Si aprieto Enter (o "enviar" en el teclado del celular), publica.
          onSubmitEditing={publicarComentario}
          returnKeyType="send" // la tecla de Enter del celular dice "enviar"
        />

        <Pressable
          onPress={publicarComentario}
          disabled={!hayTextoEscrito} // con el campo vacío, el botón ni responde
          hitSlop={8}
        >
          {/* Otro array de estilos. El "&&" acá funciona así: si la primera
              parte es false, no devuelve nada y no se aplica ningún estilo
              extra; si es true, aplica el segundo, que le pisa el color azul
              por un gris apagado. Es la señal visual de "todavía no se puede". */}
          <Text style={[styles.botonPublicar, !hayTextoEscrito && styles.botonPublicarApagado]}>
            Publicar
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default DetallePostPantalla;
