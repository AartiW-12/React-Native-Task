import React from 'react'

import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'

import Header from '../components/header/Header'
import Button from '../components/button/Button'

import Colors from '../components/style/Colors'
import FontSizes from '../components/style/FontSize'
import Fonts from '../components/style/Fonts'


import FilledStar from '../assets/images/svg/FilledStar.svg'
import CommentIcon from '../assets/images/svg/Comments.svg'
import StarIcon from '../assets/images/svg/StarIconWhite.svg'
import Spacing from '../components/style/Spacing'

const ReviewSummary = () => {

    const amount = '100.00'

    const navigation = useNavigation()
    const route = useRoute()
    const { doctor, selectedDate, selectedSlot, appointmentFor } = route.params

    const handlePayment = () => {
        navigation.navigate("PaymentSuccessfull", {doctor, selectedDate, selectedSlot, appointmentFor})
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header
                    text="Payment"
                    titleStyle={{ color: Colors.white }}
                    backIconColor={Colors.white}
                />
                <Text style={styles.amount}>
                    ${amount}
                </Text>
            </View>
            <View style={styles.card}>
                <View style={styles.doctorRow}>
                    <Image
                        source={{ uri: doctor.avatar }}
                        style={styles.image}
                    />
                    <View style={styles.doctorInfo}>
                        <View style={styles.nameRow}>
                            <Text style={styles.name}>
                                {doctor.name}
                            </Text>
                            <View style={styles.blueCircleButton}>
                                <StarIcon
                                width={16}
                                height={16}
                            />
                            </View>
                        </View>
                        <Text style={styles.specialization}>
                            {doctor.specialization}
                        </Text>
                        <View style={styles.chipRow}>
                            <View style={styles.chip}>
                                <FilledStar />
                                <Text style={styles.chipText}>
                                    {doctor.rating}
                                </Text>
                            </View>
                            <View style={styles.chip}>
                                <CommentIcon />
                                <Text style={styles.chipText}>
                                    {doctor.comments}
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>
                        Date / Hour
                    </Text>
                    <Text style={styles.value}>
                        {selectedDate} | {selectedSlot}
                    </Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>
                        Duration
                    </Text>
                    <Text style={styles.value}>
                        30 Minutes
                    </Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>
                        Booking For
                    </Text>
                    <Text style={styles.value}>
                        {appointmentFor}
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>
                        Amount
                    </Text>
                    <Text style={styles.value}>
                        ${amount}
                    </Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>
                        Duration
                    </Text>
                    <Text style={styles.value}>
                        30 Minutes
                    </Text>
                </View>
                <View style={styles.infoRow}>
                    <Text style={styles.label}>
                        Total
                    </Text>
                    <Text style={styles.value}>
                        ${amount}
                    </Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoRow}>
                    <Text style={styles.label}>
                        Payment Method
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('PaymentMethod')}
                    >
                        <Text style={styles.value}>Card   <Text style={styles.change}>Change</Text></Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    text="Pay Now"
                    varient="primary"
                    onPress={handlePayment}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
    },

    header: {
        backgroundColor: Colors.primary,
        paddingBottom: verticalScale(50),
    },

    amount: {
        marginTop: verticalScale(20),
        textAlign: 'center',
        color: Colors.white,
        fontSize: moderateScale(34),
        fontFamily: Fonts.semiBold,
    },
    card: {
        flex: 1,
        backgroundColor: Colors.white,
        marginTop: verticalScale(-18),
        paddingHorizontal: scale(22),
        paddingTop: verticalScale(22),
    },
    doctorRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    image: {
        width: scale(84),
        height: scale(84),
        borderRadius: scale(42),
    },

    doctorInfo: {
        flex: 1,
        marginLeft: scale(25),
    },
    nameRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginHorizontal: Spacing.xl,
    },
    name: {
        flex: 1,
        color: Colors.primary,
        fontSize: FontSizes.lg,
        fontFamily: Fonts.medium,
    },

    specialization: {
        marginTop: verticalScale(4),
        color: Colors.black,
        fontSize: FontSizes.sm,
        fontFamily: Fonts.regular,
    },
    blueCircleButton: {
        width: Spacing.xxl,
        height: scale(24),
        borderRadius: scale(12),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    chipRow: {
        flexDirection: 'row',
        marginTop: verticalScale(8),
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: moderateScale(16),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(5),
        marginRight: scale(10),
    },
    chipText: {
        marginLeft: scale(5),
        color: Colors.primary,
        fontSize: FontSizes.sm,
        fontFamily: Fonts.regular,
    },
    divider: {
        height: 2,
        backgroundColor: Colors.primary,
        marginVertical: verticalScale(10),
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(10),
    },

    label: {
        color: Colors.primary,
        fontSize: FontSizes.md,
        fontFamily: Fonts.regular,
        marginLeft:scale(15)
    },

    value: {
        color: Colors.black,
        fontSize: FontSizes.md,
        fontFamily: Fonts.medium,
        textAlign: 'right',
        marginRight:scale(20)
    },

    change: {
        color: Colors.primary,
        fontSize: FontSizes.sm,
        fontFamily: Fonts.medium,
    },
    buttonContainer: {
        paddingHorizontal: scale(24),
        paddingBottom: verticalScale(24),
        backgroundColor: Colors.white,
    },
    button: {
        height: verticalScale(42),
        borderRadius: moderateScale(24),
    },
});

export default ReviewSummary