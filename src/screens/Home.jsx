import React, { useMemo, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SearchBar from '../components/searchbar/SearchBar'
import Colors from '../components/style/Colors';
import FontSizes from '../components/style/FontSize';
import Fonts from '../components/style/Fonts'
import Button from '../components/button/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';

import FilledStar from '../assets/images/svg/FilledStar.svg';
import EmptyStar from '../assets/images/svg/EmptyStar.svg';
import FilledHeart from '../assets/images/svg/FilledHeart.svg';
import EmptyHeart from '../assets/images/svg/EmptyHeart.svg';
import Comments from '../assets/images/svg/Comments.svg';
import Stethoscope from '../assets/images/svg/Stethoscope.svg'

import { useDispatch, useSelector } from 'react-redux';
import { getDoctors, toggleFavorite } from '../redux/doctors/doctorSlice';
import CommonStyles from '../components/constants/CommonStyles';

const calendarData = [
    {
        id: 1,
        date: '10',
        day: 'Tue',
        active: false,
    },
    {
        id: 2,
        date: '11',
        day: 'Wed',
        active: true,
    },
    {
        id: 3,
        date: '12',
        day: 'Thu',
        active: false,
    },
    {
        id: 4,
        date: '13',
        day: 'Fri',
        active: false,
    },
    {
        id: 5,
        date: '14',
        day: 'Sat',
        active: false,
    },
    {
        id: 6,
        date: '15',
        day: 'Sun',
        active: false,
    },
    {
        id: 7,
        date: '16',
        day: 'Mon',
        active: false,
    },
];

// import doctorsList from '../components/doctor/doctorsList'
function Home() {

    const [search, setSearch] = useState("")
    const [showFav, setShowFav] = useState(false)

    const navigation = useNavigation()

    const { doctors, loading, error } = useSelector(state => state.doctors)
    const { user } = useSelector(state => state.auth)

    const dispatch = useDispatch()


    const filteredDOctors = useMemo(() => {
        let filtered = doctors;

        if (showFav) {
            filtered = filtered.filter(doc => doc.favorite);
        }

        if (search.trim()) {
            const searchText = search.toLowerCase();

            filtered = filtered.filter(
                doc =>
                    doc.name.toLowerCase().includes(searchText) ||
                    doc.specialization.toLowerCase().includes(searchText)
            );
        }

        return filtered;
    }, [doctors, search, showFav]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity
                    style={styles.leftContainer}
                    onPress={() => navigation.navigate("MyProfile")}
                >
                    <Image
                        source={require('../assets/images/avatar.png')}
                        style={styles.headerAvatar}
                        resizeMode='contain'
                    />
                    <View>
                        <Text style={styles.welcome}>Hi, Welcome Back</Text>
                        <Text style={styles.headerName}>{user?.name}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.rightContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate("Notifications")}
                    >
                        <Image
                            source={require('../assets/images/Notification.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}
                        onPress={() => navigation.navigate("Settings")}
                    >
                        <Image
                            source={require('../assets/images/settings.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <TouchableOpacity
                    style={styles.sectionLeftContainer}
                    onPress={() => navigation.navigate('Doctors')}
                >
                    <Stethoscope width={40} height={20} />
                    <Text style={styles.link}>Doctors</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.sectionLeftContainer}
                    onPress={() => setShowFav(prev => !prev)}
                >
                    {showFav ? <FilledHeart width={30} height={20} /> : <EmptyHeart width={30} height={20} />}
                    <Text style={styles.link}>Favorite</Text>
                </TouchableOpacity>
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
            <View style={styles.calendarContainer}>
                <FlatList
                    horizontal
                    data={calendarData}
                    keyExtractor={(item) => item.id.toString()}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.calendarList}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={[
                                styles.dateCard,
                                item.active && styles.activeDateCard,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.dateNumber,
                                    item.active && styles.activeText,
                                ]}
                            >
                                {item.date}
                            </Text>
                            <Text
                                style={[
                                    styles.dateDay,
                                    item.active && styles.activeText,
                                ]}
                            >
                                {item.day}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
                <View style={styles.appointmentCard}>
                    <Text style={styles.appointmentDate}>
                        11 Wednesday - Today
                    </Text>
                    <View style={styles.appointmentInfo}>
                        <View style={CommonStyles.flex1}>
                            <Text style={styles.doctorName}>
                                Dr. Olivia Turner, M.D.
                            </Text>
                            <Text style={styles.doctorDesc}>
                                Treatment and prevention of{"\n"}
                                skin photodermatitis.
                            </Text>
                        </View>
                        <View style={styles.statusContainer}>
                            <View style={styles.statusCircle}>
                                <Text style={styles.statusText}>✓</Text>
                            </View>
                            <View style={styles.statusCircle}>
                                <Text style={styles.statusText}>✕</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.doctorsList}>
                {loading && (
                    <View style={styles.centerContainer}>
                        <ActivityIndicator
                            size="large"
                            color={Colors.primary}
                        />
                        <Text style={styles.loadingText}>
                            Loading doctors...
                        </Text>
                    </View>
                )}
                {error && (
                    <View style={styles.centerContainer}>
                        <Text style={styles.errorText}>
                            {error}
                        </Text>
                        <View style={styles.retryBtnContainer}>
                            <Button
                                text="Retry"
                                varient="primary"
                                onPress={() => dispatch(getDoctors())}
                                style={{ marginTop: 20 }}
                            />
                        </View>

                    </View>
                )}
                <FlatList
                    data={filteredDOctors}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image source={{ uri: item.avatar }} style={styles.avatar} />
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

                                        <TouchableOpacity 
                                            style={styles.circleButton}
                                            onPress={() => dispatch(toggleFavorite({id : item.id, favorite:item.favorite}))}    
                                        >
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
        backgroundColor: Colors.screenBackground
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 20,
        marginTop: verticalScale(10)
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
        paddingBottom: verticalScale(50),
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
    calendarContainer: {
        minWidth: scale(360),
        backgroundColor: Colors.socialButtonBackground,
        marginTop: verticalScale(18),
        paddingVertical: verticalScale(18),
    },
    calendarList: {
        paddingHorizontal: scale(18),
    },
    dateCard: {
        width: scale(42),
        height: verticalScale(64),
        borderRadius: moderateScale(22),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(12),
    },
    activeDateCard: {
        backgroundColor: Colors.primary,
    },
    dateNumber: {
        fontSize: FontSizes.title,
        color: Colors.black,
        fontFamily: Fonts.bold,
    },

    dateDay: {
        marginTop: verticalScale(4),
        fontSize: moderateScale(11),
        color: Colors.black,
        fontFamily: Fonts.regular,
    },

    activeText: {
        color: Colors.white,
    },

    appointmentCard: {
        minWidth: scale(299),
        marginHorizontal: scale(18),
        marginTop: verticalScale(18),
        backgroundColor: Colors.white,
        borderRadius: moderateScale(22),
        padding: moderateScale(16),
    },

    appointmentDate: {
        alignSelf: 'flex-end',
        color: Colors.primary,
        fontSize: moderateScale(13),
        fontFamily: Fonts.medium,
    },

    appointmentInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: moderateScale(16),
        padding: moderateScale(14),
    },

    doctorName: {
        color: Colors.primary,
        fontSize: moderateScale(16),
        fontFamily: Fonts.bold,
    },

    doctorDesc: {
        marginTop: verticalScale(4),
        color: Colors.black,
        fontSize: moderateScale(12),
        fontFamily: Fonts.regular,
        lineHeight: moderateScale(18),
    },

    statusContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    statusCircle: {
        width: scale(24),
        height: scale(24),
        borderRadius: scale(12),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },

    statusText: {
        color: Colors.primary,
        fontSize: moderateScale(12),
        fontWeight: '700',
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
    },

    loadingText: {
        marginTop: verticalScale(12),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: moderateScale(15),
    },
    retryBtnContainer: {
        width: scale(100),
        height: verticalScale(20)
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(16),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        paddingHorizontal: scale(20),
    },
})
export default Home