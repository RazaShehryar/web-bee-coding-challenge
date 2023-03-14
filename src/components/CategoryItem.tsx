import Ionicons from '@expo/vector-icons/build/Ionicons'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useMemo, useRef, useState } from 'react'
import { GestureResponderEvent, StyleSheet, ViewStyle } from 'react-native'
import { Button, Menu, Text, TextInput } from 'react-native-paper'
import uuid from 'react-native-uuid'

import Column from 'components/Column'

import store from 'context/store'

import { Category, Field } from 'models/Category'

import Colors from 'utils/colors'
import { isIpad, isIphone } from 'utils/platform'

import FieldItem from './FieldItem'
import Row from './Row'

type Props = { item: Category; index: number }

const CategoryItem: FC<Props> = ({ item, index }) => {
  const [title, setTitle] = useState(
    item.fields[item.titleField]?.title
      ? item.fields[item.titleField]?.title.toUpperCase()
      : 'UNNAMED FIELD',
  )
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })
  const [showMenu, setShowMenu] = useState(false)

  const { categories, orientation } = store

  const onAddField = useCallback(() => {
    const fieldId = uuid.v4() as string
    store.addField(item.id, fieldId)
  }, [item.id])

  const isOddAndLastIndex = useMemo(
    () =>
      (index + 1) % 2 === 1 &&
      Object.keys(categories).length > 1 &&
      index === Object.keys(categories).length - 1,
    [categories, index],
  )

  const onChangeText = useCallback(
    (text: string) => {
      store.updateCategoryTitle(text, item.id)
    },
    [item.id],
  )

  const openMenu = useCallback(() => setShowMenu(true), [])
  const closeMenu = useCallback(() => setShowMenu(false), [])

  const onButtonPress = useCallback(
    (event: GestureResponderEvent) => {
      const { nativeEvent } = event
      const anchor = {
        x: nativeEvent.pageX,
        y: nativeEvent.pageY,
      }

      setMenuAnchor(anchor)
      openMenu()
    },
    [openMenu],
  )

  const onUpdateTitleField = useCallback(
    (fieldId: string) => {
      setTitle(
        item.fields[fieldId]?.title
          ? item.fields[fieldId]?.title.toUpperCase()
          : 'UNNAMED FIELD',
      )
      store.updateTitleField(item.id, fieldId)
      closeMenu()
    },
    [closeMenu, item.fields, item.id],
  )

  const onRemoveCategory = useCallback(() => {
    store.removeCategory(item.id)
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

  const fields = useRef<Field[]>(Object.values(item.fields))

  return (
    <Column style={[styles.container, container]}>
      <Text variant="titleLarge">{item.title}</Text>
      <TextInput
        mode="outlined"
        label="Category Name"
        style={styles.textInput}
        onChangeText={onChangeText}
        value={item.title}
      />
      {fields.current.map((value) => (
        <FieldItem
          item={value}
          categoryId={item.id}
          key={value.id}
          onChangeValue={(text) => setTitle(text)}
        />
      ))}
      <Button mode="contained" style={styles.button} onPress={onButtonPress}>
        {`TITLE FIELD: ${title}`}
      </Button>
      <Menu visible={showMenu} onDismiss={closeMenu} anchor={menuAnchor}>
        {fields.current.map((value) => (
          <Menu.Item
            key={value.id}
            title={value.title}
            onPress={() => onUpdateTitleField(value.id)}
          />
        ))}
      </Menu>
      <Row alignItems="center" style={styles.bottomRow}>
        <Button
          mode="contained"
          buttonColor={Colors.white}
          textColor={Colors.purple}
          style={styles.newFieldButton}
          onPress={onAddField}>
          ADD NEW FIELD
        </Button>
        <Row style={styles.binRow} onPress={onRemoveCategory}>
          <Ionicons
            name="trash-bin-sharp"
            size={24}
            color={Colors.purple}
            style={styles.icon}
          />
          <Text style={styles.removeText}>Remove</Text>
        </Row>
      </Row>
    </Column>
  )
}

export default observer(CategoryItem)

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
