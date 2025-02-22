import { TrvlyImage } from '@model/index';
import React from 'react';
import { StyleSheet, View, Image, ScrollView, Dimensions, Text, StatusBar, Platform, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';


interface SwiperProps {
    images: TrvlyImage[];
    imageHeight?: number;
    imageWidth?: number;
    swipeBottom?: (item: TrvlyImage) => void;
    swipeTop?: (item: TrvlyImage) => void;
}

export const Swiper: React.FC<SwiperProps> = (props) => {
    const handleClick = (e: NativeSyntheticEvent<NativeScrollEvent>, item: TrvlyImage) => {
        const { swipeBottom, swipeTop } = props;
        if (e.nativeEvent.contentOffset.y < 0) {
            swipeBottom && swipeBottom(item);
        } else {
            swipeTop && swipeTop(item);
        }
    };

    const { images, imageHeight, imageWidth } = props;
 

    return (
        <ScrollView horizontal={true} pagingEnabled={true}>
            {images &&
                images.map((item, index) => {
                    return (typeof item.url === 'string' && typeof item.caption === 'string' ? (
                        <ScrollView key={index} onScrollEndDrag={(e) => handleClick(e, item)}>
                            <Image
                                style={{ height: imageHeight, width: imageWidth }}
                                source={{ uri: item.url }}
                            />
                          
                        </ScrollView>
                    ) : null);
                })
            }
        </ScrollView>
    );
};

export default Swiper;

const styles = StyleSheet.create({
    imageText: {
        position: 'absolute',
        bottom: 14,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
});