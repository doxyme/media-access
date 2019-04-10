import bowser from 'bowser/typings';

const system = {
  isSupported() {
    return bowser.firefox || bowser.chrome || bowser.safari;
  },

  isUpToDate() {
    return true; // whatever
  },

  getSystemInfo() {
    const browsers = ['firefox', 'chrome', 'safari', 'msedge', 'opera', 'msie'];
    const operatingSystems = ['linux', 'mac', 'windows', 'ios', 'android', 'chromeos'];

    const browser = browsers.reduce((res, name) => {
      if (bowser[name]) {
        return name;
      } else {
        return res;
      }
    }, null);
    const os = operatingSystems.reduce((res, os) => {
      if (bowser[os]) {
        return os;
      } else {
        return res;
      }
    }, null);
    const platform = bowser.mobile || bowser.tablet ? 'mobile' : 'desktop';

    return {
      browser,
      os,
      platform,
      browserVersion: parseFloat(bowser.version) || null
    };
  }
};

export function getSystemInfo() {
  const sysInfo = system.getSystemInfo();
  return {
    platform: sysInfo.platform,
    os: sysInfo.os,
    browser: sysInfo.browser,
    browserVersion: sysInfo.browserVersion,
    isSupportedBrowser: system.isSupported(),
    isUpToDateBrowser: system.isUpToDate()
  };
}