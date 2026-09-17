// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  pantallas/VisorHistoria  —  LA HISTORIA EN PANTALLA COMPLETA               ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// La pantalla negra que se abre al tocar una historia de la barra de arriba.
// Muestra la foto en grande, con el nombre del usuario arriba y una X para salir.
//
// ES LA PANTALLA MÁS SIMPLE DEL PROYECTO, y sirve para mostrar el otro camino
// por el que pueden viajar los datos:
//
//   * DetallePost recibe un ID y busca el dato en la lista de App.tsx.
//     Lo hice así porque ese dato CAMBIA (los likes, los comentarios) y quiero
//     ver siempre la última versión.
//
//   * VisorHistoria recibe la HISTORIA ENTERA como parámetro de navegación.
//     Acá me alcanza, porque una historia no cambia nunca: la muestro y la
//     cierro. No necesita ninguna prop mía, le basta con lo que le da la
//     librería de navegación. Por eso en NavegadorRaiz la registré con la
//     "forma corta" (component={...}).

import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { PropsVisorHistoria } from '../../navegacion/tipos';
import styles from './VisorHistoria.styles';

const VisorHistoriaPantalla = ({ route, navigation }: PropsVisorHistoria) => {
  // Abro el sobre y saco la historia que me mandó la BarraHistorias.
  const { historia } = route.params;

  return (
    // Un View con fondo negro que ocupa toda la pantalla.
    // Acá el SafeAreaView NO envuelve todo, solo el encabezado: quiero que el
    // negro llegue hasta el borde físico del celular (que se vea "full screen")
    // pero que el nombre y la X no queden tapados por el notch.
    <View style={styles.pantalla}>
      <SafeAreaView edges={['top']}>
        <View style={styles.encabezado}>
          <Image source={{ uri: historia.fotoPerfil }} style={styles.avatar} />
          <Text style={styles.usuario}>{historia.usuario}</Text>

          {/* goBack() saca esta pantalla de la pila y me devuelve al Feed,
              en la misma posición de scroll en la que estaba.
              hitSlop agranda el área tocable sin agrandar el ícono: una X de
              28px es chica para un dedo, y este es EL botón de salida. */}
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Toda la zona de la foto también es un botón: tocando en cualquier lado
          se cierra, igual que en Instagram. Es un detalle de usabilidad: nadie
          quiere apuntarle a la X chiquita de la esquina. */}
      <Pressable style={styles.zonaFoto} onPress={() => navigation.goBack()}>
        {/* Acá uso "contain" y no "cover" como en el resto de la app:
              contain → entra la foto ENTERA, aunque queden franjas negras
              cover   → llena todo, pero recorta lo que sobra
            En una historia quiero ver la foto completa, no una parte. */}
        <Image source={{ uri: historia.fotoPerfil }} style={styles.foto} resizeMode="contain" />
      </Pressable>
    </View>
  );
};

export default VisorHistoriaPantalla;
