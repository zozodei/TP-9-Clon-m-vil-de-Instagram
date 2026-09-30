// Punto de entrada: es el primer archivo que se ejecuta (lo indica "main" en package.json).
// Le entrega el componente App a Expo para que lo muestre en el celular.
// Es el equivalente al main.tsx de la versión web.
import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
