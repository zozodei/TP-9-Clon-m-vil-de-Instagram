// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  index.ts  —  LA LLAVE DE ARRANQUE                                          ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// Este es el PRIMER archivo que se ejecuta de todo el proyecto. Está avisado en
// el package.json, en la línea "main": "index.ts".
//
// Es cortito y no tiene lógica: su único trabajo es agarrar mi componente App y
// entregárselo al sistema operativo del celular para que lo muestre en pantalla.
//
// PARA EXPONER: "es el equivalente al <script src="..."> del index.html en una
// página web: el punto donde el celular engancha con mi código."

// Esta línea tiene que ser el PRIMER import de todo el proyecto, antes que
// cualquier otra cosa. Es un requisito de la librería: prepara el sistema de
// gestos (deslizar para volver atrás, arrastrar para cerrar una pantalla) y si
// se carga después de otra cosa, esos gestos fallan de formas raras.
import 'react-native-gesture-handler';

// Función de Expo que arranca la app de verdad.
import { registerRootComponent } from 'expo';

// Mi componente principal, el del archivo App.tsx.
import App from './App';

// Acá lo registro. Por dentro, registerRootComponent hace dos cosas:
//   1) llama a AppRegistry.registerComponent('main', () => App), que es la
//      función nativa de React Native que dice "esta es LA app";
//   2) configura el entorno para que funcione igual si corro en Expo Go (la
//      app del celular para probar) o en una build nativa instalada.
registerRootComponent(App);
