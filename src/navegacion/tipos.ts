// Los tipos de la navegación: qué pantallas existen y qué parámetros recibe cada una.
//
// Esto es lo que hace que `navigation.navigate('DetallePost', { postId })` esté
// verificado: si escribimos mal el nombre de la pantalla, o le mandamos el parámetro
// equivocado, TypeScript lo marca en rojo mientras escribimos.

import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { HistoriaParaVer } from '../tipos';

// El listado de pantallas del Stack (NavegadorRaiz) con sus parámetros.
// "undefined" significa "esta pantalla no recibe ningún parámetro".
export type ParamsDelStack = {
  Tabs: undefined;
  DetallePost: { postId: string };
  VisorHistoria: { historia: HistoriaParaVer };
};

// Las pestañas de abajo (TabsPrincipales). Ninguna recibe parámetros.
export type ParamsDeTabs = {
  Feed: undefined;
  Perfil: undefined;
};

// "ScreenProps" arma de una las dos props que React Navigation le inyecta a una
// pantalla: navigation (para movernos) y route (donde vienen los parámetros).
// Las usamos en las pantallas que SÍ leen route.params.
export type PropsDetallePost = NativeStackScreenProps<ParamsDelStack, 'DetallePost'>;
export type PropsVisorHistoria = NativeStackScreenProps<ParamsDelStack, 'VisorHistoria'>;

// Feed y Perfil viven adentro de los Tabs, pero navegan a pantallas del Stack
// (DetallePost, VisorHistoria). Eso funciona porque React Navigation, si no encuentra
// la pantalla en el navegador actual, la busca en el de arriba.
// Por eso tipamos su "navigation" con el del Stack: es el que describe los viajes
// que realmente hacemos desde esas pantallas.
export type NavegacionDelStack = NativeStackNavigationProp<ParamsDelStack>;
