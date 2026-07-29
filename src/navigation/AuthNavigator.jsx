import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import Login from '../screens/Login'
import SignUp from '../screens/SignUp'
import SetPassword from '../screens/SetPassword'
import Register from '../screens/Register'

const Stack = createNativeStackNavigator()

function AuthNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, headerBackVisible: false }}
    >
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
  )
}

export default AuthNavigator