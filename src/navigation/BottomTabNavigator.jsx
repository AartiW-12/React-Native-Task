import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Schedule from '../screens/Schedule';

import HomeIcon from '../assets/images/svg/HomeIcon.svg';
import ChatIcon from '../assets/images/svg/ChatIcon.svg';
import ProfileIcon from '../assets/images/svg/ProfileIcon.svg';
import CalendarIconWhite from '../assets/images/svg/CalenderIconWhite.svg';

import Colors from '../components/style/Colors';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { StyleSheet } from 'react-native';
import MyProfile from '../screens/MyProfile';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <HomeIcon
              width={24}
              height={24}
              opacity={focused ? 1 : 0.7}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Notifications"
        component={Notifications}
        options={{
          tabBarIcon: ({ focused }) => (
            <ChatIcon
              width={24}
              height={24}
              opacity={focused ? 1 : 0.7}
            />
          ),
        }}
      />

      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{
          tabBarIcon: ({ focused }) => (
            <ProfileIcon
              width={24}
              height={24}
              opacity={focused ? 1 : 0.7}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Schedule"
        component={Schedule}
        options={{
          tabBarIcon: ({ focused }) => (
            <CalendarIconWhite
              width={24}
              height={24}
              opacity={focused ? 1 : 0.7}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    width:scale(298),
    bottom: verticalScale(18),
    height: verticalScale(48),
    marginLeft:scale(25),
    backgroundColor: Colors.primary,
    borderRadius: moderateScale(24),
  },

  tabItem: {
    marginTop:verticalScale(6)
  },
});