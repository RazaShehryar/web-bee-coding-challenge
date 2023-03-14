import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'

import EmptyList from 'components/EmptyList'
import MachineListHeader from 'components/MachineListHeader'
import MachineTypeItem from 'components/MachineTypeItem'

import store from 'context/store'

import { MachineType } from 'models/MachineType'

import { isIpad } from 'utils/platform'

const keyExtractor = (item: MachineType) => item.id

type Props = { categoryId?: string; scrollEnabled?: boolean }

const MachineTypeList: FC<Props> = ({ categoryId, scrollEnabled }) => {
  const route = useRoute()

  const { categories, orientation, items } = store

  const category = useMemo(
    () => categories[categoryId || route.name],
    [categories, categoryId, route.name],
  )

  const data = useMemo(
    () => Object.values(items).filter((value) => value.categoryId === category.id),
    [category.id, items],
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
        ListEmptyComponent={EmptyList}
        ListHeaderComponent={
          <MachineListHeader title={category.title} categoryId={category.id} />
        }
        renderItem={renderItem}
        numColumns={isIpad ? 2 : orientation === 'PORTRAIT' ? 1 : 2}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
        scrollEnabled={scrollEnabled}
      />
    </View>
  )
}

export default observer(MachineTypeList)

const styles = StyleSheet.create({
  contentContainer: { paddingBottom: 80, marginVertical: 10 },
  container: { flex: 1, marginTop: 10 },
})
