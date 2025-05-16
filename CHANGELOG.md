# Changelog

All notable changes to this project will be documented in this file.

## [1.1.2] - 2025-05-16

### Enhanced
- Improved `ResValue` function to always use real-time device dimensions
- Better handling of device orientation and dimension changes
- Enhanced consistency across different device sizes
- Optimized caching mechanism for dynamic screen dimensions

## [1.1.1] - 2025-05-16

### Fixed
- Fixed critical issue with `hp` and `wp` functions to always use current device dimensions
- Updated dimension retrieval to always get fresh values directly from the Dimensions API
- Improved `getScreenDimensions` to return real-time device dimensions

## [1.1.0] - 2025-05-16

### Added
- Performance optimization with value caching system
- Configuration API through `configure()` function
- Screen dimensions utility through `getScreenDimensions()`
- Comprehensive input validation and error handling
- Full test suite with Jest
- ESLint and Prettier configurations

### Changed
- Improved error handling in all responsive functions
- Better handling of negative values and edge cases
- Updated peer dependency requirements for react-native-device-info
- Optimized build process with prebuild formatting
- Enhanced TypeScript typings

### Fixed
- Fixed potential memory leaks by improving cleanup function
- Better handling of orientation changes

## [1.0.3] - Previous Release

### Added
- Initial stable release
- Basic responsive sizing utilities (ResValue, wp, hp, fs, spacing, radius)
- Platform-specific handling (iOS/Android)
- Notch/Dynamic Island detection
- Automatic updates on screen rotation
