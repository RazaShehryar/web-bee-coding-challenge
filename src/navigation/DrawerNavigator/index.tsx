import { createDrawerNavigator } from '@react-navigation/drawer'
import { FC, useEffect, useState } from 'react'

import Category from 'screens/Category'
import Dashboard from 'screens/Dashboard'
import ManageCategories from 'screens/ManageCategories'

const Drawer = createDrawerNavigator()

const DrawerNavigator: FC = () => {
  const [screens, setScreens] = useState([1])

  useEffect(() => {
    setTimeout(() => {
      setScreens((items) => [...items, 2])
    }, 2000)
  }, [])

  return (
    <Drawer.Navigator initialRouteName="Dashboard">
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {screens.map((item, index) => (
        <Drawer.Screen
          key={index.toString()}
          name={`Category ${index}`}
          component={Category}
        />
      ))}
      <Drawer.Screen name="ManageCategories" component={ManageCategories} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
