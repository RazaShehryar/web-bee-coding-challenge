import Ionicons from '@expo/vector-icons/build/Ionicons'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo } from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import uuid from 'react-native-uuid'

import Column from 'components/Column'

import store from 'context/store'

import { Category } from 'models/Category'

import Colors from 'utils/colors'

import FieldItem from './FieldItem'
import Row from './Row'

type Props = { item: Category; index: number }

const CategoryItem: FC<Props> = ({ item, index }) => {
  const { categories } = store

  const onAddField = useCallback(() => {
    const fieldId = uuid.v4() as string
    store.addField(item.id, fieldId)
  }, [item.id])

  const titleField = useMemo(() => {
    const value = item.fields[item.titleField].title
    if (!value) {
      return 'UNNAMED FIELD'
    }
    return value.toUpperCase()
  }, [item.fields, item.titleField])

  const isOddAndLastIndex = useMemo(
    () => (index + 1) % 2 === 1 && index === categories.length - 1,
    [categories.length, index],
  )

  const onChangeText = useCallback(
    (text: string) => {
      store.updateCategoryTitle(text, item.id)
    },
    [item.id],
  )

  return (
    <Column style={[styles.container, { flex: isOddAndLastIndex ? 0.48 : 0.5 }]}>
      <Text variant="titleLarge">{item.title}</Text>
      <TextInput
        mode="outlined"
        label={item.title}
        style={styles.textInput}
        onChangeText={onChangeText}
        value={item.title}
      />
      {Object.values(item.fields).map((value) => (
        <FieldItem item={value} categoryId={item.id} key={value.id} />
      ))}
      <Button mode="contained" style={styles.button} onPress={onAddField}>
        {`TITLE FIELD: ${titleField}`}
      </Button>
      <Row alignItems="center" style={{ marginTop: 10 }}>
        <Button
          mode="contained"
          buttonColor={Colors.white}
          textColor={Colors.purple}
          style={styles.newFieldButton}
          onPress={onAddField}>
          ADD NEW FIELD
        </Button>
        <Row style={styles.binRow}>
          <Ionicons
            name="trash-bin-sharp"
            size={24}
            color={Colors.purple}
            style={styles.icon}
          />
          <Text style={{ color: Colors.purple }}>Remove</Text>
        </Row>
      </Row>
    </Column>
  )
}

export default observer(CategoryItem)

const styles = StyleSheet.create({
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
  },
})
