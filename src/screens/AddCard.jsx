import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Header from '../components/header/Header';
import Button from '../components/button/Button';


import Input from '../components/input/Input';
import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';
import FontSizes from '../components/style/FontSize';
import { showSnackbar } from '../components/snackbar/ShowSnackbar';

import Chip from '../assets/images/svg/Chip.svg';
import Polygon from '../assets/images/svg/Polygon.svg'
import CommonStyles from '../components/constants/CommonStyles';
import Spacing from '../components/style/Spacing';

export default function AddCardScreen() {

    const { user } = useSelector(state => state.auth)
    const [holderName, setHolderName] = useState(user.name);
    const [cardNumber, setCardNumber] = useState('000 000 000 00');
    const [expiry, setExpiry] = useState('01/28');
    const [cvv, setCvv] = useState('0000');
    const navigation = useNavigation();
    
    return (
        <SafeAreaView style={styles.container}>
            <Header text={'Add card'} />
            <KeyboardAvoidingView
                style={CommonStyles.flex1}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={20}
            >
                <ScrollView
                    contentContainerStyle={CommonStyles.flexGrow1}
                    keyboardShouldPersistTaps="handled"
                    showsVerticalScrollIndicator={false}
                >
                <View style={styles.card}>
                    <View style={styles.polygon1}>
                        <Polygon width="80%" height="100%" />
                    </View>
                    <View style={styles.content}>
                        <View style={styles.logo} />

                        <Text style={styles.cardNumber}>{cardNumber}</Text>

                        <View style={styles.cardBottom}>
                            <View>
                                <Text style={styles.label}>Card Holder Name</Text>
                                <Text style={styles.value}>{holderName}</Text>
                            </View>

                            <View>
                                <Text style={styles.label}>Expiry Date</Text>
                                <Text style={styles.value}>{expiry}</Text>
                            </View>

                            <Chip width={40} height={40} />
                        </View>
                    </View>
                </View>
                <Text style={styles.heading}>Card Holder Name</Text>

                <Input
                    value={holderName}
                    onChangeText={setHolderName}
                    placeholder="Card Holder Name"
                    placeholderTextColor={Colors.primary}

                />
                <Text style={styles.heading}>Card Number</Text>

                <Input
                    style={styles.input}
                    value={cardNumber}
                    onChangeText={setCardNumber}
                    keyboardType="number-pad"
                    placeholder="000 000 000 00"
                />
                <View style={styles.row}>
                    <View style={styles.half}>
                        <Text style={styles.heading}>Expiry Date</Text>

                        <Input
                            style={styles.input}
                            value={expiry}
                            onChangeText={setExpiry}
                            placeholder="01/28"
                        />
                    </View>

                    <View style={styles.half}>
                        <Text style={styles.heading}>CVV</Text>

                        <Input
                            style={styles.input}
                            value={cvv}
                            onChangeText={setCvv}
                            keyboardType="number-pad"
                            placeholder="0000"
                        />
                    </View>
                </View>

                <View style={{ flex: 1 / 2 }} />

                <Button
                    text="Save Card"
                    style={styles.button}
                    onPress={() => {
                        showSnackbar({ msg: 'Card Updated Sucessfully' })
                        setTimeout(() => {
                            navigation.navigate('BottomTabNavigator', {
                                screen: "MyProfile"
                            })
                        }, 700);
                    }}
                />
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
        paddingHorizontal: Spacing.xxl,
    },
    button: { alignSelf: 'center' },
    card: {
        marginTop: Spacing.xl,
        height: Spacing.cardHeight,
        borderRadius: Spacing.xl,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
        position: 'relative',
    },

    polygon1: {
        position: 'absolute',
        top: -40,
        left: Spacing.zero,
        width: Spacing.fullWidth,
        height: Spacing.fullWidth,
    },

    polygon2: {
        position: 'absolute',
        top: Spacing.zero,
        right: Spacing.zero,
    },

    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: Spacing.xl,
    },
    logo: {
        width: Spacing.xxxxl,
        height: Spacing.lg,
        borderWidth: Spacing.xs / Spacing.xs,
        borderColor: Colors.white,
        borderRadius: Spacing.vxs,
        alignSelf: 'flex-end',
    },

    cardNumber: {
        color: Colors.white,
        fontSize: FontSizes.title,
        letterSpacing: Spacing.sm / Spacing.sm,
    },

    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    label: {
        color: Colors.white,
        fontSize:FontSizes.sm,
    },

    value: {
        color: Colors.white,
        fontSize: FontSizes.lg,
        fontWeight: '700',
    },

    chip: {
        width: Spacing.cardChipWidth,
        height: Spacing.xxxl,
    },

    heading: {
        marginTop: Spacing.xl,
        marginBottom: Spacing.vsm,
        fontSize: FontSizes.xl,
        fontWeight: '600',
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.lg
    },

    input: {
        height: Spacing.xxxxl,
        borderRadius: Spacing.lg,
        backgroundColor: Colors.inputBackground,
        paddingHorizontal: Spacing.lg,
        fontSize: Spacing.lg,
        color: Colors.primary,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    half: {
        width: Spacing.cardInputWidth,
    },
});