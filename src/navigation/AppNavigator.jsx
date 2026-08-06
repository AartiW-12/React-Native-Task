import React, { useEffect, useState } from 'react'
import AuthNavigator from './AuthNavigator'
import StackNavigator from './StackNavigator'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { restoreSession } from '../redux/auth/authSlice'
import SplashScreen from '../screens/SplashScreen'

function AppNavigator() {

    const [initializing, setInitializing] = useState(true)

    const dispatch = useDispatch()

    const { isLoggedIn } = useSelector(state => state.auth)

    useEffect(() => {
        const initializeApp = async () => {
            try {
                const storedToken = await AsyncStorage.getItem("Token")
                const storedUser = await AsyncStorage.getItem("User")

                if (storedToken && storedUser) {
                    dispatch(restoreSession({
                        token: storedToken,
                        user: JSON.parse(storedUser)
                    }))
                }
            }
            catch (err) {
                console.log(err)
            }
            finally {
                setInitializing(false)
            }
        }
        initializeApp()
    }, [])

    if (initializing) {
        return <SplashScreen />
    }
    return (
        <>
            {
                isLoggedIn ?
                    <StackNavigator />
                    :
                    <AuthNavigator />
            }
        </>
    )
}

export default AppNavigator