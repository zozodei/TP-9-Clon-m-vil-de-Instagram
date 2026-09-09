import { useCallback, useEffect, useState } from 'react';
// axios: para hacer pedidos HTTP, más simple que el fetch nativo
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
// SafeAreaProvider: mide los bordes seguros del dispositivo (notch, barras) para toda la app
import { SafeAreaProvider } from 'react-native-safe-area-context';
// GestureHandlerRootView: lo necesita react-navigation por debajo para que anden los gestos
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavegadorRaiz from './src/navegacion/NavegadorRaiz';
import { usuarioLogueado } from './src/data/dataDeUsuario';

// le decimos a Expo "no ocultes la pantalla de carga sola, yo te aviso cuándo"
SplashScreen.preventAutoHideAsync();

// la API de gatos solo devuelve la imagen, así que el resto de cada posteo (usuario,
// ubicación, caption) lo armamos combinando estos arrays por índice
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

// los comentarios con los que arranca cada posteo
const COMENTARIOS_FIJOS = [
  { id: 1, usuario: 'gato_fan_01', texto: '¡Qué hermoso! 😍' },
  { id: 2, usuario: 'luna_cat', texto: 'Me robaste el corazón 🐾' },
  { id: 3, usuario: 'michi_watcher', texto: 'Definitivamente el mejor día' },
];

// el componente raíz: acá vive TODO el estado de la app. Las pantallas no guardan
// posteos por su cuenta, los reciben por props junto con las funciones que los modifican.
export default function App() {
  const [posteos, setPosteos] = useState([]);

  // el array vacío del final significa "ejecutá esto una sola vez, al arrancar la app"
  useEffect(() => {
    async function traerGatos() {
      // try/catch: si falla (sin internet, API caída) no rompe la app
      try {
        const respuesta = await axios.get('https://api.thecatapi.com/v1/images/search', {
          params: { limit: 12 }, // se agrega a la URL como ...search?limit=12
        });

        // por cada imagen que devuelve la API armamos un posteo completo.
        // "index" es la posición, la usamos para repartir usuario/ubicación/caption
        const posteosGenerados = respuesta.data.map((imagen, index) => ({
          id: imagen.id,
          url: imagen.url,
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          // el % (módulo) hace que, si nos quedamos sin nombres, vuelva a empezar del principio
          usuario: USUARIOS[index % USUARIOS.length],
          ubicacion: UBICACIONES[index % UBICACIONES.length],
          caption: CAPTIONS[index % CAPTIONS.length],
          likes: Math.floor(Math.random() * 500) + 50, // un entero al azar entre 50 y 549
          liked: false,
          // una copia propia para cada posteo: si compartieran el mismo array,
          // al comentar en uno aparecería el comentario en los 12
          comentarios: [...COMENTARIOS_FIJOS],
        }));

        setPosteos(posteosGenerados); // acá se dibuja el feed con las fotos ya cargadas
      } catch (error) {
        console.error('Error al traer los gatos:', error);
      }
    }

    traerGatos();
  }, []);

  // da o saca el like del posteo con ese id
  function toggleLike(id) {
    // cuando le pasamos una función, setPosteos nos da el estado actual y toma
    // lo que devolvemos como el estado nuevo
    setPosteos((posteosActuales) =>
      posteosActuales.map((post) => {
        if (post.id !== id) return post; // los demás quedan igual

        // devolvemos una copia: el "..." copia el resto de las propiedades sin tocarlas
        return {
          ...post,
          liked: !post.liked, // el "!" invierte el booleano
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
  }

  // agrega un comentario al posteo con ese id.
  // Vive acá y no en DetallePost por el mismo motivo que toggleLike: "posteos" es el único
  // lugar donde viven los datos, así el cambio se ve en todas las pantallas a la vez
  // (por ejemplo, el "Ver los N comentarios" del Feed se actualiza solo)
  function agregarComentario(id, texto) {
    const textoLimpio = texto.trim(); // sin los espacios de los costados
    if (textoLimpio === '') return;

    setPosteos((posteosActuales) =>
      posteosActuales.map((post) => {
        if (post.id !== id) return post;

        const comentarioNuevo = {
          id: Date.now(), // los milisegundos actuales: un número distinto cada vez
          usuario: usuarioLogueado.usuario,
          texto: textoLimpio,
        };

        // los comentarios que ya estaban + el nuevo al final. No usamos push() porque
        // modificaría el array original y React no se enteraría del cambio
        return { ...post, comentarios: [...post.comentarios, comentarioNuevo] };
      })
    );
  }

  // useCallback la memoriza para que sea siempre la misma función entre renders
  const ocultarSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  return (
    // onLayout se dispara en cuanto este View mide su tamaño, o sea, cuando ya está listo
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={ocultarSplash}>
      <SafeAreaProvider>
        {/* "dark" pone los iconitos de la barra de estado en oscuro, porque el fondo es blanco */}
        <StatusBar style="dark" />
        <NavegadorRaiz
          posteos={posteos}
          onToggleLike={toggleLike}
          onAgregarComentario={agregarComentario}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
