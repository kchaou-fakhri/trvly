import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {HomeScreen} from './src/screens/HomeScreen';
import {TrvlyMapView} from './src/screens/TravlyMapView';

const App = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="TrvlyMapView">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="TrvlyMapView" component={TrvlyMapView} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
