import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';
import {useDeviceInfo} from '@hooks/useDeviceInfo';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '@assets/img';
import {COLORES} from '@trvlyUtils/Colors';
import {GlobalStyle, TextStyles} from '@trvlyUtils/GlobalStyle';

export const PrayCard: React.FC = () => {
  return (
    <View style={styles.container}>
      <FastImage source={IMAGES.DhohrBackground} style={styles.img} />
      <View style={styles.info}>
        <Text style={[TextStyles.H4, styles.prayName]}>Dhohr</Text>
        <Text style={[TextStyles.H1, styles.prayTime]}>
          12:40 <Text style={[TextStyles.P, styles.prayTime]}>PM</Text>
        </Text>
        <Text style={[TextStyles.H5, styles.nextPray]}>Next Pray</Text>
        <Text style={[TextStyles.H3, styles.prayTime]}>
          14:40 <Text style={[TextStyles.P, styles.prayTime]}>PM</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 5,
    position: 'absolute',
  },
  info: {
    backgroundColor: COLORES.Transparent.WhiteTranspartent_25DG,
    height: '100%',
    width: 130,
    alignItems: 'flex-start',
    borderRadius: 5,
    paddingStart: 10,
    paddingTop: 25,
  },
  prayName: {
    color: COLORES.White,
  },
  prayTime: {
    color: COLORES.White,
  },

  nextPray: {
    color: COLORES.White,
    marginTop: 20,
  },
});
