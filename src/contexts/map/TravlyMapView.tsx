import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  MapView,
  LocationPuck,
  Camera,
  UserLocation,
  Images,
  Location,
} from '@rnmapbox/maps';

import {IMAGES} from '@assets/img';
import {featureCollection, point} from '@turf/turf';
import {Places} from '../../data/TemproryData';
import {Point, FeatureCollection} from 'geojson';
import {NavigationButton} from '@components/index';
import {Path, TrvlyCity} from '@model/index';
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import {useLocationPermission} from '@hooks/usePermission';
import {TrvlyPermissionStatus} from '@trvlyUtils/constants';
import {Marker} from './components/Marker';
import {LinePath} from './components/LinePath';
import {DetailsBottomSheet} from './components/DetailsBottomSheet';
import {useMap} from '@hooks/useMap';

export const TrvlyMapView: React.FC = () => {
  // Use state
  const [location, setLocation] = useState<Location>();
  const [selectedMarker, setSelectedMarker] = useState<TrvlyCity>();
  const [_featureCollection, setFeatureCollection] =
    useState<FeatureCollection<Point>>();
  const [cameraZoom, setCameraZoom] = useState(8);
  const [path, setPath] = useState<Path>();
  const [dislpayDetails, setDisplayDetails] = useState<Boolean | null>(null);

  // handle permission
  let locationPermission = useLocationPermission();

  // use map
  useMap();

  useEffect(() => {
    setFeatureCollection(
      featureCollection(
        Places.map(place =>
          point([place.point.longitude, place.point.latitude]),
        ),
      ),
    );
  }, []);

  const handleNavigation = (event: OnPressEvent) => {
    if (!location) return;

    setDisplayDetails(true);

    setSelectedMarker(
      Places.filter(
        place =>
          (event.features[0].geometry as Point).coordinates[0]
            .toString()
            .charAt(4) == place.point.longitude.toString().charAt(4),
      )[0],
    );

    // serviceMapBoxInstance
    //   .getMapBoxNavigationPath(
    //     {
    //       longitude: location?.coords.longitude!!,
    //       latitude: location?.coords.latitude!!,
    //     },
    //     {
    //       longitude: event.coordinates.longitude,
    //       latitude: event.coordinates.latitude,
    //     },
    //   )
    //   .then(data => {
    //     setPath({
    //       properties: {},
    //       type: 'Feature',
    //       geometry: {
    //         type: 'LineString',
    //         coordinates: data.routes[0].geometry.coordinates,
    //       },
    //     });
    //   });
    // setCameraZoom(6);
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
              <Camera followUserLocation followZoomLevel={cameraZoom} />

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
              selectedMarker={selectedMarker}
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
