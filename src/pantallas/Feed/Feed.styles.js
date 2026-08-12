import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.fondo,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colores.borde,
  },
  logo: {
    fontSize: 26,
    fontStyle: 'italic',
    fontWeight: '700',
    color: colores.textoPrincipal,
  },
  headerIconos: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcono: {
    marginRight: 16,
  },
});
