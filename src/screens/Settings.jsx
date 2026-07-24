import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    moderateScale,
    scale,
    verticalScale,
} from 'react-native-size-matters';

import Header from '../components/header/Header';

import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';

// SVGs
import NotificationSettings from '../assets/images/svg/profile/NotificationSettings.svg';
import PasswordManager from '../assets/images/svg/profile/PasswordManager.svg';
import DeleteIcon from '../assets/images/svg/profile/DeleteIcon.svg';
import RightArrowBlue from '../assets/images/svg/profile/RightArrowBlue.svg';

const Settings = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header text="Settings" />

            <View style={styles.list}>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.optionContainer}
                    onPress={() => navigation.navigate("NotificationSettings")}
                >
                    <View style={styles.leftContainer}>
                        <View style={styles.iconContainer}>
                            <NotificationSettings />
                        </View>
                        <Text style={styles.title}>Notification Settings</Text>
                    </View>

                    <RightArrowBlue />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.optionContainer}
                    onPress={() => navigation.navigate("PasswordManager")}
                >
                    <View style={styles.leftContainer}>
                        <View style={styles.iconContainer}>
                            <PasswordManager />
                        </View>
                        <Text style={styles.title}>Password Manager</Text>
                    </View>

                    <RightArrowBlue />
                </TouchableOpacity>

                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.optionContainer}
                >
                    <View style={styles.leftContainer}>
                        <View style={styles.iconContainer}>
                            <DeleteIcon />
                        </View>
                        <Text style={styles.title}>Delete Account</Text>
                    </View>

                    <RightArrowBlue />
                </TouchableOpacity>

            </View>
        </SafeAreaView>
    );
};

export default Settings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        marginTop: verticalScale(35),
        paddingHorizontal: scale(22),
    },

    list: {
        marginTop: verticalScale(30),
    },

    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(18),
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: scale(42),
        height: scale(42),
        borderRadius: scale(21),
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(16),
    },

    title: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.regular,
        color: Colors.black,
    },
});