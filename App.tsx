/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { StyleSheet, Text, View } from 'react-native';
import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './src/navigation/AppNavigator'

import { Provider, useDispatch } from 'react-redux';
import store from './src/redux/store'
import { useEffect } from 'react';
import { getDoctors } from './src/redux/doctors/doctorSlice';
import AppContent from './src/content/AppContent'

function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
        {/* <AppContent /> */}
      </Provider>
    </SafeAreaProvider>
  );
}

export default App;
