import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'

function Button({
    varient='primary',
    text,
    onPress
}) {
  return (
    <Pressable 
        onPress={onPress}
        style={[
            styles.btn,
            varient === 'primary' ? styles.primary : styles.secondary
        ]}
    >
        <Text style={[
            styles.text,
            varient === "primary" ? styles.primaryText : styles.secondaryText
            ]}>{text}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
    btn : {
        width:'100%',
        height:45,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    },
    primary : {
        backgroundColor:'#2260FF',
    },
    secondary : {
        backgroundColor:'#CAD6FF',
    },
    text : {
        fontFamily:'League Spartan',
        fontWeight:'500',
        fontSize:20,
    },
    primaryText : {
        color : '#fff'
    },
    secondaryText: {
        color : '#2260FF'
    }
})
export default Button