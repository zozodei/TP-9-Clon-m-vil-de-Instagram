import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavegadorRaiz from './src/navegacion/NavegadorRaiz';

// mantiene la splash (logo de assets/splash-icon.png, configurado en
// app.json) hasta que la app terminó de montar, en vez de la pantalla de
// carga que trae Expo por default
SplashScreen.preventAutoHideAsync();

// todo esto es lo que usamos para armar cada posteo, igual que en el TP
// web: los captions son lo que se pone abajo de cada foto, los usuarios y
// ubicaciones son inventados y se van repitiendo por índice
const CAPTIONS = [
  'Cuando es lunes pero igual estás feliz 😸',
  'El sol me llama pero el sueño me retiene 😴',
  'Listo para conquistar el mundo 🐾',
  'Nadie me entiende como mi almohada 💤',
  'Día perfecto para no hacer nada 🌿',
  'Estoy en modo zen 🧘',
  'Juzgándote en silencio desde aquí 👀',
  'Detective en servicio activo 🔍',
  'Cuando encontrás el rayo de sol perfecto ☀️',
  'Solo paso por aquí a ser hermoso 🌟',
  'No me interrumpas, estoy ocupado 💅',
  'El universo me debe una siesta 😤',
];

const USUARIOS = [
  'michi_lover', 'gato_curioso', 'pelusa_oficial', 'felix_jr',
  'bigotes_pro', 'ronroneo_max', 'zarpazo_suave', 'michi_zen',
  'gatito_bueno', 'patas_lindas', 'colita_tiesa', 'miau_forever',
];

const UBICACIONES = [
  'Buenos Aires, Argentina', 'Córdoba, Argentina', 'Rosario, Argentina',
  'Mendoza, Argentina', 'Bariloche, Argentina', 'Mar del Plata, Argentina',
  'Salta, Argentina', 'La Plata, Argentina', 'Ushuaia, Argentina',
  'Neuquén, Argentina', 'Tucumán, Argentina', 'Posadas, Argentina',
];

const COMENTARIOS_FIJOS = [
  { id: 1, usuario: 'gato_fan_01', texto: '¡Qué hermoso! 😍' },
  { id: 2, usuario: 'luna_cat', texto: 'Me robaste el corazón 🐾' },
  { id: 3, usuario: 'michi_watcher', texto: 'Definitivamente el mejor del día' },
];

export default function App() {
  // guarda los posteos que trajimos de la API, arranca vacío
  const [posteos, setPosteos] = useState([]);

  // trae los posteos una sola vez, cuando se monta la app
  useEffect(() => {
    async function traerGatos() {
      try {
        const respuesta = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: { limit: 12 },
        });

        // la API solo devuelve id y url, acá completamos el resto del
        // posteo combinando con los arrays de arriba
        const posteosGenerados = respuesta.data.map((imagen, index) => ({
          id: imagen.id,
          url: imagen.url,
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          usuario: USUARIOS[index % USUARIOS.length],
          ubicacion: UBICACIONES[index % UBICACIONES.length],
          caption: CAPTIONS[index % CAPTIONS.length],
          likes: Math.floor(Math.random() * 500) + 50,
          liked: false,
          comentarios: COMENTARIOS_FIJOS,
        }));

        setPosteos(posteosGenerados);
      } catch (error) {
        console.error('Error al traer los gatos:', error);
      }
    }

    traerGatos();
  }, []);

  // busca el posteo por id y le cambia el estado de like (lo usan tanto
  // el feed como el detalle, por eso vive acá arriba y baja por props)
  function toggleLike(id) {
    setPosteos((posteosActuales) =>
      posteosActuales.map((post) => {
        if (post.id !== id) return post;
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
  }

  const ocultarSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={ocultarSplash}>
      <SafeAreaProvider>
        <StatusBar style="dark" />
        <NavegadorRaiz posteos={posteos} onToggleLike={toggleLike} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
