
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomTabNavigator from '../navigation/BottomTabNavigator'
import DoctorInfo from '../components/doctor/DoctorInfo'
import Doctors from '../components/doctor/Doctors'
import SetPassword from '../screens/SetPassword'
import DoctorRating from '../components/doctor/DoctorRating'
import Profile from '../components/profile/Profile'
import Settings from '../screens/Settings'
import NotificationSettings from '../screens/NotificationSettings'
import PasswordManager from '../screens/PasswordManager'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{ headerShown: false }}
    >
        <Stack.Screen 
            name='BottomTabNavigator'
            component={BottomTabNavigator}
        />
        <Stack.Screen 
            name='SetPassword'
            component={SetPassword}
        />
        <Stack.Screen 
            name='Doctors'
            component={Doctors}
        />
        <Stack.Screen 
            name ="DoctorInfo"
            component={DoctorInfo}
        />

        <Stack.Screen 
            name='DoctorRating'
            component={DoctorRating}
        />
        <Stack.Screen 
            name='Profile'
            component={Profile}
        />
        <Stack.Screen 
            name='Settings'
            component={Settings}
        />
        <Stack.Screen 
            name='NotificationSettings'
            component={NotificationSettings}
        />
        <Stack.Screen 
            name='PasswordManager'
            component={PasswordManager}
        />
    </Stack.Navigator>
  )
}

export default StackNavigator