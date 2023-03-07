import Ionicons from '@expo/vector-icons/build/Ionicons'
import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo } from 'react'
import { Pressable, StyleSheet, ViewStyle } from 'react-native'
import { Switch, Text, TextInput } from 'react-native-paper'

import Column from 'components/Column'

import store from 'context/store'

import { MachineType, MachineTypeValue } from 'models/MachineType'

import Colors from 'utils/colors'
import { boolValue, inputValue } from 'utils/inputValue'
import { isIpad, isIphone } from 'utils/platform'

import Row from './Row'

type Props = { item: MachineType; index: number; categoryId?: string }

const MachineTypeItem: FC<Props> = ({ item, index, categoryId }) => {
  const { categories, items, orientation } = store

  const isOddAndLastIndex = useMemo(
    () =>
      (index + 1) % 2 === 1 &&
      Object.keys(items).length > 1 &&
      index === Object.keys(items).length - 1,
    [index, items],
  )

  const route = useRoute()

  const selectedCategory = useMemo(
    () => categories[categoryId || route.name],
    [categories, categoryId, route.name],
  )

  const onChangeValue = useCallback(
    (text: string | boolean | number, fieldItem: MachineTypeValue) => {
      store.updateFieldValue(text, item.id, fieldItem)
    },
    [item.id],
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

  const { titles } = store

  return (
    <Column style={[styles.container, container]}>
      <Text variant="titleLarge">{titles[item.id]}</Text>
      {Object.values?.(selectedCategory?.fields ?? {}).map((fieldItem) => {
        const field = selectedCategory.fields[fieldItem.id]
        const { value } = item.fields[fieldItem.id] || {}

        if (field.type === 'checkbox') {
          return (
            <Row key={String(fieldItem.id)} alignItems="center" style={{ marginTop: 10 }}>
              <Switch
                value={boolValue(value)}
                trackColor={{ true: Colors.purple }}
                onValueChange={(text) =>
                  onChangeValue(text, { value: inputValue(value), fieldId: fieldItem.id })
                }
              />
              <Text variant="bodyMedium" style={{ marginLeft: 10 }}>
                {field.title}
              </Text>
            </Row>
          )
        }

        if (field.type === 'date') {
          return (
            <Pressable
              key={String(fieldItem.id)}
              onPress={() =>
                store.setSelectedDateItem({
                  fieldId: fieldItem.id,
                  value: inputValue(value),
                  id: item.id,
                })
              }>
              <TextInput
                mode="outlined"
                pointerEvents="none"
                label={field.title}
                style={styles.textInput}
                onChangeText={(text) =>
                  onChangeValue(text, { value: inputValue(value), fieldId: fieldItem.id })
                }
                value={inputValue(value)}
              />
            </Pressable>
          )
        }
        return (
          <TextInput
            mode="outlined"
            keyboardType={field.type === 'number' ? 'numeric' : undefined}
            key={String(fieldItem.id)}
            label={field.title}
            style={styles.textInput}
            onChangeText={(text) =>
              onChangeValue(text, {
                value: inputValue(value),
                fieldId: fieldItem.id,
              })
            }
            value={inputValue(value)}
          />
        )
      })}
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
  textInput: { marginTop: 10, width: '90%', height: 40 },
  container: {
    backgroundColor: Colors.white,
    flex: 0.5,
    margin: 5,
    padding: 10,
    zIndex: 100,
  },
})
