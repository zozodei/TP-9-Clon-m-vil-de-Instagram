// createBottomTabNavigator: la función que arma la navegación por pestañas de abajo
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedPantalla from '../pantallas/Feed';
import PerfilPantalla from '../pantallas/Perfil';
import { colores } from '../colores';

// Tab es un objeto con dos componentes adentro: Tab.Navigator (el contenedor)
// y Tab.Screen (cada pestaña individual)
const Tab = createBottomTabNavigator();

// TabsPrincipales es la navegación de "primer nivel": los botones de abajo, como en Instagram.
// Recibe "posteos" y "onToggleLike" por props (vienen de App.js a través de NavegadorRaiz)
// y se los tiene que volver a pasar a cada pantalla, porque React Navigation no lo hace solo.
const TabsPrincipales = ({ posteos, onToggleLike }) => {
  return (
    <Tab.Navigator
      // screenOptions se aplica a TODAS las pestañas de este navigator (a menos que
      // una pestaña puntual lo pise con sus propias "options")
      screenOptions={({ route }) => ({
        headerShown: false, // no queremos el header automático de React Navigation, ya tenemos el nuestro en Feed
        tabBarShowLabel: false, // solo mostramos los iconitos, sin el texto "Feed"/"Perfil" abajo
        tabBarActiveTintColor: colores.textoPrincipal, // color del ícono cuando esa pestaña está activa
        tabBarInactiveTintColor: colores.textoSecundario, // color cuando NO está activa
        tabBarStyle: { borderTopColor: colores.borde }, // línea separadora arriba de la barra de tabs
        // tabBarIcon define qué ícono mostrar en cada pestaña. Recibe color/size (ya calculados
        // por React Navigation) y "focused" (true si es la pestaña que está activa ahora mismo)
        tabBarIcon: ({ color, size, focused }) => {
          // un ícono relleno cuando está activa, uno de línea ("outline") cuando no
          const iconos = {
            Feed: focused ? 'home' : 'home-outline',
            Perfil: focused ? 'person-circle' : 'person-circle-outline',
          };
          // route.name es el nombre de la pestaña actual ("Feed" o "Perfil"),
          // lo usamos para buscar en el objeto de arriba qué ícono le toca
          return <Ionicons name={iconos[route.name]} size={size} color={color} />;
        },
      })}
    >
      {/* en vez de "component={FeedPantalla}" (que no permite mandar props extra),
          usamos la forma de "función hija": recibe las props que arma React Navigation
          (navigation, route) y les agregamos nosotros "posteos" y "onToggleLike" */}
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
