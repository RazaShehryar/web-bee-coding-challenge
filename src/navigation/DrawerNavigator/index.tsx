import { createDrawerNavigator } from '@react-navigation/drawer'
import { observer } from 'mobx-react-lite'
import { FC } from 'react'

import store from 'context/store'

import Category from 'screens/Category'
import Dashboard from 'screens/Dashboard'
import ManageCategories from 'screens/ManageCategories'

const Drawer = createDrawerNavigator()

const DrawerNavigator: FC = () => {
  const { categories } = store

  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {Object.values(categories).map((item, index) => (
        <Drawer.Screen
          key={index.toString()}
          name={item.id}
          component={Category}
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
