// Historia a pantalla completa, con fondo negro.
// Se cierra tocando la cruz o tocando en cualquier parte de la foto.
// Recibe la historia a mostrar y la función onCerrar desde App.tsx.

import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import type { Historia } from '../../tipos';
import styles from './VisorHistoria.styles';

type Props = {
  historia: Historia;
  onCerrar: () => void; // en App.tsx es navigation.goBack(): vuelve a la pantalla anterior
};

const VisorHistoria = ({ historia, onCerrar }: Props) => {
  return (
    <View style={styles.pantalla}>
      {/* SafeAreaView solo en el encabezado: el negro llega hasta los bordes,
          pero el nombre y la X no quedan tapados por el notch. */}
      <SafeAreaView edges={['top']}>
        <View style={styles.encabezado}>
          <Image source={{ uri: historia.fotoPerfil }} style={styles.avatar} />
          <Text style={styles.usuario}>{historia.usuario}</Text>
          <Pressable onPress={onCerrar} hitSlop={10}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* Toda la zona de la foto es tocable para cerrar, como en Instagram.
          resizeMode="contain" muestra la foto entera, sin recortarla. */}
      <Pressable style={styles.zonaFoto} onPress={onCerrar}>
        <Image source={{ uri: historia.fotoPerfil }} style={styles.foto} resizeMode="contain" />
      </Pressable>
    </View>
  );
};

export default VisorHistoria;
