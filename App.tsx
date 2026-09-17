// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  App.tsx  —  EL CEREBRO DE LA APLICACIÓN                                    ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Es el componente principal, el que está más arriba de todos. Todo lo demás
// (las pantallas, los botones, las fotos) cuelga de acá abajo.
//
// SU TRABAJO ES UNO SOLO: guardar los datos y prestárselos a los demás.
//
// Pensalo como el "depósito" de la app. En el depósito está la ÚNICA lista de
// publicaciones que existe. Las pantallas no tienen su propia lista: le piden
// la lista al depósito. Por eso, si cambio algo en el depósito, el cambio se ve
// en TODAS las pantallas a la vez, sin que yo tenga que avisarle a cada una.
//
// PARA EXPONER (esto es lo importante, se llama "estado elevado" o lifting state up):
//
//   App.tsx  ←  acá viven "posteos" + las funciones toggleLike y agregarComentario
//     │
//     └─> NavegadorRaiz         (los recibe y los reparte)
//           ├─> TabsPrincipales ──> Feed    ──> PostCard
//           │                   └─> Perfil  ──> ItemGrilla
//           └─> DetallePost
//
//   * Los DATOS BAJAN por props  → le paso "posteos" a las pantallas.
//   * Los AVISOS SUBEN por funciones → la pantalla no cambia nada por su cuenta,
//     me avisa ("che, tocaron el corazón") llamando a onToggleLike, y el cambio
//     lo hago yo acá arriba.
//
//   Ejemplo concreto para decir en voz alta: "si doy like en el Feed y después
//   entro al detalle de esa misma foto, ya aparece con el corazón rojo. No es
//   magia: es que las dos pantallas están mirando el mismo dato."

import { useEffect, useState } from 'react';
// axios es una librería para pedirle información a internet (a una API).
// Se podría usar fetch, que ya viene incluido, pero axios es más cómodo:
// convierte la respuesta a objeto JavaScript solo, sin que yo tenga que pedirlo.
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
// SafeAreaProvider mide los "bordes peligrosos" del celular (el notch de arriba,
// la barrita de abajo del iPhone) para que el contenido no quede tapado.
import { SafeAreaProvider } from 'react-native-safe-area-context';
// GestureHandlerRootView lo necesita react-navigation por debajo para que
// funcionen los gestos (deslizar con el dedo para cerrar una pantalla).
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import NavegadorRaiz from './src/navegacion/NavegadorRaiz';
import { usuarioLogueado } from './src/data/dataDeUsuario';
// Los datos inventados (los autores y los comentarios de ejemplo) están en
// src/data. Los saqué de acá para que este archivo tenga SOLO lógica y no
// doscientas líneas de texto de relleno.
import { AUTORES, COMENTARIOS_INICIALES } from './src/data/datosDePosteos';
// "import type" trae solamente la FORMA de los datos, no código de verdad.
// Los tipos de TypeScript no existen cuando la app está corriendo: son un
// control que se hace mientras programo. Por eso esta línea entera desaparece
// del archivo final y no pesa ni un byte.
import type { ImagenDeLaApi, Post } from './src/tipos';

// Le digo a Expo: "no escondas la pantalla de carga (el logo inicial) por tu
// cuenta, yo te voy a avisar cuándo". Si no hiciera esto, la pantalla de carga
// se iría antes de que la app esté lista y se vería un parpadeo en blanco.
SplashScreen.preventAutoHideAsync();

export default function App() {
  // ── EL ESTADO ──────────────────────────────────────────────────────────────
  // useState es la "memoria" de un componente de React. Devuelve DOS cosas:
  //   1) posteos     → el valor guardado ahora mismo (arranca como lista vacía)
  //   2) setPosteos  → la única función habilitada para cambiar ese valor
  //
  // ¿Por qué no uso una variable normal? Porque si hago "posteos = otraCosa",
  // React no se entera y la pantalla no se vuelve a dibujar. En cambio, cuando
  // llamo a setPosteos, React dice "ah, cambió algo" y redibuja todo lo que
  // dependa de ese dato. A eso se le dice "re-render".
  //
  // El <Post[]> entre los signos es TypeScript: le aviso que acá va a haber una
  // lista de Post. Sin eso, al arrancar vacía TypeScript creería que es una
  // lista de nada y me marcaría error apenas intente meterle publicaciones.
  const [posteos, setPosteos] = useState<Post[]>([]);

  // ── TRAER LAS FOTOS DE INTERNET ────────────────────────────────────────────
  // useEffect sirve para hacer cosas que NO son dibujar: pedir datos a una API,
  // arrancar un temporizador, etc. Se ejecuta DESPUÉS de que la pantalla se
  // dibujó por primera vez.
  //
  // Ese [] vacío del final es clave: es la "lista de dependencias" y significa
  // "ejecutá esto UNA sola vez, cuando la app arranca, y nunca más". Si no lo
  // pusiera, se ejecutaría en cada re-render y quedaría pidiendo fotos para
  // siempre en un bucle infinito.
  useEffect(() => {
    // Una función "async" es una función que sabe esperar. La necesito porque
    // pedirle fotos a internet tarda, y no quiero que la app se congele mientras.
    async function traerGatos() {
      // try/catch = "intentá esto, y si explota no rompas todo".
      // Si no hay internet o la API está caída, en vez de que la app se cierre,
      // cae en el catch y solo muestra un error por consola.
      try {
        // await = "esperá acá hasta que llegue la respuesta, después seguí".
        // El <ImagenDeLaApi[]> le avisa a axios qué forma tiene lo que va a
        // llegar, así respuesta.data queda tipado y el editor me autocompleta.
        const respuesta = await axios.get<ImagenDeLaApi[]>('https://api.thecatapi.com/v1/images/search', {
          // params se agrega solo al final de la dirección: ...search?limit=12
          // Pido exactamente tantas fotos como autores inventados tengo (12),
          // así a cada foto le toca un autor distinto y no se repite ninguno.
          params: { limit: AUTORES.length },
        });

        // ── ACÁ ARMO LAS PUBLICACIONES ──────────────────────────────────────
        // La API de gatos solo me da una id y una url. Todo lo demás (usuario,
        // ubicación, caption, likes) lo invento yo y lo pego acá.
        //
        // .map() recorre una lista y devuelve una lista NUEVA, del mismo largo,
        // con cada elemento transformado. Entra una foto pelada, sale una
        // publicación completa de Instagram.
        //
        // "index" es la posición dentro de la lista (0, 1, 2...). Con ella
        // agarro el autor de esa MISMA posición: la foto 0 le toca a
        // michi_lover, la foto 1 a gato_curioso, y así.
        const posteosGenerados: Post[] = respuesta.data.map((imagen, index) => {
          const autor = AUTORES[index];

          return {
            id: imagen.id,
            url: imagen.url,
            // pravatar es una página que da fotos de perfil de mentira.
            // Le paso un número distinto a cada uno para que no se repitan.
            avatar: `https://i.pravatar.cc/150?img=${index + 1}`,
            usuario: autor.usuario,
            ubicacion: autor.ubicacion,
            caption: autor.caption,
            // Un número entero al azar entre 50 y 549, para que cada foto
            // arranque con una cantidad de likes distinta y parezca real.
            likes: Math.floor(Math.random() * 500) + 50,
            liked: false, // ninguna arranca con mi like puesto
            // Los [...] hacen una COPIA de la lista de comentarios.
            // Si le pasara la lista original a las 12 publicaciones, las 12
            // compartirían la misma, y al comentar en una aparecería el
            // comentario en todas. Con la copia, cada una tiene la suya.
            comentarios: [...COMENTARIOS_INICIALES],
          };
        });

        // Guardo las publicaciones en el estado. Este es el momento exacto en
        // el que el spinner de "Cargando..." desaparece y se dibuja el feed.
        setPosteos(posteosGenerados);
      } catch (error) {
        console.error('Error al traer los gatos:', error);
      }
    }

    // La declaré arriba pero no se ejecuta sola: acá es donde la llamo.
    traerGatos();
  }, []);

  // ── FUNCIÓN 1: DAR O SACAR EL LIKE ─────────────────────────────────────────
  // Recibe el id de la publicación que tocaron. Si no tenía like se lo pone, y
  // si ya lo tenía se lo saca (por eso se llama "toggle": es un interruptor).
  //
  // Lo de ": string" y ": void" es TypeScript: el primero dice que el parámetro
  // es un texto, el segundo que la función no devuelve nada (solo hace cosas).
  function toggleLike(id: string): void {
    // REGLA DE ORO DE REACT: nunca modifico la lista original, siempre creo
    // una nueva. React compara "¿es el mismo objeto de antes?" para decidir si
    // redibuja. Si le cambio cosas adentro al original, sigue siendo el mismo
    // objeto, React no nota la diferencia y la pantalla no se actualiza.
    //
    // Cuando a setPosteos le paso una función, React me entrega la lista tal
    // como está en este instante (posteosActuales) y se queda con lo que yo
    // devuelva como lista nueva.
    setPosteos((posteosActuales) =>
      posteosActuales.map((post) => {
        // Si no es la publicación que busco, la devuelvo intacta.
        if (post.id !== id) return post;

        // Y si es la que busco, devuelvo una COPIA con los cambios.
        // Los "..." (spread) copian todas las propiedades del post original
        // (url, usuario, caption...) y después yo piso solo las dos que quiero.
        return {
          ...post,
          liked: !post.liked, // el "!" da vuelta el booleano: true↔false
          // Si ya estaba likeado, resto uno (le estoy sacando el like).
          // Si no, sumo uno. Esto es un "ternario": condición ? si : si no.
          likes: post.liked ? post.likes - 1 : post.likes + 1,
        };
      })
    );
  }

  // ── FUNCIÓN 2: AGREGAR UN COMENTARIO ───────────────────────────────────────
  // Está acá arriba y no adentro de DetallePost por el mismo motivo que la
  // anterior: "posteos" es el único lugar donde viven los datos, así que el
  // cambio se ve en todas las pantallas a la vez. Gracias a esto, el cartel
  // "Ver los N comentarios" del Feed se actualiza solo cuando comento.
  function agregarComentario(id: string, texto: string): void {
    // .trim() saca los espacios de los costados. Si el usuario solo apretó la
    // barra espaciadora, acá queda un texto vacío y corto la función.
    const textoLimpio = texto.trim();
    if (textoLimpio === '') return;

    setPosteos((posteosActuales) =>
      posteosActuales.map((post) => {
        if (post.id !== id) return post;

        const comentarioNuevo = {
          // Date.now() devuelve los milisegundos transcurridos desde 1970.
          // Lo uso como id porque es un número distinto cada vez que se llama,
          // o sea, nunca se me van a repetir dos ids.
          id: Date.now(),
          usuario: usuarioLogueado.usuario, // siempre comento yo, no hay login
          texto: textoLimpio,
        };

        // Devuelvo una copia del post, con una lista de comentarios NUEVA:
        // los que ya estaban (...) más el nuevo pegado al final.
        // No uso .push() porque push modifica la lista original y, como decía
        // arriba, React no se enteraría del cambio.
        return { ...post, comentarios: [...post.comentarios, comentarioNuevo] };
      })
    );
  }

  // ── LO QUE SE DIBUJA ───────────────────────────────────────────────────────
  // Estos tres componentes de afuera son "envoltorios": no se ven en pantalla,
  // pero le dan servicios a todo lo que tienen adentro.
  return (
    // onLayout se dispara en el instante en que este View termina de medirse,
    // o sea, cuando la app ya está lista para mostrarse. Recién ahí escondo la
    // pantalla de carga, para que no se vea ningún parpadeo blanco en el medio.
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={() => SplashScreen.hideAsync()}>
      <SafeAreaProvider>
        {/* La barra de arriba del celular (hora, señal, batería).
            style="dark" pone esos iconitos en oscuro, porque mi fondo es blanco
            y si quedaran blancos no se verían. */}
        <StatusBar style="dark" />

        {/* Acá es donde le entrego el depósito al resto de la app:
            los datos (posteos) y las dos funciones para modificarlos. */}
        <NavegadorRaiz
          posteos={posteos}
          onToggleLike={toggleLike}
          onAgregarComentario={agregarComentario}
        />
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
