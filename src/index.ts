import { Dimensions, Platform, StatusBar } from "react-native";
import DeviceInfo from "react-native-device-info";

// Version information
const PACKAGE_VERSION = "1.1.0";

// Constants
const STANDARD_SCREEN_HEIGHT = 812;
const IOS_STATUS_BAR_HEIGHT = 78;
const ANDROID_STATUS_BAR_HEIGHT = 24;

// Types
interface WindowDimensions {
  width: number;
  height: number;
}

/**
 * Configuration options for the responsive sizing engine
 */
export interface ResponsiveConfig {
  /** Standard screen height to use as reference (default: 812px - iPhone X) */
  standardScreenHeight?: number;
  /** Whether to cache computed values for better performance */
  enableCaching?: boolean;
}

/**
 * Response size calculation result
 */
export type ResponsiveValue = number;

// Initial device dimensions
let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Configuration
let config: ResponsiveConfig = {
  standardScreenHeight: STANDARD_SCREEN_HEIGHT,
  enableCaching: true,
};

// Cache for responsive values
const valueCache = new Map<string, number>();

/**
 * Updates the screen dimensions dynamically when the screen size changes
 * (e.g., during device rotation).
 *
 * @param window - The updated window dimensions
 */
const updateDimensions = ({ window }: { window: WindowDimensions }) => {
  if (typeof window?.width === "number" && typeof window?.height === "number") {
    SCREEN_WIDTH = window.width;
    SCREEN_HEIGHT = window.height;

    // Clear cache on dimension change
    if (config.enableCaching) {
      valueCache.clear();
    }
  }
};

// Store the reference to the event listener
const dimensionChangeListener = Dimensions.addEventListener("change", updateDimensions);

/**
 * Determines if the device has a notch (or dynamic island).
 *
 * @returns {boolean} - True if the device has a notch, false otherwise.
 */
const hasNotch = (): boolean => {
  try {
    return DeviceInfo.hasNotch();
  } catch (error) {
    console.warn("Error checking device notch:", error);
    return false;
  }
};

/**
 * Configure the responsive sizing engine
 *
 * @param options - Configuration options
 */
const configure = (options: ResponsiveConfig): void => {
  config = { ...config, ...options };

  // Clear cache when configuration changes
  if (config.enableCaching) {
    valueCache.clear();
  }
};

/**
 * Calculates a responsive value that scales proportionally with the device's screen height.
 * This function is ideal for creating consistent UI elements across different device sizes
 * without directly depending on the device's width or height percentages.
 *
 * Use this when you want:
 * - Consistent scaling of UI elements across different devices
 * - Size values that maintain proportions regardless of screen dimensions
 * - A more reliable alternative to direct width/height percentage calculations
 *
 * @example
 * // For a button height
 * const buttonHeight = ResValue(50); // Base size of 50px
 *
 * // For padding or margin
 * const containerPadding = ResValue(20); // Base padding of 20px
 *
 * // For custom scaling with different base height
 * const customSize = ResValue(30, 720); // Base size of 30px with 720px as standard height
 *
 * @param baseSize - The base size value in pixels. This is the size you want on a standard
 *                  device (default standard height is 812px, iPhone X height).
 * @param standardScreenHeight - Optional. The reference screen height to base calculations on.
 *                              Defaults to 812 (iPhone X height).
 * @returns {number} - The calculated responsive size that scales proportionally with the device screen.
 */
const ResValue = (baseSize: number, standardScreenHeight?: number): number => {
  // Validate input parameters
  if (baseSize < 0) {
    console.warn("ResValue received negative baseSize, returning 0");
    return 0;
  }

  if (!baseSize) return 0;

  // Use configured standard height if not provided
  const stdHeight = standardScreenHeight || config.standardScreenHeight || STANDARD_SCREEN_HEIGHT;

  // Check cache first if enabled
  const cacheKey = `${baseSize}_${stdHeight}_${SCREEN_WIDTH}_${SCREEN_HEIGHT}`;
  if (config.enableCaching && valueCache.has(cacheKey)) {
    return valueCache.get(cacheKey) as number;
  }

  // Calculate offset based on device orientation and platform
  const offset =
    SCREEN_WIDTH > SCREEN_HEIGHT
      ? 0 // Landscape mode
      : Platform.OS === "ios"
      ? IOS_STATUS_BAR_HEIGHT
      : StatusBar.currentHeight || ANDROID_STATUS_BAR_HEIGHT;

  // Adjust height for notch devices or Android
  const adjustedHeight =
    hasNotch() || Platform.OS === "android" ? SCREEN_HEIGHT - offset : SCREEN_HEIGHT;

  // Calculate proportional size
  const heightPercent = (baseSize * adjustedHeight) / stdHeight;
  const result = Math.round(heightPercent);

  // Cache the result if caching is enabled
  if (config.enableCaching) {
    valueCache.set(cacheKey, result);
  }

  return result;
};

/**
 * Converts a width percentage to a responsive pixel value.
 *
 * @param percentage - Width percentage (0 to 100).
 * @returns {number} - Responsive width in pixels.
 * @throws {Error} - If percentage is invalid
 */
const wp = (percentage: number): number => {
  if (percentage < 0 || percentage > 100) {
    console.warn(`Invalid percentage value (${percentage}). Must be between 0-100.`);
    return percentage < 0 ? 0 : SCREEN_WIDTH;
  }

  // Check cache first if enabled
  const cacheKey = `wp_${percentage}_${SCREEN_WIDTH}`;
  if (config.enableCaching && valueCache.has(cacheKey)) {
    return valueCache.get(cacheKey) as number;
  }

  const result = (percentage / 100) * SCREEN_WIDTH;

  // Cache the result if caching is enabled
  if (config.enableCaching) {
    valueCache.set(cacheKey, result);
  }

  return result;
};

/**
 * Converts a height percentage to a responsive pixel value.
 *
 * @param percentage - Height percentage (0 to 100).
 * @returns {number} - Responsive height in pixels.
 * @throws {Error} - If percentage is invalid
 */
const hp = (percentage: number): number => {
  if (percentage < 0 || percentage > 100) {
    console.warn(`Invalid percentage value (${percentage}). Must be between 0-100.`);
    return percentage < 0 ? 0 : SCREEN_HEIGHT;
  }

  // Check cache first if enabled
  const cacheKey = `hp_${percentage}_${SCREEN_HEIGHT}`;
  if (config.enableCaching && valueCache.has(cacheKey)) {
    return valueCache.get(cacheKey) as number;
  }

  const result = (percentage / 100) * SCREEN_HEIGHT;

  // Cache the result if caching is enabled
  if (config.enableCaching) {
    valueCache.set(cacheKey, result);
  }

  return result;
};

/**
 * Converts a font size to a responsive size based on screen height.
 *
 * @param size - The base font size in pixels.
 * @returns {number} - Responsive font size in pixels.
 * @throws {Error} - If size is negative
 */
const fs = (size: number): number => {
  if (size < 0) {
    console.warn("Font size cannot be negative, returning 0");
    return 0;
  }
  return ResValue(size);
};

/**
 * Converts a spacing value to a responsive size based on screen height.
 *
 * @param size - The base spacing size in pixels.
 * @returns {number} - Responsive spacing in pixels.
 * @throws {Error} - If size is negative
 */
const spacing = (size: number): number => {
  if (size < 0) {
    console.warn("Spacing cannot be negative, returning 0");
    return 0;
  }
  return ResValue(size);
};

/**
 * Calculates a responsive border radius based on screen height.
 *
 * @param size - The base border radius in pixels.
 * @returns {number} - Responsive border radius in pixels.
 * @throws {Error} - If size is negative
 */
const radius = (size: number): number => {
  if (size < 0) {
    console.warn("Border radius cannot be negative, returning 0");
    return 0;
  }
  return ResValue(size);
};

/**
 * Removes the global dimension change listener and clears any caches.
 *
 * This should be called once in the application's lifecycle (e.g., during cleanup in `App.tsx`).
 */
const cleanup = () => {
  dimensionChangeListener.remove();
  valueCache.clear();
};

/**
 * Retrieves the current screen dimensions
 *
 * @returns The current screen width and height
 */
const getScreenDimensions = (): { width: number; height: number } => {
  return {
    width: SCREEN_WIDTH,
    height: SCREEN_HEIGHT,
  };
};

export {
  ResValue,
  wp,
  hp,
  fs,
  spacing,
  radius,
  cleanup,
  hasNotch,
  configure,
  getScreenDimensions,
  PACKAGE_VERSION,
};
