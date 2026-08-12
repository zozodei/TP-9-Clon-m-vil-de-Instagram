// useCallback: memoriza una función para que no se recree en cada render (la usamos para ocultar el splash)
// useEffect: para ejecutar código cuando el componente se monta (acá: pedir los gatos a la API)
// useState: para guardar datos que cuando cambian, hacen que la pantalla se vuelva a dibujar
import { useCallback, useEffect, useState } from 'react';
// axios: librería para hacer pedidos HTTP (GET, POST, etc.) más simple que el fetch nativo
import axios from 'axios';
// StatusBar: el componente de Expo para controlar el color de la barra de arriba (batería, hora, señal)
import { StatusBar } from 'expo-status-bar';
// SplashScreen: controla la pantalla de carga nativa que se ve mientras la app termina de iniciar
import * as SplashScreen from 'expo-splash-screen';
// SafeAreaProvider: le da a toda la app la información de cuánto espacio ocupan el notch, la barra de estado, etc.
import { SafeAreaProvider } from 'react-native-safe-area-context';
// GestureHandlerRootView: componente que necesita react-navigation por debajo para que los gestos (deslizar, tocar) funcionen bien en toda la app
import { GestureHandlerRootView } from 'react-native-gesture-handler';
// nuestro navegador principal (el que decide qué pantalla se ve)
import NavegadorRaiz from './src/navegacion/NavegadorRaiz';

// esta línea le dice a Expo "no ocultes la pantalla de carga sola, yo te aviso cuándo".
// se ejecuta una sola vez, apenas se importa este archivo (no espera a que se monte nada)
SplashScreen.preventAutoHideAsync();

// arrays "de relleno": la API de gatos solo nos da la imagen, así que armamos el resto
// de cada posteo (usuario, ubicación, caption) combinando estos arrays por índice.
// CAPTIONS = lo que se muestra como descripción abajo de cada foto
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

// USUARIOS = los nombres de usuario inventados que le vamos a poner a cada posteo
const USUARIOS = [
  'michi_lover', 'gato_curioso', 'pelusa_oficial', 'felix_jr',
  'bigotes_pro', 'ronroneo_max', 'zarpazo_suave', 'michi_zen',
  'gatito_bueno', 'patas_lindas', 'colita_tiesa', 'miau_forever',
];

// UBICACIONES = la "localización simulada" que pide la consigna, debajo del usuario en cada posteo
const UBICACIONES = [
  'Buenos Aires, Argentina', 'Córdoba, Argentina', 'Rosario, Argentina',
  'Mendoza, Argentina', 'Bariloche, Argentina', 'Mar del Plata, Argentina',
  'Salta, Argentina', 'La Plata, Argentina', 'Ushuaia, Argentina',
  'Neuquén, Argentina', 'Tucumán, Argentina', 'Posadas, Argentina',
];

// COMENTARIOS_FIJOS = los mismos 3 comentarios simulados que se repiten en todos los posteos
const COMENTARIOS_FIJOS = [
  { id: 1, usuario: 'gato_fan_01', texto: '¡Qué hermoso! 😍' },
  { id: 2, usuario: 'luna_cat', texto: 'Me robaste el corazón 🐾' },
  { id: 3, usuario: 'michi_watcher', texto: 'Definitivamente el mejor día' },
];

// "App" es el componente raíz: todo lo demás (pantallas, navegación) cuelga de acá.
// Se exporta como "default" porque index.js lo importa así (import App from './App')
export default function App() {
  // posteos: arranca como un array vacío []. Cuando la API responda, se va a llenar.
  // setPosteos es la única función que puede modificar "posteos" (así funciona useState)
  const [posteos, setPosteos] = useState([]);

  // useEffect ejecuta la función de adentro DESPUÉS de que la pantalla se dibuja por primera vez.
  // El segundo argumento, el array vacío [], significa "ejecutá esto una sola vez, apenas arranca la app"
  // (si tuviera algo adentro del array, tipo [posteos], se volvería a ejecutar cada vez que posteos cambie)
  useEffect(() => {
    // función async porque adentro usamos "await" para esperar la respuesta de la API
    async function traerGatos() {
      // try/catch: si algo sale mal (sin internet, la API caída, etc.) no rompe la app, cae al catch
      try {
        // axios.get hace la petición GET a esa URL. "await" pausa esta función hasta que llegue la respuesta
        // (pero NO pausa el resto de la app, React sigue funcionando mientras tanto)
        const respuesta = await axios.get('https://api.thecatapi.com/v1/images/search', {
          // params se agregan como query string a la URL: ...search?limit=12
          params: { limit: 12 },
        });

        // respuesta.data es el array que devuelve la API, cada elemento es { id, url, ... }
        // .map() recorre ese array y por cada "imagen" devuelve un objeto nuevo (no modifica el original)
        // "index" es la posición (0, 1, 2...) que usamos para repartir usuario/ubicación/caption
        const posteosGenerados = respuesta.data.map((imagen, index) => ({
          id: imagen.id, // el id que ya trae la imagen desde la API, lo reusamos como id del posteo
          url: imagen.url, // la URL de la foto del gato
          // avatar: como la API de gatos no da avatares de usuario, generamos uno con otro servicio gratuito
          // el `${...}` es un template string: arma el texto insertando el valor de (index + 1) adentro
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
          // el operador % (módulo) hace que, si nos quedamos sin nombres en el array, vuelva a empezar desde el principio
          usuario: USUARIOS[index % USUARIOS.length],
          ubicacion: UBICACIONES[index % UBICACIONES.length],
          caption: CAPTIONS[index % CAPTIONS.length],
          // Math.random() da un decimal entre 0 y 1, lo multiplicamos por 500 y redondeamos para abajo con Math.floor
          // así conseguimos un número entero al azar entre 50 y 549 "me gusta" iniciales
          likes: Math.floor(Math.random() * 500) + 50,
          liked: false, // arranca sin like puesto
          comentarios: COMENTARIOS_FIJOS, // le pegamos los mismos 3 comentarios simulados a todos
        }));

        // acá recién actualizamos el estado real de la app con todo lo que armamos arriba.
        // esto dispara un nuevo render y ahí React dibuja el feed con las fotos ya cargadas
        setPosteos(posteosGenerados);
      } catch (error) {
        // si algo falla, lo mostramos en la consola para poder debuggear (no se le muestra nada al usuario)
        console.error('Error al traer los gatos:', error);
      }
    }

    // OJO: definir la función arriba no la ejecuta sola, por eso hace falta llamarla acá
    traerGatos();
  }, []); // <- dependencias vacías: "ejecutá el efecto de arriba una sola vez, al montar"

  // función para dar/sacar like a un posteo puntual, según su id
  function toggleLike(id) {
    // setPosteos puede recibir una función en vez de un valor directo: React le pasa el estado actual
    // (posteosActuales) y lo que devolvamos acá adentro pasa a ser el nuevo estado
    setPosteos((posteosActuales) =>
      // .map() recorre todos los posteos y devuelve un array nuevo del mismo tamaño
      posteosActuales.map((post) => {
        // si este posteo no es el que tocaron, lo devolvemos tal cual, sin tocarlo
        if (post.id !== id) return post;
        // si SÍ es el posteo correcto, devolvemos una copia con los campos "liked" y "likes" cambiados
        // el "..." (spread) copia todas las demás propiedades del posteo (url, usuario, caption, etc.)
        return {
          ...post,
          liked: !post.liked, // el "!" invierte el booleano: si era true pasa a false y viceversa
          // si ya tenía like, se lo sacamos (resta 1); si no tenía, se lo agregamos (suma 1)
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
  }

  // useCallback memoriza esta función para que sea siempre la misma referencia entre renders
  // (evita que GestureHandlerRootView piense que "onLayout" cambió y haga trabajo de más)
  const ocultarSplash = useCallback(async () => {
    // recién acá le decimos a Expo "ya podés sacar la pantalla de carga"
    await SplashScreen.hideAsync();
  }, []);

  // lo que se ve en pantalla. Los componentes están "anidados": cada uno envuelve al siguiente
  return (
    // GestureHandlerRootView tiene que estar en la raíz de todo para que funcionen los gestos de navegación
    // onLayout se dispara automáticamente en cuanto este View mide su tamaño por primera vez (o sea, ya está listo)
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={ocultarSplash}>
      {/* SafeAreaProvider mide los bordes seguros del dispositivo (notch, barras) y se los pasa a toda la app */}
      <SafeAreaProvider>
        {/* style="dark" hace que los iconitos de la barra de estado (hora, batería) se vean oscuros,
            porque el fondo de nuestra app es blanco y si fueran claros no se verían */}
        <StatusBar style="dark" />
        {/* le pasamos posteos y la función toggleLike al navegador para que las reparta
            entre las pantallas que las necesiten (Feed y DetallePost) */}
        <NavegadorRaiz posteos={posteos} onToggleLike={toggleLike} />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
