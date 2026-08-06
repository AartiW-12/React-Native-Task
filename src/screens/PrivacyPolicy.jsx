import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/header/Header'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'
import Spacing from '../components/style/Spacing'
import FontSizes from '../components/style/FontSize'

const termsConditions = [
    { id: 1, condition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et at ea, aspernatur iure debitis rem vel perferendis fugit velit rerum. Minus odio eaque porro quidem.' },
    { id: 2, condition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et at ea, aspernatur iure debitis rem vel perferendis fugit velit rerum. Minus odio eaque porro quidem.' },
    { id: 3, condition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et at ea, aspernatur iure debitis rem vel perferendis fugit velit rerum. Minus odio eaque porro quidem.' },
    { id: 4, condition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et at ea, aspernatur iure debitis rem vel perferendis fugit velit rerum. Minus odio eaque porro quidem.' },
    { id: 5, condition: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et at ea, aspernatur iure debitis rem vel perferendis fugit velit rerum. Minus odio eaque porro quidem.' }
]

const PrivacyPolicy = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.list}>
                    <Header text={'Privacy Policy'} />
                    <View style={styles.sectionContainer}>
                        <Text style={styles.labelLink}>Last Update : {new Date().toLocaleDateString()}</Text>
                        <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti tempora assumenda ab nesciunt quo tenetur sed natus eligendi aut voluptates quis labore explicabo ipsum consequuntur quae fugiat quam modi asperiores, repellat atque expedita, architecto omnis sequi cum! Sequi, quidem. Minima distinctio pariatur ea repellendus provident magnam temporibus officiis. Inventore repellat, incidunt molestiae, laborum laboriosam soluta velit deleniti quam quod, repudiandae rerum a sit. Veniam earum placeat iure molestias eveniet. Eveniet eos in quaerat sed assumenda modi! Dignissimos, soluta sit. Hic reiciendis unde dolorem aut asperiores temporibus, tempora exercitationem deleniti sequi nostrum odio ipsum quasi, quas natus dolore corporis optio alias!</Text>
                    </View>
                    <View style={styles.sectionContainer}>
                        <Text style={styles.label}>Terms & Conditions</Text>
                        {termsConditions.map(i => (
                            <View
                                key={i.id}
                                style={styles.listItem}
                            >
                                <Text style={styles.number}>{i.id}</Text>
                                <Text style={styles.condition}>{i.condition}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.screenBackground,
    },

    list: {
        flex: 1,
        marginTop: Spacing.vsm,
    },

    sectionContainer: {
        marginHorizontal: Spacing.xl,
        marginTop: Spacing.vxl,
        gap: Spacing.vsm,
    },

    labelLink: {
        color: Colors.primaryLight,
        fontFamily: Fonts.medium,
        fontSize: FontSizes.sm,
    },

    label: {
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: FontSizes.xxl,
    },

    text: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.md,
        lineHeight:Spacing.xl,
        textAlign: 'justify',
    },

    listContainer: {
        marginTop:Spacing.vxs,
    },

    listItem: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: Spacing.vlg,
    },

    number: {
        width: Spacing.xxl,
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
        fontSize: FontSizes.lg,
    },

    condition: {
        flex: 1,
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.md,
        lineHeight: Spacing.xl,
        textAlign: 'justify',
    },
});

export default PrivacyPolicy