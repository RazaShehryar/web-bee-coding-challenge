import { createDrawerNavigator } from '@react-navigation/drawer'
import { FC } from 'react'

import Category from 'screens/Category'
import Dashboard from 'screens/Dashboard'

const Drawer = createDrawerNavigator()

const DrawerNavigator: FC = () => {
  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      <Drawer.Screen name="Category" component={Category} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
