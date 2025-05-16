# Changelog

All notable changes to this project will be documented in this file.

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
