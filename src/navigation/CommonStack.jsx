
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Home from '../screens/Home'
import Doctors from '../screens/Doctors'
import Notifications from '../screens/Notifications'

const Stack = createNativeStackNavigator()

const CommonStack = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown : false
        }}
    >
        <Stack.Screen 
            name='Home'
            component={Home}
        />
        <Stack.Screen 
            name='Doctors'
            component={Doctors}
        />
        <Stack.Screen 
            name='Notifications'
            component={Notifications} 
        />
    </Stack.Navigator>
  )
}

export default CommonStack