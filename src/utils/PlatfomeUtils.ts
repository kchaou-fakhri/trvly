import {Dimensions, Platform} from 'react-native';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;
const platform = Platform.OS;

export function isIPhoneX() {
  const X_WIDTH = 375;
  const X_HEIGHT = 812;
  return (
    Platform.OS === 'ios' &&
    ((deviceHeight === X_HEIGHT && deviceWidth === X_WIDTH) ||
      (deviceHeight === X_WIDTH && deviceWidth === X_HEIGHT))
  );
}
