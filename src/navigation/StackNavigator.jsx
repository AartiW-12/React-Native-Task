
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import BottomTabNavigator from '../navigation/BottomTabNavigator'
import DoctorInfo from '../components/doctor/DoctorInfo'
import Doctors from '../screens/Doctors'
import SetPassword from '../screens/SetPassword'
import Profile from '../components/profile/Profile'
import Settings from '../screens/Settings'
import NotificationSettings from '../screens/NotificationSettings'
import PasswordManager from '../screens/PasswordManager'
import PrivacyPolicy from '../screens/PrivacyPolicy'
import HelpCenter from '../screens/HelpCenter'
import Notifications from '../screens/Notifications'
import ScheduleAppointment from '../screens/ScheduleAppointment'
import YourAppointment from '../screens/YourAppoitment'
import CancelAppointment from '../screens/CancelAppointment'
import Review from '../screens/Review'

const Stack = createNativeStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
        screenOptions={{ headerShown: false, headerBackVisible:false }}
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
        {/* <Stack.Screen 
            name ="DoctorInfo"
            component={DoctorInfo}
        /> */}
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
        <Stack.Screen 
            name='PrivacyPolicy'
            component={PrivacyPolicy}
        />
        <Stack.Screen 
            name='HelpCenter'
            component={HelpCenter}
        />
        <Stack.Screen 
            name='Notifications'
            component={Notifications}
        />
        <Stack.Screen 
            name='ScheduleAppointment'
            component={ScheduleAppointment}
        />
        <Stack.Screen 
            name='YourAppointment'
            component={YourAppointment}
        />
        <Stack.Screen 
            name='CancelAppointment'
            component={CancelAppointment}
        />
        <Stack.Screen 
            name='Review'
            component={Review}
        />
    </Stack.Navigator>
  )
}

export default StackNavigator