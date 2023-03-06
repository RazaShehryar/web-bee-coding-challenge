import { FC, ReactNode } from 'react'
import { Pressable, StyleSheet, View, ViewStyle } from 'react-native'

type Props = {
  children: ReactNode
  style?: ViewStyle | ViewStyle[]
  onPress?: () => void
}

const Center: FC<Props> = ({ children, style, onPress }) => {
  if (onPress) {
    return (
      <Pressable onPress={onPress} style={[styles.center, style]}>
        {children}
      </Pressable>
    )
  }
  return <View style={[styles.center, style]}>{children}</View>
}

export default Center

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
})
