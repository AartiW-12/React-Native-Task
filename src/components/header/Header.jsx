import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Colors from '../style/Colors';
import Fonts from '../style/Fonts';

import BackIcon from '../../assets/images/svg/BackIcon.svg';
import FontSizes from '../style/FontSize';

const Header = ({ text, titleStyle, backIconColor = Colors.primary, onBack, rightComponent }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      {navigation.canGoBack() ? (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack ?? (() => navigation.goBack())}
          activeOpacity={0.8}
        >
          <BackIcon
            width={20}
            height={20}
            color={backIconColor}
          // stroke={Colors.white}
          />
        </TouchableOpacity>
      ) : (
        <View style={styles.backButton} />
      )}

      <Text style={[styles.title, titleStyle]}>{text}</Text>

      {rightComponent ?? <View style={styles.placeholder} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    flex: 1,
    textAlign: 'center',
    color: Colors.primary,
    fontFamily: Fonts.bold,
    fontSize: FontSizes.title,
  },

  placeholder: {
    width: 40,
  },
});

export default Header;