import { useEffect, useState } from 'react';
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
// los datos inventados (autores y comentarios) viven en src/data, así este archivo
// se queda solo con la lógica
import { AUTORES, COMENTARIOS_INICIALES } from './src/data/datosDePosteos';
// "import type" trae solo las formas de los datos. Como los tipos no existen cuando
// la app corre, esta línea desaparece del código final: no pesa nada
import type { ImagenDeLaApi, Post } from './src/tipos';

// le decimos a Expo "no ocultes la pantalla de carga sola, yo te aviso cuándo"
SplashScreen.preventAutoHideAsync();

// ─────────────────────────────────────────────────────────────────────────────
// El componente raíz. Acá vive TODO el estado de la app: las pantallas no guardan
// posteos por su cuenta, los reciben por props junto con las funciones que los modifican.
//
// El recorrido de los datos es siempre este:
//
//   App.js  (tiene "posteos" + toggleLike + agregarComentario)
//     └─> NavegadorRaiz      (los recibe y los reparte)
//           ├─> TabsPrincipales ──> Feed    ──> PostCard
//           │                   └─> Perfil  ──> ItemGrilla
//           └─> DetallePost
//
// Los datos BAJAN por props (posteos) y los avisos SUBEN por funciones
// (onToggleLike, onAgregarComentario). Como hay un solo array de posteos,
// si das like en el Feed también aparece likeado en el Detalle: es el mismo dato.
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  // <Post[]> le dice a useState "esto va a ser un array de Post". Sin eso, al arrancar
  // vacío TypeScript creería que es un array de nada y se quejaría al llenarlo
  const [posteos, setPosteos] = useState<Post[]>([]);

  // el array vacío del final significa "ejecutá esto una sola vez, al arrancar la app"
  useEffect(() => {
    async function traerGatos() {
      // try/catch: si falla (sin internet, API caída) no rompe la app
      try {
        // el <ImagenDeLaApi[]> le avisa a axios qué forma tiene lo que va a devolver,
        // así respuesta.data queda tipado y no es un "any" suelto
        const respuesta = await axios.get<ImagenDeLaApi[]>('https://api.thecatapi.com/v1/images/search', {
          // pedimos tantas fotos como autores inventados tenemos (12),
          // así a cada foto le toca un autor distinto
          params: { limit: AUTORES.length }, // se agrega a la URL como ...search?limit=12
        });

        // por cada imagen que devuelve la API armamos un posteo completo.
        // "index" es la posición (0, 1, 2...): con ella agarramos el autor de esa misma
        // posición, y así la foto 0 queda con michi_lover, la foto 1 con gato_curioso, etc.
        const posteosGenerados: Post[] = respuesta.data.map((imagen, index) => {
          const autor = AUTORES[index];

          return {
            id: imagen.id,
            url: imagen.url,
            avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
            usuario: autor.usuario,
            ubicacion: autor.ubicacion,
            caption: autor.caption,
            likes: Math.floor(Math.random() * 500) + 50, // un entero al azar entre 50 y 549
            liked: false,
            // una copia propia para cada posteo: si compartieran el mismo array,
            // al comentar en uno aparecería el comentario en los 12
            comentarios: [...COMENTARIOS_INICIALES],
          };
        });

        setPosteos(posteosGenerados); // acá se dibuja el feed con las fotos ya cargadas
      } catch (error) {
        console.error('Error al traer los gatos:', error);
      }
    }

    traerGatos();
  }, []);

  // da o saca el like del posteo con ese id.
  // ": string" es el tipo del parámetro, ": void" avisa que no devuelve nada
  function toggleLike(id: string): void {
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
  function agregarComentario(id: string, texto: string): void {
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

  return (
    // onLayout se dispara en cuanto este View mide su tamaño, o sea, cuando la app
    // ya está lista: recién ahí escondemos la pantalla de carga
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={() => SplashScreen.hideAsync()}>
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
