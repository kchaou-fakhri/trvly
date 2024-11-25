import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '@contexts/home/HomeScreen';
import {TrvlyMapView} from '@contexts/map/TravlyMapView';
import {Routes} from './Routes';

export const MainNavigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={Routes.TrvlyMapView}>
        <Stack.Screen name={Routes.Home} component={HomeScreen} />
        <Stack.Screen name={Routes.TrvlyMapView} component={TrvlyMapView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
