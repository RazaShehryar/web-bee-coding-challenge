import { FC } from 'react'
import { Button } from 'react-native-paper'
import { View } from 'react-native/types'

const Dashboard: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button>Go to notifications</Button>
    </View>
  )
}

export default Dashboard
