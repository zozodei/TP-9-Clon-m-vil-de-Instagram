// ╔════════════════════════════════════════════════════════════════════════════╗
// ║  componentes/CabeceraPerfil  —  LOS DATOS DE ARRIBA DEL PERFIL              ║
// ╚════════════════════════════════════════════════════════════════════════════╝
//
// ¿QUÉ ES ESTE ARCHIVO?
// La parte de arriba de la pantalla de Perfil: la foto grande, los tres números
// (publicaciones, seguidores, seguidos), el nombre, la biografía y el botón de
// "Editar perfil".
//
// Es un componente de presentación puro: recibe los datos, los dibuja, se acabó.
// No hace cuentas, no guarda nada, no tiene lógica.

import { Image, Pressable, Text, View } from 'react-native';
import type { Usuario } from '../../tipos';
import styles from './CabeceraPerfil.styles';

type Props = {
  usuario: Usuario;
  cantidadPosteos: number;
};

// DETALLE PARA LA EXPOSICIÓN: fijate que recibo "cantidadPosteos" ya calculada
// desde afuera, en vez de recibir la lista entera de posteos y hacer .length acá.
//
// ¿Por qué? Porque así este componente no necesita saber NADA de cómo están
// guardadas las publicaciones. Le paso un número y él muestra un número. Si
// mañana los posteos cambian de forma, este archivo no se entera ni se rompe.
// Se le dice "pedir lo mínimo necesario".
const CabeceraPerfil = ({ usuario, cantidadPosteos }: Props) => {
  return (
    <View style={styles.contenedor}>

      {/* ── FILA DE ARRIBA: la foto a la izquierda, los 3 números a la derecha ── */}
      <View style={styles.filaTop}>
        <Image source={{ uri: usuario.fotoPerfil }} style={styles.avatar} />

        <View style={styles.stats}>
          {/* Cada métrica es un bloquecito con el número arriba (en negrita) y
              la palabra abajo (más chica). Los tres son iguales, cambia el dato. */}
          <View style={styles.stat}>
            <Text style={styles.statNumero}>{cantidadPosteos}</Text>
            <Text style={styles.statLabel}>publicaciones</Text>
          </View>

          <View style={styles.stat}>
            {/* toLocaleString('es-AR') pone el punto de miles: 1.200 en vez de
                1200. Se lo aplico solo a seguidores porque es el único que puede
                pasar de mil. */}
            <Text style={styles.statNumero}>{usuario.seguidores.toLocaleString('es-AR')}</Text>
            <Text style={styles.statLabel}>seguidores</Text>
          </View>

          <View style={styles.stat}>
            <Text style={styles.statNumero}>{usuario.seguidos}</Text>
            <Text style={styles.statLabel}>seguidos</Text>
          </View>
        </View>
      </View>

      {/* La biografía tiene un \n adentro (en dataDeUsuario.ts), que es el
          carácter de "salto de línea": por eso se muestra en dos renglones. */}
      <Text style={styles.nombre}>{usuario.nombre}</Text>
      <Text style={styles.bio}>{usuario.biografia}</Text>

      {/* Botón decorativo: no tiene onPress, no hace nada al tocarlo.
          No estaba en la consigna editar el perfil, pero sin el botón la
          pantalla no se parecía a Instagram. */}
      <Pressable style={styles.botonEditar}>
        <Text style={styles.botonEditarTexto}>Editar perfil</Text>
      </Pressable>
    </View>
  );
};

export default CabeceraPerfil;
