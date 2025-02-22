import {displayImage} from '@components/image/usecase/Reducer';
import { ProgressBar } from '@components/Progress';
import {Result} from '@model/entity/unspleash/Result';
import {Routes} from '@navigConfig/Routes';
import {TrvlyStackParamList} from '@navigConfig/TRVLYSpaceNavigationTypes';
import {RouteProp, useRoute} from '@react-navigation/native';
import {UNSpleashService} from '@services/remote/unspleash/UNSpleashService';
import {isIPhoneX} from '@trvlyUtils/PlatfomeUtils';
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  Linking,
  StatusBar,
  Pressable,
} from 'react-native';
import MasonryList from 'react-native-masonry-list';
import {useDispatch} from 'react-redux';

export const ListOfImagesScreen: React.FC = () => {
  const dispatch = useDispatch();

  const [images, setImages] = useState<Result[]>([]);
  const params =
    useRoute<RouteProp<TrvlyStackParamList, Routes.ListOfImagesScreen>>()
      .params;

  useEffect(() => {
    UNSpleashService.getPhotosByPlace(1, 30, params.place).then(data => {
      setImages(data.results);
    });
  }, []);

  const handleDisplayImage = (image: Result) => {
    console.log('--->', image.urls.full);
    dispatch(
      displayImage({url: image.urls.full, caption: image.alt_description}),
    );
  };
  const RenderItem = ({item}: {item: Result}) => {
    console.log('--->', item.urls.regular);

    return (
      <Pressable
        onPress={() => handleDisplayImage}
        style={styles.imageContainer}>
        <Image source={{uri: item.urls.regular}} style={styles.image} />
      </Pressable>
    );
  };

  return (
      images ? (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <MasonryList
        images={images.map(item => ({
          uri: item.urls.regular,
          id: item.id}))}
        imageContainerStyle={styles.imageContainer}
        onPressImage={handleDisplayImage} 
        />
      {/* <FlatList
        data={images}
        numColumns={3}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={item => item.id}
        removeClippedSubviews={true}
      /> */}
    </View>
  ):  <View style={styles.container}>
        <ProgressBar />
    </View>)
  
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  row: {
    justifyContent: 'space-between',
  },
  contentContainer: {
    paddingBottom: 16,
  },
  imageContainer: {
    flex: 1, // This ensures that the container takes up equal space in each column
    margin: 1, // Small margin for spacing between images
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
