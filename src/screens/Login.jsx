import React, { useState } from 'react'
import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import Input from '../components/input/Input'
import Button from '../components/button/Button'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSucess } from '../redux/auth/authSlice'
import { login } from '../services/authService/authService'
import AsyncStorage from '@react-native-async-storage/async-storage';

function Login({ navigation }) {
  //hoooks to store and update the state 
  const [inputValue, setInputValue] = useState("")
  const [password, setPassword] = useState("")

  const dispatch = useDispatch()

  // functions 
  const handleLogin = async() => {
      dispatch(loginStart())
      try{
        const user = await login(inputValue, password)
        const token = `token_${Date.now()}`

        await AsyncStorage.setItem("Token", token)

        dispatch(loginSucess({
          user, 
          token
        }))
      }catch(err){
        console.log(err)
        dispatch(loginFailure(err.message))
      }
  }

  const handleForgetPassword = () => {
    navigation.navigate("SetPassword")
  }

  // array of icons
  const icons = [
    { id: 1, image: require('../assets/images/Ellipse35.png') },
    { id: 2, image: require('../assets/images/Group98.png') },
    { id: 3, image: require('../assets/images/Vector164.png') },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.header2}>Welcome</Text>
      <Text style={styles.text}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </Text>
      <Text style={styles.label}>Email or Mobile Number</Text>
      <Input
        placeholder="example@example.com"
        value={inputValue}
        onChangeText={setInputValue}
        style={styles.input}

      />
      <Text style={styles.label}>Password</Text>
      <Input
        placeholder='*************'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry={true}
      />
      <Text style={styles.link} onPress={handleForgetPassword}>Forget Password</Text>
      <View style={styles.btnContainer}>
        <Button
          varient='primary'
          text="Log In"
          onPress={handleLogin}
        />
      </View>
      <View style={styles.signUpOptionsContainer}>
        {icons.map((item) => (
          <Pressable
            key={item.id}
            style={styles.socialButton}
          >
            <Image
              source={item.image}
              style={styles.socialIcon}
              resizeMode="contain"
            />
          </Pressable>
        ))}
      </View>
      <Text style={styles.footer}>Don’t have an account? {' '}
        <Text
          style={styles.link}
          onPress={() => navigation.navigate("SignUp")}
        >
          Sign Up
        </Text>
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
    paddingTop: verticalScale(20),
    paddingHorizontal: scale(20),
  },

  header2: {
    fontFamily: Fonts.semiBold,
    fontSize: moderateScale(24),
    fontWeight: '600',
    color: Colors.primary,
    alignSelf: 'flex-start',
    marginTop: verticalScale(10),
  },

  text: {
    width: '100%',
    textAlign: 'center',
    color: Colors.black,
    fontSize: moderateScale(12),
    fontWeight: '300',
    fontFamily: Fonts.regular,
    marginTop: verticalScale(10),
    lineHeight: moderateScale(18),
  },

  label: {
    fontSize: moderateScale(20),
    fontFamily: Fonts.medium,
    fontWeight: '500',
    color: Colors.black,
    marginBottom: verticalScale(5),
    marginTop: verticalScale(20),
  },

  input: {
    paddingHorizontal: scale(15),
    fontSize: moderateScale(16),
  },

  link: {
    color: Colors.primary,
    fontSize: moderateScale(12),
    fontWeight: '500',
    alignSelf: 'flex-end',
    marginTop: verticalScale(8),
  },

  btnContainer: {
    width: '70%',
    alignSelf: 'center',
    marginTop: verticalScale(20),
  },

  signUpOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: verticalScale(20),
  },

  socialButton: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.socialButtonBackground,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: scale(6),
  },

  socialIcon: {
    width: scale(24),
    height: scale(24),
  },

  footer: {
    marginTop: verticalScale(30),
    textAlign: 'center',
    fontSize: moderateScale(12),
    fontFamily: Fonts.regular,
    color: Colors.black,
  },
});
export default Login