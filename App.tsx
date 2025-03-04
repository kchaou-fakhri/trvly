import {MainNavigation} from '@navigConfig/MainNavigation';
import {GlobalStyle} from '@trvlyUtils/GlobalStyle';
import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from '@redux/store';
import {FullScreenImage} from '@components/image/FullScreenImage';
import {useDeviceInfo} from '@hooks/useDeviceInfo';

const App = () => {
  useDeviceInfo();
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaView style={GlobalStyle.container}>
          <StatusBar barStyle="dark-content" />
          <MainNavigation />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
