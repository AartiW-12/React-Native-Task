import React from 'react'
import { Pressable, StyleSheet, Text } from 'react-native'
import Colors from '../style/Colors'
function Button({
    varient='primary',
    text,
    onPress,
    style,
    textStyle
}) {
  return (
    <Pressable 
        onPress={onPress}
        style={[
            styles.btn,
            varient === 'primary' ? styles.primary : styles.secondary,
            style
        ]}
    >
        <Text style={[
            styles.text,
            varient === "primary" ? styles.primaryText : styles.secondaryText,
            textStyle
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
        backgroundColor:Colors.primary,
    },
    secondary : {
        backgroundColor:Colors.socialButtonBackground,
    },
    text : {
        fontFamily:'League Spartan',
        fontWeight:'500',
        fontSize:20,
    },
    primaryText : {
        color : Colors.screenBackground
    },
    secondaryText: {
        color : Colors.primary
    }
})
export default Button