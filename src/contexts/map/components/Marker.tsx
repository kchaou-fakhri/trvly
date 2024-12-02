import {
  CircleLayer,
  ShapeSource,
  SymbolLayer,
  UserLocation,
} from '@rnmapbox/maps';
import React from 'react';
import {FeatureCollection} from 'geojson';
import {OnPressEvent} from '@rnmapbox/maps/lib/typescript/src/types/OnPressEvent';

interface MarkerProps {
  handleNavigation: (event: OnPressEvent) => void;
  featureCollection: FeatureCollection;
}

export const Marker: React.FC<MarkerProps> = ({
  handleNavigation,
  featureCollection,
}) => {
  return (
    <ShapeSource
      id="symbolLocationSource"
      cluster
      onPress={handleNavigation}
      shape={featureCollection}>
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
        }}></SymbolLayer>
    </ShapeSource>
  );
};
