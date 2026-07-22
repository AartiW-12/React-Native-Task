import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import { Text, View } from 'react-native'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import SetPassword from '../screens/SetPassword'
import Register from '../screens/Register'

const Stack = createNativeStackNavigator()

function AuthNavigator() {
  console.log("AUTH navigator Called")
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name='Register'
        component={Register}
      />
      <Stack.Screen
        name="Login"
        component={Login}
      />
      <Stack.Screen 
        name='SignUp'
        component={SignUp}
      />
      <Stack.Screen 
        name='SetPassword'
        component={SetPassword}
      />
    </Stack.Navigator>
    // <Text>AUTH NAV</Text>
  )
}

export default AuthNavigator