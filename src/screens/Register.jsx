import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import Button from '../components/button/Button'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'
import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'

function Register() {

  const navigation = useNavigation()
    const handleLogin = () => {
        navigation.navigate('Login')
    }
    const handleSignUp = () => {
        navigation.navigate("SignUp")
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
    backgroundColor: Colors.screenBackground,
    alignItems: 'center',
    justifyContent:'center',
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
    fontFamily:Fonts.regular,
    fontSize: moderateScale(48),
    lineHeight: moderateScale(44),
    color: Colors.primary,
    fontWeight:100
  },

  subTitle: {
    marginTop: verticalScale(10),
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(12),
    color: Colors.primary,
    fontWeight:'600',
  },

  text: {
    width: scale(267),
    height:verticalScale(50),
    textAlign: 'center',
    color: '#070707',
    fontSize: moderateScale(12),
    lineHeight: moderateScale(16),
    fontFamily:Fonts.regular,
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