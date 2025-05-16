// Mock react-native
jest.mock('react-native', () => ({
  Dimensions: {
    get: jest.fn().mockReturnValue({ width: 375, height: 812 }),
    addEventListener: jest.fn().mockReturnValue({ remove: jest.fn() }),
  },
  Platform: {
    OS: 'ios',
  },
  StatusBar: {
    currentHeight: 20,
  },
}));

// Mock react-native-device-info
jest.mock('react-native-device-info', () => ({
  hasNotch: jest.fn().mockReturnValue(true),
}));
