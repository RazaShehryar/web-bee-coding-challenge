import { createDrawerNavigator } from '@react-navigation/drawer'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import store from 'context/store'

import Dashboard from 'screens/Dashboard'
import MachineTypeScreen from 'screens/MachineTypeScreen'
import ManageCategories from 'screens/ManageCategories'

const Drawer = createDrawerNavigator()

const DrawerNavigator: FC = () => {
  const { categories } = store

  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {Object.values(categories).map((item) => (
        <Drawer.Screen
          key={item.id}
          name={item.id}
          component={MachineTypeScreen}
          options={{ title: item.title }}
        />
      ))}
      <Drawer.Screen
        name="ManageCategories"
        component={ManageCategories}
        options={{ title: 'Manage Categories' }}
      />
    </Drawer.Navigator>
  )
}

export default observer(DrawerNavigator)
