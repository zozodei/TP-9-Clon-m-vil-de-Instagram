// Los "moldes" de los datos de la app 
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type Comentario = {
  id: number;
  usuario: string;
  texto: string;
};

export type Post = {
  id: string;                // viene de la API
  url: string;               // viene de la API
  avatar: string;            // foto de perfil del autor
  usuario: string;
  ubicacion: string;
  caption: string;           // el texto debajo de la foto
  likes: number;
  liked: boolean;            // true si yo le di like
  comentarios: Comentario[]; // [] = lista de comentarios
};

export type Usuario = {
  usuario: string;
  nombre: string;
  fotoPerfil: string;
  biografia: string;
  seguidores: number;
  seguidos: number;
};

export type Historia = {
  id: number;
  fotoPerfil: string;
  usuario: string;
};

// Los datos inventados con los que completo cada foto de la API.
export type Autor = {
  usuario: string;
  ubicacion: string;
  caption: string;
};

// Lo que devuelve The Cat API (solo los campos que uso).
export type ImagenDeLaApi = {
  id: string;
  url: string;
};

// Las pantallas del Stack y qué datos hay que mandarle a cada una al navegar.
// undefined = no recibe nada. Así, si escribo mal el nombre de una pantalla o
// me olvido de mandar el postId, TypeScript me avisa.
export type ParamsDelStack = {
  Tabs: undefined;
  DetallePost: { postId: string };
  VisorHistoria: { historia: Historia };
};

// Tipo del objeto "navigation" que usan Feed y Perfil para abrir otras pantallas.
export type Navegacion = NativeStackNavigationProp<ParamsDelStack>;
