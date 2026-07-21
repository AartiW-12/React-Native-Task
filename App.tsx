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
// import SplashScreen from './src/screens/SplashScreen'
import Register from './src/screens/Register'
import SignUp from './src/screens/SignUp'
import Login from './src/screens/Login'
import SetPassword from './src/screens/SetPassword'
function App() {

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* <Text>Helllo</Text> */}
        {/* <SplashScreen /> */}
        {/* <Register /> */}
        {/* <SignUp /> */}
        {/* <Login /> */}
        <SetPassword />
      </View>
    </SafeAreaProvider>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
