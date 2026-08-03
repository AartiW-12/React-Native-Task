import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { scale, verticalScale, moderateScale, } from 'react-native-size-matters';

import Header from '../components/header/Header';
import Button from '../components/button/Button';
import Input from '../components/input/Input';

import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';
import FontSizes from '../components/style/FontSize';
import { showSnackbar } from '../components/snackbar/ShowSnackbar';

import { CommonActions, useNavigation } from '@react-navigation/native';

const CancelAppointment = () => {
  const [selectedReason, setSelectedReason] = useState('rescheduling');
  const [reason, setReason] = useState('');

  const navigation = useNavigation()

  const handleCancelAppointment = () => {
    showSnackbar({ msg:"Appointment Cancelled"})
    setTimeout(() => {
                navigation.dispatch(
                    CommonActions.reset({
                        index: 0,
                        routes:[
                            {
                                name:'BottomTabNavigator',
                                state:{
                                    routes:[
                                        {
                                            name:"Home",
                                            state:{
                                                routes:[{ name:"Home"}]
                                            }
                                        }
                                    ]
                                }
                            }
                        ]
                    })
                )
            }, 1000);
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header text="Cancel Appointment" />

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

        {/* Weather */}

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

        {/* Work */}

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
    </SafeAreaView>
  );
};

export default CancelAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  content: {
    flex: 1,
    paddingHorizontal: scale(24),
    paddingTop: verticalScale(18),
  },

  description: {
    fontSize: FontSizes.sm,
    fontFamily: Fonts.regular,
    color: Colors.black,
    lineHeight: moderateScale(18),
    marginBottom: verticalScale(20),
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(18),
  },

  radioOuter: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(10),
    borderWidth: 1.5,
    borderColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },

  radioInner: {
    width: scale(10),
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