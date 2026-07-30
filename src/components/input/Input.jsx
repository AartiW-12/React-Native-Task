import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Colors from '../style/Colors';

import EyeIcon from '../../assets/images/svg/EyeIcon'
import OpenEye from '../../assets/images/svg/OpenEye.svg'

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
            <OpenEye width={20} height={20} />

          ) : (
            <EyeIcon width={20} height={20} />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    minHeight: 45,
    borderRadius: 13,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
  },

  input: {
    flex: 1,
    paddingHorizontal: 15,
    color: Colors.black,
  },

  multilineInput: {
    minHeight: 120,
    textAlignVertical: 'top',
    paddingTop: 14,
    paddingBottom: 14,
  },

  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;