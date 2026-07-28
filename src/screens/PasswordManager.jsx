import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Input from '../components/input/Input'

import Header from '../components/header/Header'
import Colors from '../components/style/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Fonts from '../components/style/Fonts'
import Button from '../components/button/Button'

const PasswordManager = ({ navigation }) => {

    const [currentPass, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [cnfmPassword, setCnfmPassword] = useState("")

    const handleChangePassword = () => {

    }

  return (
    <SafeAreaView style={styles.container}>
        <Header text={'Password Manager'} />
        <View style={styles.settingsContainer}>
            <Text style={styles.label}>Current Password</Text>
            <Input 
                placeholder='*************'
        value={currentPass}
        onChangeText={setCurrentPassword}
        style={styles.input}
        secureTextEntry={true}
            />
            <Text 
                style={styles.link}
                onPress={() => navigation.navigate('SetPassword')}    
            >Forgot password?</Text>
            <Text style={styles.label}>New Password</Text>
            <Input 
                placeholder={'*************'}
                value={password}
                onChangeText={setPassword}
                style={styles.input}
                secureTextEntry={true}
            />
            <Text style={styles.label}>Confirm New Password</Text>
            <Input 
                placeholder={'*************'}
                value={cnfmPassword}
                onChangeText={setCnfmPassword}
                secureTextEntry={true}
                style={styles.input}
            />
            <View style={styles.btnContainer}>
                <Button 
                    text={'Change Password'}
                    varient='primary'
                    onPress={handleChangePassword}
                />
            </View>
        </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container : {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        marginTop: verticalScale(20),
        paddingHorizontal: scale(22),
    },
    settingsContainer : {
        paddingHorizontal:scale(10),
        paddingVertical:verticalScale(20),
        minWidth:scale(300)
    },
    label : {
        marginTop:verticalScale(10),
        marginBottom:scale(10),
        fontFamily:Fonts.medium,
        fontSize:moderateScale(20)
    },
    link : {
        color:Colors.primary,
        fontFamily:Fonts.medium,
        alignSelf:'flex-end',
        marginTop:verticalScale(2)
    },  
    inputBox : {
        marginTop:scale(10)
    },
    btnContainer : {
        marginTop: verticalScale(180),
        height:verticalScale(48),
        width:scale(300)
    }
})
export default PasswordManager