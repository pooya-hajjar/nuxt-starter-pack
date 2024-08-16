import { UAParser } from "ua-parser-js";

export const useDevice = () => {
  const getUserBrowser = (): string | null => {
    let parser = new UAParser();

    let userAgent = navigator.userAgent;

    let result = parser.setUA(userAgent).getResult();

    if (result.browser && result.browser.name) {
      return result.browser.name;
    }
    return null;
  };

  const getUserDevice = (): string | null => {
    let parser = new UAParser();

    let userAgent = navigator.userAgent;

    let result = parser.setUA(userAgent).getResult();

    if (result.device && result.device.vendor) {
      return result.device.vendor;
    }
    return null;
  };

  const detectDevice = () => {
    let userAgent = navigator.userAgent;

    let parser = new UAParser();
    parser.setUA(userAgent);
    return parser.getDevice().type;
  };

  const isMobile = detectDevice() === "mobile";
  const isTablet = detectDevice() === "tablet";
  const isDesktop = detectDevice() === "desktop" || !detectDevice() || isTablet; //? temporary isDesktop = isDesktop || isTablet

  const isFireFox = getUserBrowser() === "Firefox";
  const isChrome = getUserBrowser() === "Chrome";
  const isSafari = getUserBrowser() === "Safari";
  const isEdge = getUserBrowser() === "Edge";
  const isOpera = getUserBrowser() === "Opera";

  const isSamsung = getUserDevice() === "Samsung";
  const isApple = getUserDevice() === "Apple";
  const isHuawei = getUserDevice() === "Huawei";
  const isXiaomi = getUserDevice() === "Xiaomi";

  return {
    isMobile,
    isTablet,
    isDesktop,
    isFireFox,
    isChrome,
    isSafari,
    isEdge,
    isOpera,
    isSamsung,
    isApple,
    isHuawei,
    isXiaomi,
  };
};
