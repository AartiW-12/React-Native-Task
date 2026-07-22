import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import SearchBar from '../components/searchbar/SearchBar'
import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts'
import { SafeAreaView } from 'react-native-safe-area-context';
function Home() {
    const handleFilter = () => {
        console.log("Filter")
    }
    return (
        <SafeAreaView style={{ flex : 1}}>
        <View style={styles.container}>


            <View style={styles.headerContainer}>
                <View style={styles.leftContainer}>
                    <Image
                        source={require('../assets/images/avatar.png')}
                        style={styles.avatar}
                        resizeMode='contain'
                    />
                    <View>
                        <Text style={styles.welcome}>Hi, Welcome Back</Text>
                        <Text style={styles.name}>John Doe</Text>
                    </View>
                </View>
                <View style={styles.rightContainer}>
                    <TouchableOpacity
                        style={styles.iconButton}
                    >
                        <Image
                            source={require('../assets/images/Notification.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.iconButton}>
                        <Image
                            source={require('../assets/images/settings.png')}
                            style={styles.image}
                            resizeMode='contain'
                        />
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.sectionContainer}>
                <View style={styles.sectionLeftContainer}>
                    <Image
                        source={require('../assets/images/stethoscope.png')}
                        style={styles.sectionIcons}
                        resizeMode='contain'
                    />
                    <Text style={styles.link}>Doctors</Text>
                </View>
                <View style={styles.sectionLeftContainer}>
                    <Image
                        source={require('../assets/images/favourite.png')}
                        style={styles.sectionIcons}
                        resizeMode='contain'
                    />
                    <Text style={styles.link}>Favorite</Text>
                </View>
                <View style={styles.sectionRightContainer}>
                    <SearchBar 
                        placeholder=''
                        value={1}
                        onChangeText={handleFilter}
                        searchIcon={require('../assets/images/searchIcon.png')}
                        leftIcon={require('../assets/images/seachLeft.png')}
                    />
                </View>
            </View>
            <View style={styles.recentAppointments}></View>

        </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: verticalScale(20),
        marginHorizontal: 20,
    },
    leftContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
    },
    avatar: {
        width: scale(52),
        height: verticalScale(52),
        borderRadius: 26,
        marginRight: scale(12),
    },
    welcome: {
        color: Colors.primary,
        fontFamily: Fonts.regular,

    },
    name: {
        fontSize: moderateScale(18),
        fontFamily: Fonts.regular,
        color: '#222',
        marginTop: scale(2),
    },
    rightContainer: {
        flexDirection: 'row',
    },
    sectionContainer: {
        flexDirection: 'row',
        width: scale(80),
        height: verticalScale(35),
        justifyContent: 'space-between',
        gap: moderateScale(10),
        marginLeft: scale(30),
        marginTop: verticalScale(20)
    },
    sectionLeftContainer: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    iconButton: {
        width: scale(27),
        height: verticalScale(27),
        borderRadius: '50%',
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(10),
    },
    image: {
        width: scale(17),
        height: verticalScale(17),
        alignSelf: "center"
    },
    sectionIcons: {
        width: scale(15),
        height: verticalScale(18),
        alignSelf: 'center'
    },
    link: {
        fontFamily: Fonts.regular,
        color: Colors.primary
    },
    sectionRightContainer : {
        width:scale(190),
        height:verticalScale(33),
        marginLeft:scale(20),
    }
})
export default Home