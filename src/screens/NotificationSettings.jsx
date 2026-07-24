import React, { useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Switch,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
    moderateScale,
    scale,
    verticalScale,
} from 'react-native-size-matters';

import Header from '../components/header/Header';
import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';

const NotificationSettings = () => {
    const [generalNotification, setGeneralNotification] = useState(true);
    const [Sound, setSound] = useState(true);
    const [soundCall, setSoundCall] = useState(true)
    const [Vibrate, setVibrate] = useState(false);
    const [SpecialOffers, setSpecialOffers] = useState(true);
    const [payments, setPayments] = useState(false)
    const [PromoDiscount, setPromoDiscount] = useState(false);
    const [cashback, setCashback] = useState(true)

    return (
        <SafeAreaView style={styles.container}>
            <Header text="Notification Settings" />

            <View style={styles.list}>

                <View style={styles.optionContainer}>
                    <Text style={styles.title}>General Notification</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={generalNotification}
                            onValueChange={setGeneralNotification}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Sound</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={Sound}
                            onValueChange={setSound}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Sound Call</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={soundCall}
                            onValueChange={setSoundCall}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Vibrate</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={Vibrate}
                            onValueChange={setVibrate}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Special Offers</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={SpecialOffers}
                            onValueChange={setSpecialOffers}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>

                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Payments</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={payments}
                            onValueChange={setPayments}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Promo and Discount</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={PromoDiscount}
                            onValueChange={setPromoDiscount}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>
                <View style={styles.optionContainer}>
                    <Text style={styles.title}>Cashback</Text>

                    <View style={styles.switchContainer}>
                        <Switch
                            value={cashback}
                            onValueChange={setCashback}
                            trackColor={{
                                false: Colors.white,
                                true: Colors.primary,
                            }}
                            thumbColor={Colors.white}
                            ios_backgroundColor={Colors.white}
                        />
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
};

export default NotificationSettings;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
        marginTop: verticalScale(10),
        paddingHorizontal: scale(22),
    },

    list: {
        marginTop: verticalScale(30),
    },

    optionContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: verticalScale(28),
    },

    title: {
        fontSize: moderateScale(20),
        fontFamily: Fonts.regular,
        color: Colors.black,
    },

    switchContainer: {
        transform: [
            { scaleX: 1.3 },
            { scaleY: 1.3 },
        ],
    },
});