# React Native Responsive Size

A lightweight, efficient React Native utility for managing responsive dimensions across different screen sizes and orientations.

## Personal Note

This package was created to solve specific responsive design challenges in my personal React Native projects. I've made it public in case others find it useful for their projects. While I maintain it primarily for my own use, I'm happy to share it with the community.
## Features

- 📱 Responsive calculations based on screen dimensions
- 🔄 Automatic updates on screen rotation
- ⚡ Lightweight with zero dependencies
- 🛡️ TypeScript support
- 📊 Platform-specific handling (iOS/Android)
- 🎯 Notch/Dynamic Island detection
- 📏 Extended functionality for width, height, spacing, and radius
- 🔃 Automatic cleanup to prevent memory leaks
## Installation

```bash
npm install react-native-device-info
npm install @akshay-khapare/react-native-responsive-size
# or
yarn add react-native-device-info
yarn add @akshay-khapare/react-native-responsive-size
```

Make sure to install `react-native-device-info` as it is a required peer dependency for this package.

## Usage

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

## API Reference

### Functions

- `ResValue(baseSize: number, standardScreenHeight?: number)`: Calculate responsive values that scale proportionally with screen height
  - Perfect for creating consistent UI elements without direct width/height dependencies
  - Automatically adjusts sizes based on device screen proportions
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
- `hp(percentage: number)`: Convert height percentage to responsive pixels
- `fs(size: number)`: Convert font size to responsive size
- `spacing(size: number)`: Convert spacing value to responsive size
- `radius(size: number)`: Convert border radius to responsive size
- `cleanup()`: Remove dimension change listeners
- `hasNotch()`: Check if device has a notch/dynamic island

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

## Best Practices

1. Always call `cleanup` in your App.tsx useEffect return function
2. Use consistent base sizes across your app
3. Test on different screen sizes and orientations
4. Consider platform-specific adjustments when necessary

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT
