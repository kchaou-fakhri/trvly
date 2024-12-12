import {StyleSheet} from 'react-native';
import {COLORES} from './Colors';

export const GlobalStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export const TextStyles = StyleSheet.create({
  H1: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  H2: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  H3: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  H4: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  H5: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  H6: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  P: {
    fontSize: 12,
    color: COLORES.Text.Primary,
  },
});
