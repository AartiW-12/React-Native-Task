import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const MyProfile = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.avatarContainer}>
          
        </View>
      </View>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container : {
    flex: 1
  }
})

export default MyProfile