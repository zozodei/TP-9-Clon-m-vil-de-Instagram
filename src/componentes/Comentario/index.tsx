// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  componentes/Comentario  —  UNA FILA DE COMENTARIO                          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// El componente más chiquito del proyecto: una sola línea de comentario, con el
// nombre de usuario en negrita y el texto al lado. Lo usa la lista de
// DetallePost, una vez por cada comentario.
//
// ¿Y por qué le hice un archivo entero a algo de tres líneas, si lo podría haber
// escrito directo adentro del renderItem de la FlatList?
// Por consistencia: en este proyecto cada pieza visual tiene su carpeta con su
// index.tsx y su archivo de estilos. Si mañana el comentario necesita un avatar,
// una fecha o un botoncito de "me gusta", ya tiene su lugar y no ensucio la
// pantalla de detalle.

import { Text, View } from 'react-native';

// ⚠️ ACÁ HAY UN CHOQUE DE NOMBRES ⚠️
// El componente de este archivo se llama "Comentario" y el TIPO de dato también
// se llama "Comentario". Si importara los dos con el mismo nombre en el mismo
// archivo, se pisarían y JavaScript no sabría a cuál me refiero.
//
// La palabra "as" renombra algo al importarlo. Acá traigo el tipo pero lo llamo
// TipoComentario adentro de este archivo, y así conviven los dos sin problema.
import type { Comentario as TipoComentario } from '../../tipos';
import styles from './Comentario.styles';

type Props = {
  comentario: TipoComentario;
};

const Comentario = ({ comentario }: Props) => {
  return (
    <View style={styles.fila}>
      {/* El mismo truco que uso en PostCard: un <Text> adentro de otro <Text>.
          Es la forma de tener dos estilos distintos en el mismo renglón, con el
          texto acomodándose solo si es largo. El de adentro (el usuario) va en
          negrita, el de afuera (el texto) normal. */}
      <Text style={styles.texto}>
        <Text style={styles.usuario}>{comentario.usuario}</Text> {comentario.texto}
      </Text>
    </View>
  );
};

export default Comentario;
