import Ionicons from '@expo/vector-icons/build/Ionicons'
import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo, useState } from 'react'
import { StyleSheet, ViewStyle } from 'react-native'
import { Text } from 'react-native-paper'

import Column from 'components/Column'

import store from 'context/store'

import { MachineType } from 'models/MachineType'

import Colors from 'utils/colors'
import { isIpad, isIphone } from 'utils/platform'

import MachineTypeItemField from './MachineTypeItemField'
import Row from './Row'

type Props = { item: MachineType; index: number; categoryId?: string }

const MachineTypeItem: FC<Props> = ({ item, index, categoryId }) => {
  const route = useRoute()
  const { categories, items, orientation } = store

  const selectedCategory = useMemo(
    () => categories[categoryId || route.name],
    [categories, categoryId, route.name],
  )

  const { value } = useMemo(
    () => item.fields[selectedCategory.titleField] || {},
    [item.fields, selectedCategory.titleField],
  )

  const [title, setTitle] = useState<string | boolean | number>(
    !value ? 'Unnamed Field' : String(value),
  )

  const isOddAndLastIndex = useMemo(
    () =>
      (index + 1) % 2 === 1 &&
      Object.keys(items).length > 1 &&
      index === Object.keys(items).length - 1,
    [index, items],
  )

  const onRemoveItem = useCallback(() => {
    store.removeItem(item.id)
  }, [item.id])

  const container: ViewStyle = useMemo(
    () => ({
      maxWidth:
        isOddAndLastIndex && (isIpad || (isIphone && orientation === 'LANDSCAPE'))
          ? '49%'
          : undefined,
    }),
    [isOddAndLastIndex, orientation],
  )

  const onChangeText = useCallback(
    (text: string | number | boolean, fieldId: string) => {
      if (fieldId === selectedCategory.titleField) {
        setTitle(text)
      }
    },
    [selectedCategory.titleField],
  )

  return (
    <Column style={[styles.container, container]} key={item.id}>
      <Text variant="titleLarge">{title}</Text>
      {Object.values?.(selectedCategory?.fields ?? {}).map((fieldItem) => (
        <MachineTypeItemField
          fieldItem={fieldItem}
          machineId={item.id}
          categoryId={categoryId}
          fields={item.fields}
          key={fieldItem.id}
          onChangeText={onChangeText}
        />
      ))}
      <Row style={styles.binRow} onPress={onRemoveItem}>
        <Ionicons
          name="trash-bin-sharp"
          size={24}
          color={Colors.purple}
          style={styles.icon}
        />
        <Text style={styles.removeText}>Remove</Text>
      </Row>
    </Column>
  )
}

export default observer(MachineTypeItem)

const styles = StyleSheet.create({
  removeText: { color: Colors.purple },
  binRow: { marginTop: 10 },
  icon: { marginRight: 6 },
  container: {
    backgroundColor: Colors.white,
    flex: 0.5,
    margin: 5,
    padding: 10,
    zIndex: 100,
  },
})
