# Clon Móvil de Instagram — React Native + Expo + TypeScript

Migración del clon de Instagram (hecho antes en React web) a **React
Native** con **Expo** y **TypeScript**, consumiendo
[The Cat API](https://thecatapi.com/) para simular las publicaciones del
feed. Sigue el mismo criterio que el TP web anterior: todo el estado vive
arriba de todo (en `App.tsx`) y baja por **props** hasta los componentes,
sin librerías de manejo de estado extra.

## Cómo correr el proyecto

```bash
npm install
npx expo start
```

Desde ahí se abre con la app **Expo Go** escaneando el QR, o con
`npx expo start --android` / `--ios` / `--web` según lo que tengan
disponible.

Para revisar que no haya errores de tipos (sin llegar a abrir la app):

```bash
npm run tsc
```

## Diseño de referencia (Figma)

> Completar acá con el link del archivo de Figma utilizado como guía visual
> (o adjuntar las capturas de pantalla equivalentes), tal como pide la
> consigna. Se puede reutilizar la misma referencia que en el TP web
> anterior si mantiene la estética de Instagram.

## Árbol de directorios

```
ClonNative/
├── App.js                        # Estado global (useState/useEffect + Axios) y árbol de providers
├── app.json                      # Configuración de Expo (ícono, splash, orientación)
├── index.js                      # Registro de la app (registerRootComponent)
└── src/
    ├── estilos/
    │   └── tema.js               # Paleta de colores y medidas compartidas
    ├── data/
    │   ├── dataDeUsuario.js      # Usuario emulado + historias (datos fijos)
    │   └── datosDePosteos.js     # Autores inventados + comentarios iniciales
    ├── componentes/
    │   ├── PostCard/             → tarjeta de una publicación del feed
    │   ├── Comentario/           → fila de un comentario
    │   ├── BarraHistorias/       → tira horizontal de historias arriba del feed
    │   ├── CabeceraPerfil/       → encabezado del perfil (avatar, bio, stats)
    │   └── ItemGrilla/           → celda de la grilla de 3 columnas del perfil
    ├── pantallas/
    │   ├── Feed/                 → Home: header + FlatList de publicaciones
    │   ├── DetallePost/          → detalle ampliado de un posteo + comentarios
    │   ├── Perfil/               → perfil emulado + grilla (numColumns={3})
    │   └── VisorHistoria/        → historia a pantalla completa
    └── navegacion/
        ├── NavegadorRaiz.js      # Stack raíz: Tabs + DetallePost + VisorHistoria
        └── TabsPrincipales.js    # Bottom Tabs: Feed y Perfil
```

Cada componente y cada pantalla tiene su **propia carpeta** con dos
archivos: `index.js` (la lógica y el JSX) y `Nombre.styles.js` (el
`StyleSheet.create()`). Como en React Native no existen archivos `.css`,
esta separación imita la del TP web (`index.tsx` + `Nombre.css`) y evita
tener 80 líneas de estilos mezcladas con el JSX.

La diferencia entre las dos carpetas:

- **`pantallas/`**: son destinos de navegación. Cada una figura como una
  `Screen` en algún navegador, recibe `navigation` y `route`, y decide a
  dónde se va después.
- **`componentes/`**: son piezas reutilizables que se dibujan **dentro** de
  una pantalla. No saben nada de navegación: cuando el usuario toca algo,
  avisan hacia arriba con una función (`onPress`, `onToggleLike`,
  `onAbrirDetalle`) y la pantalla decide qué hacer.

## Cómo viajan los datos (props)

No se usó Context API ni ninguna librería de estado global: el array
`posteos` vive en un solo lugar (`App.js`) y **baja por props**, usando la
función `children` que ya trae React Navigation para pasarle props extra a
una pantalla.

```
App.js  ── posteos, toggleLike, agregarComentario
  │
  └─ NavegadorRaiz  (Stack)
       │
       ├─ TabsPrincipales  (Tabs, solo hace de pasamanos)
       │    ├─ Feed    ──> BarraHistorias
       │    │           └─> PostCard  (por cada publicación)
       │    └─ Perfil  ──> CabeceraPerfil
       │                └─> ItemGrilla (por cada foto)
       │
       ├─ DetallePost ──> Comentario  (por cada comentario)
       └─ VisorHistoria
```

La regla es siempre la misma: **los datos bajan por props, los avisos suben
por funciones**. `PostCard` no sabe dar like; recibe `onToggleLike` y la
llama. Esa función es la de `App.js`, que actualiza el estado, y el cambio
vuelve a bajar redibujando todo lo que use ese posteo.

Como hay **un solo** array de posteos, si le das "me gusta" en el feed
también aparece likeado en el detalle, y al comentar en el detalle el "Ver
los N comentarios" del feed se actualiza solo.

### Las dos formas de declarar una pantalla

En los navegadores conviven las dos formas, y la diferencia es importante:

```jsx
// Forma corta: React Navigation crea la pantalla y le pasa navigation y route.
// Sirve cuando la pantalla NO necesita nada nuestro.
<Stack.Screen name="VisorHistoria" component={VisorHistoriaPantalla} />

// Forma con función hija: la creamos nosotros. Recibimos navigation y route
// juntos en "props", los reenviamos con {...props} y encima sumamos lo nuestro.
// Es la única manera de pasarle props propias a una pantalla.
<Stack.Screen name="DetallePost">
  {(props) => <DetallePostPantalla {...props} posteos={posteos} ... />}
</Stack.Screen>
```

## Arquitectura de navegación (React Navigation)

- **`NavegadorRaiz`** (Native Stack): el navegador de más arriba. Contiene
  la pantalla `Tabs` (la navegación principal), `DetallePost` (con
  `presentation: 'modal'`, se desliza por encima en vez de reemplazar el
  feed) y `VisorHistoria` (con `presentation: 'fullScreenModal'`, tapa todo
  incluida la barra de pestañas).
- **`TabsPrincipales`** (Bottom Tabs): dos pestañas, **Feed** y **Perfil**,
  con los íconos de Instagram. El ícono se muestra relleno cuando la
  pestaña está activa y en versión `-outline` cuando no.

Flujo pedido por la consigna:
**Feed → (tocás una foto) → Detalle de Publicación (modal) → cerrar → Perfil**
(desde el perfil también se entra al detalle tocando una foto de la
grilla, reusando la misma pantalla `DetallePost`).

**Parámetros de navegación:** al detalle se navega mandando solo el **id**
(`navigation.navigate('DetallePost', { postId: item.id })`) y
`DetallePostPantalla` lo busca en `posteos` con `.find()`. Se manda el id y
no el objeto completo para que la pantalla siempre lea la versión más
actualizada del posteo, y no una copia congelada del momento en que se
navegó. Al visor de historias, en cambio, se le manda el objeto entero
(`{ historia }`) porque las historias son datos fijos que nunca cambian.

## Componentes: qué hace cada uno y qué recibe por props

| Componente | Responsabilidad | Props |
|---|---|---|
| `PostCard` | Publicación completa del feed (avatar, usuario, ubicación, foto, barra de acciones, likes, caption, contador de comentarios) | `post`, `onAbrirDetalle`, `onToggleLike` |
| `Comentario` | Una fila de comentario dentro del detalle | `comentario` (`{ id, usuario, texto }`) |
| `BarraHistorias` | Tira horizontal de historias arriba del feed, con "Tu historia" primero | `onAbrirHistoria(historia)` |
| `CabeceraPerfil` | Avatar, nombre, bio, métricas y botón de editar perfil | `usuario`, `cantidadPosteos` |
| `ItemGrilla` | Celda cuadrada de la grilla de 3 columnas | `post`, `tamaño`, `onPress` |

Son todos **componentes de presentación**: no manejan estado propio, todo
les llega por props, y avisan hacia arriba con funciones cuando el usuario
interactúa. Por eso las props de callback se llaman por lo que *significan*
(`onAbrirDetalle`) y no por el gesto (`onClickImagen`): a `onAbrirDetalle`
la disparan tres cosas distintas (la foto, el ícono de comentario y "Ver
los N comentarios").

## Estados y hooks utilizados

**Estado global** (en `App.js`, el único que comparten varias pantallas):

- **`posteos`** (`useState`): array de publicaciones. Arranca vacío — por
  eso el Feed muestra un `ActivityIndicator` mientras `posteos.length === 0`
  — y se llena con lo que responde la API.
- **`useEffect`** con `[]` de dependencias: dispara la petición con Axios
  una sola vez, al montar la app.
- **`toggleLike(id)`**: recorre `posteos` con `.map()` y devuelve una copia
  del array donde solo el posteo de ese `id` cambia (invierte `liked` y
  suma/resta `likes`). La usan `Feed` y `DetallePost`.
- **`agregarComentario(id, texto)`**: igual, pero agregando un comentario al
  array de ese posteo. Se hace con `[...post.comentarios, nuevo]` y no con
  `push()` porque `push()` modifica el array original y React no se entera
  del cambio.

**Estado local** (dentro de una sola pantalla):

- **`textoComentario`** (`useState` en `DetallePost`): lo que el usuario va
  escribiendo en el `TextInput`. Es un *componente controlado*: el texto
  vive en el estado de React (`value` + `onChangeText`), no en el campo. Es
  local porque no le importa a ninguna otra pantalla.

No hay más estados: en qué pantalla o pestaña está el usuario, y qué
parámetros recibió cada pantalla, lo maneja React Navigation internamente
(no se replica "a mano" con `useState`).

## Consumo de la API

Dentro del `useEffect` de `App.js` se pide con **Axios**:
`GET https://api.thecatapi.com/v1/images/search?limit=12`, envuelto en un
`try/catch` para que la app no se rompa si no hay internet.

La API devuelve solo `{ id, url }` por imagen, así que el resto de cada
publicación se inventa: en `src/data/datosDePosteos.js` hay un array
`AUTORES` con 12 objetos `{ usuario, ubicacion, caption }`. Se pide a la API
exactamente `AUTORES.length` fotos, y con `.map((imagen, index) => ...)` a
cada foto se le asigna el autor de esa misma posición. Los likes iniciales
son un número al azar y los comentarios salen de `COMENTARIOS_INICIALES`,
copiados con `[...]` para que cada posteo tenga los suyos.

## Perfil de usuario emulado

No hay login: `usuarioLogueado` es un objeto fijo en
`src/data/dataDeUsuario.js` (avatar, nombre, bio, seguidores, seguidos). La
cantidad de "publicaciones" que se muestra es la cantidad real de posteos
que trajo la API, para que el número no quede inventado y desactualizado.

La grilla usa una `FlatList` con `numColumns={3}`. El tamaño de cada celda
se calcula una sola vez, dividiendo el ancho de la pantalla
(`Dimensions.get('window').width`) por 3, para que las tres columnas queden
simétricas y sin desbordar. La cabecera del perfil y las pestañas
(PUBLICACIONES / GUARDADOS / ETIQUETADOS) van como `ListHeaderComponent` de
esa misma lista, así todo scrollea junto.

## Identidad del sistema

- **SplashScreen**: reemplazada por `assets/splash-icon.png`, configurada
  con el plugin `expo-splash-screen` en `app.json`. Se mantiene visible con
  `SplashScreen.preventAutoHideAsync()` y se oculta con `hideAsync()` desde
  el `onLayout` del `GestureHandlerRootView`, o sea cuando la app ya midió
  y está lista para mostrarse.
- **Ícono de la app**: configurado en `app.json` (`icon` para iOS/web,
  `adaptiveIcon` con foreground, background y monochrome para Android).
- **StatusBar**: `<StatusBar style="dark" />` (íconos oscuros), porque el
  header de la app es blanco, igual que Instagram en modo claro.
- **SafeAreaView**: todas las pantallas envuelven su contenido en el
  `SafeAreaView` de `react-native-safe-area-context`, indicando con `edges`
  qué bordes proteger (`['top']` en Feed y Perfil, `['bottom']` en el
  Detalle porque arriba ya está el header del Stack).

## Checklist de la consigna

- [x] Navegación nativa (Bottom Tabs + Stack)
- [x] Feed con `FlatList` (nada de `.map()` sobre un scroll genérico)
- [x] 12 publicaciones traídas con Axios desde The Cat API
- [x] Estilos exclusivamente con `StyleSheet.create()`
- [x] Interacciones con `Pressable`
- [x] Flujo Feed → Detalle → Perfil
- [x] Grilla de perfil con `FlatList` y `numColumns={3}`
- [x] SplashScreen, ícono e ícono adaptativo, StatusBar personalizados
