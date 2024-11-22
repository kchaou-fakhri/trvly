import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import Mapbox from '@rnmapbox/maps';
import {API_KEY} from '@env';
import {CONSTANTS} from '@utils/constants';

Mapbox.setAccessToken(API_KEY);

const App = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Mapbox.MapView
          style={styles.map}
          zoomEnabled={true}
          styleURL={CONSTANTS.MAPBOX.URL_STYLE}
        />
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    height: '100%',
    width: '100%',
  },
  map: {
    flex: 1,
  },
});
