import { View, Text, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native'
import { useRoute } from '@react-navigation/native'

import Header from '../components/header/Header'

import EmptyHeart from '../assets/images/svg/EmptyHeart.svg'
import FilledHeart from '../assets/images/svg/FilledHeart.svg'
import EmptyStar from '../assets/images/svg/EmptyStar.svg'
import FilledStar from '../assets/images/svg/FilledStar.svg'
import Colors from '../components/style/Colors'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters'
import Fonts from '../components/style/Fonts'
import FontSizes from '../components/style/FontSize'

import Input from '../components/input/Input'
import Button from '../components/button/Button'

const Review = () => {
    const route = useRoute();
    const { doctor } = route.params;

    const [review, setReview] = useState('');

    return (
        <SafeAreaView style={styles.container}>
            <Header text="Review" />
            <Text style={styles.doctorSpecificText}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti molestiae error blanditiis odio placeat sed praesentium incidunt repudiandae, quod, quam nostrum repellat commodi itaque cumque ducimus magnam? Debitis dignissimos blanditiis earum, assumenda inventore reprehenderit cumque corporis nobis eaque incidunt illum.</Text>
            <View style={styles.content}>

                <Image
                    source={{ uri: doctor.avatar }}
                    style={styles.image}
                />

                <Text style={styles.name}>
                    {doctor.name}
                </Text>

                <Text style={styles.specialization}>
                    {doctor.specialization}
                </Text>

                <View style={styles.infoRow}>

                    <View style={styles.chip}>
                        {doctor.favorite ? (
                            <FilledHeart width={16} height={16} />
                        ) : (
                            <EmptyHeart width={16} height={16} />
                        )}
                    </View>

                    <View style={styles.chip}>
                        {[1, 2, 3, 4, 5].map(item =>
                            item <= doctor.rating ? (
                                <FilledStar
                                    key={item}
                                    width={14}
                                    height={14}
                                />
                            ) : (
                                <EmptyStar
                                    key={item}
                                    width={14}
                                    height={14}
                                />
                            ),
                        )}
                    </View>

                </View>

                <Input
                    value={review}
                    onChangeText={setReview}
                    placeholder="Enter Your Comments here..."
                    multiline
                    numberOfLines={6}
                    textAlignVertical="top"
                    style={styles.reviewInput}
                />
                <Button
                    text="Add Review"
                    style={styles.button}
                    onPress={() => { }}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.white,
    },
    doctorSpecificText : {
        fontSize:FontSizes.sm,
        fontFamily:Fonts.regular,
        color: Colors.black,
        marginHorizontal:scale(20)
    },
    content: {
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: scale(24),
        paddingTop: verticalScale(24),
    },

    image: {
        width: scale(100),
        height: scale(100),
        borderRadius: scale(50),
    },

    name: {
        marginTop: verticalScale(14),
        fontSize: FontSizes.title,
        fontFamily: Fonts.medium,
        color: Colors.primary,
    },

    specialization: {
        marginTop: verticalScale(4),
        fontSize: FontSizes.md,
        fontFamily: Fonts.regular,
        color: Colors.black,
    },

    infoRow: {
        flexDirection: 'row',
        marginTop: verticalScale(10),
        marginBottom: verticalScale(20),
    },

    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.socialButtonBackground,
        paddingHorizontal: scale(10),
        paddingVertical: verticalScale(6),
        borderRadius: moderateScale(18),
        marginHorizontal: scale(6),
        elevation: 2,
    },

    reviewInput: {
        height: verticalScale(160),
        backgroundColor: Colors.inputBackground,
        borderRadius: moderateScale(18),
    },

    button: {
        marginTop: verticalScale(28),
        height: verticalScale(38),
        borderRadius: moderateScale(22),
    },
});
export default Review