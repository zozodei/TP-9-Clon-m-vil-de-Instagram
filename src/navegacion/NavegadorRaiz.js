// NavigationContainer: tiene que envolver TODA la navegación de la app, una sola vez (es el "motor")
import { NavigationContainer } from '@react-navigation/native';
// createNativeStackNavigator: arma una navegación de "pila" (una pantalla se apila arriba de otra)
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsPrincipales from './TabsPrincipales';
import DetallePostPantalla from '../pantallas/DetallePost';
import { colores } from '../colores';

const Stack = createNativeStackNavigator();

// NavegadorRaiz es el navegador de más arriba de toda la app.
// Tiene dos "pantallas": los Tabs principales (Feed/Perfil) y DetallePost,
// que se abre encima de todo como una ventana modal.
// Recibe posteos/onToggleLike por props desde App.js y los reenvía hacia abajo.
const NavegadorRaiz = ({ posteos, onToggleLike }) => {
  return (
    // NavigationContainer guarda por dentro en qué pantalla está el usuario
    // y maneja el botón "atrás" físico de Android automáticamente
    <NavigationContainer>
      <Stack.Navigator>

        {/* la primera pantalla del stack son los Tabs. headerShown: false porque
            ya tenemos nuestro propio header adentro de Feed */}
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {/* acá no hace falta recibir "props" porque TabsPrincipales no necesita
              navigation/route propios, solo los datos que le pasamos nosotros */}
          {() => <TabsPrincipales posteos={posteos} onToggleLike={onToggleLike} />}
        </Stack.Screen>

        {/* la segunda pantalla del stack: el detalle de un posteo */}
        <Stack.Screen
          name="DetallePost"
          options={{
            presentation: 'modal', // hace que la pantalla se deslice desde abajo, tapando todo (como un modal)
            title: 'Publicación', // el texto que aparece en el header nativo de esta pantalla
            headerStyle: { backgroundColor: colores.fondo }, // color de fondo de ese header
            headerTintColor: colores.textoPrincipal, // color del texto/flecha de "volver" del header
          }}
        >
          {/* acá SÍ usamos "props" (que trae navigation y route, con los parámetros
              que mandamos con navigate) y le agregamos posteos/onToggleLike encima */}
          {(props) => (
            <DetallePostPantalla {...props} posteos={posteos} onToggleLike={onToggleLike} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorRaiz;
