import React, { useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SearchBar from '../components/searchbar/SearchBar'
import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context';

import FilledStar from '../assets/images/svg/FilledStar.svg';
import EmptyStar from '../assets/images/svg/EmptyStar.svg';
import FilledHeart from '../assets/images/svg/FilledHeart.svg';
import EmptyHeart from '../assets/images/svg/EmptyHeart.svg';
import Comments from '../assets/images/svg/Comments.svg';

import doctorsList from '../components/doctor/doctorsList'
function Home({ navigation }) {

    const [search, setSearch] = useState("")

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Image
                        source={require('../assets/images/avatar.png')}
                        style={styles.headerAvatar}
                        resizeMode='contain'
                    />
                    <View>
                        <Text style={styles.welcome}>Hi, Welcome Back</Text>
                        <Text style={styles.headerName}>John Doe</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                    >
                        <Image
                            source={require('../assets/images/Notification.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}>
                        <Image
                            source={require('../assets/images/settings.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionLeftContainer}>
                    <Image
                        source={require('../assets/images/stethoscope.png')}
                        style={styles.sectionIcons}
                        resizeMode='contain'
                    />
                    <Text 
                        style={styles.link}
                        onPress={() => navigation.navigate("Doctors")}
                    >Doctors</Text>
                </View>
                <View style={styles.sectionLeftContainer}>
                    <Image
                        source={require('../assets/images/favourite.png')}
                        style={styles.sectionIcons}
                        resizeMode='contain'
                    />
                    <Text style={styles.link}>Favorite</Text>
                </View>
                <View style={styles.sectionRightContainer}>
                    <SearchBar
                        placeholder=''
                        value={search}
                        onChangeText={setSearch}
                        searchIcon={require('../assets/images/searchIcon.png')}
                        leftIcon={require('../assets/images/seachLeft.png')}
                    />
                </View>
            </View>
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
                                <View style={styles.nameContainer}>
                                    <Text numberOfLines={1} style={styles.name}>
                                        {item.name}
                                    </Text>
                                    <Text style={styles.specialization}>
                                        {item.specialization}
                                    </Text>
                                </View>
                                <View style={styles.bottomRow}>
                                    <View style={styles.infoChip}>
                                        {item.rating === 5 ? (
                                            <FilledStar style={styles.iconStyle} />
                                        ) : (
                                            <EmptyStar style={styles.iconStyle} />
                                        )}

                                        <Text style={styles.infoText}>{' '}{item.rating}</Text>
                                    </View>

                                    <View style={styles.infoChip}>
                                        <Comments style={styles.iconStyle} />
                                        <Text style={styles.infoText}>{' '}{item.comments}</Text>
                                    </View>

                                    <View style={styles.bottomRightContainer}>
                                        <TouchableOpacity style={styles.circleButton}>
                                            <Text style={styles.question}>?</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.circleButton}>
                                            {item.favorite ? (
                                                <FilledHeart style={styles.iconStyle} />
                                            ) : (
                                                <EmptyHeart style={styles.iconStyle} />
                                            )}
                                        </TouchableOpacity>
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
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
    },
    leftContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    headerAvatar: {
        width: scale(52),
        height: verticalScale(52),
        borderRadius: 26,
        marginRight: scale(12),
    },
    welcome: {
        color: Colors.primary,
        fontFamily: Fonts.regular,

    },
    headerName: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.regular,
        color: Colors.black,
        marginTop: scale(2),
    },
    rightContainer: {
        flexDirection: 'row',
    },
    sectionContainer: {
        flexDirection: 'row',
        width: scale(80),
        height: verticalScale(35),
        justifyContent: 'space-between',
        gap: moderateScale(10),
        marginLeft: scale(30),
        marginTop: verticalScale(15)
    },
    sectionLeftContainer: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    iconButton: {
        width: scale(27),
        height: verticalScale(27),
        borderRadius: 50,
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(10),
    },
    image: {
        width: scale(17),
        height: verticalScale(17),
        alignSelf: "center"
    },
    sectionIcons: {
        width: scale(15),
        height: verticalScale(18),
        alignSelf: 'center'
    },
    link: {
        fontFamily: Fonts.regular,
        color: Colors.primary
    },
    sectionRightContainer: {
        width: scale(190),
        height: verticalScale(33),
        marginLeft: scale(20),
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
        fontFamily: Fonts.bold,
        fontWeight: '500'
    },
    specialization: {
        marginTop: verticalScale(2),
        fontSize: moderateScale(11),
        color:Colors.black,
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
    iconStyle  : {
        height:verticalScale(12),
        width:scale(12)
    }
})
export default Home