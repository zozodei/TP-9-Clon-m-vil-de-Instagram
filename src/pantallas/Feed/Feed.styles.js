import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  contenedor: {
    flex: 1, // ocupa toda la pantalla disponible (sin esto, la lista podría quedar con alto 0)
    backgroundColor: colores.fondo,
  },
  centro: {
    flex: 1,
    justifyContent: 'center', // centra el spinner verticalmente
    alignItems: 'center', // y horizontalmente
    backgroundColor: colores.fondo,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // logo a la izquierda, iconos pegados a la derecha
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth, // línea finita separando el header del feed
    borderBottomColor: colores.borde,
  },
  logo: {
    fontSize: 26,
    fontStyle: 'italic', // el logo de Instagram real es en cursiva
    fontWeight: '700',
    color: colores.textoPrincipal,
  },
  headerIconos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcono: {
    marginRight: 16, // separación entre el ícono de corazón y el de mensajes
  },
});
