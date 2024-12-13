import {TrvlyImage} from '@model/index';
import {COLORES} from '@trvlyUtils/Colors';
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  ImageProps,
  Pressable,
  StyleSheet,
  Touchable,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

interface LocationImageProps extends ImageProps {
  images: TrvlyImage[] | undefined;
}

const LocationImage: React.FC<LocationImageProps> = ({images}) => {
  const [selected, setSelected] = useState<number>(-1);

  const ImageItem = ({item, index}: {item: TrvlyImage; index: number}) => {
    const handleSelectedImage = () => {
      console.log('selected', index);
      setSelected(index);
    };
    return (
      <Pressable style={styles.imageContainer} onPress={handleSelectedImage}>
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
