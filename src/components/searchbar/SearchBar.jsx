import React from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Image,
} from 'react-native';
import {
  moderateScale,
  scale,
} from 'react-native-size-matters';
import Colors from '../style/Colors';
import FontSizes from '../style/FontSize';
import Spacing from '../style/Spacing';

function SearchBar({
  placeholder = '',
  value,
  onChangeText,
  searchIcon,
  leftIcon,
  style,
}) {
  return (
    <View style={[styles.container, style]}>
      {leftIcon && (
        <Image 
          source={leftIcon}
          style={styles.leftIcon}
          resizeMode='contain'
        />
      )}
      <TextInput
        style={styles.searchBar}
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
      />

      {searchIcon && (
        <Image
          source={searchIcon}
          style={styles.icon}
          resizeMode="contain"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: moderateScale(23),
    backgroundColor: Colors.socialButtonBackground,
    paddingHorizontal: scale(5),
    height: moderateScale(46),
  },

  searchBar: {
    flex: 1,
    fontSize: FontSizes.lg,
    marginLeft:scale(10)
  },

  icon: {
    width: scale(18),
    height: scale(18),
    marginLeft: Spacing.xl
  },
  leftIcon : {
    width:scale(28),
    height:scale(28),
  }
});

export default SearchBar;