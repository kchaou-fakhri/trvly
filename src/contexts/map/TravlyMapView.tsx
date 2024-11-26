import {Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Mapbox, {
  MapView,
  LocationPuck,
  Camera,
  UserLocation,
  ShapeSource,
  SymbolLayer,
  Images,
  CircleLayer,
} from '@rnmapbox/maps';
import {API_KEY} from '@env';
import {
  check,
  request,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';
import {IMAGES} from '@assets/img';
import {feature, featureCollection, point} from '@turf/turf';
import {TunisiaPlaces} from '../../data/TemproryData';

export const TrvlyMapView: React.FC = () => {
  Mapbox.setAccessToken(API_KEY);
  Mapbox.setTelemetryEnabled(false);

  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus | null>(null);

  const _featureCollection = featureCollection(
    TunisiaPlaces.map(place => point([place.longitude, place.latitude])),
  );

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
          <Camera followZoomLevel={4} followUserLocation />
          <LocationPuck
            puckBearingEnabled
            puckBearing="heading"
            pulsing={{isEnabled: true}}
          />
          <UserLocation />

          <ShapeSource
            id="symbolLocationSource"
            cluster
            onPress={e => console.log(e)}
            shape={_featureCollection}>
            <CircleLayer
              id="clusteredPoints"
              sourceLayerID="symbolLocationSource"
              filter={['has', 'point_count']}
              style={{
                circleColor: 'red',
                circleRadius: 20,
                circleStrokeWidth: 1,
                circleOpacity: 0.6,
                circleStrokeColor: 'white',
              }}
            />
            <SymbolLayer
              id="symbolLocationSymbols"
              filter={['!', ['has', 'point_count']]}
              minZoomLevel={1}
              style={{
                iconImage: 'icon',
                iconSize: 0.3,
                iconAllowOverlap: true,
                iconAnchor: 'center',
              }}
            />
          </ShapeSource>
          <Images images={{icon: IMAGES.Point}} />
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
  icon: {
    width: 24,
    height: 24,
  },
});
