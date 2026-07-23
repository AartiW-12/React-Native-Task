import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Input from '../components/input/Input'
import Button from '../components/button/Button'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'
import Header from '../components/header/Header'
function SetPassword() {

    const [password , setPassword] = useState("")
    const [cnfmPass, setCnfmPass] = useState("")

    const handleResetPassword = () => {
        console.log("Reset Password")
    }
    const handleBack = () => {
        console.log("Back")
    }

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => handleBack()}
            >
                <Image
                    source={require('../assets/images/BackIcon.png')}
                />
            </Pressable>
            <Header text="Set Password"/>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            <Text style={styles.label}>Password</Text>
            <Input 
                placeholder="*************"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={true}
                style={styles.input}
            />
            <Text style={styles.label}>Confirm Password</Text>
            <Input 
                placeholder="*************"
                value={cnfmPass}
                onChangeText={setCnfmPass}
                style={styles.input}
                secureTextEntry={true}
            />
            <View style={styles.btnContainer}>
                <Button 
                    varient='primary'
                    text="Create New password"
                    onPress={handleResetPassword}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex:1,
        backgroundColor: Colors.screenBackground,
        paddingTop: verticalScale(50),
        width: scale(299),
        marginLeft: scale(20)
    },
    text: {
        width: '100%',
        height: verticalScale(50),
        textAlign: 'center',
        color: '#070707',
        fontSize: moderateScale(12),
        fontWeight: '300',
        fontFamily: Fonts.regular,
        marginTop:verticalScale(20)
    },
    label: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.medium,
        fontWeight: '500',
        color: '#000',
        marginBottom: verticalScale(5),
        marginTop: verticalScale(20),
    },
    input : {
        paddingHorizontal: 10,
        paddingLeft:15,
        fontSize: 16
    },
    btnContainer: {
        width: scale(207),
        height: verticalScale(45),
        marginTop: verticalScale(20),
        alignSelf: 'center'
    },
})

export default SetPassword