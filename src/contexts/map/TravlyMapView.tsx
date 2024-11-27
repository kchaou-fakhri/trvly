import {Button, Platform, StyleSheet, Text, View} from 'react-native';
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
  LineLayer,
} from '@rnmapbox/maps';
import {API_KEY} from '@env';
import {
  request,
  PERMISSIONS,
  RESULTS,
  PermissionStatus,
} from 'react-native-permissions';
import {IMAGES} from '@assets/img';
import {feature, featureCollection, point} from '@turf/turf';
import {TunisiaPlaces} from '../../data/TemproryData';
import Routes from '../../data/Routes.json';
import {Point, FeatureCollection} from 'geojson';
import {COLORES} from '@trvlyUtils/Colors';
import {NavigationButton} from '@components/index';
import {MapBoxService} from '@services/index';
import {Path} from '@model/index';

export const TrvlyMapView: React.FC = () => {
  Mapbox.setAccessToken(API_KEY);
  Mapbox.setTelemetryEnabled(false);
  const serviceMapBoxInstance = MapBoxService.getInstance();

  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus | null>(null);

  const [_featureCollection, setFeatureCollection] =
    useState<FeatureCollection<Point>>();

  const [cameraZoom, setCameraZoom] = useState(8);
  const [path, setPath] = useState<Path>();

  useEffect(() => {
    serviceMapBoxInstance
      .getMapBoxNavigationPath(
        {longitude: 11.068243, latitude: 35.503681},
        {longitude: 10.705082, latitude: 35.29619},
      )
      .then(data => {
        setPath({
          properties: {},
          type: 'Feature',
          geometry: {
            type: 'LineString',
            coordinates: data.routes[0].geometry.coordinates,
          },
        });
      });
  }, []);
  useEffect(() => {
    setFeatureCollection(
      featureCollection(
        TunisiaPlaces.map(place => point([place.longitude, place.latitude])),
      ),
    );
  }, []);

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

  const handleNavigation = () => {
    setFeatureCollection(
      featureCollection([
        point([
          Routes.waypoints[0].location[0],
          Routes.waypoints[0].location[1],
        ]),
        point([
          Routes.waypoints[1].location[0],
          Routes.waypoints[1].location[1],
        ]),
      ]),
    );
    setCameraZoom(14);
  };

  if (locationPermission !== RESULTS.GRANTED) {
    return (
      <View>
        <Text>
          Location permission is required to show your location on the map.
        </Text>
      </View>
    );
  }

  return !_featureCollection?.features.length ? null : (
    <>
      <View style={styles.page}>
        <View style={styles.container}>
          <MapView style={styles.map} zoomEnabled={true}>
            <Camera followZoomLevel={cameraZoom} followUserLocation />
            <LocationPuck
              puckBearingEnabled
              puckBearing="heading"
              pulsing={{isEnabled: true}}
            />

            <ShapeSource
              id="symbolLocationSource"
              cluster
              onPress={e => console.log(e)}
              shape={_featureCollection}>
              {_featureCollection?.features.length > 1 ? (
                <>
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
                </>
              ) : (
                <></>
              )}

              <SymbolLayer
                id="symbolLocationSymbols"
                minZoomLevel={1}
                style={{
                  iconImage: 'icon',
                  iconSize: 0.3,
                  iconAllowOverlap: true,
                  iconAnchor: 'center',
                }}
              />
            </ShapeSource>
            <ShapeSource id="line-source" lineMetrics={true} shape={path}>
              <LineLayer
                id="line-layer"
                style={{
                  lineColor: COLORES.Primary,
                  lineCap: 'round',
                  lineJoin: 'round',
                  lineWidth: 3,
                }}
              />
            </ShapeSource>
            <Images images={{icon: IMAGES.Point}} />

            <UserLocation />
          </MapView>
        </View>
        <NavigationButton text="Navigate" onClick={handleNavigation} />
      </View>
    </>
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
