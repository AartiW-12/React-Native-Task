import React, { useMemo, useRef, useState } from 'react'

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
import CalendarPicker from 'react-native-calendar-picker'
import ScheduleCall from '../../assets/images/svg/ScheduleCall.svg'
import ScheduleVideoCall from '../../assets/images/svg/ScheduleVideoCall.svg'
import ChatIcon from '../../assets/images/svg/ChatIcon.svg'
import FilledHeart from '../../assets/images/svg/FilledHeart.svg'

import { useNavigation, useRoute } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontSizes from '../style/FontSize'



const DoctorInfo = () => {
    const route = useRoute()
    const navigation = useNavigation()

    const doctor = route.params.doctor
    const today = new Date()

    const [showSchedule, setShowSchedule] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [currMonth, setCurrMonth] = useState(new Date())
    
    const calenderRef = useRef(null)

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
                    <BackIcon width={16} height={16} />
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
                                    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur dolor, sapiente neque qui iure accusantium aut nostrum dignissimos et perferendis?"}
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
                        <Text>
                            {doctor.rating}
                        </Text>
                    </View>
                    <View style={styles.chip}>
                        <Comments width={16} height={16} />
                        <Text>
                            {doctor.comments}
                        </Text>
                    </View>
                    <View style={styles.chipDate}>
                        <ClockIcon width={16} height={16} />
                        <Text>
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
                        <InfoIcon width={18} height={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <QuestionIcon width={18} height={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <EmptyStar width={18} height={18} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <EmptyHeart width={18} height={18} />
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

    const renderHeader = () => {
        return (
            <View style={styles.headerRow}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon width={16} height={16} />
                </TouchableOpacity>
                <Text style={styles.headerText}>
                    Doctor Info
                </Text>
                <View style={styles.headerPlaceholder} />
            </View>
        )
    }

    const renderFooterCard = () => {
        return (
            <View>
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
                    <TouchableOpacity
                        onPress={() => {
                            calenderRef.current?.handleOnPressPrevious()
                        }}
                    >
                        <Text style={styles.arrow}>
                            {'<'}
                        </Text>
                    </TouchableOpacity>
                    <Text style={styles.monthText}>
                        {currMonth.toLocaleString('default', {
                            month: 'long',
                            year: 'numeric'
                        })}
                    </Text>
                    <TouchableOpacity
                        onPress={() => {
                            calenderRef.current?.handleOnPressNext()
                        }}
                    >
                        <Text style={styles.arrow}>
                            {'>'}
                        </Text>
                    </TouchableOpacity>
                </View>
                <CalendarPicker
                    ref={calenderRef}
                    minDate={today}
                    selectedStartDate={selectedDate}
                    onDateChange={(date) => {
        setSelectedDate(date);

        navigation.navigate("ScheduleAppointment", {
            doctor,
            selectedDate: date,
        });
    }}
                    onMonthChange={(date) => setCurrMonth(date)}
                    weekdays={["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]}
                    previousTitle=""
                    nextTitle=""
                    todayBackgroundColor="transparent"
                    selectedDayColor={Colors.primary}
                    selectedDayTextColor={Colors.white}
                    textStyle={{ color: Colors.black, fontFamily: Fonts.medium, }}
                    weekdaysStyle={{ color: Colors.white, fontFamily: Fonts.medium, fontSize: 11, }}
                    monthTitleStyle={{
                        display: 'none',
                    }}
                    yearTitleStyle={{
                        display: 'none',
                    }}
                    dayShape="circle"
                    width={scale(285)}
                />
                {selectedDate && (
                    <TouchableOpacity
                        style={styles.continueBtn}
                        onPress={() => {
                            navigation.navigate("ScheduleAppointment", {doctor})
                        }}
                    >
                        <Text style={styles.continueText}>
                            Continue
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {showSchedule ? renderScheduleHeader() : renderHeader()}
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
    },
    headerRow: {
        height: verticalScale(56),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        backgroundColor: Colors.backgroundColor,
    },
    backBtn: {
        width: scale(36),
        height: scale(36),
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        flex: 1,
        textAlign: 'center',
        fontSize: moderateScale(24),
        fontFamily: Fonts.semiBold,
        color: Colors.primary,
    },
    headerPlaceholder: {
        width: scale(36),
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
    iconStyle: {
        width: scale(22),
        height: scale(22),
        marginRight: scale(8),
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
        minHeight: verticalScale(110),
        justifyContent: 'flex-start',
    },
    focusTitle: {
        color: Colors.white,
        fontFamily: Fonts.bold,
        fontSize: moderateScale(13),
    },
    focusText: {
        color: Colors.white,
        fontFamily: Fonts.regular,
        fontSize: moderateScale(11),
        lineHeight: moderateScale(15),
        marginTop: verticalScale(4),
    },
    nameContainer: {
        marginTop: verticalScale(5),
        backgroundColor: Colors.white,
        borderRadius: moderateScale(20),
        paddingVertical: verticalScale(5),
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
        gap: scale(2)
    },
    chip: {
        height: verticalScale(10),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(20),
        paddingHorizontal: scale(10),
        height: verticalScale(34),
        minWidth: scale(48),
    },
    chipDate: {
        width: scale(155),
        height: verticalScale(18),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.white,
        borderRadius: moderateScale(20),
        paddingHorizontal: scale(10),
        height: verticalScale(34),
        minWidth: scale(58),
    },
    actionRow: {
        marginTop: verticalScale(14),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    scheduleBtn: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.primary,
        height: verticalScale(38),
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
        width: scale(28),
        height: scale(28),
        borderRadius: scale(19),
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
        fontWeight: '500',
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
    calendarSection: {
        marginTop: verticalScale(18),
        backgroundColor: Colors.socialButtonBackground,
        marginHorizontal: scale(-22),
        paddingVertical: verticalScale(20),
        alignItems: 'center',
    },
    calendarHeader: {
        width: '82%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(15),
    },
    monthText: {
        color: Colors.primary,
        fontSize: moderateScale(16),
        fontFamily: Fonts.bold,
    },
    arrow: {
        fontSize: moderateScale(22),
        color: Colors.primary,
        fontWeight: '700',
    },
    continueBtn: {
        marginTop: verticalScale(20),
        width: scale(295),
        height: verticalScale(48),
        borderRadius: moderateScale(24),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueText: {
        color: Colors.white,
        fontFamily: Fonts.medium,
        fontSize: moderateScale(16),
    },
    rightContainer: {
        flexDirection: 'row',
        gap: scale(10),
        marginLeft: moderateScale(20)
    },
    
})
export default DoctorInfo