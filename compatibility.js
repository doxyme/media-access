import bowser from 'bowser'
import { browsers } from './browserslist.json'

const DEFAULT_UA = typeof window !== 'undefined' ? window.navigator.userAgent : undefined

const bowserFormatBrowsers = browsers.map(b =>  b.split(' '))
                                     .map(([vendor, version]) => ({ [vendor]: version }))

export const isSupportedBrowser = (ua = DEFAULT_UA) => bowserFormatBrowsers.some(b => bowser.check(b, true, ua))

export default {
  isSupportedBrowser,
}
