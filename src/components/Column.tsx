import { FC, ReactNode } from 'react'
import { Pressable, View, ViewStyle } from 'react-native'

type Props = {
  children: ReactNode
  style?: ViewStyle | ViewStyle[]
  onPress?: () => void
}

const Column: FC<Props> = ({ children, style, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={[{ flexDirection: 'column' }, style]}>
        {children}
      </Pressable>
    )
  }
  return <View style={[{ flexDirection: 'column' }, style]}>{children}</View>
}

export default Column
