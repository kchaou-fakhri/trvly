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

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // Scroll to initial index after component mounts
    if (horizontalScrollRef.current && startedIndex > 0) {
      horizontalScrollRef.current.scrollTo({
        x: screenWidth * startedIndex,
        animated: false,
      });
    }
  }, [startedIndex, screenWidth]);

  const handleClick = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
    item: TrvlyImage,
  ) => {
    setIsImageLoaded(false);
    const {swipeBottom, swipeTop} = props;
    if (e.nativeEvent.contentOffset.y < 0) {
      swipeBottom && swipeBottom(item);
    } else {
      swipeTop && swipeTop(item);
    }
  };

  return (
    <ScrollView
      horizontal={true}
      pagingEnabled={true}
      ref={horizontalScrollRef}>
      {images &&
        images.map((item, index) => {
          return typeof item.url === 'string' &&
            typeof item.caption === 'string' ? (
            <ScrollView key={index} onScrollEndDrag={e => handleClick(e, item)}>
              <View style={GlobalStyle.container}>
                {isImageLoaded ? null : <Progress.Circle />}

                <Image
                  style={{height: imageHeight, width: screenWidth}}
                  source={{uri: item.url}}
                  onLoad={() => setIsImageLoaded(true)}
                  onError={() => {
                    console.log('Error loading image');
                  }}
                />
              </View>
            </ScrollView>
          ) : null;
        })}
    </ScrollView>
  );
};

export default Swiper;
