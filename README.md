# React Native Responsive Size 📱

[![npm version](https://img.shields.io/npm/v/@akshay-khapare/react-native-responsive-size.svg)](https://www.npmjs.com/package/@akshay-khapare/react-native-responsive-size)
[![npm downloads](https://img.shields.io/npm/dm/@akshay-khapare/react-native-responsive-size.svg)](https://www.npmjs.com/package/@akshay-khapare/react-native-responsive-size)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A production-ready, performance-optimized React Native utility for managing responsive dimensions across different screen sizes and orientations. Built with TypeScript and designed for reliability.

## Personal Note

This package was created to solve specific responsive design challenges in my personal React Native projects. I've made it public in case others find it useful for their projects. While I maintain it primarily for my own use, I'm happy to share it with the community.
## ✨ Features

- 📱 Responsive calculations based on screen dimensions
- 🔄 Automatic updates on screen rotation
- ⚡ Lightweight with zero dependencies
- 🛡️ Full TypeScript support with proper typings
- 📊 Platform-specific handling (iOS/Android)
- 🎯 Notch/Dynamic Island detection
- 📏 Extended functionality for width, height, spacing, and radius
- 🔃 Automatic cleanup to prevent memory leaks
- 🚀 **NEW:** Performance optimization with value caching
- 🧰 **NEW:** Configurable with custom options
- 🔍 **NEW:** Comprehensive error handling
- 🧪 **NEW:** Fully tested with Jest
## 📦 Installation

```bash
# Using npm
npm install react-native-device-info @akshay-khapare/react-native-responsive-size

# Using yarn
yarn add react-native-device-info @akshay-khapare/react-native-responsive-size

# Using pnpm
pnpm add react-native-device-info @akshay-khapare/react-native-responsive-size
```

Make sure to install `react-native-device-info` as it is a required peer dependency for this package.

### Requirements
- React Native >= 0.60.0
- React Native Device Info >= 8.0.0

## 🚀 Usage

### Basic Example

```typescript
import { ResValue, wp, hp, fs, spacing, radius } from '@akshay-khapare/react-native-responsive-size';

// Responsive value that scales with screen height
const buttonHeight = ResValue(50);  // Consistent 50px base height across devices

// Width percentage (0-100)
const containerWidth = wp(90);  // 90% of screen width

// Height percentage (0-100)
const containerHeight = hp(50); // 50% of screen height

// Font size
const titleSize = fs(24);      // Responsive font size

// Spacing
const padding = spacing(16);    // Responsive padding

// Border radius
const borderRadius = radius(8); // Responsive border radius
```

### Cleanup in App.tsx

To prevent memory leaks, make sure to clean up event listeners when your app unmounts:

```typescript
import { cleanup } from '@akshay-khapare/react-native-responsive-size';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    // Cleanup function to remove dimension listeners
    return () => cleanup();
  }, []);

  return (
    // Your app content
  );
}
```

### NEW: Configuration Options

```typescript
import { configure } from '@akshay-khapare/react-native-responsive-size';

// Configure the library with custom options
configure({
  // Use a different standard screen height (default: 812)
  standardScreenHeight: 844, // iPhone 12/13 height
  
  // Enable/disable performance caching (default: true)
  enableCaching: true
});
```

## 📚 API Reference

### Functions

- `ResValue(baseSize: number, standardScreenHeight?: number)`: Calculate responsive values that scale proportionally with screen height
  - Perfect for creating consistent UI elements without direct width/height dependencies
  - Automatically adjusts sizes based on device screen proportions
  - Performance-optimized with caching for frequent calculations
  - Example uses:
    ```typescript
    // Button height that scales consistently across devices
    const buttonHeight = ResValue(50);  // Base size of 50px
    
    // Container padding that maintains proportions
    const padding = ResValue(20);       // Base padding of 20px
    
    // Custom scaling with different reference height
    const customSize = ResValue(30, 720); // Base: 30px, Reference: 720px
    ```
- `wp(percentage: number)`: Convert width percentage to responsive pixels
  - Handles invalid inputs with graceful degradation
  - Performance-optimized with caching
- `hp(percentage: number)`: Convert height percentage to responsive pixels
  - Handles invalid inputs with graceful degradation
  - Performance-optimized with caching
- `fs(size: number)`: Convert font size to responsive size
  - Safe handling of negative inputs
- `spacing(size: number)`: Convert spacing value to responsive size
  - Safe handling of negative inputs
- `radius(size: number)`: Convert border radius to responsive size
  - Safe handling of negative inputs
- `cleanup()`: Remove dimension change listeners and clear caches
- `hasNotch()`: Check if device has a notch/dynamic island
- `configure(options)`: Configure the library with custom options
  - `standardScreenHeight`: Custom reference height (default: 812px - iPhone X)
  - `enableCaching`: Enable/disable performance caching (default: true)
- `getScreenDimensions()`: Get current screen dimensions
  - Returns `{ width: number, height: number }`

## Example Component

```typescript
import { wp, hp, fs, spacing, radius } from '@akshay-khapare/react-native-responsive-size';

const styles = StyleSheet.create({
  container: {
    width: wp(90),
    height: hp(20),
    padding: spacing(16),
    borderRadius: radius(8),
  },
  text: {
    fontSize: fs(16),
    marginBottom: spacing(8),
  },
});
```

## 🏆 Best Practices

1. Always call `cleanup` in your App.tsx useEffect return function to prevent memory leaks
2. Use consistent base sizes across your app for uniform scaling
3. Test your UI on different screen sizes and orientations
4. Consider platform-specific adjustments when necessary
5. For better performance, avoid calling responsive functions in tight loops
6. Consider setting `enableCaching: false` if you're experiencing unexpected behavior
7. For highly dynamic UIs, benchmark with and without caching to find optimal settings

## 📊 Performance Considerations

This library is optimized for performance with built-in caching. When you use functions like `ResValue`, `wp`, or `hp` multiple times with the same parameters, the results are cached to avoid recalculation. 

The cache is automatically invalidated when:
- Screen dimensions change (rotation)
- Configuration is updated via `configure()`
- The library is cleaned up with `cleanup()`

If you're experiencing any issues with cached values not updating as expected, you can disable caching:

```typescript
import { configure } from '@akshay-khapare/react-native-responsive-size';

configure({ enableCaching: false });
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development

```bash
# Install dependencies
npm install

# Build the package
npm run build

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## 🔄 Changelog

See [CHANGELOG.md](./CHANGELOG.md) for details on version updates.

## 📜 License

MIT


