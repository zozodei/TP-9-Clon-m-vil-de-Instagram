import { StyleSheet } from 'react-native';
import type { ViewStyle } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

// el header y la lista comparten el mismo tope de ancho, para que el logo quede
// alineado con las fotos. Ver el porqué del tope en estilos/tema.ts
//
// El ": ViewStyle" hace falta porque este objeto está suelto, fuera de StyleSheet.create():
// sin él, TypeScript vería '100%' y 'center' como texto cualquiera, y no como los
// valores concretos que acepta un estilo de React Native
const anchoLimitado: ViewStyle = {
  width: '100%',
  maxWidth: medidas.anchoMaximoContenido,
  alignSelf: 'center',
};

export default StyleSheet.create({
  contenedor: {
    flex: 1, // sin esto la lista quedaría con alto 0
    backgroundColor: colores.fondo,
  },
  centro: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colores.fondo,
  },
  header: {
    ...anchoLimitado,
    flexDirection: 'row',
    justifyContent: 'space-between', // logo a la izquierda, iconos a la derecha
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colores.borde,
  },
  logo: {
    fontSize: 26,
    fontStyle: 'italic', // el logo de Instagram es en cursiva
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
  // va en el "contentContainerStyle" de la FlatList: se aplica al bloque que contiene
  // todas las filas juntas, no a cada fila por separado
  listaContenido: anchoLimitado,
});
