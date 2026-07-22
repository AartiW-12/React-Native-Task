import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Text, View } from 'react-native'
import Home from '../screens/Home'
import SplashScreen from '../screens/SplashScreen'
const Tab = createBottomTabNavigator()

function BottomTabNavigator() {
    console.log("Botton navigator called")
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name='Home'
            component={Home}
        />
        <Tab.Screen 
            name='SplashScreen'
            component={SplashScreen}
        />
    </Tab.Navigator>
  )
}

export default BottomTabNavigator