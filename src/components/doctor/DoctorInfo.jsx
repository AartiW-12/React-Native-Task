import React, {  useState } from 'react'

//React-Native Library
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

//Styling Components
import Colors from '../style/Colors'
import Fonts from '../style/Fonts'

//importing SVG's
import StarIcon from '../../assets/images/svg/StarIcon.svg'
import FilledStar from '../../assets/images/svg/FilledStar.svg'
import Comments from '../../assets/images/svg/Comments.svg'
import CalenderIconWhite from '../../assets/images/svg/CalenderIconWhite.svg'
import InfoIcon from '../../assets/images/svg/InfoIcon.svg'
import ClockIcon from '../../assets/images/svg/ClockIcon.svg'
import EmptyStar from '../../assets/images/svg/EmptyStar.svg'
import QuestionIcon from '../../assets/images/svg/QuestionIcon.svg'
import EmptyHeart from '../../assets/images/svg/EmptyHeart.svg'
import BackIcon from '../../assets/images/svg/BackIcon.svg'
import { Calendar } from 'react-native-calendars'
import ScheduleCall from '../../assets/images/svg/ScheduleCall.svg'
import ScheduleVideoCall from '../../assets/images/svg/ScheduleVideoCall.svg'
import ChatIcon from '../../assets/images/svg/ChatIcon.svg'
import FilledHeart from '../../assets/images/svg/FilledHeart.svg'

import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontSizes from '../style/FontSize'
import Header from '../header/Header'



const DoctorInfo = () => {
    const route = useRoute()
    const navigation = useNavigation()

    const doctor = route.params.doctor
    const openSchedule = route?.params?.openSchedule ?? false


    const [showSchedule, setShowSchedule] = useState(openSchedule)
    const [selectedDate, setSelectedDate] = useState(null)


    const [currentMonth, setCurrentMonth] = useState(new Date());

    const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    const goToPreviousMonth = () => {
        const prev = new Date(currentMonth);
        prev.setMonth(prev.getMonth() - 1);
        setCurrentMonth(prev);
    };

    const goToNextMonth = () => {
        const next = new Date(currentMonth);
        next.setMonth(next.getMonth() + 1);
        setCurrentMonth(next);
    };


    const handleSchedule = () => {
        setShowSchedule(true)
    }
    const renderScheduleHeader = () => {
        return (
            <View style={styles.scheduleHeader}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => setShowSchedule(false)}
                >
                    <BackIcon width={16} height={16} color={Colors.primary}/>
                </TouchableOpacity>
                <View style={styles.scheduleTitleContainer}>
                    <Text style={styles.scheduleHeaderTitle}>
                        Schedule
                    </Text>
                </View>
                <View style={styles.scheduleActions}>
                    <TouchableOpacity style={styles.blueCircleBtn}>
                        <ScheduleCall width={16} height={16} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blueCircleBtn}>
                        <ScheduleVideoCall width={16} height={16} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blueCircleBtn}>
                        <ChatIcon width={16} height={16} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.starCircleBtn}>
                        <QuestionIcon width={16} height={16} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.starCircleBtn}>
                        {doctor.favorite ? <FilledHeart width={16} height={16} /> : <EmptyHeart width={16} height={16} />}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderDoctorCard = () => {
        return (
            <View style={styles.card}>
                <View style={styles.profileContainer}>
                    <View style={styles.firstSection}>
                        <Image
                            source={{ uri: doctor.avatar }}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.secondSection}>
                        <View style={styles.experienceCard}>
                            <View style={styles.starCircleBtn}>
                                <StarIcon width={18} height={18} />
                            </View>
                            <View style={{ marginLeft: 8 }}>
                                <Text style={styles.experienceText}>
                                    {doctor.experience} Years
                                </Text>
                                <Text style={styles.smallText}>
                                    Experience
                                </Text>
                            </View>
                        </View>
                        <View style={styles.focusCard}>
                            <Text style={styles.focusTitle}>
                                Focus
                            </Text>
                            <Text style={styles.focusText}>
                                {doctor.focus ||
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit."}
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.nameContainer}>
                    <Text style={styles.name}>
                        {doctor.name}
                    </Text>
                    <Text style={styles.specialization}>
                        {doctor.specialization}
                    </Text>
                </View>
                <View style={styles.statsRow}>
                    <View style={styles.chip}>
                        <FilledStar width={16} height={16} />
                        <Text style={styles.chipText}>
                            {doctor.rating}
                        </Text>
                    </View>
                    <View style={styles.chip}>
                        <Comments width={16} height={16} />
                        <Text style={styles.chipText}>
                            {doctor.comments}
                        </Text>
                    </View>
                    <View style={styles.chipDate}>
                        <ClockIcon width={16} height={16} />
                        <Text style={styles.chipText}>
                            Mon - Sat / {doctor.availableTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.actionRow}>

                    <TouchableOpacity style={styles.scheduleBtn}>
                        <CalenderIconWhite />
                        <Text
                            style={styles.scheduleText}
                            onPress={() => handleSchedule()}
                        >
                            Schedule
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <InfoIcon width={14} height={14} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <QuestionIcon width={14} height={14} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <EmptyStar width={14} height={14} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        {doctor.favorite ?<FilledHeart width={14} height={14}/> :<EmptyHeart width={14} height={14} />}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    const renderProfile = () => {
        return (
            <View>
                <Text style={styles.heading}>
                    Profile
                </Text>
                <Text style={styles.text}>
                    {doctor.profile ||
                        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."}
                </Text>
            </View>
        )
    }
    const renderFooterCard = () => {
        return (
            <View style={styles.footerCardContainer}>
                <View style={styles.careerPath}>
                    <Text style={styles.heading}>
                        Career Path
                    </Text>
                    <Text style={styles.text}>
                        {doctor.careerPath ||
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aperiam deserunt numquam, mollitia, distinctio necessitatibus eum voluptatum ratione iure culpa, obcaecati atque autem neque aliquid pariatur? Rerum aperiam quisquam vitae quasi similique maiores sapiente cumque dolor exercitationem nesciunt aliquam odio, asperiores voluptatum illo deserunt veniam nostrum blanditiis eveniet. Facilis, sint."}
                    </Text>
                </View>
                <View style={styles.highlights}>
                    <Text style={styles.heading}>
                        Highlights
                    </Text>
                    <Text style={styles.text}>
                        {doctor.highlights ||
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam aperiam deserunt numquam, mollitia, distinctio necessitatibus eum voluptatum ratione iure culpa, obcaecati atque autem neque aliquid pariatur? Rerum aperiam quisquam vitae quasi similique maiores sapiente cumque dolor exercitationem nesciunt aliquam odio, asperiores voluptatum illo deserunt veniam nostrum blanditiis eveniet. Facilis, sint."}
                    </Text>
                </View>
            </View>
        )
    }

    const renderScheduleCalendar = () => {
        return (
            <View style={styles.calendarSection}>
                <View style={styles.calendarHeader}>
                    <TouchableOpacity onPress={goToPreviousMonth}>
                        <Text style={styles.arrow}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={styles.monthText}>
                        {currentMonth.toLocaleString("default", {
                            month: "long",
                            year: "numeric",
                        })}
                    </Text>
                    <TouchableOpacity onPress={goToNextMonth}>
                        <Text style={styles.arrow}>{'>'}</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.weekContainer}>
                    {weekDays.map(day => (
                        <View key={day} style={styles.weekDay}>
                            <Text style={styles.weekText}>
                                {day}
                            </Text>
                        </View>
                    ))}
                </View>
                <View style={styles.dateContainer}>
                    <Calendar
                        key={currentMonth.toISOString().slice(0, 7)}
                        current={currentMonth.toISOString().split("T")[0]}
                        minDate={new Date().toISOString().split("T")[0]}
                        firstDay={1}
                        hideDayNames
                        hideExtraDays
                        hideArrows
                        renderHeader={() => null}
                        headerStyle={{
                            height: 0,
                            margin: 0,
                            padding: 0,
                        }}
                        onMonthChange={(month) => {
                            setCurrentMonth(new Date(month.timestamp));
                        }}
                        onDayPress={(day) => {
                            setSelectedDate(day.dateString);
                            navigation.navigate("ScheduleAppointment", {
                                doctor,
                                selectedDate: day.dateString,
                            });
                        }}

                        markedDates={{
                            [selectedDate]: {
                                selected: true,
                                selectedColor: Colors.primary,
                            },
                        }}

                        theme={{
                            calendarBackground: Colors.white,
                            backgroundColor: Colors.white,
                            monthTextColor: "transparent",
                            textSectionTitleColor: "transparent",
                            textDayFontFamily: Fonts.medium,
                            dayTextColor: Colors.black,
                        }}
                    />

                </View>
            </View>
        );
    };
    return (
        <SafeAreaView style={styles.container}>
            {showSchedule ? renderScheduleHeader() : (
                <Header text={'Doctor Info'}/>
            )}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.infoContainer}>
                    {renderDoctorCard()}
                    {renderProfile()}
                    {showSchedule ? renderScheduleCalendar() : renderFooterCard()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        fontFamily: Fonts.regular,
        marginBottom:verticalScale(30)
    },
    backBtn: {
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoContainer: {
        flex: 1,
        paddingHorizontal: scale(22),
        paddingTop: 0,
    },

    card: {
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: moderateScale(28),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(10),
        width: '100%',
        alignSelf: 'center',
    },
    profileContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    firstSection: {
        alignSelf: 'center'
    },
    secondSection: {
        width: '40%',
        justifyContent: 'space-between',
    },
    avatar: {
        width: scale(125),
        height: scale(125),
        borderRadius: scale(63),
    },
    experienceCard: {
        height: verticalScale(38),
        backgroundColor: Colors.primary,
        borderRadius: moderateScale(22),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(10),
        marginBottom: verticalScale(8),
    },
    experienceText: {
        color: Colors.white,
        fontFamily: Fonts.bold,
        fontSize: moderateScale(12),
    },
    smallText: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: moderateScale(9),
    },
    focusCard: {
        backgroundColor: Colors.primary,
        borderRadius: moderateScale(20),
        padding: moderateScale(10),
        justifyContent: 'flex-start',
    },
    focusTitle: {
        color: Colors.white,
        fontFamily: Fonts.bold,
        fontSize: FontSizes.md,
    },
    focusText: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.sm,
    },
    nameContainer: {
        marginTop: verticalScale(10),
        backgroundColor: Colors.white,
        borderRadius: moderateScale(20),
        paddingVertical: verticalScale(2),
        alignItems: 'center',
    },
    name: {
        fontFamily: Fonts.medium,
        fontSize: moderateScale(14),
        color: Colors.primary,
    },
    specialization: {
        fontFamily: Fonts.medium,
        fontSize: moderateScale(13),
        color: Colors.black,
        marginTop: verticalScale(2),
    },
    statsRow: {
        marginTop: verticalScale(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: scale(2),
    },
    chip: {
        height: verticalScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(20),
        paddingHorizontal: scale(10),
        height: verticalScale(20),
        minWidth: scale(43),
    },
    chipText :{
        marginLeft:scale(5),
        fontFamily:Fonts.regular
    },
    chipDate: {
        width: scale(155),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(20),
        paddingHorizontal: scale(10),
        height: verticalScale(20),
        minWidth: scale(58),
        fontFamily:Fonts.regular
    },
    actionRow: {
        marginTop: verticalScale(14),
        flexDirection: 'row',
        gap:scale(8),
        alignItems: 'center',
    },
    scheduleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        height: verticalScale(40),
        width: scale(85),
        height: verticalScale(21),
        borderRadius: moderateScale(22),
    },
    scheduleText: {
        color: Colors.white,
        marginLeft: scale(6),
        fontFamily: Fonts.medium,
        fontSize: moderateScale(14),
    },
    circleBtn: {
        width: scale(24),
        height: scale(24),
        borderRadius: scale(12),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starCircleBtn: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(19),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    heading: {
        color: Colors.primary,
        fontFamily: Fonts.medium,
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(5),
        fontSize: moderateScale(14)
    },
    text: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontWeight: '300',
        paddingVertical: verticalScale(5)
    },
    scheduleHeader: {
        height: verticalScale(60),
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: scale(15),
        backgroundColor: Colors.backgroundColor,
    },
    scheduleTitleContainer: {
        backgroundColor: Colors.primary,
        paddingHorizontal: scale(18),
        paddingVertical: verticalScale(4),
        borderRadius: moderateScale(20),
    },
    scheduleHeaderTitle: {
        color: Colors.white,
        fontSize: moderateScale(14),
        fontFamily: Fonts.semiBold,
    },
    scheduleActions: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        gap: scale(8),
    },
    blueCircleBtn: {
        width: scale(26),
        height: scale(26),
        borderRadius: scale(13),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starCircleBtn: {
        width: scale(30),
        height: scale(30),
        borderRadius: scale(15),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    weekContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        marginBottom: verticalScale(15),
    },

    weekDay: {
        width: scale(34),
        height: scale(22),
        borderRadius: moderateScale(12),
        backgroundColor: Colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },

    weekText: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: moderateScale(11),
    },

    dateContainer: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(25),
        padding: moderateScale(12),
        overflow: "hidden",
        width: "100%",
    },

    calendarSection: {
        marginTop: verticalScale(18),
        backgroundColor: Colors.socialButtonBackground,
        marginHorizontal: scale(-20),
        padding: moderateScale(20),
        marginBottom:verticalScale(40)
    },

    calendarHeader: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: verticalScale(15),
    },

    monthText: {
        color: Colors.primary,
        fontFamily: Fonts.bold,
        fontSize: moderateScale(18),
        marginHorizontal: scale(15),
    },

    arrow: {
        color: Colors.primary,
        fontSize: moderateScale(24),
        fontWeight: "700",
    },
    footerCardContainer : {
        marginBottom:verticalScale(40)
    }
})
export default DoctorInfo