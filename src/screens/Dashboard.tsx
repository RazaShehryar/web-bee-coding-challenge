import { FC } from 'react'
import { View } from 'react-native'
import { Button } from 'react-native-paper'

const Dashboard: FC = () => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button>Go to notifications</Button>
    </View>
  )
}

export default Dashboard