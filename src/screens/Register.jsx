import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/button/Button'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

function Register() {
    const handleLogin = () => {
        console.log("Login")
    }
    const handleSignUp = () => {
        console.log("Signup")
    }
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                source={require('../assets/images/Group93.png')}
                style={styles.image}
                resizeMode='contain'
            />
            <Text style={styles.header}>Skin</Text>
            <Text style={styles.header}>Firts</Text>
            <Text style={styles.subTitle}>Dermatology Center</Text>
            <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
            </View>

            <View style={styles.btnContainer}>
                <Button
                    varient='primary'
                    text="Log In"
                    onPress={handleLogin}
                />
                <Button
                    varient='secondary'
                    text="Sign Up"
                    onPress={handleSignUp}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent:'center',
    paddingTop: verticalScale(120),
  },
  imageContainer : {
    height:verticalScale(251),
    width:scale(146),
    justifyContent:"center",
    alignItems:'center',
    top : verticalScale(10)
  },
  image: {
    width: scale(138),
    height: verticalScale(138),
  },

  header: {
    fontFamily:'LeagueSpartan-Regular',
    fontSize: moderateScale(48),
    lineHeight: moderateScale(44),
    color: '#2260FF',
    fontWeight:100
  },

  subTitle: {
    marginTop: verticalScale(10),
    fontFamily: 'LeagueSpartan-SemiBold',
    fontSize: moderateScale(12),
    color: '#2260FF',
    fontWeight:'600',
  },

  text: {
    width: scale(267),
    height:verticalScale(50),
    textAlign: 'center',
    color: '#070707',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontFamily:'LeagueSpartan-Regular',
    top:verticalScale(57)
  },

  btnContainer: {
    width: scale(207),
    height:scale(45),
    marginTop: verticalScale(90),
    gap: verticalScale(5),
  },
});
export default Register