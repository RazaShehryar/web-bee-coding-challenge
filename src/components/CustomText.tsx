import { FC, useMemo } from 'react'
import { StyleProp, Text, TextProps, TextStyle } from 'react-native'

import Colors from 'utils/colors'
import { scaleH } from 'utils/units'

export type FontSize = 'text' | 'header' | 'subheader' | 'title'
type FontWeight = 'regular' | 'semibold' | 'bold' | 'extrabold'

const legacyFontSizes: Record<FontSize, number> = {
  text: scaleH[14],
  header: scaleH[26],
  subheader: scaleH[22],
  title: scaleH[28],
}

export const fonts: Record<FontWeight, string> = {
  regular: 'regular',
  semibold: 'semibold',
  bold: 'bold',
  extrabold: 'extrabold',
}

const fontWeights: Record<FontWeight, TextStyle['fontWeight']> = {
  regular: '400',
  semibold: '600',
  bold: '700',
  extrabold: '800',
}

type TextType = 'text' | 'header' | 'subheader'
const textTypes: Record<TextType, StyleProp<TextStyle>> = {
  text: {
    fontSize: legacyFontSizes.text,
    fontWeight: fontWeights.regular,
  },
  header: {
    fontSize: legacyFontSizes.header,
    fontWeight: fontWeights.bold,
  },
  subheader: {
    fontSize: legacyFontSizes.subheader,
    fontWeight: fontWeights.semibold,
  },
}

export type LegacyTextProps = TextProps & {
  textType?: TextType
  fontSize?: FontSize | number
  fontWeight?: FontWeight
  color?: TextStyle['color']
  lineHeight?: number
  textAlign?: TextStyle['textAlign']
}

const CustomText: FC<LegacyTextProps> = ({
  textType,
  fontSize = scaleH[14],
  fontWeight,
  color = Colors.black,
  lineHeight,
  textAlign,
  style,
  children,
  ...props
}) => {
  const textTypeStyle: StyleProp<TextStyle> = useMemo(
    () => (textType ? textTypes[textType] : textTypes.text),
    [textType],
  )

  const fontSizeStyle: StyleProp<TextStyle> = useMemo(() => {
    if (typeof fontSize === 'number' && fontSize > 0) {
      const scale = scaleH[fontSize]
      return { fontSize: scale }
    }
    if (typeof fontSize === 'string' && fontSize in legacyFontSizes) {
      const scale = scaleH[legacyFontSizes[fontSize]]
      return { fontSize: scale }
    }
    return {}
  }, [fontSize])

  const fontWeightStyle: StyleProp<TextStyle> = useMemo(() => {
    if (typeof fontWeight === 'string' && fontWeight in fontWeights) {
      return {
        fontWeight: fontWeights[fontWeight],
      }
    }
    return {}
  }, [fontWeight])

  const colorStyle: StyleProp<TextStyle> = useMemo(() => ({ color }), [color])

  const lineHeightStyle: StyleProp<TextStyle> = useMemo(
    () => ({ lineHeight }),
    [lineHeight],
  )

  const textAlignStyle: StyleProp<TextStyle> = useMemo(() => ({ textAlign }), [textAlign])

  return (
    <Text
      style={[
        textTypeStyle,
        fontSizeStyle,
        fontWeightStyle,
        colorStyle,
        lineHeightStyle,
        textAlignStyle,
        style,
      ]}
      {...props}>
      {children}
    </Text>
  )
}

export default CustomText
