import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import MachineTypeItem from 'components/MachineTypeItem'

import store from 'context/store'

import { MachineType } from 'models/MachineType'

import { isIpad } from 'utils/platform'

import EmptyList from './EmptyList'
import MachineListHeader from './MachineListHeader'

const keyExtractor = (item: MachineType) => item.id

type Props = {
  categoryId: string
}

const DashboardList: FC<Props> = ({ categoryId }) => {
  const { categories, orientation, items } = store

  const category = useMemo(() => categories[categoryId], [categories, categoryId])

  const data = useMemo(
    () => Object.values(items).filter((value) => value.categoryId === categoryId),
    [categoryId, items],
  )

  const renderItem = useCallback(
    ({ item, index }: { item: MachineType; index: number }) => (
      <MachineTypeItem item={item} index={index} categoryId={categoryId} />
    ),
    [categoryId],
  )

  return (
    <View style={styles.container}>
      <FlatList
        key={orientation}
        data={data}
        ListHeaderComponent={
          <MachineListHeader title={category.title} categoryId={category.id} />
        }
        ListEmptyComponent={EmptyList}
        renderItem={renderItem}
        numColumns={isIpad ? 2 : orientation === 'PORTRAIT' ? 1 : 2}
        keyExtractor={keyExtractor}
        scrollEnabled={false}
        contentContainerStyle={styles.contentContainer}
      />
    </View>
  )
}

export default observer(DashboardList)

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 80, marginVertical: 10 },
  container: { flex: 1, marginTop: 10 },
})
