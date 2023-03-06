import Ionicons from '@expo/vector-icons/build/Ionicons'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useState } from 'react'
import { GestureResponderEvent, StyleSheet } from 'react-native'
import { Menu, Provider, Text, TextInput } from 'react-native-paper'

import store from 'context/store'

import { Field } from 'models/Category'

import Colors from 'utils/colors'

import Row from './Row'

type Props = { item: Field; categoryId: string }

const FieldItem: FC<Props> = ({ item, categoryId }) => {
  const [showMenu, setShowMenu] = useState(false)
  const [menuAnchor, setMenuAnchor] = useState({ x: 0, y: 0 })

  const openMenu = useCallback(() => setShowMenu(true), [])
  const closeMenu = useCallback(() => setShowMenu(false), [])

  const onTextPress = useCallback(
    (event: GestureResponderEvent) => {
      const { nativeEvent } = event
      const anchor = {
        x: nativeEvent.pageX,
        y: nativeEvent.pageY * 0.25,
      }

      setMenuAnchor(anchor)
      openMenu()
    },
    [openMenu],
  )

  const onChangeText = useCallback(
    (text: string) => {
      store.updateFieldTitle(text, categoryId, item.id)
    },
    [categoryId, item.id],
  )

  const onRemoveField = useCallback(() => {
    store.removeField(categoryId, item.id)
  }, [categoryId, item.id])

  return (
    <Provider>
      <Row alignItems="center" style={styles.container}>
        <Row alignItems="center" style={styles.row}>
          <TextInput
            mode="outlined"
            label={item.title}
            value={item.title}
            onChangeText={onChangeText}
            outlineColor={`${Colors.gray}50`}
            style={styles.textInput}
            placeholder="Field"
          />
          <Text variant="titleSmall" style={styles.typeText} onPress={onTextPress}>
            {item.type === 'string' ? 'TEXT' : item.type.toUpperCase()}
          </Text>
          <Menu visible={showMenu} onDismiss={closeMenu} anchor={menuAnchor}>
            <Menu.Item title="View" />
            <Menu.Item title="Edit" />
            <Menu.Item title="Delete" />
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
    </Provider>
  )
}

export default observer(FieldItem)

const styles = StyleSheet.create({
  typeText: {
    color: Colors.purple,
    marginLeft: 10,
  },
  icon: { marginLeft: 10 },
  textInput: { marginTop: 0, height: 46, marginBottom: 8, width: '79%' },
  container: { marginTop: 10, paddingRight: 10 },
  row: {
    borderWidth: 1,
    borderColor: `${Colors.gray}50`,
    height: 50,
  },
})
