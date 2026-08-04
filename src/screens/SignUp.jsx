import React, { useState } from 'react'
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'

import { useDispatch } from 'react-redux'
import {signUpUser } from '../redux/auth/authSlice'

import Input from '../components/input/Input'
import Button from '../components/button/Button'

import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'
import Header from '../components/header/Header'
import Strings from '../components/constants/Strings'
import { showSnackbar } from '../components/snackbar/ShowSnackbar'
import CommonStyles from '../components/constants/CommonStyles'


function SignUp({ navigation }) {

    //hoooks to store and update the state 
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [mobileNumber, setMobileNumber] = useState("")
    const [dob, setDOB] = useState("")

    const dispatch = useDispatch()

    // sign up function 
    const handleSignUp = async () => {
    const result = await dispatch(
        signUpUser({
            name,
            email,
            password,
            mobileNumber,
            dob,
            profileImage: "",
        })
    );

    if (signUpUser.fulfilled.match(result)) {
        showSnackbar({
            msg: "Account Created Successfully",
        });
    } else {
        showSnackbar({
            msg: result.payload,
        });
    }
};

    // array of icons
    const icons = [
        { id: 1, image: require('../assets/images/Ellipse35.png') },
        { id: 2, image: require('../assets/images/Group98.png') },
        { id: 3, image: require('../assets/images/Vector164.png') },
    ];
    return (
        <SafeAreaView style={CommonStyles.flex1}>
            <KeyboardAvoidingView
                style={CommonStyles.flex1}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={styles.scrollContainer}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={styles.container}>

                        <Header text={Strings.newAccount} />

                        <View style={styles.signUpSection}>
                            <Text style={styles.label}>Full name</Text>
                            <Input
                                placeholder={Strings.emailPlaceholder}
                                value={name}
                                onChangeText={setName}
                                style={styles.inputBox}
                            />
                            <Text style={styles.label}>{Strings.password}</Text>
                            <Input
                                placeholder={Strings.passwordPlaceholder}
                                value={password}
                                onChangeText={setPassword}
                                style={styles.inputBox}
                                secureTextEntry={true}
                            />
                            <Text style={styles.label}>{Strings.email}</Text>
                            <Input
                                placeholder={Strings.emailPlaceholder}
                                value={email}
                                onChangeText={setEmail}
                                style={styles.inputBox}
                            />
                            <Text style={styles.label}>{Strings.mobileNumber}</Text>
                            <Input
                                placeholder="1234567890"
                                value={mobileNumber}
                                onChangeText={setMobileNumber}
                                keyboardType='numeric'
                                style={styles.inputBox}
                            />
                            <Text style={styles.label}>Date of birth</Text>
                            <Input
                                placeholder={Strings.dobPlaceholder}
                                value={dob}
                                onChangeText={setDOB}
                                style={styles.inputBox}
                            />
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.terms}>
                                By continuing, you agree to{' '}
                                <Text style={styles.link}>
                                    Terms of Use
                                </Text>
                                {' and '}
                                <Text style={styles.link}>
                                    Privacy Policy
                                </Text>
                                .
                            </Text>
                        </View>
                        <View style={styles.btnContainer}>
                            <Button
                                varient='primary'
                                text={Strings.signUp}
                                onPress={handleSignUp}
                            />
                        </View>
                        <Text style={styles.dividerText}>or sign up with</Text>
                        <View style={styles.signUpOptionsContainer}>
                            {icons.map((item) => (
                                <Pressable
                                    key={item.id}
                                    style={styles.socialButton}
                                >
                                    <Image
                                        source={item.image}
                                        style={styles.socialIcon}
                                        resizeMode="contain"
                                    />
                                </Pressable>
                            ))}
                        </View>
                        <Text style={styles.footer}>
                            already have an account?{' '}
                            <Text
                                style={styles.link}
                                onPress={() => navigation.navigate("Login")}
                            >
                                {Strings.login}
                            </Text>
                        </Text>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: verticalScale(30),
        backgroundColor: Colors.screenBackground,
    },
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackgroundFFF,
        paddingHorizontal: scale(30),
    },

    signUpSection: {
        marginTop: verticalScale(30)
    },

    label: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.medium,
        fontWeight: '500',
        color: Colors.black,
        marginBottom: verticalScale(5),
        marginTop: verticalScale(10),
    },

    inputBox: {
        height: verticalScale(45),
        backgroundColor: Colors.inputBackground,
        borderRadius: moderateScale(13),
        paddingHorizontal: scale(14),
    },

    textContainer: {
        marginTop: verticalScale(10),
        alignItems: 'center',
        paddingHorizontal: scale(20),
    },

    terms: {
        textAlign: 'center',
        fontSize: moderateScale(12),
        fontFamily: Fonts.regular,
        color: '#070707',
        lineHeight: moderateScale(16),
    },

    btnContainer: {
        width: scale(207),
        alignSelf: 'center',
        marginTop: verticalScale(20),
    },

    dividerText: {
        marginTop: verticalScale(16),
        textAlign: 'center',
        fontSize: moderateScale(12),
        fontFamily: Fonts.regular,
        color: '#070707',
    },

    signUpOptionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: verticalScale(14),
        gap: scale(12),
    },

    socialButton: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },

    socialIcon: {
        width: scale(24),
        height: scale(24),
    },

    footer: {
        marginTop: verticalScale(30),
        textAlign: 'center',
        fontSize: moderateScale(12),
        fontFamily: Fonts.regular,
        color: '#070707',
    },
    link: {
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
    },
});
export default SignUp