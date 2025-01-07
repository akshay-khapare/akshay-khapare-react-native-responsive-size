import { Dimensions, Platform, StatusBar } from "react-native";

// Device dimensions
let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

// Update dimensions on screen rotation
const dimensionSubscription = Dimensions.addEventListener(
  "change",
  ({ window }) => {
    SCREEN_WIDTH = window.width;
    SCREEN_HEIGHT = window.height;
  }
);

// Check if device has notch/dynamic island
const hasNotch = (): boolean => {
  if (Platform.OS === "android") return false;

  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTV &&
    SCREEN_HEIGHT >= 780
  );
};

/**
 * Responsive font size calculation using ResValue
 * @param fontSize - Base font size
 * @param standardScreenHeight - Standard screen height (default: 680)
 * @returns {number} - Responsive font size
 */
export const ResValue = (
  fontSize: number,
  standardScreenHeight: number = 680
): number => {
  if (!fontSize || !standardScreenHeight) return 0;

  const offset =
    SCREEN_WIDTH > SCREEN_HEIGHT
      ? 0
      : Platform.OS === "ios"
      ? 78
      : StatusBar.currentHeight || 0;
  const deviceHeight =
    hasNotch() || Platform.OS === "android"
      ? SCREEN_HEIGHT - offset
      : SCREEN_HEIGHT;
  const heightPercent = (fontSize * deviceHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};

/**
 * Converts width percentage to responsive size
 * @param percentage - Width percentage (0-100)
 * @returns {number} - Responsive width
 */
export const wp = (percentage: number): number => {
  if (!percentage || !SCREEN_WIDTH) return 0;
  return (percentage / 100) * SCREEN_WIDTH;
};

/**
 * Converts height percentage to responsive size
 * @param percentage - Height percentage (0-100)
 * @returns {number} - Responsive height
 */
export const hp = (percentage: number): number => {
  if (!percentage || !SCREEN_HEIGHT) return 0;
  return (percentage / 100) * SCREEN_HEIGHT;
};

/**
 * Converts font size to responsive size
 * @param size - Base font size in pixels
 * @returns {number} - Responsive font size
 */
export const fs = (size: number): number => {
  return ResValue(size);
};

/**
 * Converts spacing size to responsive size
 * @param size - Base spacing size in pixels
 * @returns {number} - Responsive spacing
 */
export const spacing = (size: number): number => {
  return ResValue(size);
};

/**
 * Get responsive radius for rounded corners
 * @param size - Base border radius in pixels
 * @returns {number} - Responsive border radius
 */
export const radius = (size: number): number => {
  return ResValue(size);
};

// Export cleanup function for dimension listener
export const cleanup = () => {
  dimensionSubscription.remove();
};
