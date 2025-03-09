import {View, Text, StyleSheet, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useDeviceInfo} from '@hooks/useDeviceInfo';
import FastImage from 'react-native-fast-image';
import {IMAGES} from '@assets/img';
import {COLORES} from '@trvlyUtils/Colors';
import {GlobalStyle, TextStyles} from '@trvlyUtils/GlobalStyle';
import {useSelector} from 'react-redux';
import {AppState} from '@redux/app_state';
import {getCurrentDate, getFormattedTime} from '@helpers/GetTime';
import {Prayers} from '@trvlyUtils/constants';
import {Timer} from '@helpers/Timer';

export const PrayCard: React.FC = () => {
  const state = useSelector((state: AppState) => state.adhanState);

  //State
  const [current, setCurrent] = useState({
    name: '',
    next: '',
    time: '',
    nextTime: '',
    image: undefined,
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (state && state.data?.data.timings) {
      const timings = state.data?.data.timings;
      const currentTime = getCurrentDate();
      if (getFormattedTime(state.data.data.timings.Fajr) > currentTime) {
        setCurrent(Prayers(timings)[0]);
      } else if (
        getFormattedTime(state.data.data.timings.Dhuhr) > currentTime
      ) {
        setCurrent(Prayers(timings)[1]);
      } else if (getFormattedTime(state.data.data.timings.Asr) > currentTime) {
        setCurrent(Prayers(timings)[2]);
      } else if (
        getFormattedTime(state.data.data.timings.Maghrib) > currentTime
      ) {
        setCurrent(Prayers(timings)[3]);
      } else {
        setCurrent(Prayers(timings)[4]);
      }
    }
  }, [state]);

  useEffect(() => {
    if (current.time)
      Timer(
        current.time,
        (differenceHours, differenceMinutes, differenceSeconds) => {
          setHours(differenceHours);
          setMinutes(differenceMinutes);
          setSeconds(differenceSeconds);
        },
      );
  }, [current]);

  // console.log(hours + ':' + minutes + ':' + minutes);

  return (
    <View style={styles.container}>
      <FastImage source={current.image} style={styles.img} />
      {state ? (
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <Text style={[TextStyles.H4, styles.prayName]}>{current.name}</Text>
            <Text style={[TextStyles.H1, styles.prayTime]}>
              {current.time}{' '}
              <Text style={[TextStyles.P, styles.prayTime]}>PM</Text>
            </Text>
            <Text style={[TextStyles.H5, styles.nextPray]}>Next Pray</Text>
            <Text style={[TextStyles.H3, styles.prayTime]}>
              {current.nextTime}{' '}
              <Text style={[TextStyles.P, styles.prayTime]}>PM</Text>
            </Text>
          </View>

          <View style={styles.timer}>
            <Text style={[TextStyles.H3, styles.prayTime]}>
              {`${hours}:${minutes}:${seconds}`}
            </Text>
          </View>
        </View>
      ) : (
        <View style={styles.info}></View>
      )}
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
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
  timer: {
    backgroundColor: COLORES.Transparent.WhiteTranspartent_25DG,
    height: '30%',
    width: '50%',
    right: 25,

    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
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
