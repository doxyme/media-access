import bowser from 'bowser'
import browsers from './compatible-browsers.json'

const DEFAULT_UA = typeof window !== 'undefined' ? window.navigator.userAgent : undefined

export const isSupportedBrowser = (ua = DEFAULT_UA) => bowser.check(browsers.supported, true, ua)
export const isLatestBrowser = (ua = DEFAULT_UA) => bowser.check(browsers.latest, true, ua)

export default {
  isSupportedBrowser,
  isLatestBrowser,
}
