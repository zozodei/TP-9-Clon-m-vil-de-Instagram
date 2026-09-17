// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  componentes/BarraHistorias  —  LA TIRA DE HISTORIAS DE ARRIBA              ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// La fila de circulitos que está arriba del feed y se desplaza de costado.
// Primero va "Tu historia" (con el borde gris) y después las de los demás
// (con el borde rojo, la señal de "no vista" de Instagram).
//
// DOS COSAS PARA DESTACAR EN LA EXPOSICIÓN:
//
// 1) Los datos los importa directo de dataDeUsuario.ts, sin recibirlos por
//    props. Me lo puedo permitir porque las historias son fijas: no cambian
//    nunca, nadie las modifica. Los posteos SÍ cambian (likes, comentarios) y
//    por eso esos sí viajan por props desde App.tsx. La regla es: si el dato
//    cambia, pasalo por props; si es una constante, importalo y listo.
//
// 2) Este componente NO NAVEGA. Solo avisa "tocaron esta historia" y el Feed
//    decide qué hacer. A eso se le dice "delegar": el componente hijo reporta
//    el evento, el padre decide la consecuencia. Así puedo reutilizar esta barra
//    en otra pantalla que haga otra cosa al tocar una historia.

import { FlatList, Image, Pressable, Text, View } from 'react-native';
import { usuarioLogueado, historias } from '../../data/dataDeUsuario';
import type { HistoriaParaVer } from '../../tipos';
import styles from './BarraHistorias.styles';

// La función que recibo lleva un parámetro: la historia que tocaron.
// Así el Feed sabe CUÁL abrir, sin que yo tenga que navegar desde acá.
type Props = {
  onAbrirHistoria: (historia: HistoriaParaVer) => void;
};

const BarraHistorias = ({ onAbrirHistoria }: Props) => {
  return (
    <FlatList
      style={styles.barra}
      data={historias}

      // Esta sola palabra da vuelta la lista: en vez de scrollear hacia abajo,
      // scrollea de izquierda a derecha.
      horizontal

      showsHorizontalScrollIndicator={false} // sin la barrita de scroll

      // keyExtractor tiene que devolver TEXTO sí o sí, y el id de las historias
      // es un número. Por eso lo convierto con String().
      keyExtractor={(historia) => String(historia.id)}

      // ── "TU HISTORIA" ─────────────────────────────────────────────────────
      // ListHeaderComponent va antes de todos los items de la lista. Lo uso para
      // mi propia historia, que no está en el array "historias" sino que la armo
      // acá en el momento con los datos del usuario logueado.
      //
      // Fijate que construyo un objeto con la misma forma que espera el visor
      // (fotoPerfil y usuario): por eso existe el tipo HistoriaParaVer, que pide
      // solo esos dos campos y no el id, que acá no tengo. Está explicado en
      // src/tipos.ts.
      ListHeaderComponent={
        <Pressable
          style={styles.item}
          onPress={() =>
            onAbrirHistoria({
              fotoPerfil: usuarioLogueado.fotoPerfil,
              usuario: usuarioLogueado.usuario,
            })
          }
        >
          {/* Array de estilos: el círculo base, y encima "anilloTuya" que le
              pisa el color del borde y lo deja gris en vez de rojo. Es la forma
              de decir visualmente "esta es la tuya, no una historia nueva". */}
          <View style={[styles.anillo, styles.anilloTuya]}>
            <Image source={{ uri: usuarioLogueado.fotoPerfil }} style={styles.foto} />
          </View>
          <Text style={styles.nombre}>Tu historia</Text>
        </Pressable>
      }

      // ── LAS HISTORIAS DE LOS DEMÁS ────────────────────────────────────────
      renderItem={({ item }) => (
        // ⚠️ OJO CON ESTO, es un error clásico:
        // Va () => onAbrirHistoria(item), con la flecha. Si escribiera
        // onPress={onAbrirHistoria(item)} sin la flecha, la función se
        // EJECUTARÍA en el momento de dibujar la lista, no al tocarla: se
        // abrirían las 7 historias solas apenas carga la pantalla.
        // Con la flecha guardo la función para después.
        <Pressable style={styles.item} onPress={() => onAbrirHistoria(item)}>
          <View style={styles.anillo}>
            <Image source={{ uri: item.fotoPerfil }} style={styles.foto} />
          </View>
          {/* numberOfLines={1} corta los nombres largos con puntos suspensivos,
              para que no rompan el ancho fijo de 64px de cada circulito. */}
          <Text style={styles.nombre} numberOfLines={1}>{item.usuario}</Text>
        </Pressable>
      )}
    />
  );
};

export default BarraHistorias;
