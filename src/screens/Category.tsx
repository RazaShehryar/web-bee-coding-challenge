import { FC } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

const Category: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button>Go to notifications</Button>
    </View>
  )
}

export default Category
