import {Result} from '@model/entity/unspleash/Result';
import {Routes} from '@navigConfig/Routes';
import {TrvlyStackParamList} from '@navigConfig/TRVLYSpaceNavigationTypes';
import {RouteProp, useRoute} from '@react-navigation/native';
import {UNSpleashService} from '@services/remote/unspleash/UNSpleashService';
import {FlashList} from '@shopify/flash-list';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  StatusBar,
  Pressable,
  ScrollView,
} from 'react-native';
import {getImageDimensions} from '@helpers/FullScreenImageHelper';
import {TrvlyImage} from '@model/index';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export const ListOfImagesScreen: React.FC = () => {
  //Navigation block
  const params =
    useRoute<RouteProp<TrvlyStackParamList, Routes.ListOfImagesScreen>>()
      .params;
  const navigation =
    useNavigation<NativeStackNavigationProp<TrvlyStackParamList>>();

  //State block
  const [images, setImages] = useState<Result[]>([]);
  const [firstHalf, setFirstHalf] = useState<Result[]>([]);
  const [secondHalf, setSecondHalf] = useState<Result[]>([]);

  //Effect block
  useEffect(() => {
    UNSpleashService.getPhotosByPlace(1, 30, params.place).then(data => {
      setImages(data.results);
    });
  }, []);

  //Helper block
  const handleDisplayImage = (index: number) => {
    const res: TrvlyImage[] = images.map(result => {
      return {url: result.urls.regular, caption: result.alt_description};
    });
    navigation.navigate(Routes.FullScreenImage, {
      data: res,
      index: index,
    });
    console.log('------', index);
  };
  const RenderItem = ({item, index}: {item: Result; index: number}) => {
    return (
      <Pressable
        onPress={() => handleDisplayImage(index)}
        style={styles.imageContainer}>
        <Image
          source={{uri: item.urls.regular}}
          style={[
            styles.image,
            {height: getImageDimensions(item.height, item.width)},
          ]}
        />
      </Pressable>
    );
  };

  useEffect(() => {
    if (images.length > 0) {
      setFirstHalf(images.slice(0, Math.ceil(images.length / 2)));
      setSecondHalf(images.slice(Math.ceil(images.length / 2)));
    }
  }, [images]);

  return images.length > 0 ? (
    <ScrollView style={styles.container}>
      <StatusBar hidden={true} />
      <View style={styles.row}>
        <FlashList
          scrollEnabled={false}
          data={firstHalf}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} />
          )}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
          estimatedItemSize={images.length / 2}
        />
        <FlashList
          scrollEnabled={false}
          data={secondHalf}
          renderItem={({item, index}) => (
            <RenderItem item={item} index={index} />
          )}
          keyExtractor={item => item.id}
          removeClippedSubviews={true}
          estimatedItemSize={images.length / 2}
        />
      </View>
    </ScrollView>
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  contentContainer: {
    paddingBottom: 16,
  },

  imageContainer: {
    flex: 1,
    margin: 1, // Small margin for spacing between images
  },
  image: {
    width: '100%',
  },
});
