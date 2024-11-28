import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {PERMISSIONS, request, PermissionStatus} from 'react-native-permissions';

/**
 * Custom hook to request and manage location permission status.
 *
 * @returns {PermissionStatus | null} The current location permission status or null if not determined.
 */
export const useLocationPermission = (): PermissionStatus | null => {
  const [locationPermission, setLocationPermission] =
    useState<PermissionStatus | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      let status: PermissionStatus;
      if (Platform.OS === 'android') {
        status = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
      } else if (Platform.OS === 'ios') {
        status = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      } else {
        status = 'unavailable'; // Handle other platforms
      }
      setLocationPermission(status);
    };

    requestPermission();
  }, []);

  return locationPermission;
};
