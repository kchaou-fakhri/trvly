module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv',
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        alias: {
          tests: ['./__tests__/'],
          '@contexts': './src/contexts',
          // '@common': './src/common',
          // '@commonAdapter': './src/common/adapter',
          // '@commonIsConnected': './src/common/appConfig',
          '@navigConfig': './src/navigation',
          // '@drawer': './src/navigation/drawer',
          '@redux': './src/redux_configuration',
          // '@styles': './src/styles',
          '@trvlyUtils': './src/utils/',
          '@components': './src/components/',
          '@services': './src/services/',
          '@model': './src/model/',
          '@hooks': './src/hooks/',
          '@assets': './src/assets/',
          '@data': './src/data/',
          // '@config': './src/config/',
          '@helpers': './src/helpers/',
        },
      },
    ],
  ],
};
