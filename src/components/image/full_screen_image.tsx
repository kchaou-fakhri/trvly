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

interface FullScreenImageProps {
  data?: Result;
  onClick?: () => void;
  customStyles?: any;
}

export const FullScreenImage: React.FC<FullScreenImageProps> = ({
  data,
  onClick,
  customStyles,
}) => {
  const dispatch = useDispatch();
  const fullScreenImageState = useSelector(
    (state: AppState) => state.fullScreenImageState,
  );

  const deviceInfo = useDeviceInfo();

  const handleClose = () => {
    dispatch(closeImage());
  };

  return (
    <>
      {fullScreenImageState?.data && (
        <View style={[styles.container, customStyles]}>
     <StatusBar hidden={true} />      
         <Swiper
          images={fullScreenImageState.data}
          imageHeight={deviceInfo.height}
          imageWidth={deviceInfo.width}
     
        />
            
          
          <Pressable style={styles.backButton} onPress={handleClose}>
            <Icon name="close" size={24} color={COLORES.WhiteTranspartent} />
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    backgroundColor: COLORES.BACKGROUND.Black,

  },
  images: {
    width: '100%',
    height: '100%',
    position: 'absolute',
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