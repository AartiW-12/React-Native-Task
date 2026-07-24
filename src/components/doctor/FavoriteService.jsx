import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import doctorsList from './doctorsList'

import HeartWhite from '../../assets/images/svg/HeartWhite.svg'
import DownIcon from '../../assets/images/svg/DownIcon.svg'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../style/Colors'
import Fonts from '../style/Fonts'

const FavoriteService = () => {
    const FavoriteServiceList = doctorsList.filter(doctor => doctor.favorite)

    const [openId, setOpenId] = useState(null);

    const handleOpen = (id) => {
        setOpenId(openId === id ? null : id);
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.serviceList}>
                <FlatList
                    data={FavoriteServiceList}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View>

                            {/* Top Card */}
                            <View style={styles.serviceBar}>
                                <View style={styles.favoriteIcon}>
                                    <HeartWhite width={20} height={20} />
                                </View>
                                <View style={styles.service}>
                                    <Text style={styles.specialization}>
                                        {item.specialization}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.downBtn}
                                    onPress={() => handleOpen(item.id)}
                                >
                                    <DownIcon
                                        width={14}
                                        height={8}
                                    />
                                </TouchableOpacity>
                            </View>
                            {openId === item.id && (
                                <View style={styles.dropdownContainer}>
                                    <View style={styles.dropdown}>
                                        <Text style={styles.text}>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rerum veritatis quos. Excepturi voluptates est maiores perspiciatis perferendis ex voluptatum, ea laborum, aliquam quibusdam, eos eaque? Sequi corrupti praesentium harum ducimus. Hic inventore voluptatibus culpa est consectetur? Illum quas ab itaque voluptas asperiores ut ipsa repellendus, vero fugiat aliquid consectetur sint sunt aspernatur eius dolore ducimus dolor impedit! Voluptate, animi.</Text>
                                    </View>
                                    <View style={styles.dropdownBtn}>
                                        <Text style={styles.btnText}>Looking Doctors</Text>
                                    </View>
                                </View>
                            )}

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
    serviceList: {
        flex: 1,
        marginTop: verticalScale(20)
    },
    listContainer: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(15),
        paddingBottom: verticalScale(30),
        gap: scale(20)
    },
    serviceBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: moderateScale(22),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
    },
    favoriteIcon: {
        marginRight: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    service: {
        flex: 1,
        justifyContent: 'center',
    },
    specialization: {
        color: Colors.white,
        fontSize: moderateScale(16),
        fontFamily: Fonts.semiBold,
    },
    downBtn: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdown: {
        backgroundColor: Colors.socialButtonBackground,
        marginHorizontal: scale(10),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(8),
        padding: moderateScale(25),
        borderRadius: moderateScale(18),
    },
    dropdownBtn: {
        backgroundColor: Colors.socialButtonBackground,
        marginHorizontal: scale(10),
        marginTop: verticalScale(5),
        marginBottom: verticalScale(8),
        padding: moderateScale(10),
        borderRadius: moderateScale(21),
    },
    title: {
        fontSize: moderateScale(15),
        fontFamily: Fonts.semiBold,
        color: Colors.primary,
        marginBottom: verticalScale(8),
    },

    text: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.regular,
        color: Colors.black,
        marginBottom: verticalScale(5),
    },
    btnText : {
        alignSelf:'center',
        color:Colors.primary,
        fontFamily : Fonts.medium,
        fontSize : moderateScale(20)
    }
})
export default FavoriteService