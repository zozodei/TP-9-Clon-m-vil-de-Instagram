// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  src/navegacion/tipos.ts  —  EL MAPA DE PANTALLAS                           ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// Es la lista de TODAS las pantallas que existen en la app y de qué información
// necesita recibir cada una para poder mostrarse.
//
// ¿PARA QUÉ SIRVE?
// Para moverme entre pantallas escribo:
//
//     navigation.navigate('DetallePost', { postId: '123' })
//
// Eso se lee: "llevame a la pantalla DetallePost y pasale este postId".
// El problema es que 'DetallePost' es un texto suelto: si me equivoco y escribo
// 'DetallePos', JavaScript no tiene forma de saber que está mal. La app compila
// igual y revienta recién cuando aprieto el botón.
//
// Gracias a este archivo, TypeScript conoce la lista de pantallas válidas y me
// subraya el error MIENTRAS escribo. Y además controla los parámetros: si me
// olvido de mandar el postId, o si mando un número donde va un texto, también
// me avisa.
//
// PARA EXPONER: "es como la agenda de contactos de la navegación. Sin la agenda
// podés marcar cualquier número y te enterás del error cuando no atiende nadie;
// con la agenda, elegís de una lista y no te podés equivocar."

// Estos dos son tipos que me da la propia librería de navegación.
// Los importo en vez de escribirlos yo porque describen cosas de la librería,
// no mías: qué es exactamente un "navigation" y qué es un "route".
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HistoriaParaVer } from '../tipos';

// ── LAS PANTALLAS DEL STACK ──────────────────────────────────────────────────
// Un "stack" (pila) es una navegación donde las pantallas se apilan una encima
// de la otra, como hojas sobre un escritorio. Entro al detalle → se pone encima;
// vuelvo atrás → se saca la de arriba y aparece la de abajo otra vez.
//
// A la izquierda va el nombre de la pantalla, a la derecha lo que recibe:
//   * undefined  → "esta pantalla no recibe ningún parámetro"
//   * un objeto  → los datos que hay que mandarle sí o sí al navegar
export type ParamsDelStack = {
  Tabs: undefined;                            // el contenedor de las pestañas, no necesita nada
  DetallePost: { postId: string };            // necesita saber QUÉ publicación abrir
  VisorHistoria: { historia: HistoriaParaVer }; // acá mando la historia entera
};

// ── LAS PESTAÑAS DE ABAJO ────────────────────────────────────────────────────
// Ojo: son DOS navegadores distintos y anidados. El stack de arriba es el padre,
// y una de sus "pantallas" (Tabs) es en realidad este otro navegador completo.
// Ninguna de las dos pestañas recibe parámetros, por eso van las dos en undefined.
export type ParamsDeTabs = {
  Feed: undefined;
  Perfil: undefined;
};

// ── LAS PROPS QUE LA LIBRERÍA LE REGALA A CADA PANTALLA ──────────────────────
// React Navigation le pasa automáticamente DOS props a toda pantalla registrada:
//
//   * navigation → el control remoto. Tiene los métodos para moverme:
//                  navigation.navigate('X') para ir a otra pantalla,
//                  navigation.goBack() para volver atrás.
//
//   * route      → el sobre con los datos que me mandaron. Adentro de
//                  route.params está lo que declaré arriba en ParamsDelStack.
//
// "NativeStackScreenProps" arma las dos de una sola vez. Le paso el mapa
// completo y el nombre de la pantalla, y él deduce qué params le corresponden.
// Lo uso solo en las pantallas que SÍ leen route.params.
export type PropsDetallePost = NativeStackScreenProps<ParamsDelStack, 'DetallePost'>;
export type PropsVisorHistoria = NativeStackScreenProps<ParamsDelStack, 'VisorHistoria'>;

// ── EL CASO RARO: FEED Y PERFIL ──────────────────────────────────────────────
// Feed y Perfil viven adentro de los Tabs, pero navegan a pantallas del Stack
// (a DetallePost y a VisorHistoria), que están en el navegador de AFUERA.
//
// ¿Y eso se puede? Sí: React Navigation, si no encuentra la pantalla en el
// navegador actual, la va a buscar al de arriba. Es como pedirle algo a tu
// hermano y, si no lo tiene, que le pregunte a tu mamá.
//
// Por eso acá tipo el "navigation" de esas dos pantallas con el del Stack y no
// con el de los Tabs: el del Stack es el que describe los viajes que realmente
// hago desde ellas. Si usara el de los Tabs, TypeScript me diría que
// 'DetallePost' no existe, porque no está en la lista de pestañas.
//
// Acá uso NativeStackNavigationProp (solo el control remoto) en vez de
// ScreenProps (control remoto + sobre) porque estas dos pantallas no reciben
// parámetros: no tienen ningún sobre que leer.
export type NavegacionDelStack = NativeStackNavigationProp<ParamsDelStack>;
