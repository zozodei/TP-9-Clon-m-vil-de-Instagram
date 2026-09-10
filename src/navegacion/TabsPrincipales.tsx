import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import FeedPantalla from '../pantallas/Feed';
import PerfilPantalla from '../pantallas/Perfil';
import { colores } from '../estilos/tema';
import type { Post } from '../tipos';
import type { ParamsDeTabs } from './tipos';

const Tab = createBottomTabNavigator<ParamsDeTabs>();

type Props = {
  posteos: Post[];
  onToggleLike: (id: string) => void;
};

// Ionicons no acepta cualquier texto como nombre de ícono: solo los que existen.
// "keyof typeof Ionicons.glyphMap" es justamente esa lista de nombres válidos, así que
// si escribimos 'hom' en vez de 'home' el error salta acá y no con un cuadrado vacío en pantalla
type NombreDeIcono = keyof typeof Ionicons.glyphMap;

// qué ícono le toca a cada pestaña, en su versión activa (relleno) e inactiva (de línea).
// Va acá afuera porque es siempre igual: adentro del componente se volvería a crear en cada render.
// Escribimos los dos nombres completos en vez de pegarle '-outline' al final, para que
// TypeScript pueda verificar que ambos existen de verdad.
const ICONOS: Record<keyof ParamsDeTabs, { activo: NombreDeIcono; inactivo: NombreDeIcono }> = {
  Feed: { activo: 'home', inactivo: 'home-outline' },
  Perfil: { activo: 'person-circle', inactivo: 'person-circle-outline' },
};

// la navegación por pestañas de abajo, como en Instagram.
//
// Este componente es solo un PASAMANOS: no usa "posteos" para nada, únicamente los
// recibe de NavegadorRaiz y se los entrega a Feed y a Perfil. Hace falta porque
// React Navigation no reenvía props a las pantallas por su cuenta.
const TabsPrincipales = ({ posteos, onToggleLike }: Props) => {
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
        // y a las demás la versión de línea
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? ICONOS[route.name].activo : ICONOS[route.name].inactivo}
            size={size}
            color={color}
          />
        ),
      })}
    >
      {/* la misma "forma 2" que está explicada en NavegadorRaiz.tsx: usamos función hija
          en vez de component={FeedPantalla} porque es la única que nos deja
          pasarle props nuestras a la pantalla. Perfil no recibe onToggleLike
          porque desde la grilla no se puede dar like, hay que entrar al detalle */}
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
