import {MainNavigation} from '@navigConfig/MainNavigation';
import {GlobalStyle} from '@trvlyUtils/GlobalStyle';
import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" />
      <MainNavigation />
    </SafeAreaView>
  );
};

export default App;
