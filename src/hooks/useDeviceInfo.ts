import { useState, useEffect } from 'react';
import { Dimensions } from 'react-native';

const useDeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    useEffect(() => {
        const onChange = ({ window }: { window: { width: number; height: number } }) => {
            setDeviceInfo({
                width: window.width,
                height: window.height,
            });
        };

        const subscription = Dimensions.addEventListener('change', onChange);

        return () => {
            subscription?.remove();
        };
    }, []);

    return deviceInfo;
};

export default useDeviceInfo;