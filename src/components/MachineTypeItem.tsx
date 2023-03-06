import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Switch, Text, TextInput } from 'react-native-paper'

import Column from 'components/Column'

import store from 'context/store'

import { MachineType, MachineTypeValue } from 'models/MachineType'

import Colors from 'utils/colors'

import Row from './Row'

type Props = { item: MachineType; index: number }

const inputValue = (value: string | number | Date | boolean) => {
  if (typeof value === 'string') {
    return value
  } else if (typeof value === 'boolean') {
    return ''
  } else if (value instanceof Date) {
    return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`
  } else {
    return ''
  }
}

const boolValue = (value: string | number | Date | boolean) =>
  typeof value === 'boolean' ? value : false

const MachineTypeItem: FC<Props> = ({ item, index }) => {
  const isOddAndLastIndex = useMemo(
    () => (index + 1) % 2 === 1 && index === Object.keys(item.fields).length - 1,
    [index, item.fields],
  )

  const route = useRoute()

  const { categories } = store

  const selectedCategory = useMemo(() => categories[route.name], [categories, route.name])

  const onChangeValue = useCallback(
    (text: string | boolean | number, fieldItem: MachineTypeValue) => {
      store.updateFieldValue(text, item.id, fieldItem)
    },
    [item.id],
  )

  return (
    <Column style={[styles.container, { flex: isOddAndLastIndex ? 0.48 : 0.5 }]}>
      <Text variant="titleLarge">
        {selectedCategory.fields[selectedCategory.titleField].title}
      </Text>
      {Object.values(selectedCategory.fields).map((fieldItem) => {
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
    </Column>
  )
}

export default observer(MachineTypeItem)

const styles = StyleSheet.create({
  bottomRow: { marginTop: 10 },
  removeText: { color: Colors.purple },
  binRow: { marginLeft: 10 },
  newFieldButton: { borderRadius: 5, borderWidth: 0.5, borderColor: `${Colors.gray}40` },
  icon: { marginRight: 6 },
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 5,
    width: '90%',
    marginTop: 10,
  },
  textInput: { marginTop: 10, width: '90%', height: 40 },
  container: {
    backgroundColor: Colors.white,
    flex: 0.5,
    margin: 5,
    padding: 10,
    zIndex: 100,
  },
})
