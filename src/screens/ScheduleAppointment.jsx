import React, { useState } from 'react';

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';

import {
    moderateScale,
    scale,
    verticalScale,
} from 'react-native-size-matters';

import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';
import FontSizes from '../components/style/FontSize';


import Input from '../components/input/Input';

import ScheduleCall from '../assets/images/svg/ScheduleCall.svg';
import ScheduleVideoCall from '../assets/images/svg/ScheduleVideoCall.svg';
import ChatIcon from '../assets/images/svg/ChatIcon.svg';
import QuestionIcon from '../assets/images/svg/QuestionIcon.svg';
import FilledHeart from '../assets/images/svg/FilledHeart.svg';
import EmptyHeart from '../assets/images/svg/EmptyHeart.svg';
import BackIcon from '../assets/images/svg/BackIcon.svg';
import { useSelector } from 'react-redux';
import Button from '../components/button/Button';
import { showSnackbar } from '../components/snackbar/ShowSnackbar';

const availableTime = [
    { id: 1, availableTime: "09:00 AM", isAvailable: true },
    { id: 2, availableTime: "09:30 AM", isAvailable: false },
    { id: 3, availableTime: "10:00 AM", isAvailable: true },
    { id: 4, availableTime: "10:30 AM", isAvailable: true },
    { id: 5, availableTime: "11:00 AM", isAvailable: true },
    { id: 6, availableTime: "11:30 AM", isAvailable: true },
    { id: 7, availableTime: "12:00 PM", isAvailable: false },
    { id: 8, availableTime: "12:30 PM", isAvailable: true },
    { id: 9, availableTime: "01:00 PM", isAvailable: false },
    { id: 10, availableTime: "01:30 PM", isAvailable: true },
    { id: 11, availableTime: "02:00 PM", isAvailable: true },
    { id: 12, availableTime: "02:30 PM", isAvailable: true },
    { id: 13, availableTime: "03:00 PM", isAvailable: true },
    { id: 14, availableTime: "03:30 PM", isAvailable: false },
    { id: 15, availableTime: "04:00 PM", isAvailable: true },
];
const ScheduleAppointment = () => {
    const navigation = useNavigation();
    const route = useRoute();

    const { user } = useSelector(state => state.auth)

    const { doctor, selectedDate: selectedDateParam } = route.params;

    const [selectedDate, setSelectedDate] = useState(
        selectedDateParam || new Date().toISOString().split("T")[0]
    );

    const [currentDate, setCurrentDate] = useState(
        selectedDateParam ? new Date(selectedDateParam) : new Date()
    );
    const [selectedSlot, setSelectedSlot] = useState(null);
    const [appointmentFor, setAppointmentFor] = useState('self');
    const [patientName, setPatientName] = useState(user.name);
    const [patientAge, setPatientAge] = useState(user.age);
    const [patientGender, setPatientGender] = useState('Male');

    const [problem, setProblem] = useState('');

    const baseDate = currentDate

    const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);

    setCurrentDate(newDate);
    setSelectedDate(newDate.toISOString().split("T")[0]);
};

    const dates = [];

    for (let i = -3; i <= 3; i++) {
        const date = new Date(baseDate);
        date.setDate(baseDate.getDate() + i);

        dates.push({
            fullDate: date,
            date: date.getDate(),
            day: date
                .toLocaleDateString('default', { weekday: 'short' })
                .toUpperCase(),
            active:
                date.toISOString().split("T")[0] === selectedDate,
        });
    }

    const rows = [];

    for (let i = 0; i < availableTime.length; i += 5) {
        rows.push(availableTime.slice(i, i + 5));
    }

    const handleAppointmentFor = (type) => {
        setAppointmentFor(type);

        if (type === 'self') {
            setPatientName(user.fullName);
            setPatientAge(user.age);
            setPatientGender(user.gender);
        } else {
            setPatientName('');
            setPatientAge('');
            setPatientGender('');
        }
    };

    const handleBookAppointment = () => {
        
        const selectedTime = availableTime.find(
            item => item.id === selectedSlot
        )?.availableTime;

        if(!selectedDate || !selectedTime || !appointmentFor || !patientName.trim() || !patientAge.trim() || !patientGender){
            showSnackbar({ msg : "Please fill details"})
            return
        }

        navigation.navigate("YourAppointment", {
            doctor,
            selectedDate,
            selectedSlot: selectedTime,
            appointmentFor,
            patientDetails: {
                name: patientName,
                age: patientAge,
                gender: patientGender,
                problem,
            },
        });
    };

    const renderScheduleHeader = () => {
        return (
            <View style={styles.scheduleHeader}>
                <TouchableOpacity
                    style={styles.backBtn}
                    onPress={() => navigation.goBack()}
                >
                    <BackIcon width={12} height={12} />
                </TouchableOpacity>
                <View style={styles.scheduleTitleContainer}>
                    <Text style={styles.scheduleHeaderTitle}>
                        {doctor.name}
                    </Text>
                </View>
                <View style={styles.scheduleActions}>
                    <TouchableOpacity style={styles.blueCircleBtn}>
                        <ScheduleCall width={12} height={12} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blueCircleBtn}>
                        <ScheduleVideoCall width={12} height={12} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.blueCircleBtn}>
                        <ChatIcon width={12} height={12} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.starCircleBtn}>
                        <QuestionIcon width={12} height={12} />
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.starCircleBtn}>
                        {doctor.favorite ? <FilledHeart width={12} height={12} /> : <EmptyHeart width={12} height={12} />}
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            {renderScheduleHeader()}
            <View style={styles.calendarListContainer}>
                <Text style={styles.month}>
                    {baseDate.toLocaleDateString('default', {
                        month: 'long',
                        year: 'numeric',
                    })}
                </Text>
                <View style={styles.calendarRow}>
                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={() => changeDate(-1)}
                    >
                        <BackIcon width={14} height={14} />
                    </TouchableOpacity>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.calendarList}
                    >
                        {dates.map((item, index) => (
                            <TouchableOpacity
                                key={index}
                                onPress={() => {
    setSelectedDate(item.fullDate.toISOString().split("T")[0]);
    setCurrentDate(item.fullDate);
}}
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
                        ))}
                    </ScrollView>
                    <TouchableOpacity
                        style={styles.arrowButton}
                        onPress={() => changeDate(1)}
                    >
                        <BackIcon
                            width={14}
                            height={14}
                            style={{ transform: [{ rotate: '180deg' }] }}
                        />
                    </TouchableOpacity>

                </View>
            </View>
            <ScrollView
                style={{ flex: 1 }}
                contentContainerStyle={{ paddingBottom: verticalScale(30) }}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.timeSection}>
                    <Text style={styles.availableTimeTitle}>
                        Available Time
                    </Text>
                    {rows.map((row, rowIndex) => (
                        <View
                            key={rowIndex}
                            style={styles.timeRow}
                        >
                            {row.map((item) => {
                                const isSelected =
                                    selectedSlot === item.id;

                                return (
                                    <TouchableOpacity
                                        key={item.id}
                                        disabled={!item.isAvailable}
                                        onPress={() =>
                                            setSelectedSlot(item.id)
                                        }
                                        style={[
                                            styles.timeSlot,
                                            !item.isAvailable &&
                                            styles.disabledSlot,
                                            isSelected &&
                                            styles.selectedSlot,
                                        ]}
                                    >
                                        <Text
                                            style={[
                                                styles.timeSlotText,
                                                !item.isAvailable &&
                                                styles.disabledSlotText,
                                                isSelected &&
                                                styles.selectedSlotText,
                                            ]}
                                        >
                                            {item.availableTime}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    ))}
                </View>
                <View style={styles.line} />
                <View style={styles.patientDetailsContainer}>

                    <Text style={styles.sectionTitle}>
                        Patient Details
                    </Text>

                    <View style={styles.optionContainer}>

                        <TouchableOpacity
                            onPress={() => handleAppointmentFor('self')}
                            style={[
                                styles.optionButton,
                                appointmentFor === 'self' &&
                                styles.activeOption,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    appointmentFor === 'self' &&
                                    styles.activeOptionText,
                                ]}
                            >
                                Yourself
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={() => handleAppointmentFor('other')}
                            style={[
                                styles.optionButton,
                                appointmentFor === 'other' &&
                                styles.activeOption,
                            ]}
                        >
                            <Text
                                style={[
                                    styles.optionText,
                                    appointmentFor === 'other' &&
                                    styles.activeOptionText,
                                ]}
                            >
                                Another
                            </Text>
                        </TouchableOpacity>

                    </View>
                    <Text style={styles.inputLabel}>Full Name</Text>
                    <Input
                        placeholder="Full Name"
                        value={patientName}
                        onChangeText={setPatientName}
                    />
                    <Text style={styles.inputLabel}>Age</Text>
                    <Input
                        placeholder="Age"
                        value={patientAge}
                        keyboardType="numeric"
                        onChangeText={setPatientAge}
                    />
                    <Text style={styles.inputLabel}>Gender</Text>

                    <View style={styles.genderContainer}>
                        {['Male', 'Female', 'Other'].map(item => (
                            <TouchableOpacity
                                key={item}
                                onPress={() => setPatientGender(item)}
                                style={[
                                    styles.optionButton,
                                    patientGender === item && styles.activeOption,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.optionText,
                                        patientGender === item &&
                                        styles.activeOptionText,
                                    ]}
                                >
                                    {item}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <View style={styles.line} />
                    <Text style={styles.inputLabel}>Describe Your Problem</Text>
                    <Input
                        placeholder="Describe your problem here..."
                        value={problem}
                        onChangeText={setProblem}
                        multiline
                        numberOfLines={5}
                        textAlignVertical="top"
                        placeholderTextColor={Colors.black}
                        style={styles.problemInput}
                    />
                    <View style={styles.btnContainer}>
                        <Button
                            text={'Book'}
                            onPress={() => handleBookAppointment()}
                        />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    calendarRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    arrowButton: {
        width: scale(34),
        height: scale(34),
        borderRadius: scale(17),
        justifyContent: 'center',
        alignItems: 'center',
    },
    calendarListContainer: {
        width: '100%',
        height: verticalScale(130),
        backgroundColor: Colors.socialButtonBackground
    },
    month: {
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: FontSizes.xl,
        paddingHorizontal: scale(50)
    },
    calendarList: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: scale(18),
        marginTop: verticalScale(15),
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
    timeSection: {
        paddingVertical: verticalScale(10),
        paddingHorizontal: scale(20)
    },
    availableTimeTitle: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.bold,
        color: Colors.primary,
        marginBottom: verticalScale(15),
    },
    timeRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: verticalScale(12),
    },
    timeSlot: {
        width: scale(58),
        height: verticalScale(30),
        borderRadius: moderateScale(18),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedSlot: {
        backgroundColor: Colors.primary,
    },
    disabledSlot: {
        backgroundColor: Colors.white,
    },
    timeSlotText: {
        fontSize: moderateScale(12),
        color: Colors.black,
        fontFamily: Fonts.regular,
    },
    selectedSlotText: {
        color: Colors.white,
    },
    disabledSlotText: {
        color: Colors.disabledText,
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
        fontSize: moderateScale(12),
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
        width: scale(20),
        height: scale(20),
        borderRadius: scale(10),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    },
    starCircleBtn: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(10),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
    },
    patientDetailsContainer: {
        marginTop: verticalScale(5),
        paddingHorizontal: scale(35),
    },
    sectionTitle: {
        fontFamily: Fonts.bold,
        fontSize: FontSizes.lg,
        color: Colors.primary,
        marginBottom: verticalScale(15),
    },
    optionContainer: {
        flexDirection: 'row',
        marginBottom: verticalScale(20),
    },
    optionButton: {
        paddingHorizontal: scale(2),
        height: verticalScale(20),
        width: scale(70),
        borderRadius: moderateScale(15),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: scale(2),
    },
    activeOption: {
        backgroundColor: Colors.primary,
    },
    optionText: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.sm,
    },

    activeOptionText: {
        color: Colors.white,
    },

    problemInput: {
        height: verticalScale(60),
        paddingTop: verticalScale(10),
    },
    inputLabel: {
        marginBottom: verticalScale(8),
        fontFamily: Fonts.regular,
        fontSize: FontSizes.sm,
        color: Colors.black,
    },

    genderContainer: {
        flexDirection: 'row',
        marginBottom: verticalScale(15),
    },
    problemInput: {
        height: verticalScale(100),
        paddingTop: verticalScale(12),
    },
    btnContainer: {
        width: scale(150),
        justifyContent: 'center',
        alignSelf: 'center'
    },
    line: {
        height: scale(1),
        backgroundColor: Colors.primary,
        marginVertical: verticalScale(10),
        width: '85%',
        alignSelf: 'center'
    }
})
export default ScheduleAppointment