import { Text, View } from 'react-native';
import styles from './Comentario.styles';

// una fila de comentario simulado, se usa dentro de la lista de comentarios
// de la pantalla DetallePost. Recibe un solo objeto por props: { usuario, texto }
const Comentario = ({ comentario }) => {
  return (

    <View style={styles.fila}>
      {/* el usuario en negrita, seguido del texto del comentario en el mismo renglón.
          poner un <Text> adentro de otro <Text> es la forma de mezclar dos estilos
          distintos (uno en negrita, otro normal) dentro de la misma línea */}
      <Text style={styles.texto}>
        <Text style={styles.usuario}>{comentario.usuario}</Text> {comentario.texto}
      </Text>
    </View>

  );
};

export default Comentario;
