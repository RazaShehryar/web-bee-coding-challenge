import { Dimensions } from 'react-native'

const deviceWidth = Dimensions.get('window').width
const deviceHeight = Dimensions.get('window').height

// These resolutions from iPhone X
const guidelineBaseWidth = 375
const guidelineBaseHeight = 812

const globalUnits = (size: number) =>
  Number(((deviceWidth / guidelineBaseWidth) * size).toFixed())
const globalUnitsH = (size: number) =>
  Number(((deviceHeight / guidelineBaseHeight) * size).toFixed())
const moderateScale = (size: number, factor = 0.5): number =>
  Number((size + (globalUnits(size) - size) * factor).toFixed())

const scaleH: { [key: string]: number } = {}
const scaleV: { [key: string]: number } = {}

for (let size = 1; size <= 1000; size++) {
  scaleH[size] = globalUnits(size)
}

for (let size = 1; size <= 1000; size++) {
  scaleV[size] = globalUnitsH(size)
}

export { scaleH, scaleV, moderateScale, deviceWidth, deviceHeight }
