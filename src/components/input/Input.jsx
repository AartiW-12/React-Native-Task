import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

function Input({
    placeholder,
    value,
    onChangeText,
    keyboardType = 'default',
    style,
    rightIcon
}) {
  return (
    <TextInput 
        placeholder={placeholder}
        value={value}
        onChangeText={onChangeText}
        placeholderTextColor='#809CFF'
        keyboardType={keyboardType}
        style={[styles.input , style]}
    />
  )
}

const styles = StyleSheet.create({
    input : {
        width: '100%',
        height: 45,
        borderRadius: 13,
        backgroundColor: '#ECF1FF'
    }
})
export default Input