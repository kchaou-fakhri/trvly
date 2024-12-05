import {useEffect, useState} from 'react';
import {NativeModules, Platform} from 'react-native';

export const useDeviceLanguage = () => {
  const [language, setLanguage] = useState<string | null>(null);

  useEffect(() => {
    const getDeviceLanguage = () => {
      let deviceLanguage: string;
      if (Platform.OS === 'ios') {
        deviceLanguage =
          NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0];
      } else {
        deviceLanguage = NativeModules.I18nManager.localeIdentifier;
      }
      setLanguage(deviceLanguage);
    };

    getDeviceLanguage();
  }, []);

  return language;
};
