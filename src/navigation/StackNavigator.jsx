
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomTabNavigator from '../navigation/BottomTabNavigator'
import DoctorInfo from '../components/doctor/DoctorInfo'
import Doctors from '../components/doctor/Doctors'

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
            name='Doctors'
            component={Doctors}
        />
        <Stack.Screen 
            name ="DoctorInfo"
            component={DoctorInfo}
        />
    </Stack.Navigator>
  )
}

export default StackNavigator