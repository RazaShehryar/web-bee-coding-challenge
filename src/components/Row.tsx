import { FC, ReactNode } from 'react'
import { FlexStyle, Pressable, View, ViewStyle } from 'react-native'

type Props = {
  children: ReactNode
  style?: ViewStyle | (ViewStyle | undefined)[]
  onPress?: () => void
  justifyContent?: FlexStyle['justifyContent']
  alignItems?: FlexStyle['alignItems']
}

const Row: FC<Props> = ({
  children,
  style,
  onPress,
  justifyContent = 'flex-start',
  alignItems = 'center',
}) => {
  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={[{ flexDirection: 'row', alignItems, justifyContent }, style]}>
        {children}
      </Pressable>
    )
  }
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems,
          justifyContent,
        },
        style,
      ]}>
      {children}
    </View>
  )
}

export default Row
