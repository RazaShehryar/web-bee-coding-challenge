import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import { FC } from 'react'
import { StyleSheet, View } from 'react-native'

import DrawerNavigator from 'navigation/DrawerNavigator'

const App: FC = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
      <StatusBar style="auto" />
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})
