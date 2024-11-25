import {MainNavigation} from '@navigConfig/MainNavigation';
import {GlobalStyle} from '@utils/GlobalStyle';
import React from 'react';
import {SafeAreaView} from 'react-native';

const App = () => {
  return (
    <SafeAreaView style={GlobalStyle.container}>
      <MainNavigation />
    </SafeAreaView>
  );
};

export default App;
