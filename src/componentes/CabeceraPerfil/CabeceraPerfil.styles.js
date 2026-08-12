import { StyleSheet } from 'react-native';
import { colores } from '../../colores';

export default StyleSheet.create({
  contenedor: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },
  filaTop: {
    flexDirection: 'row', // avatar y stats uno al lado del otro
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40, // círculo
    marginRight: 20,
    backgroundColor: colores.superficie,
  },
  stats: {
    flex: 1, // ocupa todo el espacio que sobra al lado del avatar
    flexDirection: 'row',
    justifyContent: 'space-around', // reparte las 3 métricas con espacio parejo entre ellas
  },
  stat: {
    alignItems: 'center', // centra el número arriba de la palabra (publicaciones/seguidores/seguidos)
  },
  statNumero: {
    fontSize: 16,
    fontWeight: '700', // bien grueso, para que resalte el número
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
    lineHeight: 18, // separación entre renglones (importante porque la bio tiene un salto de línea)
    marginBottom: 12,
  },
  botonEditar: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8, // bordes redondeados del botón
    paddingVertical: 6,
    alignItems: 'center', // centra el texto "Editar perfil" adentro del botón
  },
  botonEditarTexto: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
  },
});
