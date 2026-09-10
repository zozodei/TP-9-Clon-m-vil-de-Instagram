import { Text, View } from 'react-native';
// el tipo se llama igual que el componente, por eso lo renombramos a TipoComentario
// al importarlo: si no, se pisarían entre ellos dentro de este archivo
import type { Comentario as TipoComentario } from '../../tipos';
import styles from './Comentario.styles';

type Props = {
  comentario: TipoComentario;
};

// una fila de comentario, dentro de la lista de DetallePost
const Comentario = ({ comentario }: Props) => {
  return (
    <View style={styles.fila}>
      {/* un <Text> adentro de otro: así se mezclan dos estilos en el mismo renglón */}
      <Text style={styles.texto}>
        <Text style={styles.usuario}>{comentario.usuario}</Text> {comentario.texto}
      </Text>
    </View>
  );
};

export default Comentario;
