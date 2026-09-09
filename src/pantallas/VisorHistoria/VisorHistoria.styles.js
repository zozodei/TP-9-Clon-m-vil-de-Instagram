import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pantalla: {
    flex: 1, // ocupa toda la pantalla
    backgroundColor: '#000000', // negro: las historias de Instagram van sobre fondo negro
  },
  encabezado: {
    flexDirection: 'row', // avatar, nombre y X uno al lado del otro
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16, // círculo (la mitad del ancho)
    marginRight: 8,
    backgroundColor: '#333333', // gris oscuro mientras la foto carga
  },
  usuario: {
    flex: 1, // ocupa el espacio libre y así empuja la X hasta el extremo derecho
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  zonaFoto: {
    flex: 1, // se queda con todo el alto que sobra debajo del encabezado
  },
  foto: {
    width: '100%',
    height: '100%',
  },
});
