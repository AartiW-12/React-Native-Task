import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Colors from '../style/Colors';

import EyeIcon from '../../assets/images/svg/EyeIcon'
import OpenEye from '../../assets/images/svg/OpenEye.svg'
import Fonts from '../style/Fonts';
import Spacing from '../style/Spacing';

function Input({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  style,
  secureTextEntry = false,
  multiline = false,
  numberOfLines = 1,
  textAlignVertical = 'center',
  placeholderTextColor = Colors.primary,
}) {

  const [hidePassword, setHidePassword] = useState(secureTextEntry)

  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor={placeholderTextColor}
        keyboardType={keyboardType}
        secureTextEntry={hidePassword}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical={textAlignVertical}
        style={[
          styles.input,
          multiline && styles.multilineInput,
        ]}
      />

      {secureTextEntry && (
        <TouchableOpacity
          style={styles.iconContainer}
          activeOpacity={0.8}
          onPress={() => setHidePassword(!hidePassword)}
        >
          {hidePassword ? (
            <EyeIcon width={20} height={20} />
          ) : (
            <OpenEye width={20} height={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: Spacing.fullWidth,
    minHeight: 45,
    borderRadius: Spacing.mmd,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    paddingHorizontal: Spacing.mmd,
    color: Colors.black,
    fontFamily: Fonts.regular
  },

  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: Spacing.vmd,
    paddingBottom: Spacing.vmd,
  },

  iconContainer: {
    paddingHorizontal: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;