import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import CustomerService from '../../assets/images/svg/CustomerService.svg'
import Website from '../../assets/images/svg/profile/Website.svg'
import Whatsapp from '../../assets/images/svg/profile/Whatsapp.svg'
import Facebook from '../../assets/images/svg/profile/Facebook.svg'
import Instagram from '../../assets/images/svg/profile/Instagram.svg'
import DownIcon from '../../assets/images/svg/DownIcon.svg'

const data = [
    {id : 1, content : "Customer Service", icon : ''},
    {id : 2, content : "Website", icon : ''},
    {id : 3, content : "Whatsap", icon : ''},
    {id : 4, content : "FaceBook", icon : ''},
    {id : 5, content : "Instagram, icon : ''"}
]
const ContactUs = () => {
  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row}>
            <View style={styles.leftContainer}>
              <View style={styles.iconContainer}>
              </View>

              <Text style={styles.title}>
                {item.content}
              </Text>
            </View>

            <Text style={styles.arrow}>{'>'}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  )
}

const styles =  StyleSheet.create({
    container : {
        flex: 1
    }
})
export default ContactUs