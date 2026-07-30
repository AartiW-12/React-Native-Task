import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRoute } from '@react-navigation/native'

import Header from '../components/header/Header'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'

import FilledStar from '../assets/images/svg/FilledStar.svg'
import Comments from '../assets/images/svg/Comments.svg'
import EmptyHeart from '../assets/images/svg/EmptyHeart.svg'
import FilledHeart from '../assets/images/svg/FilledHeart.svg'
import FontSizes from '../components/style/FontSize'
import EmptyStar from '../assets/images/svg/EmptyStar.svg'

const YourAppoitment = () => {
    const route = useRoute()
    const doctor = route.params.doctor
    const selectedDate = route.params.selectedDate
    const selectedSlot = route.params.selectedSlot
    const patientDetails = route.params.patientDetails
    const appointmentFor = route.params.appointmentFor

    return (
        <SafeAreaView>
            <Header text={'Your Appointment'} />
            <View>
                <View style={styles.card}>
                    <Image source={{ uri: doctor.avatar }} style={styles.avatar} />
                    <View style={styles.detailsContainer}>
                        <View style={styles.nameContainer}>
                            <Text numberOfLines={1} style={styles.name}>
                                {doctor.name}
                            </Text>
                            <Text style={styles.specialization}>
                                {doctor.specialization}
                            </Text>
                        </View>
                        <View style={styles.bottomRow}>
                            <View style={styles.infoChip}>
                                {doctor.rating === 5 ? (
                                    <FilledStar style={styles.iconStyle} />
                                ) : (
                                    <EmptyStar style={styles.iconStyle} />
                                )}

                                <Text style={styles.infoText}>{' '}{doctor.rating}</Text>
                            </View>

                            <View style={styles.infoChip}>
                                <Comments style={styles.iconStyle} />
                                <Text style={styles.infoText}>{' '}{doctor.comments}</Text>
                            </View>

                            <View style={styles.bottomRightContainer}>
                                <TouchableOpacity style={styles.circleButton}>
                                    <Text style={styles.question}>?</Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={styles.circleButton}>
                                    {doctor.favorite ? (
                                        <FilledHeart style={styles.iconStyle} />
                                    ) : (
                                        <EmptyHeart style={styles.iconStyle} />
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.line} />

            <View style={styles.appointmentDetails}>
                <View>

                    <View style={styles.dateChip}>
                        <Text style={styles.dateText}>{selectedDate}</Text>
                    </View>

                    <Text style={styles.timeText}>{selectedSlot || "ABC"}</Text>
                </View>

                <View style={styles.statusContainer}>
                    <TouchableOpacity style={styles.statusButton}>
                        <Text style={styles.statusIcon}>✓</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.statusButton}>
                        <Text style={styles.statusIcon}>✕</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={styles.line} />

            <View style={styles.patientDetailsContainer}>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Booking For</Text>
                    <Text style={styles.detailValue}>
                        {appointmentFor === 'self' ? 'Yourself' : 'Another'}
                    </Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Full Name</Text>
                    <Text style={styles.detailValue}>{patientDetails.name}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Age</Text>
                    <Text style={styles.detailValue}>{patientDetails.age}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Gender</Text>
                    <Text style={styles.detailValue}>{patientDetails.gender}</Text>
                </View>
            </View>

            <View style={styles.line} />

            <View style={styles.problemContainer}>
                <Text style={styles.detailLabel}>Problem</Text>

                <Text style={styles.problemText}>
                    {patientDetails.problem}
                </Text>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    card: {
        width: scale(300),
        alignSelf: 'center',
        flexDirection: 'row',
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: moderateScale(18),
        marginBottom: verticalScale(14),
        marginTop: verticalScale(20),
        alignItems: 'center',
    },

    avatar: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(29),
        marginLeft: scale(10)
    },

    detailsContainer: {
        flex: 1,
        borderRadius: moderateScale(14),
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        marginLeft: scale(5),
    },
    nameContainer: {
        backgroundColor: Colors.white,
        padding: scale(10),
        borderRadius: 13
    },
    name: {
        fontSize: moderateScale(14),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontWeight: '500'
    },
    specialization: {
        marginTop: verticalScale(2),
        fontSize: moderateScale(11),
        color: Colors.black,
        fontFamily: Fonts.regular,
    },
    bottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(8),
    },
    infoChip: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(2),
        marginRight: scale(8),
        flexDirection: 'row',
        alignItems: 'center',
    },

    infoText: {
        fontSize: moderateScale(10),
        color: Colors.primary,
        fontFamily: Fonts.regular,
    },
    bottomRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    circleButton: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(11),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    question: {
        color: Colors.primary
    },
    iconStyle: {
        height: verticalScale(12),
        width: scale(12)
    },
    line: {
        height: scale(1),
        backgroundColor: Colors.primary,
        marginVertical: verticalScale(10),
        width: '85%',
        alignSelf: 'center'
    },
    appointmentDetails: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        paddingHorizontal: scale(30),
        paddingVertical: verticalScale(12),
    },

    sectionLabel: {
        fontFamily: Fonts.regular,
        fontSize: FontSizes.sm,
        color: Colors.black,
        marginBottom: verticalScale(10),
    },

    dateChip: {
        backgroundColor: Colors.primary,
        borderRadius: moderateScale(18),
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(2),
        alignSelf: 'flex-start',
    },

    dateText: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: FontSizes.md,
    },

    timeText: {
        marginTop: verticalScale(5),
        color: Colors.primary,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.md,
    },

    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(10),
    },

    statusButton: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },

    statusIcon: {
        color: Colors.white,
        fontSize: FontSizes.md,
        fontFamily: Fonts.bold,
    },

    patientDetailsContainer: {
        paddingHorizontal: scale(50),
        paddingVertical: verticalScale(10),
    },

    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(10),
    },

    detailLabel: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.md,
    },

    detailValue: {
        color: Colors.black,
        fontFamily: Fonts.semiBold,
        fontSize: FontSizes.md,
    },

    problemContainer: {
        paddingHorizontal: scale(40),
        paddingVertical: verticalScale(15),
    },

    problemText: {
        marginTop: verticalScale(10),
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.sm,
        lineHeight: verticalScale(18),
    },
})
export default YourAppoitment