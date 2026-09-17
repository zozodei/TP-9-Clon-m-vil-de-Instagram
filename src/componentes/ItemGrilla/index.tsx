// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  componentes/ItemGrilla  —  UN CUADRADITO DE LA GRILLA DEL PERFIL           ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Cada una de las fotitos cuadradas de la grilla del perfil. Es solo una imagen
// que se puede tocar para abrir el detalle.

import { Image, Pressable } from 'react-native';
import type { Post } from '../../tipos';
import styles from './ItemGrilla.styles';

type Props = {
  post: Post;
  tamaño: number;     // cuántos píxeles mide de lado (lo calcula la pantalla)
  onPress: () => void; // qué hacer cuando lo tocan
};

// ── EL DETALLE INTERESANTE DE ESTE ARCHIVO ───────────────────────────────────
// Fijate que el estilo del Pressable va escrito ACÁ EN LÍNEA, con llaves, y no
// en el archivo ItemGrilla.styles.ts como todo el resto del proyecto.
//
// ¿Por qué esta excepción? Porque el tamaño DEPENDE DE UNA PROP: cambia según el
// ancho del celular en el que se abra la app. Los archivos .styles.ts son para
// valores fijos, que se calculan una sola vez cuando arranca la app. Un valor
// que llega por props no puede estar ahí, porque en ese momento todavía no
// existe.
//
// REGLA GENERAL PARA DECIR EN LA EXPOSICIÓN: estilo fijo → al archivo de
// estilos; estilo que depende de un dato → en línea.
const ItemGrilla = ({ post, tamaño, onPress }: Props) => {
  return (
    // El Pressable es el que tiene el tamaño: es el cuadrado.
    <Pressable onPress={onPress} style={{ width: tamaño, height: tamaño }}>
      {/* Y la imagen adentro simplemente lo llena entero (con flex: 1, mirá el
          archivo de estilos). */}
      <Image source={{ uri: post.url }} style={styles.imagen} />
    </Pressable>
  );
};

export default ItemGrilla;
