import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    Image,
    FlatList,
    TouchableOpacity,
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
        screen: 'Payment',
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

const MyProfile = ({ navigation }) => {
    console.log("Current:", navigation.getState().routeNames);

console.log("Parent:", navigation.getParent()?.getState().routeNames);
    return (
        <View style={styles.container}>
            <Header text="My Profile" />
            <Image
                source={ProfileImg}
                style={styles.profileImage}
            />
            <Text style={styles.name}>
                John Doe
            </Text>
            <FlatList
                data={menuData}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const Icon = item.icon;
                    return (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            style={styles.optionContainer}
                            onPress={() => navigation.navigate(item.screen)}
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
                }}
            />

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
        paddingTop: verticalScale(30),
        paddingBottom: verticalScale(10),
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
})
export default MyProfile