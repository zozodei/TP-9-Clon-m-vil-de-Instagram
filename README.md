# Clon Móvil de Instagram — React Native + Expo + TypeScript

Migración del clon de Instagram (hecho antes en React web con Vite) a
**React Native** con **Expo** y **TypeScript**, consumiendo
[The Cat API](https://thecatapi.com/) para simular las publicaciones del
feed. Sigue el mismo criterio que el TP web: todo el estado vive arriba de
todo (en `App.tsx`) y baja por **props** hasta los componentes, sin
librerías de manejo de estado extra.

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
npm run typecheck
```

## Diseño de referencia (Figma)

> Completar acá con el link del archivo de Figma utilizado como guía visual
> (o adjuntar las capturas de pantalla equivalentes), tal como pide la
> consigna. Se puede reutilizar la misma referencia que en el TP web
> anterior si mantiene la estética de Instagram.

## Árbol de directorios

```
ClonNative/
├── App.tsx                 # Estado (posteos), llamada a la API, like/comentar y navegación
├── index.ts                # Registro de la app (registerRootComponent)
├── app.json                # Configuración de Expo (ícono, splash, orientación)
└── src/
    ├── tipos.ts            # Tipos de TypeScript (Post, Comentario, Usuario, Historia...)
    ├── estilos/
    │   └── tema.ts         # Colores y medidas compartidas
    ├── data/
    │   ├── dataDeUsuario.ts    # Usuario emulado + historias (datos fijos)
    │   └── datosDePosteos.ts   # Autores inventados + comentarios iniciales
    └── componentes/
        ├── Feed/           → pantalla de inicio: header + historias + FlatList de posteos
        ├── PostCard/       → una publicación del feed
        ├── BarraHistorias/ → fila horizontal de historias
        ├── Perfil/         → pantalla de perfil: datos + grilla de 3 columnas
        ├── DetallePost/    → detalle de un posteo + comentarios (el PostModal de la web)
        └── VisorHistoria/  → historia a pantalla completa
```

Igual que en el TP web, cada componente tiene su carpeta con dos archivos:
`index.tsx` (lógica y JSX) y `Nombre.styles.ts` (los estilos con
`StyleSheet.create()`). En React Native no hay archivos `.css`, así que el
`.styles.ts` cumple el mismo papel que el `.css` de la versión web.

### Equivalencias con el clon web

| Web (Vite) | React Native |
|---|---|
| `Feed` + `.map()` | `Feed` con `FlatList` |
| `PostCard` | `PostCard` |
| `StoriesBar` | `BarraHistorias` |
| `ProfilePage` | `Perfil` |
| `PostModal` | `DetallePost` (pantalla modal) |
| `SideBar` + `useState('feed' / 'perfil')` | Bottom Tabs de React Navigation |
| `postSeleccionado` (estado) | `navigation.navigate('DetallePost', { postId })` |

## Cómo viajan los datos (props)

El array `posteos` vive en un solo lugar (`App.tsx`) y **baja por props**.
Para pasarle props a una pantalla de React Navigation se usa una función
hija dentro de `Screen`:

```tsx
<Tab.Screen name="Feed">
  {() => <Feed posteos={posteos} onToggleLike={toggleLike} />}
</Tab.Screen>
```

```
App.tsx  ── posteos, toggleLike, agregarComentario
  │
  ├─ Tabs
  │    ├─ Feed    ──> BarraHistorias
  │    │           └─> PostCard  (por cada publicación)
  │    └─ Perfil  (grilla)
  │
  ├─ DetallePost
  └─ VisorHistoria
```

La regla es siempre la misma: **los datos bajan por props, los avisos suben
por funciones**. `PostCard` no sabe dar like; recibe `onToggleLike` y la
llama. Esa función es la de `App.tsx`, que actualiza el estado, y el cambio
vuelve a bajar redibujando todo lo que use ese posteo.

Como hay **un solo** array de posteos, si le das "me gusta" en el feed
también aparece likeado en el detalle, y al comentar en el detalle el "Ver
los N comentarios" del feed se actualiza solo.

## Navegación (React Navigation)

Toda la navegación está definida en `App.tsx`:

- **Stack** (el navegador de afuera): contiene `Tabs`, `DetallePost` (con
  `presentation: 'modal'`, se desliza por encima del feed) y
  `VisorHistoria` (con `presentation: 'fullScreenModal'`, tapa todo).
- **Bottom Tabs**: dos pestañas, **Feed** y **Perfil**. El ícono se
  muestra relleno cuando la pestaña está activa y `-outline` cuando no.

Flujo pedido por la consigna:
**Feed → (tocás una foto) → Detalle de Publicación (modal) → cerrar → Perfil**
(desde el perfil también se entra al detalle tocando una foto de la grilla).

**Parámetros de navegación:** al detalle se le manda solo el **id**
(`navigation.navigate('DetallePost', { postId: item.id })`) y `App.tsx`
busca el posteo en `posteos` con `.find()`. Así el detalle siempre muestra
la versión actualizada (likes y comentarios). Al visor de historias se le
manda la historia entera porque las historias nunca cambian.

## Componentes y props

| Componente | Qué hace | Props |
|---|---|---|
| `Feed` | Header, historias y lista de posteos | `posteos`, `onToggleLike` |
| `PostCard` | Una publicación completa del feed | `post`, `onAbrirDetalle`, `onToggleLike` |
| `BarraHistorias` | Fila de historias, con "Tu historia" primero | `onAbrirHistoria(historia)` |
| `Perfil` | Datos del usuario y grilla de 3 columnas | `posteos` |
| `DetallePost` | Foto grande, comentarios y barra para comentar | `post`, `onToggleLike`, `onAgregarComentario` |
| `VisorHistoria` | Historia a pantalla completa | `historia`, `onCerrar` |

## Estados y hooks

**Estado global** (en `App.tsx`):

- **`posteos`** (`useState`): arranca vacío (el Feed muestra un
  `ActivityIndicator` mientras tanto) y se llena con la respuesta de la API.
- **`useEffect`** con `[]`: hace la petición con Axios una sola vez al abrir la app.
- **`toggleLike(id)`**: con `.map()` devuelve una copia del array donde solo
  cambia el posteo de ese `id` (invierte `liked` y suma/resta `likes`).
- **`agregarComentario(id, texto)`**: igual, agregando el comentario con
  `[...post.comentarios, nuevo]` (no con `push()`, porque React no detecta
  cambios si se modifica el array original).

**Estado local**:

- **`texto`** (`useState` en `DetallePost`): lo que se escribe en el
  `TextInput`. Es local porque no le importa a ninguna otra pantalla.

**Otros hooks**: `useNavigation()` en `Feed` y `Perfil` para abrir el
detalle y las historias.

## Consumo de la API

En el `useEffect` de `App.tsx` se pide con **Axios**:
`GET https://api.thecatapi.com/v1/images/search?limit=12`, dentro de un
`try/catch` para que la app no se rompa si no hay internet.

La API devuelve solo `{ id, url }` por imagen. El resto de cada publicación
sale de `AUTORES` (en `src/data/datosDePosteos.ts`): se piden tantas fotos
como autores hay y se unen por posición con `.map((imagen, index) => ...)`.

## Perfil de usuario emulado

No hay login: `usuarioLogueado` es un objeto fijo en
`src/data/dataDeUsuario.ts`. La cantidad de "publicaciones" es la cantidad
real de posteos que trajo la API.

La grilla es una `FlatList` con `numColumns={3}`. Cada foto mide un tercio
del ancho de la pantalla (`Dimensions.get('window').width / 3`).

## Identidad del sistema

- **SplashScreen**: `assets/splash-icon.png`, configurada con el plugin
  `expo-splash-screen` en `app.json`.
- **Ícono de la app**: configurado en `app.json` (`icon` y `adaptiveIcon`
  para Android).
- **StatusBar**: `<StatusBar style="dark" />`, íconos oscuros sobre fondo blanco.
- **SafeAreaView**: las pantallas usan el `SafeAreaView` de
  `react-native-safe-area-context` para no quedar tapadas por el notch.

## Checklist de la consigna

- [x] Navegación nativa (Bottom Tabs + Stack)
- [x] Feed con `FlatList`
- [x] 12 publicaciones traídas con Axios desde The Cat API
- [x] Estilos exclusivamente con `StyleSheet.create()`
- [x] Interacciones con `Pressable`
- [x] Flujo Feed → Detalle → Perfil
- [x] Grilla de perfil con `FlatList` y `numColumns={3}`
- [x] SplashScreen, ícono e ícono adaptativo, StatusBar personalizados
