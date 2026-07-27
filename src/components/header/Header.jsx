import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { scale } from 'react-native-size-matters';

import Colors from '../style/Colors';
import Fonts from '../style/Fonts';

import BackIcon from '../../assets/images/svg/BackIcon.svg'

const Header = ({ text , titleStyle, backIconColor }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.backButton]}
        onPress={() => navigation.goBack()}
      >
        <BackIcon width={20} height={20} fill={backIconColor} />
      </TouchableOpacity>

      <Text style={[styles.title, titleStyle]}>{text}</Text>

      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent:'center'
  },

  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: scale(24),
  },

  placeholder: {
    width: 40,
  },

  arrow: {
    fontSize: 24,
    color: Colors.primary,
    fontWeight: 'bold',
  },
});

export default Header;