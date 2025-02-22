import {useEffect} from 'react';
import {MAPBOX_KEY} from '@env';
import Mapbox from '@rnmapbox/maps';

export const useMap = () => {
  useEffect(() => {
    Mapbox.setAccessToken(MAPBOX_KEY);
    Mapbox.setTelemetryEnabled(false);
  }, []);
};
