// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  src/tipos.ts  —  LOS MOLDES DE LOS DATOS                                   ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES UN "TYPE"?
// Es la descripción de la FORMA que tiene un dato: qué propiedades tiene y de
// qué clase es cada una. Es como el molde de una galletita: todas las galletitas
// que salgan de ese molde van a tener la misma forma, sí o sí.
//
// LO MÁS IMPORTANTE PARA ENTENDER: un type NO EXISTE cuando la app está
// corriendo en el celular. Es solo un contrato que revisan el editor y el
// compilador MIENTRAS programo. Cuando el proyecto se compila, todos los types
// se borran y queda JavaScript común.
//
// ¿Y entonces para qué sirve? Para que los errores salten ANTES de abrir la app.
// Sin TypeScript, si escribo post.usuaro (con una letra de menos) me entero
// recién cuando abro la app y veo un espacio vacío en pantalla, sin saber por
// qué. Con TypeScript, el editor me lo subraya en rojo en el momento.
//
// Los puse todos juntos en un solo archivo para no repetir la misma definición
// en cada componente: la escribo una vez acá y la importo donde la necesite.
//
// PARA EXPONER: "TypeScript es JavaScript con controles de seguridad. No cambia
// lo que hace la app, cambia cuántos errores me como mientras la escribo."

// ── Un comentario de una publicación ─────────────────────────────────────────
export type Comentario = {
  id: number;      // número único, para que React distinga una fila de otra
  usuario: string; // quién lo escribió ("string" quiere decir texto)
  texto: string;   // qué escribió
};

// ── Una publicación del feed ─────────────────────────────────────────────────
// Este es el molde más importante del proyecto. Mezcla tres orígenes distintos:
//   * lo que trae la API de gatos  → id, url
//   * lo que invento yo            → usuario, ubicacion, caption, avatar
//   * lo que cambia con el uso     → liked, likes, comentarios
export type Post = {
  id: string;                 // la id que me da la API (es texto, no número)
  url: string;                // la dirección de la foto del gato
  avatar: string;             // la dirección de la foto de perfil del autor
  usuario: string;            // el nombre de usuario que inventé
  ubicacion: string;          // la ciudad que inventé
  caption: string;            // el textito que acompaña la foto
  likes: number;              // cuántos likes tiene ("number" = número)
  liked: boolean;             // ¿yo le di like? ("boolean" = true o false, sí o no)
  comentarios: Comentario[];  // los corchetes [] significan "una lista de"
};

// ── El dueño del perfil ──────────────────────────────────────────────────────
// No hay sistema de login en el trabajo práctico, así que el usuario es fijo:
// está escrito a mano en src/data/dataDeUsuario.ts.
export type Usuario = {
  usuario: string;
  nombre: string;
  fotoPerfil: string;
  biografia: string;
  seguidores: number;
  seguidos: number;
};

// ── Una historia de la barra de arriba del feed ──────────────────────────────
export type Historia = {
  id: number;
  fotoPerfil: string;
  usuario: string;
};

// ── Lo que el visor necesita para mostrar una historia en grande ─────────────
// ¿Por qué tengo DOS tipos parecidos (Historia y HistoriaParaVer) en vez de uno?
//
// Porque "Tu historia" (la primera de la barra, la mía) no está en la lista de
// historias: la armo en el momento con los datos del usuario logueado, y no
// tiene id. Si el visor pidiera una Historia completa, me exigiría un id que no
// tengo y me marcaría error.
//
// Este tipo pide solo lo mínimo que el visor usa de verdad: la foto y el nombre.
// Y una Historia completa igual entra acá sin problema, porque tiene esos dos
// campos (le sobra el id, pero que sobre no molesta).
export type HistoriaParaVer = {
  fotoPerfil: string;
  usuario: string;
};

// ── Los datos inventados con los que completo cada foto de la API ────────────
export type Autor = {
  usuario: string;
  ubicacion: string;
  caption: string;
};

// ── La forma EXACTA de lo que devuelve The Cat API ───────────────────────────
// La API devuelve más campos (width, height, breeds...) pero yo solo declaro
// los dos que uso. Me sirve para avisarle a axios qué espero recibir: a partir
// de ahí, si escribo imagen.URL en vez de imagen.url, TypeScript me avisa.
export type ImagenDeLaApi = {
  id: string;
  url: string;
};
