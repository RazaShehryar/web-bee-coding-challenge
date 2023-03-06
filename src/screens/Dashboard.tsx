import { FC } from 'react'
import { StyleSheet } from 'react-native'
import { Button } from 'react-native-paper'

import Center from 'components/Center'
import CustomText from 'components/CustomText'

import Colors from 'utils/colors'

const Dashboard: FC = () => {
  return (
    <Center style={styles.container}>
      <CustomText>No categories found</CustomText>
      <Button mode="contained" style={styles.button}>
        ADD A CATEGORY
      </Button>
    </Center>
  )
}

export default Dashboard

const styles = StyleSheet.create({
  button: { backgroundColor: Colors.purple, borderRadius: 5, marginTop: 10 },
  container: { flex: 1 },
})
