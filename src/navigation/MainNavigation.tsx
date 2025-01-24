import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from '@contexts/home/HomeScreen';
import {TrvlyMapView} from '@contexts/map/TravlyMapView';
import {Routes} from './Routes';
import {TrvlyStackParamList} from './TRVLYSpaceNavigationTypes';
import {ListOfImagesScreen} from '@contexts/images/ListOfImagesScreen';

export const MainNavigation = () => {
  const Stack = createNativeStackNavigator<TrvlyStackParamList>();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={Routes.TrvlyMapView}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name={Routes.Home} component={HomeScreen} />
        <Stack.Screen name={Routes.TrvlyMapView} component={TrvlyMapView} />
        <Stack.Screen
          name={Routes.ListOfImagesScreen}
          component={ListOfImagesScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
