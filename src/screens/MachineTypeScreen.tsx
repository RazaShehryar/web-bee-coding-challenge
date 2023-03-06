import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import uuid from 'react-native-uuid'

import EmptyList from 'components/EmptyList'
import MachineTypeItem from 'components/MachineTypeItem'
import Row from 'components/Row'

import store from 'context/store'

import { MachineType } from 'models/MachineType'

import Colors from 'utils/colors'
import { isIpad } from 'utils/platform'

const keyExtractor = (item: MachineType) => item.id

const renderItem = ({ item, index }: { item: MachineType; index: number }) => (
  <MachineTypeItem item={item} index={index} />
)

const MachineTypeScreen: FC = () => {
  const route = useRoute()

  const { categories, orientation, items } = store

  const category = useMemo(() => categories[route.name], [categories, route.name])

  const onMachineTypeItemAdd = useCallback(() => {
    const id = uuid.v4() as string
    store.addMachineTypeItem(id, category.id)
  }, [category.id])

  const data = useMemo(
    () => Object.values(items).filter((value) => value.categoryId === category.id),
    [category.id, items],
  )

  return (
    <View style={styles.container}>
      <Row
        justifyContent="space-between"
        alignItems="center"
        style={{ paddingHorizontal: 4 }}>
        <Text variant="headlineSmall" style={styles.title}>
          {category.title}
        </Text>
        <Button
          mode="contained"
          style={styles.button}
          labelStyle={{ fontSize: 12 }}
          onPress={onMachineTypeItemAdd}>
          ADD NEW ITEM
        </Button>
      </Row>
      <FlatList
        key={orientation}
        data={data}
        ListEmptyComponent={EmptyList}
        renderItem={renderItem}
        numColumns={isIpad ? 2 : orientation === 'PORTRAIT' ? 1 : 2}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

export default observer(MachineTypeScreen)

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 80 },
  title: { fontWeight: 'bold' },
  container: { flex: 1 },
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 5,
  },
})
