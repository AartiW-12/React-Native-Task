import React from 'react'
import BottomTabNavigator from './BottomTabNavigator'
import AuthNavigator from './AuthNavigator'
import StackNavigator from './StackNavigator'

function AppNavigator() {
    console.log("APP Navigator")
    const userToken = "a"
    return (
        <>
            {
                userToken ?
                    <StackNavigator />
                    :
                    <AuthNavigator />
            }
        </>
    )
}

export default AppNavigator