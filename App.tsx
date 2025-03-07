import {MainNavigation} from '@navigConfig/MainNavigation';
import {GlobalStyle} from '@trvlyUtils/GlobalStyle';
import React from 'react';
import {Provider} from 'react-redux';
import {SafeAreaView, StatusBar} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import store from '@redux/store';
import {useDeviceInfo} from '@hooks/useDeviceInfo';
import {useLocationPermission} from '@hooks/usePermission';
import {COLORES} from '@trvlyUtils/Colors';
import {ADHANService} from '@services/remote/adhan/AdhanServices';

const App = () => {
  useLocationPermission();
  useDeviceInfo();

  ADHANService.getPrayerTime().then(data => {
    console.log(data);
  });
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Provider store={store}>
        <SafeAreaView style={GlobalStyle.container}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor={COLORES.BACKGROUND.Primary}
          />
          <MainNavigation />
        </SafeAreaView>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;
