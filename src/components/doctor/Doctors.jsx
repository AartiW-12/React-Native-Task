import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import React from 'react'
import Colors from '../style/Colors'
import Fonts from '../style/Fonts'
import Button from '../button/Button'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

const doctorList = [
    { id: 1, name: "Dr. Alexander Bennett, Ph.D.", specialization: 'Dermato-Genetics', avatar: require("../../assets/images/doctors/Alexander.png") },
    { id: 2, name: "Dr. Michael Davidson, M.D.", specialization: 'Solar Dermatology', avatar: require("../../assets/images/doctors/Michael.png") },
    { id: 3, name: "Dr. Olivia Turner, M.D., Ph.D.", specialization: 'Dermato-Endocrinology', avatar: require("../../assets/images/doctors/Olivia.png") },
    { id: 4, name: "Dr. Sophia Martinez, Ph.D.", specialization: 'Cosmetic Bioengineering', avatar: require("../../assets/images/doctors/Sophia.png") },
    { id: 5, name: "Dr. Alexander Bennett, Ph.D.", specialization: 'Dermato-Genetics', avatar: require("../../assets/images/doctors/Alexander.png") },
    { id: 6, name: "Dr. Alexander Bennett, Ph.D.", specialization: 'Dermato-Genetics', avatar: require("../../assets/images/doctors/Alexander.png") },
]
const Doctors = () => {

    const viewInfo = () => {
        console.log("Info")
    }

    const handleSort = () => {
        console.log("SORT")
    }
    const renderDoctor = ({ item }) => (
        <View style={styles.card}>
            <Image source={item.avatar} style={styles.avatar} />

            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.specialization}>
                    {item.specialization}
                </Text>
                <View style={styles.otherAction}>
                    <View style={styles.btnContainer}>
                        <Button
                            varient='primary'
                            text='Info'
                            onPress={viewInfo}
                            style={styles.infoBtn}
                        />
                    </View>
                </View>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.headerContent}>Sort By</Text>

                <View style={styles.sortBtnContainer}>
                    <Button
                        varient="primary"
                        text="A→Z"
                        onPress={handleSort}
                        style={styles.sortBtn}
                    />
                </View>
            </View>
            <View style={styles.doctorsList}>
                <FlatList
                    data={doctorList}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderDoctor}
                    showsVerticalScrollIndicator={false}

                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        fontFamily: Fonts.regular,
        marginTop: verticalScale(50)
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scale(20),
        marginBottom: verticalScale(10),
    },

    headerContent: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.medium,
        color: Colors.black,
        marginRight: scale(8),
    },

    sortBtnContainer: {
        width: scale(48),
        height: verticalScale(22),
    },

    sortBtn: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    doctorsList: {
        width: scale(300),
        alignSelf: 'center',
        gap: moderateScale(20),
        marginBottom: verticalScale(50)
    },
    card: {
        minHeight: verticalScale(110),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(15),
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: scale(13),
        paddingHorizontal: scale(12),
    },
    avatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center'
    },
    info: {
        flex: 1,
        marginLeft: scale(12),
        justifyContent: 'center',
    },
    name: {
        width: scale(129),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: scale(14),
    },
    specialization: {
        color: Colors.black,
        fontFamily: Fonts.regular
    },
    otherAction: {
        marginTop: verticalScale(10),
        gap: scale(5)
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

})
export default Doctors