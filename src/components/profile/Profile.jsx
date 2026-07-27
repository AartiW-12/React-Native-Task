import { View, Text, StyleSheet, TouchableOpacity, Alert, Image } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native'
import Input from '../input/Input'
import Button from '../button/Button'

import ProfileImg from '../../assets/images/avatar.png'
import SettingIcon from '../../assets/images/svg/SettingIcon.svg'
import Colors from '../style/Colors'
import Fonts from '../style/Fonts'
import Header from '../header/Header'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const Profile = () => {
    const [name, setName] = useState("John Doe")
    const [Phone, setPhone] = useState("+123 567 89000")
    const [email, setEmail] = useState("Johndoe@example.com")
    const [dob, setDOB] = useState("")

    const navigation = useNavigation()

    const handleUpdateProfile = () => {
        console.log("Update Profile")
    }

    return (
        <View style={styles.container}>

            <View style={styles.settingContainer}>
                <View style={{flex:1}}>
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
                John Doe
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
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        marginTop: verticalScale(35),
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
    profileContainer : {
        marginTop:verticalScale(10),
        width:scale(299)
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
        fontFamily:Fonts.regular,
        fontSize:moderateScale(20)
    },
    btnContainer: {
        height:verticalScale(45),
        width:scale(207),
        alignSelf:"center",
        marginTop:moderateScale(20)
    }
})
export default Profile