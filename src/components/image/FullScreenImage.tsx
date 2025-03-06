import {COLORES} from '@trvlyUtils/Colors';
import React from 'react';
import {StyleSheet, View, Pressable, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import Swiper from '@components/Swiper';
import {StackNavigationProp} from '@react-navigation/stack';
import {TrvlyStackParamList} from '@navigConfig/TRVLYSpaceNavigationTypes';
import {RouteProp, useRoute} from '@react-navigation/native';
import {Routes} from '@navigConfig/Routes';
import {STATUSBAR_HEIGHT, useDeviceInfo} from '@hooks/useDeviceInfo';

interface FullScreenImageProps {
  navigation: StackNavigationProp<TrvlyStackParamList>;
}

export const FullScreenImage: React.FC<FullScreenImageProps> = ({
  navigation,
}) => {
  const params =
    useRoute<RouteProp<TrvlyStackParamList, Routes.FullScreenImage>>().params;
  const deviceInfo = useDeviceInfo();

  const handleClose = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Swiper
        startedIndex={params.index}
        images={params.data!!}
        imageHeight={deviceInfo.height + STATUSBAR_HEIGHT}
        imageWidth={deviceInfo.width}
      />

      <Pressable style={styles.backButton} onPress={handleClose}>
        <Icon
          name="close"
          size={24}
          color={COLORES.Transparent.WhiteTranspartent}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  images: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    backgroundColor: COLORES.Transparent.WhiteTranspartent,
    width: 50,
    height: 50,
    borderRadius: 40,
    right: 20,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
