import { View, Text, StyleSheet, TouchableOpacity, Alert, Image, ToastAndroid } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Input from '../input/Input'
import Button from '../button/Button'

import ProfileImg from '../../assets/images/avatar.png'
import SettingIcon from '../../assets/images/svg/SettingIcon.svg'
import Colors from '../style/Colors'
import Fonts from '../style/Fonts'
import Header from '../header/Header'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useDispatch, useSelector } from 'react-redux'
import { updateProfile } from '../../services/authService/authService'
import { updateUser } from '../../redux/auth/authSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { Snackbar } from 'react-native-snackbar'
const Profile = () => {

    const { user } = useSelector(state => state.auth)
    const dispatch = useDispatch()

    const navigation = useNavigation()

    const [name, setName] = useState('')
    const [Phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [dob, setDOB] = useState('')

    useEffect(() => {
        if (user) {
            setName(user.name || '');
            setPhone(user.mobileNumber || '');
            setEmail(user.email || '');
            setDOB(user.dob || '');
        }
    }, [user])

    const showSnackbar = () => {
        Snackbar.show({
            text: "Profile Updated Sucssfully",
            duration: Snackbar.LENGTH_SHORT,
            backgroundColor: Colors.primary,
            textColor: Colors.white,
        })
    }

    const handleUpdateProfile = async () => {
        try {
            if (!user) {
                Alert.alert("User Not Found")
                return
            }
            const updatedData = {
                ...user,
                name,
                email,
                mobileNumber: Phone,
                dob
            }

            const response = await updateProfile(user.id, updatedData)

            dispatch(updateUser(response))
            await AsyncStorage.setItem(
                "User",
                JSON.stringify(updatedData)
            );

            showSnackbar()
        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.settingContainer}>
                    <View style={{ flex: 1 }}>
                        <Header text="Profile" />
                    </View>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Settings')}
                        style={styles.blueCircleBtn}
                    >
                        <SettingIcon width={12} height={12} />
                    </TouchableOpacity>
                </View>
                <Image
                    source={ProfileImg}
                    style={styles.profileImage}
                />
                <Text style={styles.name}>
                    {name}
                </Text>
                <View style={styles.profileContainer}>
                    <Text style={styles.label}>Full Name</Text>
                    <Input
                        value={name}
                        onChangeText={setName}
                        style={styles.inputBox}
                    />
                    <Text style={styles.label}>Phone Number</Text>
                    <Input
                        value={Phone}
                        onChangeText={setPhone}
                        style={styles.inputBox}
                    />
                    <Text style={styles.label}>Email</Text>
                    <Input
                        value={email}
                        onChangeText={setEmail}
                        style={styles.inputBox}
                    />
                    <Text style={styles.label}>Date of Birth</Text>
                    <Input
                        value={dob}
                        onChangeText={setDOB}
                        style={styles.inputBox}
                        placeholder={'DD/MM/YYYY'}
                    />

                    <View style={styles.btnContainer}>
                        <Button
                            varient='primary'
                            text={'Update Profile'}
                            onPress={handleUpdateProfile}
                        />
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: scale(22),
    },
    settingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    blueCircleBtn: {
        height: scale(18),
        width: scale(18),
        borderRadius: scale(9),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    profileImage: {
        width: scale(88),
        height: scale(88),
        borderRadius: scale(44),
        alignSelf: 'center',
        marginTop: verticalScale(18),
    },
    name: {
        alignSelf: 'center',
        marginTop: verticalScale(12),
        fontFamily: Fonts.semiBold,
        fontSize: moderateScale(20),
        color: Colors.black,
    },
    profileContainer: {
        marginTop: verticalScale(10),
        width: scale(299)
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
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: moderateScale(20)
    },
    btnContainer: {
        height: verticalScale(45),
        width: scale(207),
        alignSelf: "center",
        marginTop: moderateScale(40)
    }
})
export default Profile