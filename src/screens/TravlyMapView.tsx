import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {CONSTANTS} from '@utils/constants';
import Mapbox, {
  MapView,
  LocationPuck,
  Camera,
  UserLocation,
} from '@rnmapbox/maps';
import {API_KEY} from '@env';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';

export const TrvlyMapView: React.FC = () => {
  Mapbox.setAccessToken(API_KEY);
  Mapbox.setTelemetryEnabled(false);

  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus | null>(null);

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
        setLocationPermission(status);
      } else if (Platform.OS === 'ios') {
        const status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        setLocationPermission(status);
      }
    };

    requestLocationPermission();
  }, []);

  if (locationPermission !== RESULTS.GRANTED) {
    return (
      <View>
        <Text>
          Location permission is required to show your location on the map.
        </Text>
      </View>
    );
  }
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <MapView style={styles.map} zoomEnabled={true}>
          <Camera followZoomLevel={12} followUserLocation />
          <LocationPuck
            puckBearingEnabled
            puckBearing="heading"
            pulsing={{isEnabled: true}}
          />
          <UserLocation />
        </MapView>
      </View>
    </View>
  );
};

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
