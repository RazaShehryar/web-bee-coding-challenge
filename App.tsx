import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useEffect } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import { Provider } from 'react-native-paper'
import { DatePickerModal, enGB, registerTranslation } from 'react-native-paper-dates'
import { CalendarDate } from 'react-native-paper-dates/lib/typescript/Date/Calendar'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import store from 'context/store'

import DrawerNavigator from 'navigation/DrawerNavigator'

import { navigationRef } from 'utils/navigation'

registerTranslation('en-GB', enGB)

const onDismiss = () => store.setSelectedDateItem(null)

const App: FC = () => {
  const { isHydrated, selectedDateItem } = store

  const window = useWindowDimensions()

  useEffect(() => {
    if (window.height < window.width) {
      store.setOrientation('LANDSCAPE')
    } else {
      store.setOrientation('PORTRAIT')
    }
  }, [window.height, window.width])

  const onConfirm = useCallback(
    ({ date }: { date: CalendarDate }) => {
      if (selectedDateItem && date) {
        store.updateFieldValue(date, selectedDateItem.id, selectedDateItem)
      }
      onDismiss()
    },
    [selectedDateItem],
  )

  if (!isHydrated) {
    return null
  }

  return (
    <SafeAreaProvider>
      {selectedDateItem ? (
        <DatePickerModal
          locale="en-GB"
          mode="single"
          visible={!!selectedDateItem}
          onDismiss={onDismiss}
          date={
            selectedDateItem.value instanceof Date ? selectedDateItem.value : undefined
          }
          onConfirm={onConfirm}
        />
      ) : null}
      <Provider>
        <View style={styles.container}>
          <NavigationContainer ref={navigationRef}>
            <DrawerNavigator />
          </NavigationContainer>
          <StatusBar style="auto" />
        </View>
      </Provider>
    </SafeAreaProvider>
  )
}

export default observer(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
