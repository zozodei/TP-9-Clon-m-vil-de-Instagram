// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  TabsPrincipales.tsx  —  LAS PESTAÑAS DE ABAJO                              ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// La barra de navegación de abajo, la de los iconitos, igual que en Instagram.
// Tiene dos pestañas: la casita (Feed) y el monigote (Perfil).
//
// DATO PARA LA EXPOSICIÓN: este componente no hace NADA con los datos. Recibe
// "posteos" de NavegadorRaiz y se los entrega tal cual a Feed y a Perfil. Es un
// pasamanos puro.
//
// ¿Y por qué existe entonces? Porque React Navigation no reenvía props a las
// pantallas por su cuenta: si yo no las agarro acá en el medio y las vuelvo a
// pasar, los datos se cortan en este punto y nunca llegan abajo. A ese "tener
// que pasar props por capas que ni las usan" se le dice prop drilling, y es el
// precio de no usar una herramienta más grande como Context o Redux. Para una
// app de este tamaño, no valía la pena complicarla.

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// Ionicons es un paquete de íconos que ya viene con Expo: no tengo que
// descargar ninguna imagen, le pido el ícono por su nombre y listo.
import { Ionicons } from '@expo/vector-icons';
import FeedPantalla from '../pantallas/Feed';
import PerfilPantalla from '../pantallas/Perfil';
import { colores } from '../estilos/tema';
import type { Post } from '../tipos';
import type { ParamsDeTabs } from './tipos';

// Fabrico el navegador de pestañas, igual que hice con el Stack.
const Tab = createBottomTabNavigator<ParamsDeTabs>();

type Props = {
  posteos: Post[];
  onToggleLike: (id: string) => void;
};

// ── UN TRUQUITO DE TYPESCRIPT ────────────────────────────────────────────────
// Ionicons no acepta cualquier texto como nombre de ícono: solo los que existen
// de verdad en el paquete. Si escribo 'hom' en vez de 'home', no explota nada,
// simplemente no se dibuja nada y me quedo mirando un hueco sin entender.
//
// "keyof typeof Ionicons.glyphMap" significa, leído al revés:
//   Ionicons.glyphMap → el objeto con todos los íconos disponibles
//   typeof            → dame la forma de ese objeto
//   keyof             → y ahora dame solo la lista de sus nombres
//
// O sea: esto es la lista completa de nombres de ícono válidos. Guardándola en
// un tipo, el error me salta en el editor en vez de en la pantalla.
type NombreDeIcono = keyof typeof Ionicons.glyphMap;

// Qué ícono le toca a cada pestaña, en sus dos versiones: relleno cuando está
// seleccionada y de línea (outline) cuando no.
//
// Está acá AFUERA del componente a propósito: es un valor que nunca cambia, y
// si lo pusiera adentro se volvería a crear de cero en cada render, al pedo.
//
// Escribo los dos nombres completos en vez de pegarle '-outline' al final con
// código, justamente para que TypeScript pueda verificar que ambos existan.
//
// Record<A, B> se lee: "un objeto cuyas claves son A y cuyos valores son B".
// Acá: las claves son los nombres de las pestañas (Feed y Perfil, sacados del
// mapa de navegación) y los valores son el par de íconos de cada una.
const ICONOS: Record<keyof ParamsDeTabs, { activo: NombreDeIcono; inactivo: NombreDeIcono }> = {
  Feed: { activo: 'home', inactivo: 'home-outline' },
  Perfil: { activo: 'person-circle', inactivo: 'person-circle-outline' },
};

const TabsPrincipales = ({ posteos, onToggleLike }: Props) => {
  return (
    <Tab.Navigator
      // screenOptions configura TODAS las pestañas de una. Le paso una función
      // porque necesito saber de qué pestaña se trata en cada caso: la librería
      // me entrega "route", y route.name me dice si es 'Feed' o 'Perfil'.
      screenOptions={({ route }) => ({
        headerShown: false,    // sin barra de título: el Feed ya tiene la suya
        tabBarShowLabel: false, // solo los iconitos, sin el texto debajo
        tabBarActiveTintColor: colores.textoPrincipal,   // color de la pestaña activa
        tabBarInactiveTintColor: colores.textoSecundario, // color de la otra
        tabBarStyle: { borderTopColor: colores.borde },
        // Esta función dibuja el ícono. La librería me pasa tres cosas:
        //   color   → el color que corresponde según esté activa o no
        //   size    → el tamaño estándar de la barra
        //   focused → true si ESTA es la pestaña en la que estoy parada
        // Con "focused" elijo entre el ícono relleno y el de línea.
        tabBarIcon: ({ color, size, focused }) => (
          <Ionicons
            name={focused ? ICONOS[route.name].activo : ICONOS[route.name].inactivo}
            size={size}
            color={color}
          />
        ),
      })}
    >
      {/* Las dos pestañas usan la "forma 2" (función hija) que está explicada en
          detalle en NavegadorRaiz.tsx: es la única manera de pasarle props mías
          a una pantalla.

          Fijate que Perfil NO recibe onToggleLike: es a propósito. Desde la
          grilla del perfil no se puede dar like, hay que entrar al detalle.
          Si una pantalla no necesita algo, no se lo paso. */}
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
