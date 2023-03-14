import { useRoute } from '@react-navigation/native'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo } from 'react'
import { Pressable, StyleSheet } from 'react-native'
import { Switch, Text, TextInput } from 'react-native-paper'

import store from 'context/store'

import { Field } from 'models/Category'
import { MachineType, MachineTypeValue } from 'models/MachineType'

import Colors from 'utils/colors'
import { boolValue, inputValue } from 'utils/inputValue'

import Row from './Row'

type Props = {
  fieldItem: Field
  categoryId?: string
  machineId: string
  fields: MachineType['fields']
  onChangeText: (value: string | boolean | number, fieldId: string) => void
}

const MachineTypeItemField: FC<Props> = ({
  fieldItem,
  categoryId,
  machineId,
  fields,
  onChangeText,
}) => {
  const { categories } = store

  const route = useRoute()

  const selectedCategory = useMemo(
    () => categories[categoryId || route.name],
    [categories, categoryId, route.name],
  )

  const onChangeValue = useCallback(
    (text: string | boolean | number, item: MachineTypeValue) => {
      store.updateFieldValue(text, machineId, item)
      onChangeText(text, item.fieldId)
    },
    [machineId, onChangeText],
  )

  const field = selectedCategory.fields[fieldItem.id]
  const { value } = fields[fieldItem.id] || {}

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
            id: machineId,
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
}

export default observer(MachineTypeItemField)

const styles = StyleSheet.create({
  textInput: { marginTop: 10, width: '90%', height: 40 },
})
