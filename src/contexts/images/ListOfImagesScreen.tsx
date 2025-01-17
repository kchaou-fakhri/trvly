import {Result} from '@model/entity/unspleash/Result';
import {Routes} from '@navigConfig/Routes';
import {TrvlyStackParamList} from '@navigConfig/TRVLYSpaceNavigationTypes';
import {RouteProp, useRoute} from '@react-navigation/native';
import {UNSpleashService} from '@services/remote/unspleash/UNSpleashService';
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Image, StyleSheet} from 'react-native';

export const ListOfImagesScreen: React.FC = () => {
  const [images, setImages] = useState<Result[]>([]);
  const params =
    useRoute<RouteProp<TrvlyStackParamList, Routes.ListOfImagesScreen>>()
      .params;

  useEffect(() => {
    UNSpleashService.getPhotosByPlace(1, 30, params.place).then(data => {
      setImages(data.results);
    });
  }, []);
  const RenderItem = ({item}: {item: Result}) => (
    <View style={styles.imageContainer}>
      <Image source={{uri: item.urls.regular}} style={styles.image} />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>List of Images</Text>
      <FlatList
        data={images}
        renderItem={({item}) => <RenderItem item={item} />}
        keyExtractor={images => images.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 8,
  },
});
