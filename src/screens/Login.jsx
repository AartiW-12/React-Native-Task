import React, { useState } from 'react'
import { Alert, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Input from '../components/input/Input'
import Button from '../components/button/Button'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
function Login() {
    //hoooks to store and update the state 
    const [inputValue, setInputValue] = useState("")
    const [password, setPassword] = useState("")

    // functions 
    const handleLogin = () => {
        console.log("Login Sucessfull")
    }

    const handleForgetPassword = () => {
        console.log("Forget Password")
    }

    const handleBack = () => {
        console.log("Handle Back")
    }

    // array of icons
    const icons = [
        { id: 1, image: require('../assets/images/Ellipse35.png') },
        { id: 2, image: require('../assets/images/Group98.png') },
        { id: 3, image: require('../assets/images/Vector164.png') },
    ];

    return (
        <View style={styles.container}>
            <Pressable
                onPress={() => handleBack()}
            >
                <Image 
                    source={require('../assets/images/BackIcon.png')}
                />
            </Pressable>
            <Text style={styles.header}>Log In</Text>
            <Text style={styles.header2}>Welcome</Text>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            <Text style={styles.label}>Email or Mobile Number</Text>
            <Input
                placeholder="example@example.com"
                value={inputValue}
                onChangeText={setInputValue}
                style={styles.input}

            />
            <Text style={styles.label}>Password</Text>
            <Input
                placeholder='*************'
                value={password}
                onChangeText={setPassword}
                style={styles.input}
            />
            <Text style={styles.link} onPress={() => handleForgetPassword()}>Forget Password</Text>
            <View style={styles.btnContainer}>
                <Button
                    varient='primary'
                    text="Log In"
                    onPress={handleLogin}
                />
            </View>
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
            <Text style={styles.footer}>Don’t have an account? {' '}
                <Text style={styles.link}>
                    Sign Up
                </Text>
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        paddingTop: verticalScale(50),
        width: scale(299),
        marginLeft: scale(20)
    },
    header: {
        fontFamily: 'LeagueSpartan-SemiBold',
        fontSize: moderateScale(24),
        fontWeight: '600',
        color: '#2260FF',
        alignSelf: 'center'
    },
    header2: {
        fontFamily: 'LeagueSpartan-SemiBold',
        fontSize: moderateScale(24),
        fontWeight: '600',
        color: '#2260FF',
        alignSelf: 'flex-start',
        marginTop: scale(10)
    },
    text: {
        width: '100%',
        height: verticalScale(50),
        textAlign: 'center',
        color: '#070707',
        fontSize: moderateScale(12),
        fontWeight: '300',
        fontFamily: 'LeagueSpartan-Regular',
    },
    label: {
        fontSize: moderateScale(20),
        fontFamily: 'LeagueSpartan-Medium',
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
    link: {
        color: '#2260FF',
        fontSize: moderateScale(12),
        fontWeight: '500',
        alignSelf: 'flex-end',
        padding: 10
    },
    btnContainer: {
        width: scale(207),
        height: verticalScale(45),
        marginTop: verticalScale(20),
        alignSelf: 'center'
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
        backgroundColor: '#CAD6FF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    socialIcon: {
        width: scale(24),
        height: scale(24),
    },
    footer : {
        marginTop: verticalScale(30),
        textAlign: 'center',
        fontSize: moderateScale(12),
        fontFamily: 'LeagueSpartan-Regular',
        color: '#070707',
    }

})
export default Login