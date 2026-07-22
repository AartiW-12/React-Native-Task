import React from 'react'
import BottomTabNavigator from './BottomTabNavigator'
import AuthNavigator from './AuthNavigator'

function AppNavigator() {
    console.log("APP Navigator")
    const userToken = "1234"
    return (
        <>
            {
                userToken ?
                    <BottomTabNavigator />
                    :
                    <AuthNavigator />
            }
        </>
    )
}

export default AppNavigator