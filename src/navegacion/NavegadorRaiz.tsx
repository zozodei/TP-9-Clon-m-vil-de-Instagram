// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  NavegadorRaiz.tsx  —  EL NAVEGADOR DE MÁS AFUERA                           ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Define QUÉ PANTALLAS existen y CÓMO aparecen. Es el navegador de más arriba
// de la app: todo lo demás está adentro de él.
//
// Tiene tres pantallas:
//   1) Tabs          → las pestañas de abajo (Feed y Perfil). La pantalla base.
//   2) DetallePost   → se abre ENCIMA, subiendo desde abajo como una tarjeta.
//   3) VisorHistoria → se abre ENCIMA y tapa absolutamente todo, en negro.
//
// PARA EXPONER: "un stack es una pila de hojas. Abajo de todo están las
// pestañas, que siempre están. Cuando toco una foto, el detalle se apila encima.
// Cuando lo cierro, se saca esa hoja y vuelvo a donde estaba, en la misma
// posición del scroll, porque la pantalla de abajo nunca se destruyó."

// NavigationContainer envuelve TODA la navegación de la app, una sola vez.
// Es el que se acuerda en qué pantalla está el usuario y el que hace que el
// botón "atrás" físico de Android funcione.
import { NavigationContainer } from '@react-navigation/native';
// Esta función fabrica un navegador de tipo pila.
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabsPrincipales from './TabsPrincipales';
import DetallePostPantalla from '../pantallas/DetallePost';
import VisorHistoriaPantalla from '../pantallas/VisorHistoria';
import { colores } from '../estilos/tema';
import type { Post } from '../tipos';
import type { ParamsDelStack } from './tipos';

// Acá fabrico el navegador. El <ParamsDelStack> lo conecta con el mapa de
// pantallas de tipos.ts: gracias a eso, cuando más abajo escribo
// name="DetallePost", TypeScript verifica contra esa lista que el nombre exista.
const Stack = createNativeStackNavigator<ParamsDelStack>();

// Lo que este componente recibe de App.tsx.
// Las funciones se escriben así: (lo que recibe) => lo que devuelve.
// "(id: string) => void" = recibe un texto y no devuelve nada.
type Props = {
  posteos: Post[];
  onToggleLike: (id: string) => void;
  onAgregarComentario: (id: string, texto: string) => void;
};

// ⚠️ ACÁ HAY UN DETALLE IMPORTANTE PARA LA EXPOSICIÓN ⚠️
//
// Hay DOS formas de registrar una pantalla, y en este proyecto uso las dos:
//
//   FORMA 1 (la corta):
//       <Stack.Screen name="X" component={Pantalla} />
//   React Navigation crea la pantalla solo y le pasa navigation y route.
//   Sirve cuando la pantalla NO necesita nada mío.
//
//   FORMA 2 (con función hija):
//       <Stack.Screen name="X">
//         {(props) => <Pantalla {...props} dato={dato} />}
//       </Stack.Screen>
//   Acá la pantalla la creo yo. React Navigation me entrega navigation y route
//   juntos adentro de "props", yo los reenvío con {...props} y ENCIMA le sumo
//   mis propias props.
//
// ¿Por qué necesito la forma 2? Porque con component={Pantalla} no hay ningún
// lugar donde meter mis datos: la librería la crea y yo no participo. Y mis
// pantallas necesitan "posteos", que viene de App.tsx. Esta es la única forma
// de pasarle props propias a una pantalla.
const NavegadorRaiz = ({ posteos, onToggleLike, onAgregarComentario }: Props) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>

        {/* ── PANTALLA 1: las pestañas ──────────────────────────────────────
            Uso la forma 2, pero fijate que la función no recibe props: los Tabs
            no necesitan navigation, solo hacen de intermediarios para que los
            datos lleguen hasta Feed y Perfil.
            headerShown: false saca la barra de título de arriba, porque el Feed
            ya tiene su propio header con el logo "Instagram". */}
        <Stack.Screen name="Tabs" options={{ headerShown: false }}>
          {() => <TabsPrincipales posteos={posteos} onToggleLike={onToggleLike} />}
        </Stack.Screen>

        {/* ── PANTALLA 2: el detalle de una publicación ─────────────────── */}
        <Stack.Screen
          name="DetallePost"
          options={{
            // 'modal' hace que la pantalla suba deslizándose desde abajo,
            // como las tarjetas de iOS, en vez de entrar de costado.
            presentation: 'modal',
            title: 'Publicación', // el texto que aparece en la barra de arriba
            headerStyle: { backgroundColor: colores.fondo },
            headerTintColor: colores.textoPrincipal, // color de la flecha de volver
          }}
        >
          {/* Forma 2 completa. Leelo así:
              {...props}  → le reenvío lo de la librería: navigation y route
                            (adentro de route viaja el postId que mandé al navegar)
              y después le sumo los datos y funciones que bajaron de App.tsx. */}
          {(props) => (
            <DetallePostPantalla
              {...props}
              posteos={posteos}
              onToggleLike={onToggleLike}
              onAgregarComentario={onAgregarComentario}
            />
          )}
        </Stack.Screen>

        {/* ── PANTALLA 3: el visor de historias ─────────────────────────────
            Acá uso la FORMA 1, la corta, porque esta pantalla no necesita nada
            mío: la historia entera (foto y usuario) viaja como parámetro de
            navegación, o sea que le llega adentro de route. */}
        <Stack.Screen
          name="VisorHistoria"
          component={VisorHistoriaPantalla}
          options={{
            headerShown: false,              // la historia ocupa toda la pantalla
            presentation: 'fullScreenModal', // tapa todo, incluida la barra de pestañas
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default NavegadorRaiz;
