module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.js', '.ts', '.tsx', '.json'],
      },
    ],
    'react-native-worklets/plugin',
  ],
};
