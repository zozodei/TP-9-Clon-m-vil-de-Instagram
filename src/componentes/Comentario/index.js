import { Text, View } from 'react-native';
import styles from './Comentario.styles';

// una fila de comentario simulado, se usa dentro de la lista de comentarios
// de la pantalla DetallePost
const Comentario = ({ comentario }) => {
  return (
    <View style={styles.fila}>
      <Text style={styles.texto}>
        <Text style={styles.usuario}>{comentario.usuario}</Text> {comentario.texto}
      </Text>
    </View>
  );
};

export default Comentario;
