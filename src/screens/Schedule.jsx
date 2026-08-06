import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

import FilledStar from '../assets/images/svg/FilledStar.svg'
import EmptyHeart from '../assets/images/svg/EmptyHeart.svg'
import FilledHeart from '../assets/images/svg/FilledHeart.svg'
import CalenderIcon from '../assets/images/svg/CalenderIcon.svg'
import ClockIcon from '../assets/images/svg/ClockIcon.svg'
import TickIcon from '../assets/images/svg/TickIcon.svg'
import CrossIcon from '../assets/images/svg/CrossIcon.svg'

import Colors from '../components/style/Colors';
import FontSizes from '../components/style/FontSize';
import Fonts from '../components/style/Fonts';
import TabSwitcher from '../components/tab-switcher/TabSwitcher';
import Header from '../components/header/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/button/Button';
import { cancelAppointment, completeAppointment, fetchAppointments } from '../redux/appointment/appointmentSlice';
import { toggleFavorite } from '../redux/doctors/doctorSlice';
import CommonStyles from '../components/constants/CommonStyles';
import Strings from '../components/constants/Strings';
import Spacing from '../components/style/Spacing';


const TABS = [
  { label: 'Complete', value: 'completed' },
  { label: 'Upcoming', value: 'upcoming' },
  { label: 'Cancelled', value: 'cancelled' },
];

const Schedule = () => {

  const [activeTab, setActiveTab] = useState('upcoming');
  const [refreshing, setRefreshing] = useState(false)
  const [filterDate, setFilterDate] = useState(null);

  const { user } = useSelector(state => state.auth)
  const { doctors } = useSelector(state => state.doctors);
  const { appointments, loading, error } = useSelector(
    state => state.appointments
  );

  const route = useRoute()

  const dispatch = useDispatch()

  const navigation = useNavigation();

  useEffect(() => {
    dispatch(fetchAppointments())
  }, [])

  // const { selectedDate } = route?.params || {}

  const onRefresh = () => {
    setRefreshing(true)
    dispatch(fetchAppointments())
    setRefreshing(false)
  }


  console.log(route.params)

  useEffect(() => {
    if (route.params?.fromHome) {
      setFilterDate(route.params.selectedDate);
    } else {
      setFilterDate(null);
    }
  }, [route.params?.fromHome, route.params?.selectedDate]);

  const filteredAppointments = appointments.filter(item => {
    const matchUser =
      String(item.userId) === String(user.id);

    const matchStatus =
      item.status === activeTab;

    const matchDate =
      !filterDate ||
      item.date.split("T")[0] === filterDate;

    return matchUser && matchStatus && matchDate;
  });

  const renderUpcomingCard = ({ item }) => {
    const doctor = doctors.find(d => d.id === item.doctorId);
    if (!doctor) return null;

    return (
      <View style={styles.card}>
        <View style={styles.topSection}>
          <Image source={{ uri: doctor.avatar }} style={styles.image} />

          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {doctor.name}
            </Text>
            <Text numberOfLines={1} style={styles.specialization}>
              {doctor.specialization}
            </Text>
          </View>
        </View>
        <View style={styles.detailsRow}>
          <View style={styles.infoChip}>
            <CalenderIcon width={14} height={14} />
            <Text style={styles.chipText}>{item.date}</Text>
          </View>

          <View style={styles.infoChip}>
            <ClockIcon width={14} height={14} />
            <Text style={styles.chipText}>{item.time}</Text>
          </View>
        </View>
        <View style={styles.bottomRow}>
          <Button
            text={Strings.details}
            style={styles.detailsButton}
            textStyle={styles.detailsText}
            onPress={() => navigation.navigate('YourAppointment', {
              doctor,
              selectedDate: item.date,
              selectedSlot: item.time,
              patientDetails: item.patientDetails,
              appointmentFor: item.appointmentFor,
              showAddAppointmentIcon: false,
              appointmentId: item.id
            })
            }
          />

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => dispatch(completeAppointment(item.id))}
          >
            <TickIcon height={14} width={14} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => dispatch(cancelAppointment(item.id))}
          >
            <CrossIcon height={14} width={14} />
          </TouchableOpacity>
        </View>
      </View >
    );
  };

  const renderCompletedCard = ({ item }) => {
    const doctor = doctors.find(d => d.id === item.doctorId);
    if (!doctor) return null;

    return (
      <View style={styles.card}>
        <View style={styles.topSection}>
          <Image source={{ uri: doctor.avatar }} style={styles.image} />

          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {doctor.name}
            </Text>
            <Text numberOfLines={1} style={styles.specialization}>
              {doctor.specialization}
            </Text>

            <View style={styles.ratingRow}>
              <View style={styles.infoChip}>
                <FilledStar width={14} height={14} />
                <Text style={styles.ratingText}>{doctor.rating}</Text>
              </View>

              <TouchableOpacity
                style={styles.infoChip}
                onPress={() => dispatch(toggleFavorite({ id: doctor.id, favorite: doctor.favorite }))}
              >
                {doctor.favorite ? (
                  <FilledHeart width={14} height={14} />
                ) : (
                  <EmptyHeart width={14} height={14} />
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.buttonRow}>
          <Button
            text={Strings.reBook}
            style={styles.secondaryButton}
            textStyle={styles.secondaryText}
            onPress={() => navigation.navigate("DoctorInfo", { doctor, openSchedule: true })}
          />
          <Button
            text={'Add Review'}
            style={styles.primaryButton}
            textStyle={styles.primaryText}
            onPress={() => navigation.navigate('Review', { doctor })}
          />
        </View>
      </View>
    );
  };

  const renderCancelledCard = ({ item }) => {
    const doctor = doctors.find(d => d.id === item.doctorId);
    if (!doctor) return null;

    return (
      <View style={styles.card}>
        <View style={styles.topSection}>
          <Image source={{ uri: doctor.avatar }} style={styles.image} />

          <View style={styles.infoContainer}>
            <Text numberOfLines={1} style={styles.name}>
              {doctor.name}
            </Text>
            <Text numberOfLines={1} style={styles.specialization}>
              {doctor.specialization}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButtonFull}
          onPress={() => navigation.navigate('Review', { doctor })}>
          <Text style={styles.primaryText}>Add Review</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderItem = (params) => {
    if (activeTab === 'completed') return renderCompletedCard(params);
    if (activeTab === 'upcoming') return renderUpcomingCard(params);
    if (activeTab === 'cancelled') return renderCancelledCard(params);
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header text={'All Appointments'} />
      <View style={styles.appointmentContainer}>
        <TabSwitcher
          tabs={TABS}
          activeTab={activeTab}
          onTabPress={setActiveTab}
          buttonStyle={styles.tabBtn}
          buttonTextStyle={styles.tabBtnText}
        />

        {loading && (
          <View style={styles.centerContainer}>
            <ActivityIndicator
              size="large"
              color={Colors.primary}
            />
            <Text style={styles.loadingText}>
              Loading appointments...
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
                onPress={() => dispatch(fetchAppointments())}
                style={{ marginTop: 20 }}
              />
            </View>
          </View>
        )}
        {filteredAppointments.length <= 0 && <Text style={CommonStyles.emptyList}>No Records Found</Text>}
        <FlatList
          data={filteredAppointments}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  appointmentContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
  },
  tabSwitcherContainer: {
    marginBottom: Spacing.vlg,
    justifyContent: 'center',
    fontFamily: Fonts.medium
  },
  listContent: {
    paddingBottom: verticalScale(24),
    marginTop: verticalScale(20)
  },
  card: {
    backgroundColor: Colors.socialButtonBackground,
    borderRadius: moderateScale(18),
    paddingHorizontal: scale(14),
    paddingVertical: verticalScale(10),
    marginBottom: Spacing.vlg,
  },
  tabBtn: {
    height: verticalScale(30),
  },
  tabBtnText: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.regular
  },
  topSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(30),
    backgroundColor: '#DDD',
  },
  infoContainer: {
    flex: 1,
    marginLeft: scale(12),
  },
  name: {
    fontSize: FontSizes.lg,
    fontFamily: Fonts.semiBold,
    color: Colors.primary,
  },
  specialization: {
    marginTop: verticalScale(3),
    fontSize: FontSizes.md,
    fontFamily: Fonts.regular,
    color: Colors.black
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(10),
    gap: scale(8),
  },

  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(16),
    paddingHorizontal: scale(10),
  },
  chipText: {
    marginLeft: scale(5),
    fontSize: FontSizes.xs,
    fontFamily: Fonts.medium,
    color: Colors.primary,
  },
  bottomRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(14),
  },
  detailsButton: {
    flex: 1,
    height: verticalScale(27),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },
  detailsText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontFamily: Fonts.medium,
  },
  iconButton: {
    width: scale(30),
    height: scale(30),
    borderRadius: scale(15),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },

  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: verticalScale(8),
  },

  infoChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(8),
    paddingVertical: verticalScale(4),
    marginRight: scale(8),
  },
  ratingText: {
    marginLeft: scale(4),
    fontSize: FontSizes.small,
    color: Colors.primary,
    fontFamily: Fonts.medium,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(14),
  },

  secondaryButton: {
    flex: 1,
    height: verticalScale(27),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(8),
  },

  secondaryText: {
    color: Colors.primary,
    fontSize: FontSizes.small,
    fontFamily: Fonts.medium,
  },

  primaryButton: {
    flex: 1,
    height: verticalScale(27),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },
  primaryButtonFull: {
    height: verticalScale(34),
    borderRadius: moderateScale(18),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(14),
  },

  primaryText: {
    color: Colors.white,
    fontSize: FontSizes.small,
    fontFamily: Fonts.medium,
  },
  centerContainer: CommonStyles.centerContainer,
  loadingText: CommonStyles.loadingText,
  retryBtnContainer: CommonStyles.retryBtnContainer,
  errorText: CommonStyles.errorText

})

export default Schedule