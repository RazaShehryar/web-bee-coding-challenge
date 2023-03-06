import { Platform, PlatformIOSStatic } from 'react-native'

const platformIOS = Platform as PlatformIOSStatic
export const isIpad = platformIOS.isPad

export const isIphone = !platformIOS.isPad && Platform.OS === 'ios'
