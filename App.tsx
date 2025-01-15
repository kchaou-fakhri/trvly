import {MainNavigation} from '@navigConfig/MainNavigation';
import {GlobalStyle} from '@trvlyUtils/GlobalStyle';
import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from '@redux/store';
import {FullScreenImage} from '@components/image/full_screen_image';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaView style={GlobalStyle.container}>
          <StatusBar barStyle="dark-content" backgroundColor="transparent" />
          <MainNavigation />
          <FullScreenImage />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
