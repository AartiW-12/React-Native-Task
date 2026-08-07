import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import Header from '../components/header/Header'
import SearchBar from '../components/searchbar/SearchBar'
import Colors from '../components/style/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import Fonts from '../components/style/Fonts'

import TabSwitcher from '../components/tab-switcher/TabSwitcher'

// import SearchIcon from '../assets/images/svg/profile/Search.svg'

import FAQ from '../components/profile/FAQ'
import ContactUs from '../components/profile/ContactUs'
import FontSizes from '../components/style/FontSize'
import Spacing from '../components/style/Spacing'

const HelpCenter = () => {
    const [search, setSearch] = useState("")
    const [help, setHelp] = useState("FAQ")

    const helpTabs = [
        {
            label: 'FAQ',
            value: 'FAQ',
        },
        {
            label: 'Contact Us',
            value: 'ContactUs',
        },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Header text={'Help Center'} titleStyle={styles.whiteTitle} backIconColor={Colors.white} />
                <Text style={styles.headerText}>How Can We Help You?</Text>
                <SearchBar
                    placeholder='Search...'
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchBar}
                />
            </View>
            <View style={styles.sectionContainer}>
                {/* <View style={styles.btnContainer}>
                    <Button
                    varient={help ==="FAQ" ? "primary" : "secondary"}
                    text={'FAQ'}
                    onPress={() => {
                        setHelp("FAQ")}}
                    textStyle={styles.btnText}
                />
                </View>
                <View style={styles.btnContainer}>
                    <Button
                    varient={help ==="ContactUs" ? "primary" : "secondary"}
                    text={'Contact Us'}
                    onPress={() => setHelp("ContactUs")}
                    textStyle={styles.btnText}
                />
                </View> */}
            </View>
            {/* <View style={styles.contentContainer}>
                {help==="FAQ" ? <FAQ /> : <ContactUs />}
                        
            </View> */}
            <TabSwitcher
                tabs={helpTabs}
                activeTab={help}
                onTabPress={setHelp}
                containerStyle={styles.sectionContainer}
                buttonStyle={styles.helpTabButton}
                buttonTextStyle={styles.helpTabText}
            />
            <View style={styles.contentContainer}>
                {help === 'FAQ' ? <FAQ /> : <ContactUs />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        backgroundColor: Colors.primary,
        paddingVertical: moderateScale(20),
        paddingHorizontal: moderateScale(20),
        gap: scale(30)
    },

    whiteTitle: {
        color: Colors.white,
    },
    whiteBtn: {
        color: Colors.white
    },
    searchBar: {
        backgroundColor: Colors.screenBackground,
        height: verticalScale(38),
        minWidth: scale(300)
    },
    headerText: {
        color: Colors.socialButtonBackground,
        alignSelf: 'center',
        fontFamily: Fonts.regular,
        fontSize: moderateScale(16)
    },
    sectionContainer: {
        flexDirection: 'row',
        marginTop: verticalScale(10),
        paddingHorizontal: scale(20),
        gap: verticalScale(16),
    },
    btnContainer: {
        width: scale(140)
    },
    contentContainer: {
        flex: 1
    },
    helpTabButton: {
        width: scale(140),
        height: verticalScale(38),
        borderRadius: Spacing.mxl,
        marginBottom:verticalScale(20)
    },

    helpTabText: {
        fontFamily: Fonts.medium,
        fontSize: FontSizes.md,
    },
})
export default HelpCenter