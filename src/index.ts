import { Dimensions, Platform, StatusBar } from "react-native";
import DeviceInfo from "react-native-device-info";

// Constants
const STANDARD_SCREEN_HEIGHT = 812;
const IOS_STATUS_BAR_HEIGHT = 78;
const ANDROID_STATUS_BAR_HEIGHT = 24;

// Types
interface WindowDimensions {
  width: number;
  height: number;
}

// Initial device dimensions
let { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get("window");

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
  }
};

// Store the reference to the event listener
const dimensionChangeListener = Dimensions.addEventListener(
  "change",
  updateDimensions
);

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
const ResValue = (
  baseSize: number,
  standardScreenHeight: number = STANDARD_SCREEN_HEIGHT
): number => {
  if (!baseSize) return 0;

  const offset =
    SCREEN_WIDTH > SCREEN_HEIGHT
      ? 0
      : Platform.OS === "ios"
      ? IOS_STATUS_BAR_HEIGHT
      : StatusBar.currentHeight || ANDROID_STATUS_BAR_HEIGHT;

  const adjustedHeight =
    hasNotch() || Platform.OS === "android"
      ? SCREEN_HEIGHT - offset
      : SCREEN_HEIGHT;

  const heightPercent = (baseSize * adjustedHeight) / standardScreenHeight;
  return Math.round(heightPercent);
};

/**
 * Converts a width percentage to a responsive pixel value.
 *
 * @param percentage - Width percentage (0 to 100).
 * @returns {number} - Responsive width in pixels.
 * @throws {Error} - If percentage is invalid
 */
const wp = (percentage: number): number => (percentage / 100) * SCREEN_WIDTH;

/**
 * Converts a height percentage to a responsive pixel value.
 *
 * @param percentage - Height percentage (0 to 100).
 * @returns {number} - Responsive height in pixels.
 * @throws {Error} - If percentage is invalid
 */
const hp = (percentage: number): number => (percentage / 100) * SCREEN_HEIGHT;

/**
 * Converts a font size to a responsive size based on screen height.
 *
 * @param size - The base font size in pixels.
 * @returns {number} - Responsive font size in pixels.
 * @throws {Error} - If size is negative
 */
const fs = (size: number): number => ResValue(size);

/**
 * Converts a spacing value to a responsive size based on screen height.
 *
 * @param size - The base spacing size in pixels.
 * @returns {number} - Responsive spacing in pixels.
 * @throws {Error} - If size is negative
 */
const spacing = (size: number): number => ResValue(size);

/**
 * Calculates a responsive border radius based on screen height.
 *
 * @param size - The base border radius in pixels.
 * @returns {number} - Responsive border radius in pixels.
 * @throws {Error} - If size is negative
 */
const radius = (size: number): number => ResValue(size);

/**
 * Removes the global dimension change listener.
 *
 * This should be called once in the application's lifecycle (e.g., during cleanup in `App.tsx`).
 */
const cleanup = () => {
  dimensionChangeListener.remove();
};

export { ResValue, wp, hp, fs, spacing, radius, cleanup, hasNotch };
