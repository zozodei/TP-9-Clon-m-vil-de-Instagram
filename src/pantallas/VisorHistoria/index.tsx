import { Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import styles from './VisorHistoria.styles';

// una historia en grande. route.params trae la historia que tocamos en la BarraHistorias,
// y navigation.goBack() cierra esta pantalla y vuelve al Feed.
const VisorHistoriaPantalla = ({ route, navigation }) => {
  const { historia } = route.params;

  return (
    <View style={styles.pantalla}>
      <SafeAreaView edges={['top']}>
        <View style={styles.encabezado}>
          <Image source={{ uri: historia.fotoPerfil }} style={styles.avatar} />
          <Text style={styles.usuario}>{historia.usuario}</Text>
          {/* hitSlop agranda el área tocable sin agrandar el ícono */}
          <Pressable onPress={() => navigation.goBack()} hitSlop={10}>
            <Ionicons name="close" size={28} color="#FFFFFF" />
          </Pressable>
        </View>
      </SafeAreaView>

      {/* tocar la foto en cualquier lado también cierra */}
      <Pressable style={styles.zonaFoto} onPress={() => navigation.goBack()}>
        {/* "contain" entra la foto entera sin recortarla ("cover" cortaría los bordes) */}
        <Image source={{ uri: historia.fotoPerfil }} style={styles.foto} resizeMode="contain" />
      </Pressable>
    </View>
  );
};

export default VisorHistoriaPantalla;
