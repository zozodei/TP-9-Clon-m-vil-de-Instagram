import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around', // reparte las 3 pestañas con espacio parejo
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colores.borde,
    paddingVertical: 10,
    marginBottom: 2,
  },
  tab: {
    fontSize: 11,
    letterSpacing: 0.5, // un poquito de separación entre letras, como en Instagram real
    color: colores.textoSecundario,
  },
  tabActivo: {
    color: colores.textoPrincipal, // más oscuro que las pestañas inactivas
    fontWeight: '700',
    borderBottomWidth: 1, // la rayita de "seleccionado" debajo del texto
    borderBottomColor: colores.textoPrincipal,
    paddingBottom: 8,
  },
  vacio: {
    textAlign: 'center',
    color: colores.textoSecundario,
    marginTop: 24,
  },
});
