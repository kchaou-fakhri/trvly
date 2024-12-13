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
import {Point, FeatureCollection} from 'geojson';
import {NavigationButton} from '@components/index';
import {Path, TrvlyCity} from '@model/index';
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';
import {useLocationPermission} from '@hooks/usePermission';
import {TrvlyPermissionStatus} from '@trvlyUtils/constants';
import {Marker} from './components/Marker';
import {LinePath} from './components/LinePath';
import {useMap} from '@hooks/useMap';
import {MapLocalService} from '@services/index';
import {DetailsBottomSheet} from './components/DetailsBottomSheet';
import LocationImage from './components/LocationImage';

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
    MapLocalService.getPlaces().then(places => {
      setFeatureCollection(
        featureCollection(
          places.map(place =>
            point([place.point.longitude, place.point.latitude]),
          ),
        ),
      );
    });
  }, []);

  const handleNavigation = async (event: OnPressEvent) => {
    if (!location) return;

    setDisplayDetails(true);

    setSelectedMarker(
      await MapLocalService.getPlaceById(
        (event.features[0].geometry as Point).coordinates[0].toString(),
      ),
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
          {dislpayDetails && (
            <>
              <DetailsBottomSheet
                selectedMarker={selectedMarker}
                display={dislpayDetails}
                onBottomSheetClose={() => {
                  setDisplayDetails(false);
                }}
              />
            </>
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
