import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  pantalla: {
    flex: 1,
    backgroundColor: '#000000',
  },

  encabezado: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },

  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 8,
    backgroundColor: '#333333',
  },

  // flex: 1 empuja la X hacia la derecha
  usuario: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },

  zonaFoto: {
    flex: 1,
  },

  foto: {
    width: '100%',
    height: '100%',
  },
});
