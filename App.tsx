/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {  StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'

import Doctors from './src/components/doctor/Doctors'
import Home from './src/screens/Home';
import DoctorInfo from './src/components/doctor/DoctorInfo'

function App() {
  return (
    <SafeAreaProvider>
      <View style={{flex:1}}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        {/* <Doctors /> */}
        {/* <DoctorInfo doctor={{ id: 2, name: "Dr. Michael Davidson, M.D.", specialization: 'Solar Dermatology', avatar: require("./src/assets/images/doctors/Michael.png"), rating: 4, comments: 30, favorite: false, experience:12 , availableTime:'11:00 AM' }} /> */}
        {/* <Home /> */}
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
});

export default App;
