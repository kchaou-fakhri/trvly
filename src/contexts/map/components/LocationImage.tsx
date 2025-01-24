import {displayImage} from '@components/image/usecase/Reducer';
import {TrvlyImage} from '@model/index';
import {Routes} from '@navigConfig/Routes';
import {TrvlyStackParamList} from '@navigConfig/TRVLYSpaceNavigationTypes';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {COLORES} from '@trvlyUtils/Colors';
import React, {useState} from 'react';
import {
  FlatList,
  Image,
  ImageProps,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';

interface LocationImageProps extends ImageProps {
  images: TrvlyImage[] | undefined;
  place: string | undefined;
}

const LocationImage: React.FC<LocationImageProps> = ({images, place}) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState<number>(-1);
  const navigation =
    useNavigation<NativeStackNavigationProp<TrvlyStackParamList>>();

  const ImageItem = ({item, index}: {item: TrvlyImage; index: number}) => {
    const handleSelectedImage = () => {
      if (images) {
        dispatch(displayImage(images[index]));
      }
      setSelected(index);
    };

    const handleLastImage = () => {
      navigation.navigate(Routes.ListOfImagesScreen, {
        place: place!!,
      });
      setSelected(images!.length - 1);
    };

    return (
      <>
        {index === images!.length - 1 ? (
          <Pressable
            style={styles.lastImageContainer}
            onPress={handleLastImage}>
            <View style={styles.lastImage}>
              <Image
                source={{uri: item.url}}
                style={[
                  styles.image,
                  selected == index
                    ? {borderColor: COLORES.Primary}
                    : {borderColor: COLORES.White},
                  ,
                ]}
              />
              <Text style={styles.msgLastImage}>+30</Text>
            </View>
          </Pressable>
        ) : (
          <Pressable
            style={styles.imageContainer}
            onPress={handleSelectedImage}>
            <Image
              source={{uri: item.url}}
              style={[
                styles.image,
                selected == index
                  ? {borderColor: COLORES.Primary}
                  : {borderColor: COLORES.White},
              ]}
            />
          </Pressable>
        )}
      </>
    );
  };

  return (
    <View style={[styles.container]}>
      {images && (
        <FlatList
          style={styles.flatlistStyle}
          data={images}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item, index}) => (
            <ImageItem item={item} index={index} />
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastImageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastImage: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
  },
  msgLastImage: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 5,
    backgroundColor: COLORES.TransparentLightGray,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: COLORES.White,
    fontSize: 15,
  },
  image: {
    width: 45,
    height: 45,
    resizeMode: 'cover',
    borderRadius: 5,

    borderWidth: 3,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  flatlistStyle: {
    backgroundColor: COLORES.TransparentLightGray,
    height: 60,
    paddingEnd: 10,
    paddingStart: 10,
    borderRadius: 10,
    marginBottom: 80,
  },
});

export default LocationImage;
