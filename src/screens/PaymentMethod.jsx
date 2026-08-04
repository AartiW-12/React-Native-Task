import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/header/Header'

import AddCardIcon from '../assets/images/svg/AddCardIcon.svg'
import ApplePayIcon from '../assets/images/svg/ApplePayIcon.svg'
import PaypalIcon from '../assets/images/svg/PaypalIcon.svg'
import GooglePayIcon from '../assets/images/svg/GoogleIcon.svg'
import Colors from '../components/style/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Fonts from '../components/style/Fonts'
import FontSizes from '../components/style/FontSize'
import { useNavigation } from '@react-navigation/native'

const PaymentMethod = () => {

    const [selectedPayment, setSelectedPayment] = useState('')

    const navigation = useNavigation()
    return (
        <SafeAreaView style={styles.container}>
            <Header text="Payment Method" />
            <View style={styles.content}>
                <Text style={styles.sectionTitle}>
                    Credit & Debit Card
                </Text>
                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => {
                        setSelectedPayment('card')
                        setTimeout(() => {
                            navigation.navigate("AddCard")
                        }, 700);
                    }}>
                    <View style={styles.leftSection}>
                        <AddCardIcon width={22} height={22} />
                        <Text style={styles.optionText}>
                            Add New Card
                        </Text>
                    </View>

                    <View style={styles.radioOuter}>
                        <View
                            style={[
                                styles.radioInner,
                                { backgroundColor: selectedPayment === 'card' ? Colors.primary : 'transparent', },
                            ]}
                        />
                    </View>
                </TouchableOpacity>

                <Text style={styles.sectionTitle}>
                    More Payment Options
                </Text>

                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => setSelectedPayment('apple')}>
                    <View style={styles.leftSection}>
                        <ApplePayIcon width={22} height={22} />
                        <Text style={styles.optionText}>
                            Apple Pay
                        </Text>
                    </View>

                    <View style={styles.radioOuter}>
                        <View
                            style={[
                                styles.radioInner,
                                { backgroundColor: selectedPayment === 'apple' ? Colors.primary : 'transparent', },
                            ]}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => setSelectedPayment('paypal')}>
                    <View style={styles.leftSection}>
                        <PaypalIcon width={22} height={22} />
                        <Text style={styles.optionText}>
                            PayPal
                        </Text>
                    </View>

                    <View style={styles.radioOuter}>
                        <View
                            style={[
                                styles.radioInner,
                                { backgroundColor: selectedPayment === 'paypal' ? Colors.primary : 'transparent', },
                            ]}
                        />
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.paymentOption}
                    onPress={() => setSelectedPayment('google')}>
                    <View style={styles.leftSection}>
                        <GooglePayIcon width={22} height={22} />
                        <Text style={styles.optionText}>
                            Google Pay
                        </Text>
                    </View>

                    <View style={styles.radioOuter}>
                        <View
                            style={[
                                styles.radioInner,
                                { backgroundColor: selectedPayment === 'google' ? Colors.primary : 'transparent', },
                            ]}
                        />
                    </View>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground
    },
    content: {
        flex: 1,
        marginTop: verticalScale(20),
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(10),
    },
    sectionTitle: {
        marginBottom: verticalScale(18),
        fontSize: FontSizes.xxl,
        fontFamily: Fonts.regular,
        color: Colors.black,
    },
    paymentOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
        backgroundColor: Colors.inputBackground,
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(20),
        borderRadius: moderateScale(22),
        height: scale(44),
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    optionText: {
        marginLeft: scale(12),
        fontSize: FontSizes.xl,
        fontFamily: Fonts.regular,
        color: Colors.paymentText,
    },
    radioOuter: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(11),
        borderWidth: 1.5,
        borderColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.white,
    },
    radioInner: {
        width: scale(12),
        height: scale(12),
        borderRadius: scale(6),
        borderWidth: 1,
        borderColor: Colors.primary,
    },
})
export default PaymentMethod