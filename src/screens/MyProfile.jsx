import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
} from 'react-native'
import {
    moderateScale,
    scale,
    verticalScale,
} from 'react-native-size-matters'

import Header from '../components/header/Header'

import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'

import ProfileImg from '../assets/images/avatar.png'

// SVG
import UserIcon from '../assets/images/svg/profile/UserIcon.svg'
import HeartIcon from '../assets/images/svg/profile/HeartIcon.svg'
import PaymentIcon from '../assets/images/svg/profile/PaymentIcon.svg'
import LockIcon from '../assets/images/svg/profile/LockIcon.svg'
import SettingIcon from '../assets/images/svg/profile/SettingIcon.svg'
import HelpIcon from '../assets/images/svg/profile/HelpIcon.svg'
import LogoutIcon from '../assets/images/svg/profile/LogoutIcon.svg'
import RightArrow from '../assets/images/svg/profile/RightArrow.svg'
import EditIcon from '../assets/images/svg/EditIcon.svg'

import { useNavigation } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { logout } from '../redux/auth/authSlice'
import Button from '../components/button/Button'
import FontSizes from '../components/style/FontSize'


import { showSnackbar } from '../components/snackbar/ShowSnackbar'

const menuData = [
    {
        id: 1,
        title: 'Profile',
        icon: UserIcon,
        screen: 'Profile',
    },
    {
        id: 2,
        title: 'Favorite',
        icon: HeartIcon,
        screen: 'Favorite',
    },
    {
        id: 3,
        title: 'Payment Method',
        icon: PaymentIcon,
        screen: 'PaymentMethod',
    },
    {
        id: 4,
        title: 'Privacy Policy',
        icon: LockIcon,
        screen: 'PrivacyPolicy',
    },
    {
        id: 5,
        title: 'Settings',
        icon: SettingIcon,
        screen: 'Settings',
    },
    {
        id: 6,
        title: 'Help',
        icon: HelpIcon,
        screen: 'HelpCenter',
    },
    {
        id: 7,
        title: 'Logout',
        icon: LogoutIcon,
        screen: 'Logout',
    },
]

const MyProfile = () => {

    const [openModal, setOpenModal] = useState(false)

    const navigation = useNavigation()

    const dispatch = useDispatch()

    const { user } = useSelector(state => state.auth)


    const handleLogout = async () => {
        try {
            try {
                await AsyncStorage.removeItem("Token");
                await AsyncStorage.removeItem("User");

                dispatch(logout());
            } catch (error) {
                console.log("Logout Error:", error);
            }
        }
        catch (err) {
            console.log(err)
        }
    }

    const handleChangeProfile = () => {
        showSnackbar({ msg: "Currently you cannot update profile" })
    }
    return (
        <View style={styles.container}>
            <Header text="My Profile" backIconColor={Colors.primary} />
            <View style={styles.imageContainer}>
                <Image
                    source={ProfileImg}
                    style={styles.profileImage}
                />

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.editButton}
                    onPress={handleChangeProfile}
                >
                    <EditIcon width={18} height={18} />
                </TouchableOpacity>
            </View>
            <Text style={styles.name}>
                {user?.name || "USER"}
            </Text>
            <View style={styles.list}>
                {menuData.map((item) => {
                    const Icon = item.icon;

                    return (
                        <TouchableOpacity
                            key={item.id}
                            activeOpacity={0.8}
                            style={styles.optionContainer}
                            onPress={() => {
                                if (item.screen === 'Logout') {
                                    setOpenModal(true);
                                } else {
                                    navigation.navigate(item.screen);
                                }
                            }}
                        >
                            <View style={styles.leftContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon
                                        width={40}
                                        height={40}
                                    />
                                </View>

                                <Text style={styles.title}>
                                    {item.title}
                                </Text>
                            </View>

                            <RightArrow />
                        </TouchableOpacity>
                    );
                })}
            </View>
            <Modal
                visible={openModal}
                transparent
                animationType='slide'
                onRequestClose={() => setOpenModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                    <View style={styles.modalLayout}>

                        <View style={styles.logoutModal}>
                            <Text style={styles.logoutTitle}>Logout</Text>
                            <Text style={styles.logoutText}>Are you sure you want to log out?</Text>
                            <View style={styles.buttonContainer}>
                                <View style={styles.cancelBtnContainer}>
                                    <Button
                                        text="Cancel"
                                        varient="secondary"
                                        style={styles.cancelButton}
                                        textStyle={styles.cancelText}
                                        onPress={() => setOpenModal(false)}
                                    />
                                </View>

                                <View style={styles.logoutBtnContainer}>
                                    <Button
                                        text="Yes, Logout"
                                        varient="primary"
                                        style={styles.logoutButton}
                                        textStyle={styles.logoutBtnText}
                                        onPress={handleLogout}
                                    />
                                </View>
                            </View>
                        </View>
                        </View>
                </TouchableWithoutFeedback>
        
            </Modal >
        </View >
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        paddingHorizontal: scale(22),
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
    list: {
        marginTop: verticalScale(30),
    },
    optionContainer: {
        height: verticalScale(30),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(14),
    },
    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: scale(42),
        height: scale(42),
        borderRadius: scale(21),
        backgroundColor: Colors.backgroundColor,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(16),
    },
    title: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: moderateScale(20),
    },
    modalLayout: {
        flex: 1,
        backgroundColor: 'rgba(163, 184, 243, 0.57)',
        justifyContent: 'flex-end',
    },


    logoutModal: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(35),
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
        alignItems: 'center',

    },


    logoutTitle: {
        fontFamily: Fonts.medium,
        fontSize: moderateScale(24),
        color: Colors.primary,
    },


    logoutText: {
        marginTop: verticalScale(10),
        fontFamily: Fonts.regular,
        fontSize: moderateScale(12),
        color: Colors.black,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: verticalScale(20),
    },
    cancelBtnContainer: {
        width: '45%',
    },

    logoutBtnContainer: {
        width: '45%',
    },

    cancelButton: {
        height: verticalScale(40),
        borderRadius: moderateScale(25),
        backgroundColor: Colors.socialButtonBackground,
    },

    logoutButton: {
        height: verticalScale(40),
        borderRadius: moderateScale(25),
        backgroundColor: Colors.primary,
    },

    cancelText: {
        color: Colors.primary,
        fontSize: FontSizes.xl,
        fontFamily: Fonts.medium
    },
    logoutBtnText: {
        color: Colors.white,
        fontSize: FontSizes.xl,
        fontFamily: Fonts.medium
    },
    imageContainer: {
        alignSelf: 'center',
        marginTop: verticalScale(18),
    },

    profileImage: {
        width: scale(88),
        height: scale(88),
        borderRadius: scale(44),
    },

    editButton: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
export default MyProfile