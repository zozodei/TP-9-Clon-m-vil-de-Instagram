// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  BarraHistorias.styles.ts  —  LOS ESTILOS DE LOS CIRCULITOS                 ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// (La explicación general de flexbox y estilos está en PostCard.styles.ts)

import { StyleSheet } from 'react-native';
import { colores } from '../../estilos/tema';

export default StyleSheet.create({

  barra: {
    // hairlineWidth es la línea más fina que la pantalla puede dibujar, según su
    // densidad de píxeles. Separa las historias del primer posteo.
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: colores.borde,
    paddingVertical: 10,
  },

  // Cada historia: el circulito con el nombre debajo.
  item: {
    alignItems: 'center', // centra el nombre respecto del círculo
    marginLeft: 12,       // separación entre una historia y la siguiente
    // Ancho fijo para que TODAS midan lo mismo, tenga el usuario un nombre
    // corto o largo. Si no, la fila quedaría despareja. Por eso además el
    // componente usa numberOfLines={1}, para cortar los nombres que no entran.
    width: 64,
  },

  // ── EL ANILLO DE COLOR ───────────────────────────────────────────────────
  // El efecto se logra con DOS círculos, uno adentro del otro:
  //   * este View de 58px con borde de color (el anillo)
  //   * la foto de 52px adentro, centrada
  // Los 3px de diferencia por lado son los que dejan ver el borde de color.
  anillo: {
    width: 58,
    height: 58,
    borderRadius: 29,        // la mitad de 58 = círculo perfecto
    borderWidth: 2,
    borderColor: colores.like, // el rojo de "historia no vista" de Instagram
    alignItems: 'center',     // centra la foto horizontalmente...
    justifyContent: 'center', // ...y verticalmente adentro del anillo
  },

  // Se aplica ENCIMA del anterior (con el array de estilos) solo en "Tu
  // historia". Lo único que hace es pisarle el color del borde: gris en vez de
  // rojo, para que se note que esa es la tuya y no una historia nueva de otro.
  anilloTuya: {
    borderColor: colores.borde,
  },

  foto: {
    width: 52,
    height: 52,
    borderRadius: 26, // la mitad de 52: redonda también, si no se verían las
                      // esquinas cuadradas asomando por el anillo
    backgroundColor: colores.superficie,
  },

  nombre: {
    fontSize: 11,
    color: colores.textoPrincipal,
    marginTop: 4, // separa el nombre del circulito
  },
});
