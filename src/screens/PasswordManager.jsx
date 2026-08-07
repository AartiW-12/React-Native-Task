import { View, Text, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Input from '../components/input/Input'

import Header from '../components/header/Header'
import Colors from '../components/style/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Fonts from '../components/style/Fonts'
import Button from '../components/button/Button'
import Strings from '../components/constants/Strings'
import { resetPasswordUser } from '../redux/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigation } from '@react-navigation/native'
import { showSnackbar } from '../components/snackbar/ShowSnackbar'
import CommonStyles from '../components/constants/CommonStyles'
import Spacing from '../components/style/Spacing'

const PasswordManager = () => {

    // const navigation = useNavigation()

    const [currentPass, setCurrentPassword] = useState("")
    const [password, setPassword] = useState("")
    const [cnfmPassword, setCnfmPassword] = useState("")

    const { user } = useSelector(state => state.auth)
    console.log("USerPAss", user.password)

    const dispatch = useDispatch()

    const handleChangePassword = async () => {
        if (!currentPass || !password || !cnfmPassword) {
            showSnackbar({ msg: Strings.fillDetails });
            return;
        }

        if (currentPass !== user.password) {
            showSnackbar({ msg: Strings.incorrectCurrentPass })
            return
        }

        if (password !== cnfmPassword) {
            showSnackbar({ msg: Strings.noPasswordMatch });
            return;
        }

        const result = await dispatch(
            resetPasswordUser({
                userId: user.id,
                password: cnfmPassword,
            })
        );

        if (resetPasswordUser.fulfilled.match(result)) {
            showSnackbar({
                msg: "Password Updated Successfully",
            });

            setPassword("")
            setCurrentPassword("")
            setCnfmPassword("")
        } else {
            showSnackbar({
                msg: result.payload,
            });
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={CommonStyles.flex1}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : Spacing.md}
            >
                <Header text={'Password Manager'} />
                <ScrollView
                    style={CommonStyles.flex1}
                    contentContainerStyle={CommonStyles.paddBottom}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps={'handled'}
                >
                    <View style={styles.settingsContainer}>
                    <Text style={styles.label}>Current Password</Text>
                    <Input
                        placeholder={Strings.passwordPlaceholder}
                        value={currentPass}
                        onChangeText={setCurrentPassword}
                        style={styles.input}
                        secureTextEntry={true}
                    />
                    <Text
                        style={styles.link}
                        // onPress={() => navigation.navigate('SetPassword')}
                    >{Strings.forgotPassword}</Text>
                    <Text style={styles.label}>New Password</Text>
                    <Input
                        placeholder={Strings.passwordPlaceholder}
                        value={password}
                        onChangeText={setPassword}
                        style={styles.input}
                        secureTextEntry={true}
                    />
                    <Text style={styles.label}>Confirm New Password</Text>
                    <Input
                        placeholder={Strings.passwordPlaceholder}
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
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        paddingHorizontal: scale(22),
    },
    settingsContainer: {
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(20),
        minWidth: scale(300)
    },
    label: {
        marginTop: verticalScale(10),
        marginBottom: Spacing.sm,
        fontFamily: Fonts.medium,
        fontSize: moderateScale(20)
    },
    link: {
        color: Colors.primary,
        fontFamily: Fonts.medium,
        alignSelf: 'flex-end',
        marginTop: verticalScale(2)
    },
    inputBox: {
        marginTop: scale(10)
    },
    btnContainer: {
        marginTop: verticalScale(100),
        height: verticalScale(48),
        width: scale(280)
    }
})
export default PasswordManager