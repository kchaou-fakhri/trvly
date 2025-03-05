import {useLocationPermission} from '@hooks/usePermission';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Routes} from '@navigConfig/Routes';

export const HomeScreen: React.FC = () => {
  // handle permission
  let locationPermission = useLocationPermission();
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          navigation.navigate(Routes.TrvlyMapView);
        }}>
        <Text style={styles.welcomeText}>Welcome to the Home Screen!</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
