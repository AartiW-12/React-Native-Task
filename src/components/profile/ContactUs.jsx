
import React from 'react'

import { SafeAreaView } from 'react-native-safe-area-context'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'


import CustomerService from '../../assets/images/svg/CustomerService.svg'
import Website from '../../assets/images/svg/profile/Website.svg'
import Whatsapp from '../../assets/images/svg/profile/Whatsapp.svg'
import Facebook from '../../assets/images/svg/profile/Facebook.svg'
import Instagram from '../../assets/images/svg/profile/Instagram.svg'
import DownIcon from '../../assets/images/svg/DownIcon.svg'
import Colors from '../style/Colors'


const data = [
    { id: 1, content: "Customer Service", icon: CustomerService },
    { id: 2, content: "Website", icon: Website },
    { id: 3, content: "Whatsap", icon: Whatsapp },
    { id: 4, content: "FaceBook", icon: Facebook },
    { id: 5, content: "Instagram", icon: Instagram }
]
const ContactUs = () => {
    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id.toString()}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item }) => {
                    const Icon = item.icon;
                    return (
                        <TouchableOpacity style={styles.row}>
                            <View style={styles.leftContainer}>
                                <View style={styles.iconContainer}>
                                    <Icon width={24} height={24} />
                                </View>

                                <Text style={styles.title}>
                                    {item.content}
                                </Text>
                            </View>

                            <DownIcon
                                width={14}
                                height={8}
                            />
                        </TouchableOpacity>
                    );
                }}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    list: {
        paddingHorizontal: 20,
        paddingTop: 10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 16,
    },

    leftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    iconContainer: {
        width: scale(40),
        height: scale(40),
        borderRadius: scale(20),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: scale(16),
    },

    title: {
        fontSize: 16,
    },
});
export default ContactUs