import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Modal,
    TouchableWithoutFeedback,
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
import Button from '../components/button/Button';
import FontSizes from '../components/style/FontSize';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { deleteAccount } from '../redux/auth/authSlice';
import { showSnackbar } from '../components/snackbar/ShowSnackbar';
import Spacing from '../components/style/Spacing';

const Settings = () => {

    const [openModal, setOpenModal] = useState(false)

    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const handleDeleteAccount = async () => {
        const result = await dispatch(deleteAccount(user.id))

        if (deleteAccount.fulfilled.match(result)) {
            showSnackbar({ msg: "Account Deleted Sucessfully" })
            navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
            })
        }
        else{
            showSnackbar({ msg : result.payload})
        }

    }
    return (
        <SafeAreaView style={styles.container}>
            <Header text="Settings" />

            <Modal
                visible={openModal}
                transparent
                animationType='slide'
                onRequestClose={() => setOpenModal(false)}
            >
                <TouchableWithoutFeedback onPress={() => setOpenModal(false)}>
                    <View style={styles.modalLayout}>

                        <View style={styles.deleteAccountModal}>
                            <Text style={styles.deleteTitle}>Delete Account</Text>
                            <Text style={styles.deleteText}>Are you sure you want to delete account</Text>
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

                                <View style={styles.deleteBtnContainer}>
                                    <Button
                                        text="Delete"
                                        varient="primary"
                                        style={styles.deleteButton}
                                        textStyle={styles.deleteBtnText}
                                        onPress={handleDeleteAccount}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>

            </Modal >

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
                    onPress={() => setOpenModal(true)}
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
        paddingHorizontal: scale(22),
    },

    list: {
        marginTop: verticalScale(30),
    },

    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: Spacing.xl,
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: Spacing.w42,
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

    modalLayout: {
        flex: 1,
        backgroundColor: Colors.modalLayout,
        justifyContent: 'flex-end',
    },
    deleteAccountModal: {
        backgroundColor: Colors.white,
        borderRadius:Spacing.mxxxl,
        paddingHorizontal: scale(20),
        paddingVertical: verticalScale(20),
        alignItems: 'center',
    },
    deleteTitle: {
        fontFamily: Fonts.medium,
        fontSize: moderateScale(24),
        color: Colors.primary,
    },
    deleteText: {
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

    deleteBtnContainer: {
        width: '45%',
    },

    cancelButton: {
        height: Spacing.h40,
        borderRadius: Spacing.mxxl,
        backgroundColor: Colors.socialButtonBackground,
    },

    deleteButton: {
        height: Spacing.h40,
        borderRadius: Spacing.mxxl,
        backgroundColor: Colors.primary,
    },

    cancelText: {
        color: Colors.primary,
        fontSize: FontSizes.xl,
        fontFamily: Fonts.medium
    },
    deleteBtnText: {
        color: Colors.white,
        fontSize: FontSizes.xl,
        fontFamily: Fonts.medium
    },
});