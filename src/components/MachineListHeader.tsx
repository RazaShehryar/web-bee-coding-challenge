import { useCallback } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text } from 'react-native-paper'
import uuid from 'react-native-uuid'

import Row from 'components/Row'

import store from 'context/store'

import Colors from 'utils/colors'

type Props = {
  title: string
  categoryId: string
}

const MachineListHeader = (props: Props): JSX.Element => {
  const onNewItemPress = useCallback(() => {
    const id = uuid.v4() as string
    store.addMachineTypeItem(id, props.categoryId)
  }, [props.categoryId])

  return (
    <Row
      justifyContent="space-between"
      alignItems="center"
      style={{ paddingHorizontal: 4 }}>
      <Text variant="headlineSmall" style={styles.title}>
        {props.title}
      </Text>
      <Button
        mode="contained"
        style={styles.button}
        labelStyle={{ fontSize: 12 }}
        onPress={onNewItemPress}>
        ADD NEW ITEM
      </Button>
    </Row>
  )
}

export default MachineListHeader

const styles = StyleSheet.create({
  title: { fontWeight: 'bold' },
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 5,
  },
})
