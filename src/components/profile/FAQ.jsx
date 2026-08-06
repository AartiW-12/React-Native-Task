import React, { useState } from 'react'

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import { SafeAreaView } from 'react-native-safe-area-context'

import DownIcon from '../../assets/images/svg/DownIcon.svg'

import Button from '../button/Button'
import Colors from '../style/Colors'    
import Fonts from '../style/Fonts'
import CommonStyles from '../constants/CommonStyles'

const popularTopics = [
  { id: 1, title: 'Popular Topic 1', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 2, title: 'Popular Topic 2', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 3, title: 'Popular Topic 3', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 4, title: 'Popular Topic 4', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 5, title: 'Popular Topic 5', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
];

const generalTopics = [
  { id: 1, title: 'General 1', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 2, title: 'General 2', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 3, title: 'General 3', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 4, title: 'General 4', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 5, title: 'General 5', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
];

const servicesTopics = [
  { id: 1, title: 'Services 1', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 2, title: 'Services 2', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 3, title: 'Services 3', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 4, title: 'Services 4', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
  { id: 5, title: 'Services 5', description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Explicabo animi atque unde amet suscipit, facilis quisquam iusto natus earum, incidunt saepe accusamus iste, delectus aliquam.'},
];


const FAQ = () => {
    const [currentState, setCurrentState] = useState('Popular Topic');
    const [openId, setOpenId] = useState(null);

    const handleOpen = id => {
        setOpenId(openId === id ? null : id);
    };

    const dataToRender = currentState ==="Popular Topic" ? popularTopics : currentState==="General" ? generalTopics : servicesTopics
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.faqContainer}>
                <View style={styles.stateContainer}>
                    <View style={styles.btnContainer}>
                        <Button
                            varient={currentState === 'Popular Topic' ? 'primary' : 'secondary'}
                            text="Popular Topic"
                            onPress={() => setCurrentState('Popular Topic')}
                            textStyle={styles.btnText}
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <Button
                            varient={currentState === 'General' ? 'primary' : 'secondary'}
                            text="General"
                            onPress={() => setCurrentState('General')}
                            textStyle={styles.btnText}
                        />
                    </View>

                    <View style={styles.btnContainer}>
                        <Button
                            varient={currentState === 'Services' ? 'primary' : 'secondary'}
                            text="Services"
                            onPress={() => setCurrentState('Services')}
                            textStyle={styles.btnText}
                        />
                    </View>

                </View>

                <FlatList
                    data={dataToRender}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={styles.listContainer}
                    renderItem={({ item }) => (
                        <View>
                            <View style={styles.serviceBar}>
                                <View style={styles.service}>
                                    <Text style={styles.title}>
                                        {item.title}
                                    </Text>
                                </View>

                                <TouchableOpacity
                                    style={styles.downBtn}
                                    onPress={() => handleOpen(item.id)}
                                >
                                    <DownIcon width={14} height={8} />
                                </TouchableOpacity>
                            </View>

                            {openId === item.id && (
                                <View style={styles.dropdownContainer}>
                                    <View style={styles.dropdown}>
                                        <Text style={styles.text}>
                                            {item.description}
                                        </Text>
                                    </View>
                                </View>
                            )}
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: CommonStyles.flex1,
    faqContainer: CommonStyles.flex1,
    stateContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: scale(20),
        marginBottom: verticalScale(20),
    },

    listContainer: {
        paddingHorizontal: scale(10),
        paddingBottom: verticalScale(10),
        gap: verticalScale(10),
    },
    btnContainer: {
        width: scale(95),
    },
    btnText: {
        fontSize: FontSizes.md
    },
    serviceBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.inputBackground,
        borderRadius: moderateScale(22),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(14),
    },
    service: CommonStyles.flex1,
    title: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: FontSizes.md,
    
    },
    downBtn: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        justifyContent: 'center',
        alignItems: 'center',
    },

    dropdownContainer: {
        marginTop:Spacing.vxs,
    },

    dropdown: {
        padding: moderateScale(5),
        marginHorizontal: scale(5),
        marginBottom: verticalScale(5),
    },

    text: {
        color: Colors.black,
        fontFamily: Fonts.regular,
        fontSize: moderateScale(13),
    },
});
export default FAQ