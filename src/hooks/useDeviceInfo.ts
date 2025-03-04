import { useState, useEffect } from 'react';
import { Platform, NativeModules, Dimensions } from 'react-native';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 20 : StatusBarManager.HEIGHT;

/**
 * Hook to retrieve the device's screen dimensions
 * @return {object} - An object containing the width and height of the device's screen
 */
const useDeviceInfo = () => {
    const [deviceInfo, setDeviceInfo] = useState({
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
    });

    useEffect(() => {
        // Handler to update deviceInfo state when screen dimensions change
        const onChange = ({ window }: { window: { width: number; height: number } }) => {
            setDeviceInfo({
                width: window.width,
                height: window.height,
            });
        };

        // Add event listener for screen dimension changes
        const subscription = Dimensions.addEventListener('change', onChange);

        // Clean up event listener on component unmount
        return () => {
            subscription?.remove();
        };
    }, []);

    return deviceInfo;
};

export { useDeviceInfo, STATUSBAR_HEIGHT };
