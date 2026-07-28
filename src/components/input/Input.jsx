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
}) {

  const [hidePassword, setHidePassword] = useState(secureTextEntry)

  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#809CFF"
        keyboardType={keyboardType}
        secureTextEntry={hidePassword}
        style={styles.input}
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
    height: 45,
    borderRadius: 13,
    backgroundColor: Colors.inputBackground,
    flexDirection: 'row',
    alignItems: 'center',
  },

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 15,
    color: Colors.black,
  },

  iconContainer: {
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Input;