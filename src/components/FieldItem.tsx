import Ionicons from '@expo/vector-icons/build/Ionicons'
import debounce from 'lodash/debounce'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useRef, useState } from 'react'
import {
  GestureResponderEvent,
  NativeSyntheticEvent,
  StyleSheet,
  View,
} from 'react-native'
import { TextInputFocusEventData } from 'react-native'
import { Menu, Text, TextInput } from 'react-native-paper'

import store from 'context/store'

import { Field } from 'models/Category'

import Colors from 'utils/colors'

import Row from './Row'

type Props = {
  item: Field
  categoryId: string
  onChangeValue: (text: string, id: string) => void
}

const items: Omit<Field, 'id'>[] = [
  { title: 'Text', type: 'string' },
  { title: 'Checkbox', type: 'checkbox' },
  { title: 'Number', type: 'number' },
  { title: 'Date', type: 'date' },
]

const FieldItem: FC<Props> = ({ item, categoryId, onChangeValue }) => {
  const [value, setValue] = useState(item.title)
  const [showMenu, setShowMenu] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })

  const openMenu = useCallback(() => setShowMenu(true), [])
  const closeMenu = useCallback(() => setShowMenu(false), [])

  const onTextPress = useCallback(
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

  const onTextChange = useRef(
    debounce((text: string) => {
      // extensive operation due to which we had to wrap it inside a debounce and declare a local state for storing the title
      store.updateFieldTitle(text, categoryId, item.id)
    }, 1000),
  ).current

  const onChangeText = useCallback(
    (text: string) => {
      onChangeValue(text, item.id)
      setValue(text)
      onTextChange(text)
    },
    [item.id, onChangeValue, onTextChange],
  )

  const onRemoveField = useCallback(() => {
    store.removeField(categoryId, item.id)
  }, [categoryId, item.id])

  const onUpdateFieldType = useCallback(
    (type: Field['type']) => {
      store.updateFieldType(type, categoryId, item.id)
      closeMenu()
    },
    [categoryId, closeMenu, item.id],
  )

  const onBlur = useCallback(
    (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
      store.checkAndFixDuplicates(e.nativeEvent.text, categoryId, item.id)
    },
    [categoryId, item.id],
  )

  return (
    <View style={{ zIndex: 100 }}>
      <Row alignItems="center" style={styles.container}>
        <Row alignItems="center" justifyContent="space-between" style={styles.row}>
          <TextInput
            mode="outlined"
            label={value}
            value={value}
            onChangeText={onChangeText}
            outlineColor={`${Colors.gray}50`}
            style={styles.textInput}
            placeholder="Field"
            onBlur={onBlur}
          />
          <Text variant="bodySmall" style={styles.typeText} onPress={onTextPress}>
            {item.type === 'string' ? 'TEXT' : item.type.toUpperCase()}
          </Text>
          <Menu visible={showMenu} onDismiss={closeMenu} anchor={menuAnchor}>
            {items.map((state) => (
              <Menu.Item
                key={state.type}
                title={state.title}
                onPress={() => onUpdateFieldType(state.type)}
              />
            ))}
          </Menu>
        </Row>
        <Ionicons
          name="trash-bin-sharp"
          size={24}
          color={Colors.black}
          style={styles.icon}
          onPress={onRemoveField}
        />
      </Row>
    </View>
  )
}

export default observer(FieldItem)

const styles = StyleSheet.create({
  typeText: {
    color: Colors.purple,
    marginLeft: 10,
    width: '30%',
  },
  icon: { marginLeft: 10 },
  textInput: {
    marginTop: 0,
    height: 46,
    marginBottom: 8,
    width: '60%',
  },
  container: { marginTop: 10, paddingRight: 10 },
  row: {
    borderWidth: 1,
    borderColor: `${Colors.gray}50`,
    height: 50,
  },
})
