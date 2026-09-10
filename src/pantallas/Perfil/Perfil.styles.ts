import { StyleSheet } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },
  // mismo tope de ancho que el Feed, para que en la web la grilla no se estire
  // a lo ancho del navegador. Ver estilos/tema.ts
  listaContenido: {
    width: '100%',
    maxWidth: medidas.anchoMaximoContenido,
    alignSelf: 'center',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colores.borde,
    paddingVertical: 10,
    marginBottom: 2,
  },
  tab: {
    fontSize: 11,
    letterSpacing: 0.5,
    color: colores.textoSecundario,
  },
  tabActivo: {
    color: colores.textoPrincipal,
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
