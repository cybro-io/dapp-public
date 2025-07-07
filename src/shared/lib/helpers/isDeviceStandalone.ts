export const isDeviceStandalone = () =>
  !window.matchMedia('(display-mode: browser)').matches;
