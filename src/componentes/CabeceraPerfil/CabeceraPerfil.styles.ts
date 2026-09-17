// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  CabeceraPerfil.styles.ts  —  LOS ESTILOS DE LA CABECERA DEL PERFIL         ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// (La explicación general de flexbox y estilos está en PostCard.styles.ts)

import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({

  contenedor: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },

  // La fila de arriba: la foto grande a la izquierda y los 3 números a la derecha.
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

  // El bloque de las tres métricas.
  stats: {
    flex: 1,              // agarra todo el espacio que queda al lado del avatar
    flexDirection: 'row', // las tres métricas, una al lado de la otra
    // space-around reparte el espacio sobrante a los costados de cada una, así
    // quedan distribuidas parejo sin que yo calcule márgenes.
    justifyContent: 'space-around',
  },

  // Cada métrica por separado: el número arriba y la palabra abajo.
  // No necesita flexDirection porque la dirección por defecto en React Native ya
  // es en columna (de arriba hacia abajo), al revés que en la web.
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
    // lineHeight es la separación entre renglones. Lo necesito porque la
    // biografía tiene un salto de línea (el \n de dataDeUsuario.ts) y sin esto
    // los dos renglones quedan pegoteados.
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
