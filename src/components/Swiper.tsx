import {TrvlyImage} from '@model/index';
import {GlobalStyle} from '@trvlyUtils/GlobalStyle';
import React, {useEffect, useRef, useState} from 'react';
import {
  Image,
  ScrollView,
  View,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Dimensions,
} from 'react-native';
import * as Progress from 'react-native-progress';
import FastImage from 'react-native-fast-image';

interface SwiperProps {
  images: TrvlyImage[];
  imageHeight?: number;
  imageWidth?: number;
  startedIndex?: number;
  swipeBottom?: (item: TrvlyImage) => void;
  swipeTop?: (item: TrvlyImage) => void;
}

export const Swiper: React.FC<SwiperProps> = props => {
  const horizontalScrollRef = useRef<ScrollView>(null);
  const {images, imageHeight, imageWidth, startedIndex = 0} = props;
  const screenWidth = imageWidth || Dimensions.get('window').width;

  const [currentIndex, setCurrentIndex] = useState(startedIndex);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    if (horizontalScrollRef.current && startedIndex > 0) {
      horizontalScrollRef.current.scrollTo({
        x: screenWidth * startedIndex,
        animated: false,
      });
    }
  }, [startedIndex, screenWidth]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newIndex = Math.round(
      event.nativeEvent.contentOffset.x / screenWidth,
    );
    setCurrentIndex(newIndex);
    setIsImageLoaded(false); // Reset loading state when changing images
  };

  return (
    <ScrollView
      horizontal
      pagingEnabled
      ref={horizontalScrollRef}
      onMomentumScrollEnd={handleScroll} // Detect when scrolling stops
      showsHorizontalScrollIndicator={false}>
      {images &&
        images.map((item, index) => (
          <View key={index} style={{width: screenWidth, height: imageHeight}}>
            {index === currentIndex && ( // Load only the current image
              <View style={GlobalStyle.container}>
                <FastImage
                  style={{height: imageHeight, width: screenWidth}}
                  source={{uri: item.url}}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => console.log('Error loading image')}
                />
              </View>
            )}
          </View>
        ))}
    </ScrollView>
  );
};

export default Swiper;
