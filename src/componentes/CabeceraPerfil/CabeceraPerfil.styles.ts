

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
    borderRadius: 40, // la mitad del ancho = círculo
    marginRight: 20,
    backgroundColor: colores.superficie, // gris mientras la foto carga
  },

  stats: {
    flex: 1,             
    flexDirection: 'row', 
    justifyContent: 'space-around',
  },


  stat: {
    alignItems: 'center', // centra el número respecto de la palabra
  },

  statNumero: {
    fontSize: 16,
    fontWeight: '700', // negrita: es el dato importante
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
    lineHeight: 18,
    marginBottom: 12,
  },

  // El botón "Editar perfil" (decorativo, no hace nada).
  botonEditar: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,      // esquinas apenas redondeadas, no un círculo
    paddingVertical: 6,
    alignItems: 'center', // centra el texto adentro del botón
    // Sin width ni flexDirection: al ser un View normal en columna, ocupa todo
    // el ancho disponible solo. Por eso el botón sale de punta a punta.
  },

  botonEditarTexto: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
  },
});
