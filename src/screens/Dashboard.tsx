import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'

import Center from 'components/Center'

import Colors from 'utils/colors'
import { navigate } from 'utils/navigation'

const onPress = () => navigate('ManageCategories')

const Dashboard: FC = () => {
  return (
    <Center style={styles.container}>
      <Text variant="headlineSmall">No categories found</Text>
      <Button mode="contained" style={styles.button} onPress={onPress}>
        ADD A CATEGORY
      </Button>
    </Center>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 5,
    marginTop: 10,
  },
  container: { flex: 1 },
})
