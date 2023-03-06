import { observer } from 'mobx-react-lite'
import { FC, useCallback } from 'react'
import { FlatList, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-paper'
import uuid from 'react-native-uuid'

import CategoryItem from 'components/CategoryItem'

import store from 'context/store'

import { Category, Field } from 'models/Category'

import Colors from 'utils/colors'
import { isIpad } from 'utils/platform'
import { deviceWidth } from 'utils/units'

const keyExtractor = (item: Category) => item.id

const ManageCategories: FC = () => {
  const { categories, orientation } = store

  const onAddCategory = useCallback(() => {
    const id = uuid.v4() as string
    const fieldId = uuid.v4() as string
    const field: Record<string, Field> = {
      [fieldId]: { title: '', type: 'string', id: fieldId },
    }
    store.addCategory({ id, title: 'New Category', fields: field, titleField: fieldId })
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        key={orientation}
        data={categories}
        renderItem={({ item, index }) => <CategoryItem item={item} index={index} />}
        numColumns={isIpad ? 2 : orientation === 'PORTRAIT' ? 1 : 2}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.contentContainer}
      />
      <Button mode="contained" style={styles.button} onPress={onAddCategory}>
        ADD NEW CATEGORIES
      </Button>
    </View>
  )
}

export default observer(ManageCategories)

const styles = StyleSheet.create({
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
