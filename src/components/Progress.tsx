import React from 'react';
import { COLORES } from '@trvlyUtils/Colors';
import {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Animated, {useSharedValue, withTiming, useAnimatedStyle} from 'react-native-reanimated';

/**
 * ProgressBar is a component representing an animated progress bar.
 * It uses react-native-reanimated for animation and retrieves progress state from the Redux store.
 *
 * @returns {JSX.Element} The ProgressBar component.
 */
export const ProgressBar = () => {
  // Create a shared value to animate the progress bar
  const progress = useSharedValue(0);

  // Get the progress state from the Redux store
  let prog = {height: 5, width: 200};

  // useEffect hook to update the progress animation when the component mounts
  useEffect(() => {
    // Set the progress value with animation using react-native-reanimated
    progress.value = withTiming(200, {duration: 2000});
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      marginLeft: progress.value,
    };
  });

  return (
    <View
      style={[
        {
          height: prog.height,
          backgroundColor: COLORES.Primary,
          width: prog.width,
        },
        styles.container,
      ]}>
      <Animated.View
        style={[
          animatedStyle,
          {
            height: prog?.height,
            backgroundColor: COLORES.White,
          },
        ]}></Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
  },
});