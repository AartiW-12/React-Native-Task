import React from 'react'

import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

import { SafeAreaView } from 'react-native-safe-area-context'

import doctorsList from './doctorsList'
import Button from '../button/Button'

import StarIconWhite from '../../assets/images/svg/StarIconWhite.svg'
import FilledHeart from '../../assets/images/svg/FilledHeart.svg'

import Colors from '../style/Colors'
import Fonts from '../style/Fonts'

const FavoriteDoctor = () => {

    const FavoriteDoctorList = doctorsList.filter(doctor => doctor.favorite)

    const bookAppointment = () => {
        console.log("Book Appointment")
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.doctorsList}>
                <FlatList
                    data={FavoriteDoctorList}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={item.avatar} style={styles.avatar} />
                            <View style={styles.detailsContainer}>
                                <View style={styles.ratingContainer}>
                                    <View style={styles.blueCircleButton}>
                                        <StarIconWhite height={10} width={10} />
                                    </View>
                                    <Text style={styles.infoText}>Professional Doctor</Text>
                                </View>
                                <View style={styles.nameContainer}>
                                    <View style={styles.nameSection}>
                                        <Text numberOfLines={1} style={styles.name}>
                                            {item.name}
                                        </Text>
                                        <Text style={styles.specialization}>
                                            {item.specialization}
                                        </Text>
                                    </View>
                                    <View style={styles.favoriteSection}>
                                        <FilledHeart height={16} width={18} />
                                    </View>
                                </View>
                                <View style={styles.bottomRow}>
                                    <Button
                                        varient='primary'
                                        text={'Make Appointment'}
                                        style={styles.btnMakeAppointment}
                                        onPress={() => bookAppointment()}

                                    />
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    doctorsList: {
        flex: 1,
        marginTop: verticalScale(20),
    },
    listContainer: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(15),
        paddingBottom: verticalScale(30),
    },

    card: {
        flexDirection: 'row',
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: moderateScale(18),
        marginBottom: verticalScale(14),
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: scale(10),
        borderRadius: 13
    },
    nameSection: {
        flex: 1
    },
    favoriteSection: {
        justifyContent: 'center',
        marginLeft: scale(20)
    },
    name: {
        flex: 1,
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

    infoText: {
        fontSize: moderateScale(12),
        color: Colors.primary,
        fontFamily: Fonts.regular,
    },
    ratingContainer: {
        flexDirection: 'row',
        gap: scale(5),
        paddingVertical: verticalScale(2)
    },
    blueCircleButton: {
        height: scale(18),
        width: scale(18),
        borderRadius: scale(9),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    btnMakeAppointment: {
        height: verticalScale(20)
    },


})
export default FavoriteDoctor