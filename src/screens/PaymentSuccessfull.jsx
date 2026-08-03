import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'

import Colors from '../components/style/Colors'
import BackIcon from '../assets/images/svg/BackIcon.svg'
import { scale, verticalScale } from 'react-native-size-matters'

import SuccessIcon from '../assets/images/svg/SuccessIcon.svg'
import CalenderIcon from '../assets/images/svg/CalenderIconWhite.svg'
import ClockIcon from '../assets/images/svg/ClockIconWhite.svg'

import FontSizes from '../components/style/FontSize'
import Fonts from '../components/style/Fonts'

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native'
import { useDispatch } from 'react-redux'
import { addAppointment } from '../redux/appointment/appointmentSlice'

const PaymentSuccessfull = () => {
    const route = useRoute()
    const { doctor, selectedDate, selectedSlot } = route.params

    const dispatch = useDispatch()

    const navigation = useNavigation()
    useEffect(() => {
        dispatch(
            addAppointment({
                id: Date.now().toString(),
                doctorId: doctor.id,
                status: "upcoming",
                date: selectedDate,
                time: selectedSlot,
            })
        );
        setTimeout(() => {
            navigation.dispatch(
                CommonActions.reset({
                    index: 0,
                    routes: [
                        {
                            name: 'BottomTabNavigator',
                            state: {
                                routes: [
                                    {
                                        name: "Home",
                                        state: {
                                            routes: [{ name: "Home" }]
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                })
            )
        }, 1000);
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <BackIcon height={20} width={20} color={Colors.white} />
            <View style={styles.successIconContainer}>
                <SuccessIcon width={172} height={172} />
            </View>
            <Text style={styles.title}>Congratulations</Text>
            <Text style={styles.subTitle}>Payment is Successfull</Text>

            <View style={styles.card}>
                <Text style={styles.text}>You have successfully booked an appointment with</Text>
                <Text style={styles.name}>{doctor.name}</Text>
                <View style={styles.schedule}>
                    <View style={styles.scheduleContents}>
                        <CalenderIcon height={19} width={17} />
                        <Text style={styles.scheduleText}>{selectedDate}</Text>
                    </View>
                    <View style={styles.scheduleContents}>
                        <ClockIcon height={19} width={17} />
                        <Text style={styles.scheduleText}>{selectedSlot}</Text>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.primary,
    },
    successIconContainer: {
        marginTop: verticalScale(100),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    title: {
        fontSize: FontSizes.heading,
        color: Colors.white,
        paddingVertical: verticalScale(10),
        justifyContent: 'center',
        alignSelf: 'center',
        fontFamily: Fonts.semiBold,
        marginTop: verticalScale(10)
    },
    subTitle: {
        fontSize: FontSizes.xxl,
        fontFamily: Fonts.medium,
        color: Colors.white,
        alignSelf: 'center'
    },
    card: {
        width: scale(260),
        marginTop: verticalScale(80),
        paddingVertical: verticalScale(10),
        borderWidth: 1,
        borderColor: Colors.white,
        borderRadius: scale(20),
        alignSelf: "center"
    },
    text: {
        color: Colors.white,
        fontSize: FontSizes.md,
        fontFamily: Fonts.regular,
        paddingVertical: verticalScale(3),
        paddingHorizontal: scale(5),
        alignSelf: 'center',
        marginLeft: scale(20),
    },
    name: {
        fontFamily: Fonts.bold,
        fontSize: FontSizes.xl,
        alignSelf: "center",
        color: Colors.white
    },
    schedule: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingVertical: verticalScale(5),
        paddingHorizontal: scale(3)
    },
    scheduleContents: {
        flexDirection: 'row',
        gap: scale(10)
    },
    scheduleText: {
        color: Colors.white,
        fontSize: FontSizes.lg,
        fontFamily: Fonts.medium
    }
})
export default PaymentSuccessfull