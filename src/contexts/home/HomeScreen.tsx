import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import {Routes} from '@navigConfig/Routes';
import {PrayCard} from './components/PrayCard';
import {COLORES} from '@trvlyUtils/Colors';
import {fetchAdhanTime} from '@store/adhan/Slice';
import {useAppDispatch} from '@redux/store';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<any>>();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAdhanTime());
  }, [dispatch]);

  return (
    <View style={styles.container}>
      <PrayCard />
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
    alignItems: 'center',
    backgroundColor: COLORES.BACKGROUND.Primary,
    padding: 25,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
});
