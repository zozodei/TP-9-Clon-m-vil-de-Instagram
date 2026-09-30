//   1) Guarda los posteos en un estado y los trae de The Cat API al arrancar.
//   2) Tiene las funciones para dar like y comentar (las pantallas solo las llaman).
//   3) Define la navegación: en la web cambiaba de vista con un useState,
//      acá eso lo hace React Navigation con pestañas (Tabs) y pantallas apiladas (Stack).
import { useEffect, useState } from 'react';
import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import Feed from './src/componentes/Feed';
import Perfil from './src/componentes/Perfil';
import DetallePost from './src/componentes/DetallePost';
import VisorHistoria from './src/componentes/VisorHistoria';
import { usuarioLogueado } from './src/data/dataDeUsuario';
import { AUTORES, COMENTARIOS_INICIALES } from './src/data/datosDePosteos';
import { colores } from './src/estilos/tema';
import type { ImagenDeLaApi, ParamsDelStack, Post } from './src/tipos';

// Stack: pantallas que se abren una encima de otra, como una pila de hojas
// (el detalle y la historia se apilan sobre las pestañas y al cerrarlas se sacan).
// Tab: la barra de abajo con Feed y Perfil.
// El <ParamsDelStack> le dice a TypeScript qué pantallas existen y qué datos recibe cada una.
const Stack = createNativeStackNavigator<ParamsDelStack>();
const Tab = createBottomTabNavigator();

export default function App() {
  // useState guarda un dato que, cuando cambia con setPosteos, hace que React
  // vuelva a dibujar la pantalla. Arranca como lista vacía.
  const [posteos, setPosteos] = useState<Post[]>([]);

  // useEffect con [] al final se ejecuta UNA sola vez, cuando la app arranca.
  // Acá se usa para pedir las fotos a la API.
  useEffect(() => {
    // async/await: espera la respuesta de internet sin congelar la app.
    async function traerGatos() {
      // try/catch: si falla (por ejemplo, sin internet) muestra el error y la app no se cierra.
      try {
        // Pido tantas fotos como autores tengo (12). params arma ...search?limit=12
        const respuesta = await axios.get<ImagenDeLaApi[]>('https://api.thecatapi.com/v1/images/search', {
          params: { limit: AUTORES.length },
        });

        // La API solo da la id y la url de la foto. El resto (usuario, caption,
        // likes...) lo completo con los datos inventados de AUTORES.
        // .map recorre las fotos y por cada una arma un posteo completo.
        // index es la posición (0, 1, 2...): la foto 0 va con el autor 0, etc.
        const posteosGenerados: Post[] = respuesta.data.map((imagen, index) => ({
          id: imagen.id,
          url: imagen.url,
          avatar: `https://i.pravatar.cc/150?img=${index + 1}`, // foto de perfil de prueba
          usuario: AUTORES[index].usuario,
          ubicacion: AUTORES[index].ubicacion,
          caption: AUTORES[index].caption,
          likes: Math.floor(Math.random() * 500) + 50, // número al azar entre 50 y 549
          liked: false,
          // [...] hace una copia, así cada posteo tiene su propia lista de
          // comentarios y comentar en uno no lo agrega en todos.
          comentarios: [...COMENTARIOS_INICIALES],
        }));

        // Guardo los posteos en el estado: acá desaparece el "Cargando..." y se ve el feed.
        setPosteos(posteosGenerados);
      } catch (error) {
        console.error('Error al traer los gatos:', error);
      }
    }

    traerGatos();
  }, []);

  // Da o saca el like del posteo con ese id y ajusta el contador.
  // En React nunca se modifica el estado directo: se crea una lista nueva.
  // .map devuelve la misma lista, pero reemplazando solo el posteo tocado por
  // una copia ({ ...post }) con liked invertido y likes +1 o -1.
  function toggleLike(id: string) {
    setPosteos((actuales) =>
      actuales.map((post) =>
        post.id === id
          ? { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 }
          : post
      )
    );
  }

  // Agrega un comentario mío al final de la lista de comentarios del posteo.
  function agregarComentario(id: string, texto: string) {
    // .trim() saca los espacios: si solo escribió espacios, no hago nada.
    if (texto.trim() === '') return;

    // Date.now() da un número distinto cada vez, lo uso como id único.
    const nuevo = { id: Date.now(), usuario: usuarioLogueado.usuario, texto: texto.trim() };

    // Igual que en toggleLike: copia del posteo con una lista de comentarios
    // nueva (los que había + el nuevo). No uso push porque modifica el original
    // y React no se daría cuenta del cambio.
    setPosteos((actuales) =>
      actuales.map((post) =>
        post.id === id ? { ...post, comentarios: [...post.comentarios, nuevo] } : post
      )
    );
  }

  return (
    // SafeAreaProvider: mide el notch y la barra de abajo del celular para que
    // los SafeAreaView de cada pantalla sepan cuánto espacio dejar.
    <SafeAreaProvider>
      {/* Barra de arriba del celular (hora, batería) con íconos oscuros */}
      <StatusBar style="dark" />

      {/* NavigationContainer envuelve toda la navegación, va una sola vez */}
      <NavigationContainer>
        <Stack.Navigator>
          {/* Pantalla base: las pestañas de abajo (Feed y Perfil).
              Uso una función hija {() => ...} en vez de component={...}
              porque es la forma de pasarle props (posteos) a la pantalla. */}
          <Stack.Screen name="Tabs" options={{ headerShown: false }}>
            {() => (
              <Tab.Navigator
                screenOptions={{
                  headerShown: false,      // sin barra de título (el Feed tiene su propio header)
                  tabBarShowLabel: false,  // solo íconos, sin texto
                  tabBarActiveTintColor: colores.textoPrincipal,
                  tabBarInactiveTintColor: colores.textoSecundario,
                }}
              >
                <Tab.Screen
                  name="Feed"
                  options={{
                    // focused = true si es la pestaña activa → ícono relleno
                    tabBarIcon: ({ color, size, focused }) => (
                      <Ionicons name={focused ? 'home' : 'home-outline'} size={size} color={color} />
                    ),
                  }}
                >
                  {() => <Feed posteos={posteos} onToggleLike={toggleLike} />}
                </Tab.Screen>

                <Tab.Screen
                  name="Perfil"
                  options={{
                    tabBarIcon: ({ color, size, focused }) => (
                      <Ionicons name={focused ? 'person-circle' : 'person-circle-outline'} size={size} color={color} />
                    ),
                  }}
                >
                  {/* Perfil no recibe onToggleLike: desde la grilla no se da like */}
                  {() => <Perfil posteos={posteos} />}
                </Tab.Screen>
              </Tab.Navigator>
            )}
          </Stack.Screen>

          {/* Detalle de un posteo (es el PostModal de la versión web).
              presentation: 'modal' hace que suba desde abajo.
              Recibe solo el id (route.params.postId) y busca el posteo en el
              estado con .find(), así siempre muestra los likes y comentarios actualizados. */}
          <Stack.Screen name="DetallePost" options={{ presentation: 'modal', title: 'Publicación' }}>
            {({ route }) => (
              <DetallePost
                post={posteos.find((p) => p.id === route.params.postId)}
                onToggleLike={toggleLike}
                onAgregarComentario={agregarComentario}
              />
            )}
          </Stack.Screen>

          {/* Historia a pantalla completa. La historia llega entera en route.params.
              navigation.goBack() cierra esta pantalla y vuelve a la anterior. */}
          <Stack.Screen
            name="VisorHistoria"
            options={{ headerShown: false, presentation: 'fullScreenModal' }}
          >
            {({ route, navigation }) => (
              <VisorHistoria historia={route.params.historia} onCerrar={() => navigation.goBack()} />
            )}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
