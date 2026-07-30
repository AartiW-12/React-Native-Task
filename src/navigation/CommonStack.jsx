
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import Home from '../screens/Home'
import Doctors from '../screens/Doctors'
import Notifications from '../screens/Notifications'
import DoctorInfo from '../components/doctor/DoctorInfo'
import CancelAppointment from '../screens/CancelAppointment'

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
        <Stack.Screen 
            name='DoctorInfo'
            component={DoctorInfo}
        />
        <Stack.Screen 
            name='CancelAppointment'
            component={CancelAppointment} 
        />
    </Stack.Navigator>
  )
}

export default CommonStack