import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedPantalla from '../pantallas/Feed';
import PerfilPantalla from '../pantallas/Perfil';
import { colores } from '../estilos/tema';

const Tab = createBottomTabNavigator();

// qué ícono le toca a cada pestaña. Va acá afuera porque es siempre igual:
// adentro del componente se volvería a crear en cada render, al pedazo
const ICONOS = {
  Feed: 'home',
  Perfil: 'person-circle',
};

// la navegación por pestañas de abajo, como en Instagram.
// Recibe posteos/onToggleLike desde NavegadorRaiz y se los pasa a cada pantalla,
// porque React Navigation no reenvía props por su cuenta.
const TabsPrincipales = ({ posteos, onToggleLike }) => {
  return (
    <Tab.Navigator
      // screenOptions se aplica a todas las pestañas de este navigator
      screenOptions={({ route }) => ({
        headerShown: false, // ya tenemos nuestro propio header adentro del Feed
        tabBarShowLabel: false, // solo los iconitos, sin el texto abajo
        tabBarActiveTintColor: colores.textoPrincipal,
        tabBarInactiveTintColor: colores.textoSecundario,
        tabBarStyle: { borderTopColor: colores.borde },
        // "focused" es true si esta es la pestaña activa: le ponemos el ícono relleno,
        // y a las demás la versión de línea, agregándole "-outline" al nombre
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? ICONOS[route.name] : `${ICONOS[route.name]}-outline`}
            size={size}
            color={color}
          />
        ),
      })}
    >
      {/* usamos la forma de "función hija" en vez de component={FeedPantalla}
          porque es la única que nos deja pasarle props nuestras a la pantalla */}
      <Tab.Screen name="Feed">
        {(props) => <FeedPantalla {...props} posteos={posteos} onToggleLike={onToggleLike} />}
      </Tab.Screen>
      <Tab.Screen name="Perfil">
        {(props) => <PerfilPantalla {...props} posteos={posteos} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
};

export default TabsPrincipales;
