import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity } from 'react-native';
import Colors from '../style/Colors';

import EyeIcon from '../../assets/images/svg/EyeIcon'

function Input({
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  style,
  secureTextEntry = false,
}) {
  return (
    <View style={[styles.container, style]}>
      <TextInput
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor="#809CFF"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        style={styles.input}
      />

      {secureTextEntry && (
        <TouchableOpacity style={styles.iconContainer} activeOpacity={0.8}>
          <EyeIcon width={20} height={20} />
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