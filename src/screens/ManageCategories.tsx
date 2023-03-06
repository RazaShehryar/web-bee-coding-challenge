import { observer } from 'mobx-react-lite'
import { FC, useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button, Text } from 'react-native-paper'
import uuid from 'react-native-uuid'

import CategoryItem from 'components/CategoryItem'

import store from 'context/store'

import { Category, Field } from 'models/Category'

import Colors from 'utils/colors'
import { isIpad } from 'utils/platform'
import { deviceWidth } from 'utils/units'

const keyExtractor = (item: Category) => item.id

const renderItem = ({ item, index }: { item: Category; index: number }) => (
  <CategoryItem item={item} index={index} />
)

const EmptyCategory = () => <Text style={styles.emptyText}>No Categories to display</Text>

const ManageCategories: FC = observer(() => {
  const { orientation, categories } = store

  const onAddCategory = useCallback(() => {
    const id = uuid.v4() as string
    const fieldId = uuid.v4() as string
    const field: Record<string, Field> = {
      [fieldId]: { title: '', type: 'string', id: fieldId },
    }
    const category = { id, title: 'New Category', fields: field, titleField: fieldId }
    store.addCategory(category)
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        key={orientation}
        data={Object.values(categories)}
        ListEmptyComponent={EmptyCategory}
        renderItem={renderItem}
        numColumns={isIpad ? 2 : orientation === 'PORTRAIT' ? 1 : 2}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
      <Button mode="contained" style={styles.button} onPress={onAddCategory}>
        ADD NEW CATEGORY
      </Button>
    </View>
  )
})

export default ManageCategories

const styles = StyleSheet.create({
  emptyText: { color: Colors.gray, textAlign: 'center', marginTop: 10 },
  contentContainer: { paddingBottom: 40 },
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 5,
    position: 'absolute',
    width: deviceWidth * 0.98,
    alignSelf: 'center',
    bottom: 4,
  },
  container: { flex: 1 },
})
