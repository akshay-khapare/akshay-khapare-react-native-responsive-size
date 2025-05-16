import {
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
} from "../index";

describe("Responsive Size Utilities", () => {
  beforeEach(() => {
    // Reset the module between tests
    jest.clearAllMocks();
  });

  afterAll(() => {
    // Clean up listeners
    cleanup();
  });

  test("Should export correct package version", () => {
    expect(PACKAGE_VERSION).toBe("1.1.0");
  });

  test("ResValue should calculate proportional size correctly", () => {
    const result = ResValue(50);
    expect(result).toBeGreaterThan(0);
    expect(typeof result).toBe("number");
  });

  test("ResValue should handle negative or zero values", () => {
    expect(ResValue(-10)).toBe(0);
    expect(ResValue(0)).toBe(0);
  });

  test("wp should calculate width percentage correctly", () => {
    expect(wp(50)).toBe(187.5); // 50% of 375
    expect(wp(100)).toBe(375); // 100% of 375
  });

  test("wp should handle invalid percentages", () => {
    expect(wp(-10)).toBe(0);
    expect(wp(110)).toBe(375); // Returns max width
  });

  test("hp should calculate height percentage correctly", () => {
    expect(hp(50)).toBe(406); // 50% of 812
    expect(hp(100)).toBe(812); // 100% of 812
  });

  test("hp should handle invalid percentages", () => {
    expect(hp(-10)).toBe(0);
    expect(hp(110)).toBe(812); // Returns max height
  });

  test("fs should calculate font size correctly", () => {
    const fontSize = fs(16);
    expect(fontSize).toBeGreaterThan(0);
    expect(typeof fontSize).toBe("number");
  });

  test("fs should handle negative values", () => {
    expect(fs(-5)).toBe(0);
  });

  test("spacing should calculate spacing correctly", () => {
    const space = spacing(16);
    expect(space).toBeGreaterThan(0);
    expect(typeof space).toBe("number");
  });

  test("radius should calculate border radius correctly", () => {
    const borderRadius = radius(8);
    expect(borderRadius).toBeGreaterThan(0);
    expect(typeof borderRadius).toBe("number");
  });

  test("hasNotch should detect device notch", () => {
    expect(hasNotch()).toBe(true);
  });

  test("configure should set configuration", () => {
    configure({ standardScreenHeight: 896, enableCaching: false });
    // After configuration change, calculations should be affected
    const result = ResValue(50);
    expect(result).toBeGreaterThan(0);
  });

  test("getScreenDimensions should return current dimensions", () => {
    const dimensions = getScreenDimensions();
    expect(dimensions).toHaveProperty("width");
    expect(dimensions).toHaveProperty("height");
    expect(dimensions.width).toBe(375);
    expect(dimensions.height).toBe(812);
  });
});
