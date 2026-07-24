import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import doctorsList from '../doctor/doctorsList'

import FilledStar from '../../assets/images/svg/FilledStar.svg'
import CalenderIcon from '../../assets/images/svg/CalenderIcon.svg'
import InfoIcon from '../../assets/images/svg/InfoIcon.svg'
import QuestionIcon from '../../assets/images/svg/QuestionIcon.svg'
import EmptyHeart from '../../assets/images/svg/EmptyHeart.svg'
import FilledHeart from '../../assets/images/svg/FilledHeart.svg'
import EmptyStar from '../../assets/images/svg/EmptyStar.svg'
import StarIconWhite from '../../assets/images/svg/StarIconWhite.svg'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../style/Colors'
import Fonts from '../style/Fonts'
import Button from '../button/Button'
import Header from '../header/Header'

const DoctorRating = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Header text={'Rating'} />
            <View style={styles.doctorsList}>
                <FlatList
                    data={doctorsList}
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
                                    <View style={styles.infoChipRating}>
                                        {item.rating === 5 ? (
                                            <FilledStar height={12} width={12} />
                                        ) : (
                                            <EmptyStar height={12} width={12} />
                                        )}

                                        <Text style={styles.infoText}>{' '}{item.rating}</Text>
                                    </View>
                                </View>
                                <View style={styles.nameContainer}>
                                    <Text numberOfLines={1} style={styles.name}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.specialization}>
                                        {item.specialization}
                                    </Text>
                                </View>
                                <View style={styles.bottomRow}>
                                    <View style={styles.btnContainer}>
                                        <Button
                                            varient="primary"
                                            text="Info"
                                            style={styles.infoBtn}
                                            onPress={() => navigation.navigate("DoctorInfo") }
                                        />
                                    </View>
                                    <View style={styles.iconContainer}>
                                        <View
                                            style={styles.cardCircleButton}>
                                            <CalenderIcon />
                                        </View>
                                        <View
                                            style={styles.cardCircleButton}>
                                            <InfoIcon  />
                                        </View>
                                        <View
                                            style={styles.cardCircleButton}>
                                            <QuestionIcon  />
                                        </View>
                                        <View
                                            style={styles.cardCircleButton}>
                                            {item.favorite ? (
                                                <FilledHeart />
                                            ) : (
                                                <EmptyHeart />
                                            )}
                                        </View>
                                    </View>
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
        backgroundColor: Colors.white,
        padding: scale(10),
        borderRadius: 13
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
    infoChip: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(2),
        marginRight: scale(8),
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoChipRating: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(2),
        marginLeft: scale(40),
        flexDirection: 'row',
        alignItems: 'center',
    },
    infoText: {
        fontSize: moderateScale(12),
        color: Colors.primary,
        fontFamily: Fonts.regular,
    },
    bottomRightContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
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
    btnContainer: {
    width: scale(48),
    height: verticalScale(22),
  },

  infoBtn: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  iconContainer: {
    flexDirection: 'row',
    marginLeft:scale(40)
  },

  cardCircleButton: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(11),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
})
export default DoctorRating