import { Text, View } from 'react-native';
import styles from './Comentario.styles';

// una fila de comentario, dentro de la lista de DetallePost
const Comentario = ({ comentario }) => {
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
