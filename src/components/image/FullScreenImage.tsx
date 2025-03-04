import {Result} from '@model/entity/unspleash/Result';
import {AppState} from '@redux/app_state';
import {COLORES} from '@trvlyUtils/Colors';
import React, {useEffect} from 'react';
import {Dimensions, Image, Pressable} from 'react-native';
import {StatusBar} from 'react-native';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {closeImage} from './usecase/Reducer';
import Swiper from '@components/Swiper';
import useDeviceInfo from '@hooks/useDeviceInfo';
import { TrvlyImage } from '@model/index';
import {StackNavigationProp} from '@react-navigation/stack';
import { TrvlyStackParamList } from '@navigConfig/TRVLYSpaceNavigationTypes';
import {Route, RouteProp, useRoute} from '@react-navigation/native';
import { Routes } from '@navigConfig/Routes';


interface FullScreenImageProps {
  data?: TrvlyImage[];
  index?: number;
  onClick?: () => void;
  customStyles?: any;
  navigation: StackNavigationProp<TrvlyStackParamList>;
  
}

export const FullScreenImage: React.FC<FullScreenImageProps> = ({
  data,
  onClick,
  customStyles,
  navigation
}) => {

  const params =
  useRoute<
    RouteProp<
      TrvlyStackParamList,
      Routes.FullScreenImage
    >
  >().params;
  const deviceInfo = useDeviceInfo();

  const handleClose = () => {
    navigation.goBack();
  }



  return (

        <View style={styles.container}>

     <StatusBar hidden />
         <Swiper
          images={params.data!!}
          imageHeight={deviceInfo.height}
          imageWidth={deviceInfo.width}
          
        />
            
          
          <Pressable style={styles.backButton} onPress={handleClose}>
            <Icon name="close" size={24} color={COLORES.WhiteTranspartent} />
          </Pressable>
        </View>

  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORES.BACKGROUND.Black,
    flex:1
  },
  images: {
    width: '100%',
    height: '100%',
  },
  backButton: {
    position: 'absolute',
    backgroundColor: COLORES.WhiteTranspartent,
    width: 50,
    height: 50,
    borderRadius: 40,
    right: 20,
    top: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});