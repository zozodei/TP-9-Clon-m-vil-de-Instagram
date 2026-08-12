# Clon Móvil de Instagram — React Native + Expo

Migración del clon de Instagram (hecho antes en React web) a **React
Native** con **Expo**, consumiendo [The Cat API](https://thecatapi.com/)
para simular las publicaciones del feed. Sigue el mismo criterio que el TP
web anterior: todo el estado vive arriba de todo (en `App.js`) y baja por
**props** hasta los componentes, sin librerías de manejo de estado extra.

## Cómo correr el proyecto

```bash
npm install
npx expo start
```

Desde ahí se abre con la app **Expo Go** escaneando el QR, o con
`npx expo start --android` / `--ios` / `--web` según lo que tengan
disponible.

## Diseño de referencia (Figma)

> Completar acá con el link del archivo de Figma utilizado como guía visual
> (o adjuntar las capturas de pantalla equivalentes), tal como pide la
> consigna. Se puede reutilizar la misma referencia que en el TP web
> anterior si mantiene la estética de Instagram.

## Árbol de directorios

```
ClonNative/
├── App.js                        # useState/useEffect + Axios (igual que App.tsx del TP web) y arma el árbol de providers
├── app.json                      # Configuración de Expo (ícono, splash, nombre)
├── index.js                      # Registro de la app (registerRootComponent)
└── src/
    ├── colores.js                # Paleta de colores estilo Instagram
    ├── data/
    │   └── dataDeUsuario.js      # Usuario emulado + historias (datos fijos)
    ├── componentes/
    │   ├── PostCard/              → tarjeta de una publicación del feed
    │   │   ├── index.js
    │   │   └── PostCard.styles.js
    │   ├── Comentario/            → fila de un comentario simulado
    │   │   ├── index.js
    │   │   └── Comentario.styles.js
    │   ├── BarraHistorias/        → tira de historias arriba del feed
    │   │   ├── index.js
    │   │   └── BarraHistorias.styles.js
    │   ├── CabeceraPerfil/        → encabezado del perfil (avatar, bio, stats)
    │   │   ├── index.js
    │   │   └── CabeceraPerfil.styles.js
    │   └── ItemGrilla/            → celda de la grilla de 3 columnas del perfil
    │       ├── index.js
    │       └── ItemGrilla.styles.js
    ├── pantallas/
    │   ├── Feed/                  → Home: header + FlatList de publicaciones
    │   ├── DetallePost/           → detalle ampliado de un posteo + comentarios
    │   └── Perfil/                → perfil emulado + grilla de fotos (numColumns=3)
    │       (cada una con su index.js y su Nombre.styles.js)
    └── navegacion/
        ├── TabsPrincipales.js     # Bottom Tabs: Feed y Perfil
        └── NavegadorRaiz.js       # Stack raíz: Tabs + DetallePost (modal)
```

Como en React Native no existen archivos `.css`, cada componente y cada
pantalla tiene su carpeta con `index.js` (la lógica y el JSX) y un archivo
`Nombre.styles.js` aparte (el `StyleSheet.create()` con todos los estilos),
imitando la misma separación que en el TP web (`index.tsx` + `Nombre.css`).

## Por qué no se usó Context ni otra librería de estado

El estado (`posteos`) vive en un solo lugar: `App.js`, con `useState` +
`useEffect` + `Axios`, exactamente como en `App.tsx` del TP web. De ahí
baja por **props** hasta `NavegadorRaiz` → `TabsPrincipales` → cada
pantalla (`Feed`, `Perfil`, `DetallePost`), usando la función `children`
que ya trae React Navigation para pasarle props extra a una pantalla. No
se agregó Context API ni ninguna librería de estado global porque no
formaba parte de lo que vimos en clase, y con props alcanza.

## Arquitectura de navegación (React Navigation)

- **`NavegadorRaiz`** (Native Stack): navegador de más arriba. Tiene la
  pantalla `Tabs` (la navegación principal) y `DetallePost`, que se abre
  con `presentation: 'modal'` — se desliza por encima de todo en vez de
  reemplazar el feed.
- **`TabsPrincipales`** (Bottom Tabs): dos pestañas, **Feed** y **Perfil**,
  con los íconos de Instagram.

Flujo pedido por la consigna:
**Feed → (tocás una foto) → Detalle de Publicación (modal) → cerrar → Perfil**
(desde el perfil también se entra al detalle tocando una foto de la
grilla, reusando la misma pantalla `DetallePost`).

Al detalle se navega mandando solo el **id** del posteo por parámetro
(`navigation.navigate('DetallePost', { postId })`); `DetallePostPantalla`
lo busca en `posteos`. Se manda el id y no el objeto completo para que, si
le das "me gusta" desde el detalle, se actualice también en el feed (es el
mismo array de estado, no una copia).

## Componentes: qué hace cada uno y qué recibe por props

| Componente | Responsabilidad | Props |
|---|---|---|
| `PostCard` | Publicación completa en el feed (avatar, usuario, ubicación, foto, acciones, likes, caption) | `post`, `onClickImagen`, `onToggleLike` |
| `Comentario` | Una fila de comentario simulado | `comentario` (`{ usuario, texto }`) |
| `BarraHistorias` | Tira de historias arriba del feed | (usa los datos fijos directamente, no recibe props) |
| `CabeceraPerfil` | Avatar, nombre, bio, stats y botón de editar perfil | `usuario`, `cantidadPosteos` |
| `ItemGrilla` | Celda cuadrada de la grilla de fotos del perfil | `post`, `tamaño`, `onPress` |

Son todos **componentes de presentación**: no manejan estado propio, todo
les llega por props, y avisan a la pantalla que los usa con funciones
(`onToggleLike`, `onClickImagen`, `onPress`) cuando el usuario interactúa.

Las **pantallas** (`Feed`, `DetallePost`, `Perfil`) son las que reciben
`posteos` y `onToggleLike` desde `App.js` (vía navegación) y arman los
datos que le pasan a los componentes de arriba.

## Estados y hooks utilizados

- **`posteos`** (`useState`, en `App.js`): array de publicaciones. Arranca
  vacío y se llena con lo que responde la API.
- **`useEffect`** (en `App.js`, con `[]` de dependencias): dispara la
  petición con **Axios** a The Cat API una sola vez, al montar la app.
- **`toggleLike`** (función definida en `App.js`, no un estado en sí
  mismo): recorre `posteos` y solo modifica el que coincide con el `id`
  recibido, invirtiendo `liked` y sumando/restando el contador de `likes`.
  La usan tanto `Feed` como `DetallePost`.
- No hay más estados locales de UI relevantes: qué pantalla/tab está
  activa y qué parámetros tiene cada pantalla lo maneja React Navigation
  internamente (no se replica "a mano" con `useState`, para eso está la
  librería de navegación).

## Consumo de la API

Dentro del `useEffect` de `App.js` se pide con **Axios**:
`GET https://api.thecatapi.com/v1/images/search?limit=12`. Como la API
solo devuelve `{ id, url }` por imagen, se combina cada una (por índice)
con arrays locales de usuarios, ubicaciones, captions y comentarios
simulados (definidos arriba de `App.js`, igual que en el TP web) para
armar el objeto final de "posteo".

## Perfil de usuario emulado

No hay login: `usuarioLogueado` es un objeto fijo en
`src/data/dataDeUsuario.js` (avatar, nombre, bio, seguidores, seguidos). La
cantidad de "publicaciones" que se muestra es la cantidad real de posteos
que trajo la API, para que el número no quede inventado y desactualizado.

## Identidad del sistema

- **SplashScreen**: reemplazada por `assets/splash-icon.png`, configurada
  con el plugin `expo-splash-screen` en `app.json`. Se mantiene visible con
  `SplashScreen.preventAutoHideAsync()` hasta que `App.js` termina de
  montar (`onLayout`), ahí se llama `SplashScreen.hideAsync()`.
- **Ícono de la app**: configurado en `app.json` (`icon` para iOS/web,
  `adaptiveIcon` para Android).
- **StatusBar**: `<StatusBar style="dark" />` (íconos oscuros), porque el
  header de la app es blanco, igual que Instagram en modo claro.
- **SafeAreaView**: cada pantalla (`Feed`, `Perfil`, `DetallePost`)
  envuelve su contenido en `SafeAreaView` de
  `react-native-safe-area-context`, para que nada choque con el notch, la
  isla dinámica o las barras del sistema.

## Checklist de la consigna

- [x] Navegación nativa (Bottom Tabs + Stack)
- [x] Feed con `FlatList` (nada de `.map()` sobre un scroll genérico)
- [x] 12 publicaciones traídas con Axios desde The Cat API
- [x] Estilos exclusivamente con `StyleSheet.create()`
- [x] Interacciones con `Pressable`
- [x] Flujo Feed → Detalle → Perfil
- [x] Grilla de perfil con `FlatList` y `numColumns={3}`
- [x] SplashScreen, ícono e ícono adaptativo, StatusBar personalizados
