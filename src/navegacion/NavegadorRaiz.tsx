// NavigationContainer envuelve TODA la navegación de la app, una sola vez: guarda en qué
// pantalla está el usuario y maneja el botón "atrás" físico de Android
import { NavigationContainer } from '@react-navigation/native';
// un stack es una navegación de "pila": una pantalla se apila arriba de la otra
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsPrincipales from './TabsPrincipales';
import DetallePostPantalla from '../pantallas/DetallePost';
import VisorHistoriaPantalla from '../pantallas/VisorHistoria';
import { colores } from '../estilos/tema';

const Stack = createNativeStackNavigator();

// el navegador de más arriba de la app: los Tabs (Feed/Perfil), y encima de ellos
// el detalle de un posteo y el visor de historias.
// Recibe los datos y las funciones de App.js y los reparte hacia abajo.
const NavegadorRaiz = ({ posteos, onToggleLike, onAgregarComentario }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

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
          {/* "props" trae navigation y route (con los parámetros que mandamos al navegar),
              y nosotros le sumamos los datos y las funciones */}
          {(props) => (
            <DetallePostPantalla
              {...props}
              posteos={posteos}
              onToggleLike={onToggleLike}
              onAgregarComentario={onAgregarComentario}
            />
          )}
        </Stack.Screen>

        {/* acá sí usamos component={...}, la forma corta: no necesitamos pasarle props
            extra porque la historia viaja como parámetro de navegación */}
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
