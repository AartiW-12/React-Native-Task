import React, { useState } from 'react'

import { StyleSheet, Text, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'

import Input from '../components/input/Input'
import Button from '../components/button/Button'

import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'
import Header from '../components/header/Header'
import Strings from '../components/constants/Strings'
import CommonStyles from '../components/constants/CommonStyles'

function SetPassword() {

    const [password, setPassword] = useState("")
    const [cnfmPass, setCnfmPass] = useState("")

    const handleResetPassword = async() => {
        console.log("forgot password")
    }

    return (
        <SafeAreaView style={CommonStyles.flex1}>
            <View style={styles.container}>
                <Header text={Strings.setPassword} />
                <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
                <Text style={styles.label}>{Strings.password}</Text>
                <Input
                    placeholder={Strings.passwordPlaceholder}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}
                    style={styles.input}
                />
                <Text style={styles.label}>{Strings.confirmPassword}</Text>
                <Input
                    placeholder={Strings.passwordPlaceholder}
                    value={cnfmPass}
                    onChangeText={setCnfmPass}
                    style={styles.input}
                    secureTextEntry={true}
                />
                <View style={styles.btnContainer}>
                    <Button
                        varient='primary'
                        text={Strings.createNewPassword}
                        onPress={handleResetPassword}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        paddingHorizontal: scale(20)
    },
    text: {
        height: verticalScale(50),
        textAlign: 'center',
        color: '#070707',
        fontSize: moderateScale(12),
        fontWeight: '300',
        fontFamily: Fonts.regular,
        marginTop: verticalScale(20)
    },
    label: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.medium,
        fontWeight: '500',
        color: Colors.black,
        marginBottom: verticalScale(5),
        marginTop: verticalScale(20),
    },
    input: {
        paddingHorizontal: 10,
        paddingLeft: 15,
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