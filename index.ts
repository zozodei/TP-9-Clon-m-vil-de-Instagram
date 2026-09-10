// tiene que ser el PRIMER import de todo el proyecto (antes que cualquier otra cosa),
// si no, los gestos (deslizar para volver atrás, etc.) de react-navigation no andan bien
import 'react-native-gesture-handler';
// función de Expo que "arranca" la app de verdad, conectando nuestro componente con el sistema operativo
import { registerRootComponent } from 'expo';

// nuestro componente principal
import App from './App';

// registerRootComponent llama por dentro a AppRegistry.registerComponent('main', () => App)
// y además configura bien el entorno tanto si corremos en Expo Go como en una build nativa
registerRootComponent(App);
