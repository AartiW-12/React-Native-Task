import React, { useState } from 'react'

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

const DoctorInfo = ({ doctor, onBack }) => {

    const today = new Date()

    const [showSchedule, setShowSchedule] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)

    const handleSchedule = () => {
        
        setShowSchedule(true)
    }

    const renderDoctorCard = () => {
        return (
            <View style={styles.card}>
                <View style={styles.profileContainer}>
                    <View style={styles.firstSection}>
                        <Image
                            source={{uri:doctor.avatar}}
                            style={styles.avatar}
                        />
                    </View>
                    <View style={styles.secondSection}>
                        <View style={styles.experienceCard}>
                            <View style={styles.starCircleBtn}>
                                <StarIcon width={18} height={18}/>
                            </View>
                            <View style={{marginLeft:8}}>
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
                        <FilledStar width={16} height={16}/>
                        <Text>
                            {doctor.rating}
                        </Text>
                    </View>
                    <View style={styles.chip}>
                        <Comments width={16} height={16}/>
                        <Text>
                            {doctor.comments}
                        </Text>
                    </View>
                    <View style={styles.chipDate}>
                        <ClockIcon width={16} height={16}/>
                        <Text>
                            Mon - Sat / {doctor.availableTime}
                        </Text>
                    </View>
                </View>
                <View style={styles.actionRow}>

                    <TouchableOpacity style={styles.scheduleBtn}>
                        <CalenderIconWhite/>
                        <Text 
                            style={styles.scheduleText}
                            onPress={() => handleSchedule()}
                        >
                            Schedule
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <InfoIcon width={18} height={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <QuestionIcon width={18} height={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <EmptyStar width={18} height={18}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.circleBtn}>
                        <EmptyHeart width={18} height={18}/>
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
                    onPress={onBack}
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
    const renderSchedule = () => {
        return (
            <View style={styles.container}>
                <View style={styles.headerRow}>
                    <TouchableOpacity
                        style={styles.backBtn}
                        onPress={() => setShowSchedule(false)}
                    >
                        <BackIcon width={16} height={16} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>
                        Schedule
                    </Text>
                    <View style={styles.headerPlaceholder} />
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.heading}>
                        Select Date
                    </Text>
                    <CalendarPicker
                        minDate={today}
                        onDateChange={(date) => {
                            console.log(date)
                        }}
                        selectedDayColor={Colors.primary}
                        selectedDayTextColor={Colors.white}
                    />
                    {
                        selectedDate &&
                        <TouchableOpacity
                            style={styles.scheduleBtn}
                            onPress={() => console.log("Next")}
                        >
                            <Text style={styles.scheduleText}>
                                Continue
                            </Text>
                        </TouchableOpacity>
                    }
                </View>
            </View>
        )
    }
    if (showSchedule) {
        return renderSchedule()
    }
    return (
        <View style={styles.container}>
            {renderHeader()}
            <ScrollView
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.infoContainer}>
                    {renderDoctorCard()}
                    {renderProfile()}
                    {renderFooterCard()}
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        fontFamily: Fonts.regular
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
        borderRadius: scale(18),
        backgroundColor: Colors.socialButtonBackground,
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
        fontFamily: Fonts.bold,
        fontSize: moderateScale(20),
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
    }
})
export default DoctorInfo