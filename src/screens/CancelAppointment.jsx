import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, KeyboardAvoidingView, ScrollView, Platform, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale, } from 'react-native-size-matters';

import Header from '../components/header/Header';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';
import FontSizes from '../components/style/FontSize';
import { showSnackbar } from '../components/snackbar/ShowSnackbar';

import { CommonActions, useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { cancelAppointment } from '../redux/appointment/appointmentSlice';
import CommonStyles from '../components/constants/CommonStyles';
import Spacing from '../components/style/Spacing';

const CancelAppointment = () => {

  const route = useRoute()

  const appointmentId = route.params.appointmentId

  const [selectedReason, setSelectedReason] = useState('rescheduling');
  const [reason, setReason] = useState('');

  const dispatch = useDispatch()

  console.log("APPID", appointmentId)

  const navigation = useNavigation()

  const handleCancelAppointment = async () => {
  try {
    await dispatch(cancelAppointment(appointmentId)).unwrap();

    showSnackbar({ msg: "Appointment Cancelled" });

    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "BottomTabNavigator",
            state: {
              routes: [{ name: "Home" }],
            },
          },
        ],
      })
    );
  } catch (err) {
    console.log(err);
    showSnackbar({ msg: "Failed to cancel appointment" });
  }
};

  return (
    <SafeAreaView style={styles.container}>
      <Header text="Cancel Appointment" />

      <KeyboardAvoidingView
        style={CommonStyles.flex1}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps='handled'
        >
          <View style={styles.content}>

            <Text style={styles.description}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat expedita unde saepe dolores excepturi numquam alias hic, harum illum voluptates, repellendus explicabo. Mollitia qui consequatur facere voluptates cumque, ex nisi a repellat tenetur obcaecati explicabo consectetur animi. Asperiores incidunt debitis possimus omnis. Corrupti, iusto? Placeat itaque molestiae iure dolore quos!</Text>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setSelectedReason('rescheduling')}>
              <View style={styles.radioOuter}>
                {selectedReason === 'rescheduling' && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Text style={styles.optionText}>
                Rescheduling
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setSelectedReason('weather')}>
              <View style={styles.radioOuter}>
                {selectedReason === 'weather' && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Text style={styles.optionText}>
                Weather Condition
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setSelectedReason('work')}>
              <View style={styles.radioOuter}>
                {selectedReason === 'work' && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Text style={styles.optionText}>
                Unexpected Work
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.option}
              onPress={() => setSelectedReason('others')}>
              <View style={styles.radioOuter}>
                {selectedReason === 'others' && (
                  <View style={styles.radioInner} />
                )}
              </View>

              <Text style={styles.optionText}>
                Others
              </Text>
            </TouchableOpacity>

            <Input
              value={reason}
              onChangeText={setReason}
              placeholder="Enter Your Reason Here..."
              multiline
              numberOfLines={6}
              style={styles.reasonInput}
            />

            <Button
              text="Cancel Appointment"
              style={styles.button}
              onPress={handleCancelAppointment}
            />

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default CancelAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  crollContainer: {
    flexGrow: 1,
    paddingBottom: Spacing.vspb30,
    backgroundColor: Colors.screenBackground,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.xxl,
    paddingTop: Spacing.vxl,
  },

  description: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.regular,
    color: Colors.black,
    lineHeight:Spacing.mlg,
    marginBottom: Spacing.vxl,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },

  radioOuter: {
    width: Spacing.xl,
    height: Spacing.xl,
    borderRadius: Spacing.md,
    borderWidth: Spacing.bw1p5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    width: Spacing.w10,
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: Colors.primary,
  },

  optionText: {
    marginLeft: scale(12),
    fontSize: FontSizes.md,
    fontFamily: Fonts.regular,
    color: Colors.black,
  },

  reasonLabel: {
    marginTop: verticalScale(10),
    marginBottom: verticalScale(10),
    color: Colors.primary,
    fontFamily: Fonts.regular,
    fontSize: FontSizes.sm,
  },

  reasonInput: {
    height: verticalScale(120),
    width: '95%',
    backgroundColor: Colors.inputBackground,
    borderRadius: moderateScale(18),
    textAlignVertical: 'top',
    paddingTop: verticalScale(10),
  },

  button: {
    minWidth: scale(180),
    marginTop: verticalScale(35),
    height: verticalScale(38),
    borderRadius: moderateScale(24),
  },
});