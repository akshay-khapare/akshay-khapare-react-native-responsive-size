# React Native Responsive Size

A lightweight utility package for React Native that provides responsive sizing calculations for width, height, font size, spacing, and border radius. Inspired by [react-native-responsive-fontSize](https://github.com/heyman333/react-native-responsive-fontSize) with additional features for comprehensive responsive layouts.

## Features

- 📱 Responsive calculations based on screen dimensions
- 🔄 Automatic updates on screen rotation
- ⚡ Lightweight with zero dependencies
- 🛡️ TypeScript support
- 📊 Platform-specific handling (iOS/Android)
- 🎯 Notch/Dynamic Island detection
- 📏 Extended functionality for width, height, spacing, and radius

## Installation

```bash
npm install react-native-responsive-size
# or
yarn add react-native-responsive-size
```

## Usage

```typescript
import { wp, hp, fs, spacing, radius } from 'react-native-responsive-size';

// In your StyleSheet:
const styles = StyleSheet.create({
  container: {
    width: wp(90),          // 90% of screen width
    height: hp(80),         // 80% of screen height
    padding: spacing(16),   // responsive padding
    borderRadius: radius(8) // responsive border radius
  },
  text: {
    fontSize: fs(16)        // responsive font size
  }
});
```

## API Reference

### `wp(percentage: number): number`
Convert width percentage (0-100) to pixels based on screen width.

### `hp(percentage: number): number`
Convert height percentage (0-100) to pixels based on screen height.

### `fs(size: number): number`
Convert font size to responsive size.

### `spacing(size: number): number`
Convert spacing values (padding, margin, etc.) to responsive size.

### `radius(size: number): number`
Convert border radius to responsive size.

### `ResValue(fontSize: number, standardScreenHeight = 680): number`
Base calculation function for responsive sizes. Used internally by other functions.

## Platform Specific Behavior

- Automatically handles notch/dynamic island on iOS devices
- Accounts for StatusBar height on Android
- Adapts to screen rotation changes

## Example

See the [example](./example/usage.tsx) for a complete implementation.

## License

MIT
