import { StyleSheet } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

export default StyleSheet.create({
  // flex: 1 hace que ocupe toda la pantalla (sin esto la lista no se ve)
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
    width: '100%',
    maxWidth: medidas.anchoMaximoContenido,
    alignSelf: 'center',
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

  lista: {
    width: '100%',
    maxWidth: medidas.anchoMaximoContenido,
    alignSelf: 'center',
  },
});
