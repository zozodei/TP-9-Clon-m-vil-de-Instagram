import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({
  contenedor: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  filaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // la mitad del ancho: círculo
    marginRight: 20,
    backgroundColor: colores.superficie,
  },
  stats: {
    flex: 1, // ocupa el espacio que sobra al lado del avatar
    flexDirection: 'row',
    justifyContent: 'space-around', // reparte las 3 métricas con espacio parejo
  },
  stat: {
    alignItems: 'center',
  },
  statNumero: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.textoPrincipal,
  },
  statLabel: {
    fontSize: 12,
    color: colores.textoPrincipal,
  },
  nombre: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
    marginBottom: 2,
  },
  bio: {
    fontSize: 13,
    color: colores.textoPrincipal,
    lineHeight: 18, // separación entre renglones (la bio tiene un salto de línea)
    marginBottom: 12,
  },
  botonEditar: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },
  botonEditarTexto: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
  },
});
