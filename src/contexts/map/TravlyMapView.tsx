import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Mapbox, {
  MapView,
  LocationPuck,
  Camera,
  UserLocation,
  Images,
  Location,
} from '@rnmapbox/maps';
import {API_KEY} from '@env';
import {IMAGES} from '@assets/img';
import {featureCollection, point} from '@turf/turf';
import {TunisiaPlaces} from '../../data/TemproryData';
import {Point, FeatureCollection} from 'geojson';
import {NavigationButton} from '@components/index';
import {MapBoxService} from '@services/index';
import {Path} from '@model/index';
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import {useLocationPermission} from '@hooks/usePermission';
import {TrvlyPermissionStatus} from '@trvlyUtils/constants';
import {Marker} from './components/Marker';
import {LinePath} from './components/LinePath';
import {DetailsBottomSheet} from './components/DetailsBottomSheet';

export const TrvlyMapView: React.FC = () => {
  Mapbox.setAccessToken(API_KEY);
  Mapbox.setTelemetryEnabled(false);
  const serviceMapBoxInstance = MapBoxService.getInstance();

  const [location, setLocation] = useState<Location>();

  const [_featureCollection, setFeatureCollection] =
    useState<FeatureCollection<Point>>();

  const [cameraZoom, setCameraZoom] = useState(8);
  const [path, setPath] = useState<Path>();
  const [dislpayDetails, setDisplayDetails] = useState<Boolean | null>(null);

  let locationPermission = useLocationPermission();

  useEffect(() => {
    if (locationPermission) {
      console.log(`Permission status: ${locationPermission}`);
    }
  }, [locationPermission]);

  useEffect(() => {
    setFeatureCollection(
      featureCollection(
        TunisiaPlaces.map(place => point([place.longitude, place.latitude])),
      ),
    );
  }, []);

  const handleNavigation = (event: OnPressEvent) => {
    if (!location) return;
    setDisplayDetails(true);

    console.log(location);
    serviceMapBoxInstance
      .getMapBoxNavigationPath(
        {
          longitude: location?.coords.longitude!!,
          latitude: location?.coords.latitude!!,
        },
        {
          longitude: event.coordinates.longitude,
          latitude: event.coordinates.latitude,
        },
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
    setCameraZoom(6);
  };

  const handleRequestPermission = async () => {};

  useEffect(() => {
    console.log(locationPermission);
  }, [locationPermission]);

  return (
    <>
      {locationPermission == TrvlyPermissionStatus.DENIED || null ? (
        <Text>Hello</Text>
      ) : !_featureCollection?.features.length ? null : (
        <View style={styles.page}>
          <View style={styles.container}>
            <MapView style={styles.map} zoomEnabled={true}>
              <Camera followZoomLevel={cameraZoom} followUserLocation />

              <LocationPuck
                puckBearingEnabled
                puckBearing="heading"
                pulsing={{isEnabled: true}}
              />
              <Marker
                handleNavigation={handleNavigation}
                featureCollection={_featureCollection}
              />

              <LinePath path={path!!} />
              <Images images={{icon: IMAGES.Point}} />

              <UserLocation onUpdate={location => setLocation(location)} />
            </MapView>
          </View>
          <NavigationButton text="Navigate" onClick={() => handleNavigation} />
          {dislpayDetails && (
            <DetailsBottomSheet
              display={dislpayDetails}
              onBottomSheetClose={() => {
                setDisplayDetails(false);
              }}
            />
          )}
        </View>
      )}
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
