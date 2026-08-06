import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, RefreshControl } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SearchBar from '../components/searchbar/SearchBar'
import Colors from '../components/style/Colors';
import FontSizes from '../components/style/FontSize';
import Fonts from '../components/style/Fonts'
import Button from '../components/button/Button';
import Spacing from '../components/style/Spacing'
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
import Strings from '../components/constants/Strings';
import { fetchAppointments } from '../redux/appointment/appointmentSlice';

// import doctorsList from '../components/doctor/doctorsList'
function Home() {



    const [search, setSearch] = useState("")
    const [showFav, setShowFav] = useState(false)
    const [refreshing, setrefreshing] = useState(false)

    const today = new Date().toISOString().split("T")[0];

    const [selectedDate, setSelectedDate] = useState(today);

    const navigation = useNavigation()

    const { doctors, loading, error } = useSelector(state => state.doctors)
    const { user } = useSelector(state => state.auth)
    const { appointments } = useSelector(state => state.appointments)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getDoctors())
        dispatch(fetchAppointments())
    }, [])

    const onRefresh = useCallback(() => {
        setrefreshing(true)
        dispatch(getDoctors())
        dispatch(fetchAppointments())
        setrefreshing(false)
    }, [])

    const appointmentsWithDoctor = useMemo(() => {
        if (!user) return []
        return appointments
            .filter(appointment => String(appointment.userId) === String(user.id) && appointment.status === "upcoming")
            .map(appointment => ({
                ...appointment,
                doctor: doctors.find(
                    doc => String(doc.id) === String(appointment.doctorId)
                ),
            }))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
    }, [appointments, doctors, user.id]);


    const appointmentsByDate = useMemo(() => {
        return appointmentsWithDoctor.reduce((acc, appointment) => {

            const date = appointment.date.split("T")[0];

            if (!acc[date]) {
                acc[date] = [];
            }

            acc[date].push(appointment);

            return acc;

        }, {});
    }, [appointmentsWithDoctor]);
    const calendarDates = useMemo(() => {
        const start = new Date();

        return Array.from({ length: 30 }, (_, index) => {
            const date = new Date(start);
            date.setDate(start.getDate() + index);

            const dateString = date.toISOString().split("T")[0];

            return {
                key: dateString,
                fullDate: date,
                hasAppointment: !!appointmentsByDate[dateString],
                selected: selectedDate === dateString,
            };
        });
    }, [appointmentsByDate, selectedDate]);

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


    const selectedAppointments =
        appointmentsByDate[selectedDate] || [];

    const firstAppointment = selectedAppointments[0];
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

            <View style={styles.doctorsList}>
                <FlatList
                    data={loading || error ? [] : filteredDOctors}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContainer}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        loading ? (
                            <View style={styles.centerContainer}>
                                <ActivityIndicator
                                    size="large"
                                    color={Colors.primary}
                                />
                                <Text style={styles.loadingText}>{Strings.loadingDoctors}</Text>
                            </View>
                        ) : error ? (
                            <View style={styles.centerContainer}>
                                <Text style={styles.errorText}>
                                    {error}
                                </Text>
                                <View style={styles.retryBtnContainer}>
                                    <Button
                                        text={Strings.retry}
                                        varient="primary"
                                        onPress={() => dispatch(getDoctors())}
                                        style={{ marginTop: 20 }}
                                    />
                                </View>
                            </View>
                        ) : showFav ? (
                            <Text style={CommonStyles.emptyList}>{Strings.noFavoriteDoctors}</Text>
                        ) : (
                            <Text style={CommonStyles.emptyList}>{Strings.noDoctorsFound}</Text>
                        )
                    }
                    ListHeaderComponent={
                        !loading &&
                            !error &&
                            appointmentsWithDoctor.length > 0 ? (
                            <View style={styles.calendarContainer}>

                                <FlatList
                                    horizontal
                                    data={calendarDates}
                                    keyExtractor={(_, index) => index.toString()}
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={styles.calendarList}
                                    renderItem={({ item }) => (
                                        <TouchableOpacity
                                            onPress={() => setSelectedDate(item.key)}
                                            style={[
                                                styles.dateCard,
                                                item.hasAppointment && styles.appointmentDateCard,
                                                item.selected && styles.selectedCard,
                                            ]}
                                        >
                                            <Text
                                                style={[
                                                    styles.dateNumber,
                                                    item.selected && styles.selectedText
                                                ]}
                                            >
                                                {item.fullDate.getDate()}
                                            </Text>

                                            <Text
                                                style={[
                                                    styles.dateDay,
                                                    item.selected && styles.selectedText
                                                ]}
                                            >
                                                {item.fullDate.toLocaleDateString("en-US", {
                                                    weekday: "short"
                                                })}
                                            </Text>
                                        </TouchableOpacity>
                                    )}
                                />

                                {selectedAppointments.length > 1 && (
                                    <TouchableOpacity
                                        style={styles.viewAllContainer}
                                        onPress={() =>
                                            navigation.navigate("Schedule", {
                                                selectedDate,
                                                fromHome:true
                                            })
                                        }
                                    >
                                        <Text style={styles.viewAll}>
                                            View All
                                        </Text>
                                    </TouchableOpacity>
                                )}

                                {selectedAppointments.length === 0 ? (
                                    <Text style={CommonStyles.emptyList}>
                                        No Appointment
                                    </Text>
                                ) : (
                                    <View style={styles.appointmentCard}>
                                        <Text style={styles.appointmentDate}>
                                            {new Date(firstAppointment.date).toLocaleDateString("en-US", {
                                                weekday: "long",
                                                day: "numeric",
                                                month: "long",
                                            })}
                                        </Text>

                                        <View style={styles.appointmentInfo}>
                                            <View style={CommonStyles.flex1}>
                                                <Text style={styles.doctorName}>
                                                    {firstAppointment.doctor?.name}
                                                </Text>

                                                <Text style={styles.doctorDesc}>
                                                    {firstAppointment.doctor?.specialization}
                                                </Text>

                                                <Text style={styles.doctorDesc}>
                                                    {firstAppointment.time}
                                                </Text>
                                            </View>
                                        </View>
                                    </View>
                                )}

                            </View>
                        ) : null
                    }
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
                                            onPress={() => dispatch(toggleFavorite({ id: item.id, favorite: item.favorite }))}
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
        marginHorizontal: Spacing.xl,
        marginTop: Spacing.vsm
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
        paddingTop: verticalScale(15),
        paddingBottom: verticalScale(50),
    },

    card: {
        marginHorizontal: Spacing.xl,
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
        fontSize: FontSizes.md,
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
        width: '100%',
        alignSelf: 'stretch',
        backgroundColor: Colors.socialButtonBackground,
        paddingVertical: verticalScale(10),
        marginBottom: verticalScale(10)
    },
    calendarList: {
        paddingHorizontal: scale(18),
    },
    dateCard: {
        width: scale(42),
        height: verticalScale(60),
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
        marginTop:Spacing.vxs,
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
    centerContainer: CommonStyles.centerContainer,
    loadingText: CommonStyles.loadingText,
    retryBtnContainer: CommonStyles.retryBtnContainer,
    errorText: CommonStyles.errorText,
    viewAllContainer: {
        alignSelf: "flex-end",
        paddingHorizontal: scale(30),
        paddingTop: verticalScale(10)
    },
    viewAll: {
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
        fontSize: FontSizes.sm
    },
    selectedCard: {
        backgroundColor: Colors.primary,
    },

    selectedText: {
        color: Colors.white,
    },
    appointmentDateCard: {
        borderWidth: 2,
        borderColor: Colors.primary,
    },
})
export default Home