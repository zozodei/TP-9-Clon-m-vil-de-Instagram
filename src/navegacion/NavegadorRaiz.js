import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsPrincipales from './TabsPrincipales';
import DetallePostPantalla from '../pantallas/DetallePost';
import { colores } from '../colores';

const Stack = createNativeStackNavigator();

// navegador de más arriba: los tabs principales + el detalle de un posteo
// como pantalla modal encima de todo (Stack Navigator, como pide la
// consigna). posteos/onToggleLike bajan por props hasta acá desde App.js.
const NavegadorRaiz = ({ posteos, onToggleLike }) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {() => <TabsPrincipales posteos={posteos} onToggleLike={onToggleLike} />}
        </Stack.Screen>

        <Stack.Screen
          name="DetallePost"
          options={{
            presentation: 'modal',
            title: 'Publicación',
            headerStyle: { backgroundColor: colores.fondo },
            headerTintColor: colores.textoPrincipal,
          }}
        >
          {(props) => (
            <DetallePostPantalla {...props} posteos={posteos} onToggleLike={onToggleLike} />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorRaiz;
