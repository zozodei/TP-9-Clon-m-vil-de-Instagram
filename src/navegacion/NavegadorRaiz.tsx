// NavigationContainer envuelve TODA la navegación de la app, una sola vez: guarda en qué
// pantalla está el usuario y maneja el botón "atrás" físico de Android
import { NavigationContainer } from '@react-navigation/native';
// un stack es una navegación de "pila": una pantalla se apila arriba de la otra
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsPrincipales from './TabsPrincipales';
import DetallePostPantalla from '../pantallas/DetallePost';
import VisorHistoriaPantalla from '../pantallas/VisorHistoria';
import { colores } from '../estilos/tema';
import type { Post } from '../tipos';
import type { ParamsDelStack } from './tipos';

// el <ParamsDelStack> conecta el navegador con la lista de pantallas y parámetros
// de tipos.ts: desde acá, name="DetallePost" está verificado contra esa lista
const Stack = createNativeStackNavigator<ParamsDelStack>();

// lo que este navegador recibe de App.tsx
type Props = {
  posteos: Post[];
  onToggleLike: (id: string) => void;
  onAgregarComentario: (id: string, texto: string) => void;
};

// el navegador de más arriba de la app: los Tabs (Feed/Perfil), y encima de ellos
// el detalle de un posteo y el visor de historias.
// Recibe los datos y las funciones de App.tsx y los reparte hacia abajo.
//
// OJO con las dos formas de declarar una pantalla, porque acá usamos las dos:
//
//   1) <Stack.Screen name="X" component={Pantalla} />      ← la forma corta
//      React Navigation crea la pantalla solo, y le pasa navigation y route.
//      Sirve cuando la pantalla NO necesita nada nuestro.
//
//   2) <Stack.Screen name="X">{(props) => <Pantalla {...props} dato={dato} />}</Stack.Screen>
//      Acá la creamos nosotros. React Navigation nos da navigation y route juntos
//      en "props", los reenviamos con {...props} y encima le sumamos lo nuestro.
//      Es la única forma de pasarle props propias a una pantalla.
const NavegadorRaiz = ({ posteos, onToggleLike, onAgregarComentario }: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* forma 2. Acá ni siquiera usamos "props": los Tabs no necesitan navigation,
            solo hacen de intermediarios para que los datos lleguen a Feed y Perfil */}
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {() => <TabsPrincipales posteos={posteos} onToggleLike={onToggleLike} />}
        </Stack.Screen>

        <Stack.Screen
          name="DetallePost"
          options={{
            presentation: 'modal', // se desliza desde abajo tapando todo
            title: 'Publicación',
            headerStyle: { backgroundColor: colores.fondo },
            headerTintColor: colores.textoPrincipal,
          }}
        >
          {/* forma 2 completa: {...props} le pasa navigation y route (donde viaja el
              postId que mandamos al navegar), y encima le sumamos lo que viene de App.tsx */}
          {(props) => (
            <DetallePostPantalla
              {...props}
              posteos={posteos}
              onToggleLike={onToggleLike}
              onAgregarComentario={onAgregarComentario}
            />
          )}
        </Stack.Screen>

        {/* forma 1, la corta: no necesitamos pasarle nada nuestro porque la historia
            entera viaja como parámetro de navegación, dentro de route */}
        <Stack.Screen
          name="VisorHistoria"
          component={VisorHistoriaPantalla}
          options={{
            headerShown: false, // la historia ocupa toda la pantalla
            presentation: 'fullScreenModal', // tapa todo, incluida la barra de tabs
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorRaiz;
