import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';


export const useGSPLocations = (): boolean => {
    const [isEnabled, setIsEnabled] = useState(false)

    useEffect(() => {

        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position);
                setIsEnabled(true)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
        );

    }, [])



    return isEnabled
}

export enum TrvlyPermissionStatus {
    UNAVAILABLE = 'unavailable',
    BLOCKED = 'blocked',
    DENIED = 'denied',
    GRANTED = 'granted',
    LIMITED = 'limited',
}