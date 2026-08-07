import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { TouchableOpacity } from 'react-native'
import Colors from '../components/style/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import FontSizes from '../components/style/FontSize'
import Fonts from '../components/style/Fonts'
import Header from '../components/header/Header'

import ChatIcon from '../assets/images/svg/ChatIcon.svg'
import Spacing from '../components/style/Spacing'

const ChatList = () => {
    const { doctors } = useSelector(state => state.doctors)
    const { appointments } = useSelector(state => state.appointments)

    const navigation = useNavigation()

    const myDoctors = appointments.reduce((acc, apmnt) => {
        const doctor = doctors.find(d => d.id === apmnt.doctorId);

        if (!doctor) return acc;

        if (!acc.some(item => item.id === doctor.id)) {
            acc.push({
                ...doctor,
                appointmentStatus: apmnt.status,
            });
        }

        return acc;
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <Header text={'Chat'} backIconColor={Colors.primary}/>
            <View style={styles.listContainer}>
                <FlatList
                    data={myDoctors}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            style={styles.card}
                            onPress={() =>
                                navigation.navigate("Chat", {
                                    doctor: item,
                                })
                            }
                        >
                            <Image
                                source={{ uri: item.avatar }}
                                style={styles.avatar}
                            />

                            <View style={styles.infoContainer}>
                                <Text numberOfLines={1} style={styles.name}>
                                    {item.name}
                                </Text>

                                <Text numberOfLines={1} style={styles.specialization}>
                                    {item.specialization}
                                </Text>
                            </View>
                            <View style={styles.chatContainer}>
                                <ChatIcon height={18} width={18} />
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
    },

    listContainer: {
        paddingVertical: Spacing.vmd,
        marginBottom:verticalScale(80)
    },

    card: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: Colors.white,
        padding: Spacing.md,
        marginBottom: Spacing.sm,
        borderRadius: Spacing.mxl,
    },

    avatar: {
        width: Spacing.w60,
        height: Spacing.h60,
        borderRadius:Spacing.mxxxl,
    },

    infoContainer: {
        flex: 1,
        marginLeft: Spacing.xxl,
        justifyContent: "center",
    },

    name: {
        fontSize: FontSizes.lg,
        fontFamily: Fonts.regular,
        color: Colors.primary,
    },

    specialization: {
        marginTop: Spacing.vxs,
        fontSize: FontSizes.md,
        fontFamily: Fonts.regular,
        color: Colors.black,
    },

    chatContainer: {
        width: Spacing.xxxl,
        height: Spacing.xxxl,
        borderRadius: Spacing.mlg,
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
export default ChatList