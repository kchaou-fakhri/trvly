import {useEffect} from 'react';
import {API_KEY} from '@env';
import Mapbox from '@rnmapbox/maps';

export const useMap = () => {
  useEffect(() => {
    Mapbox.setAccessToken(API_KEY);
    Mapbox.setTelemetryEnabled(false);
  }, []);
};
