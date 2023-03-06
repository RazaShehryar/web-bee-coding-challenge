import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FC, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import EmptyList from 'components/EmptyList'
import MachineListHeader from 'components/MachineListHeader'
import MachineTypeItem from 'components/MachineTypeItem'

import store from 'context/store'

import { MachineType } from 'models/MachineType'

import { isIpad } from 'utils/platform'

const keyExtractor = (item: MachineType) => item.id

const renderItem = ({ item, index }: { item: MachineType; index: number }) => (
  <MachineTypeItem item={item} index={index} />
)

const MachineTypeScreen: FC = () => {
  const route = useRoute()

  const { categories, orientation, items } = store

  const category = useMemo(() => categories[route.name], [categories, route.name])

  const data = useMemo(
    () => Object.values(items).filter((value) => value.categoryId === category.id),
    [category.id, items],
  )

  return (
    <View style={styles.container}>
      <FlatList
        key={orientation}
        data={data}
        ListEmptyComponent={EmptyList}
        ListHeaderComponent={
          <MachineListHeader title={category.title} categoryId={category.id} />
        }
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
  container: { flex: 1 },
})
