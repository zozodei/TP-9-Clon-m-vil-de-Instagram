import { StyleSheet } from 'react-native';
import { colores, medidas } from '../../estilos/tema';

export default StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: colores.fondo,
  },

  lista: {
    width: '100%',
    maxWidth: medidas.anchoMaximoContenido,
    alignSelf: 'center',
  },

  // ── Cabecera del perfil ──
  cabecera: {
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 16,
  },

  filaTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },

  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 20,
    backgroundColor: colores.superficie,
  },

  stats: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  stat: {
    alignItems: 'center',
  },

  statNumero: {
    fontSize: 16,
    fontWeight: '700',
    color: colores.textoPrincipal,
  },

  statLabel: {
    fontSize: 12,
    color: colores.textoPrincipal,
  },

  nombre: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
    marginBottom: 2,
  },

  bio: {
    fontSize: 13,
    color: colores.textoPrincipal,
    lineHeight: 18,
    marginBottom: 12,
  },

  botonEditar: {
    borderWidth: 1,
    borderColor: colores.borde,
    borderRadius: 8,
    paddingVertical: 6,
    alignItems: 'center',
  },

  botonEditarTexto: {
    fontWeight: '600',
    fontSize: 13,
    color: colores.textoPrincipal,
  },

  // ── Pestañas PUBLICACIONES / GUARDADOS / ETIQUETADOS ──
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colores.borde,
    paddingVertical: 10,
    marginBottom: 2,
  },

  tab: {
    fontSize: 11,
    letterSpacing: 0.5,
    color: colores.textoSecundario,
  },

  tabActivo: {
    color: colores.textoPrincipal,
    fontWeight: '700',
    borderBottomWidth: 1,
    borderBottomColor: colores.textoPrincipal,
    paddingBottom: 8,
  },

  // ── Grilla ──
  // margin: 1 deja una línea blanca entre las fotos
  fotoGrilla: {
    flex: 1,
    margin: 1,
    backgroundColor: colores.superficie,
  },
});
