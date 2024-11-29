import {MainNavigation} from '@navigConfig/MainNavigation';
import {GlobalStyle} from '@trvlyUtils/GlobalStyle';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={GlobalStyle.container}>
        <StatusBar barStyle="dark-content" backgroundColor="transparent" />
        <MainNavigation />
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

export default App;
