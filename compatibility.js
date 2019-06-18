import bowser from 'bowser'
import browsers from './compatible-browsers.json'

const DEFAULT_UA = typeof window !== 'undefined' ? window.navigator.userAgent : undefined

export const isSupportedBrowser = (ua = DEFAULT_UA) => bowser.check(browsers.supported, true, ua)
export const isSupportedBrowserVendor = (ua = DEFAULT_UA) => Object.keys(browsers.supported).some(k => bowser[k])
export const isLatestBrowser = (ua = DEFAULT_UA) => bowser.check(browsers.latest, true, ua)

export default {
  _bowser: bowser,
  _browsers: browsers,

  isSupportedBrowser,
  isSupportedBrowserVendor,
  isLatestBrowser,

  isAndroid: () => bowser.android,
  isIOS: () => bowser.ios,
  isMac: () => bowser.mac,
  isWindows: () => bowser.windows,

  // Occurs on iOS Safari when loaded in an in-app browser
  isUnsupportedBrowserFrame = () => this.isIOS() && !window.navigator.mediaDevices,
}
