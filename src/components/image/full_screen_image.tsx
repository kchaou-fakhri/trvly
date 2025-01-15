import {Result} from '@model/entity/unspleash/Result';
import {AppState} from '@redux/app_state';
import {COLORES} from '@trvlyUtils/Colors';
import React, {useEffect} from 'react';
import {Dimensions, Image, Pressable} from 'react-native';
import {StatusBar} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';
import ImageZoom from 'react-native-image-pan-zoom';
import Icon from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import {closeImage} from './usecase/Reducer';

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

  const handleClose = () => {
    dispatch(closeImage());
  };

  useEffect(() => {
    console.log(fullScreenImageState);
  }, [fullScreenImageState]);
  return (
    <>
      {fullScreenImageState?.data && (
        <View style={[styles.container, customStyles]}>
          <StatusBar backgroundColor={COLORES.BACKGROUND.Black} />
          <ImageZoom
            cropWidth={Dimensions.get('window').width}
            cropHeight={Dimensions.get('window').height}
            imageWidth={Dimensions.get('window').width}
            imageHeight={Dimensions.get('window').height}>
            <Image
              source={{
                uri: fullScreenImageState.data?.url,
              }}
              style={styles.images}
            />
          </ImageZoom>

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
