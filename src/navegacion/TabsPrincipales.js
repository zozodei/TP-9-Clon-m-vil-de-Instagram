import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedPantalla from '../pantallas/Feed';
import PerfilPantalla from '../pantallas/Perfil';
import { colores } from '../colores';

const Tab = createBottomTabNavigator();

// navegación principal de la app (los botones de abajo, como en Instagram).
// posteos y onToggleLike vienen de App.js y se los reenviamos a cada
// pantalla por props, sin usar Context: mismo criterio que en el TP web,
// donde todo el estado vivía en App.tsx y bajaba por props.
const TabsPrincipales = ({ posteos, onToggleLike }) => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: colores.textoPrincipal,
        tabBarInactiveTintColor: colores.textoSecundario,
        tabBarStyle: { borderTopColor: colores.borde },
        tabBarIcon: ({ color, size, focused }) => {
          const iconos = {
            Feed: focused ? 'home' : 'home-outline',
            Perfil: focused ? 'person-circle' : 'person-circle-outline',
          };
          return <Ionicons name={iconos[route.name]} size={size} color={color} />;
        },
      })}
    >
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
