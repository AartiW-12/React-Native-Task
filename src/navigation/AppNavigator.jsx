import React from 'react'
import BottomTabNavigator from './BottomTabNavigator'
import AuthNavigator from './AuthNavigator'
import StackNavigator from './StackNavigator'
import AppContent from '../content/AppContent'

function AppNavigator() {
    console.log("APP Navigator")
    const userToken = ""
    return (
        <>
            {
                userToken ?
                    (
                        <>
                            <StackNavigator />
                            <AppContent />
                        </>
                    )

                    :
                    <AuthNavigator />
            }
        </>
    )
}

export default AppNavigator