jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('@react-native-community/netinfo', () => ({
  addEventListener: jest.fn(() => () => {}),
  fetch: jest.fn(() =>
    Promise.resolve({isConnected: true, isInternetReachable: true}),
  ),
  useNetInfo: jest.fn(() => ({
    isConnected: true,
    isInternetReachable: true,
  })),
}));

jest.mock('react-native-fast-image', () => 'FastImage');

jest.mock('react-native-keyboard-manager', () => ({
  setEnable: jest.fn(),
  setEnableAutoToolbar: jest.fn(),
  setShouldShowToolbarPlaceholder: jest.fn(),
  setKeyboardDistanceFromTextField: jest.fn(),
}));
