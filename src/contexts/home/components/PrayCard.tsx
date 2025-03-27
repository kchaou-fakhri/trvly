import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect, useState} from 'react';
import FastImage from 'react-native-fast-image';
import {COLORES} from '@trvlyUtils/Colors';
import {TextStyles} from '@trvlyUtils/GlobalStyle';
import {useSelector} from 'react-redux';
import {AppState} from '@redux/app_state';
import {getCurrentDate, getFormattedTime} from '@helpers/GetTime';
import {Prayers, ZERO} from '@trvlyUtils/constants';
import {Timer} from '@helpers/Timer';
import {isNotEmpty} from '@trvlyUtils/Functions';
import {useIntl} from 'react-intl';
import {TranslationText} from '@trvlyUtils/translation/components/TranslationText';
import {TranslationMessages} from '@trvlyUtils/translation';

export const PrayCard: React.FC = () => {
  const state = useSelector((state: AppState) => state.adhanState);
  const intl = useIntl();

  //State
  const [current, setCurrent] = useState({
    name: {defaultMessage: '', textTranslation: ''},
    next: {defaultMessage: '', textTranslation: ''},
    time: '',
    nextTime: '',
    image: undefined,
  });
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  const getCurrentPrayer = () => {
    if (state && state.data?.data.timings) {
      const timings = state.data?.data.timings;
      const currentTime = getCurrentDate();
      setIsMounted(true);
      if (getFormattedTime(timings.Fajr) > currentTime) {
        setCurrent(Prayers(timings)[0]);
      } else if (getFormattedTime(timings.Dhuhr) > currentTime) {
        setCurrent(Prayers(timings)[1]);
      } else if (getFormattedTime(timings.Asr) > currentTime) {
        setCurrent(Prayers(timings)[2]);
      } else if (getFormattedTime(timings.Maghrib) > currentTime) {
        setCurrent(Prayers(timings)[3]);
      } else {
        setCurrent(Prayers(timings)[4]);
      }
    }
  };
  useEffect(() => {
    getCurrentPrayer();
  }, [state]);

  useEffect(() => {
    if (isNotEmpty(current.time)) {
      Timer(
        current.time,
        (differenceHours, differenceMinutes, differenceSeconds) => {
          setHours(differenceHours);
          setMinutes(differenceMinutes);
          setSeconds(differenceSeconds);
        },
      );
    }
  }, [current]);

  useEffect(() => {
    if (hours === 0 && minutes === 0 && seconds === 0 && isMounted) {
      setMessage(intl.formatMessage(TranslationMessages.Prayer));
      setTimeout(() => {
        setMessage(null);
        getCurrentPrayer();
        setIsMounted(false);
      }, 10000);
    }
  }, [seconds]);

  return (
    <View style={styles.container}>
      <FastImage source={current.image} style={styles.img} />
      {state.data && isMounted ? (
        <View style={styles.infoContainer}>
          <View style={styles.info}>
            <TranslationText
              style={[TextStyles.H4, styles.prayName]}
              textTranslation={current.name.textTranslation}
              defaultMessage={current.name.defaultMessage}
            />
            <Text style={[TextStyles.H1, styles.prayTime]}>
              {Number(current.time) < 10 ? ZERO + current.time : current.time}{' '}
              {/* <TranslationText
                textTranslation={TranslationMessages.AM.textTranslation}
                defaultMessage={TranslationMessages.Prayer.defaultMessage}
                style={[TextStyles.P, styles.prayTime]}
              /> */}
            </Text>
            <TranslationText
              style={[TextStyles.H5, styles.nextPray]}
              textTranslation={TranslationMessages.NextPray.textTranslation}
              defaultMessage={
                TranslationMessages.NextPray.defaultMessage
              }></TranslationText>
            <Text style={[TextStyles.H3, styles.prayTime]}>
              {Number(current.nextTime) < 10
                ? ZERO + current.nextTime
                : current.nextTime}{' '}
              {/* <TranslationText
                textTranslation={TranslationMessages.PM.textTranslation}
                defaultMessage={TranslationMessages.PM.defaultMessage}
                style={[TextStyles.P, styles.prayTime]}
              /> */}
            </Text>
          </View>

          <View style={styles.timer}>
            <Text style={[TextStyles.H3, styles.prayTime]}>
              {message ||
                `${hours < 10 ? ZERO + hours : hours}:${
                  minutes < 10 ? ZERO + minutes : minutes
                }:${seconds < 10 ? ZERO + seconds : seconds}`}
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
