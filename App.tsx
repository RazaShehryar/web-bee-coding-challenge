import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { observer } from 'mobx-react-lite'
import { FC, useCallback, useEffect } from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import store from 'context/store'

import DrawerNavigator from 'navigation/DrawerNavigator'

import { navigationRef } from 'utils/navigation'

const App: FC = () => {
  const { isHydrated } = store

  const window = useWindowDimensions()

  useEffect(() => {
    if (window.height < window.width) {
      store.setOrientation('LANDSCAPE')
    } else {
      store.setOrientation('PORTRAIT')
    }
  }, [window.height, window.width])

  if (!isHydrated) {
    return null
  }

  return (
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <DrawerNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  )
}

export default observer(App)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
