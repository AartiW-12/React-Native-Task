import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/header/Header';
import Button from '../components/button/Button';
import Chip from '../assets/images/svg/Chip.svg';
import Polygon from '../assets/images/svg/Polygon.svg'
import { useSelector } from 'react-redux';
import Input from '../components/input/Input';
import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';
import FontSizes from '../components/style/FontSize';
import { showSnackbar } from '../components/snackbar/ShowSnackbar';
export default function AddCardScreen() {

    const { user } = useSelector(state => state.auth)
    const [holderName, setHolderName] = useState(user.name);
    const [cardNumber, setCardNumber] = useState('000 000 000 00');
    const [expiry, setExpiry] = useState('04/28');
    const [cvv, setCvv] = useState('0000');
    const navigation = useNavigation();
    return (
        <SafeAreaView style={styles.container}>
            <Header text={'Add card'} />

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
                        placeholder="04/28"
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
                    showSnackbar({ msg :'Card Updated Sucessfully'})
                    setTimeout(() => {
                        // navigation.navigate('Profile')
                    }, 700);
                }}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingHorizontal: 24,
    },
    button: { alignSelf: 'center' },
    card: {
        marginTop: 20,
        height: 210,
        borderRadius: 22,
        backgroundColor: Colors.primary,
        overflow: 'hidden',
        position: 'relative',
    },

    polygon1: {
        position: 'absolute',
        top: -40,
        left: 0,
        width: '100%',
        height: '100%',
    },

    polygon2: {
        position: 'absolute',
        top: 0,
        right: 0,
    },

    content: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 22,
    },
    logo: {
        width: 58,
        height: 18,
        borderWidth: 2,
        borderColor: Colors.white,
        borderRadius: 4,
        alignSelf: 'flex-end',
    },

    cardNumber: {
        color: Colors.white,
        fontSize: 28,
        letterSpacing: 2,
    },

    cardBottom: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end',
    },

    label: {
        color: Colors.white,
        fontSize: 12,
    },

    value: {
        color: Colors.white,
        fontSize: 18,
        fontWeight: '700',
    },

    chip: {
        width: 38,
        height: 32,
    },

    heading: {
        marginTop: 22,
        marginBottom: 8,
        fontSize: 18,
        fontWeight: '600',
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.lg
    },

    input: {
        height: 56,
        borderRadius: 18,
        backgroundColor: Colors.inputBackground,
        paddingHorizontal: 18,
        fontSize: 18,
        color: Colors.primary,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    half: {
        width: '47%',
    },
});