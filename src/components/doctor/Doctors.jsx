
import React, { useMemo, useState } from 'react'

import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

import { useNavigation } from '@react-navigation/native'

import Colors from '../style/Colors'
import Fonts from '../style/Fonts'
import Button from '../button/Button'

import RenderDoctor from './RenderDoctor'
import doctorList from './doctorsList'
import Header from '../header/Header'

//importing SVG
import EmptyStar from '../../assets/images/svg/EmptyStar.svg'
import EmptyHeart from '../../assets/images/svg/EmptyHeart.svg'
import FemaleIcon from '../../assets/images/svg/FemaleIcon.svg'
import MaleIcon from '../../assets/images/svg/MaleIcon.svg'



const Doctors = () => {

    const [sortOrder, setSortOrder] = useState(null);
    const [genderFilter, setGenderFilter] = useState(null);

    const navigation = useNavigation()

    const handleSortAZ = () => {
        setSortOrder(prev => prev === "asc" ? null : "asc");
    };

    const handleRatingSort = () => {
        // setSortOrder(prev => prev === "rating" ? null : "rating");
        navigation.navigate("DoctorRating")
    };

    const handleMaleFilter = () => {
        setGenderFilter(prev => prev === "male" ? null : "male");
    };

    const handleFemaleFilter = () => {
        setGenderFilter(prev => prev === "female" ? null : "female");
    };
    // const handleFavourite= () => {navigation.navigate("Favourite");
    // };

    const filteredDoctors = useMemo(() => {
        let data = [...doctorList];

        if (genderFilter) {
            data = data.filter(
                doctor => doctor.gender.toLowerCase() === genderFilter.toLowerCase()
            );
        }
        if (sortOrder === 'asc') {
            data.sort((a, b) => a.name.localeCompare(b.name));
        }
        if (sortOrder === 'rating') {
            data.sort((a, b) => b.rating - a.rating);
        }
        return data;
    }, [doctorList, sortOrder, genderFilter]);

    const viewInfo = (doctor) => {
        navigation.navigate("DoctorInfo", {
            doctor
        })
    }


    return (
        <View style={styles.container}>
            <Header text={'Doctors'} />

            <View style={styles.headerRow}>
                <Text style={styles.headerContent}>Sort By</Text>

                <View style={styles.sortBtnContainer}>
                    <Button
                        varient="primary"
                        text="A→Z"
                        onPress={handleSortAZ}
                        style={styles.sortBtn}
                    />
                </View>
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={handleRatingSort}
                >
                    <EmptyStar style={styles.iconStyle} />
                </TouchableOpacity>
                {/* <TouchableOpacity 
                    style={styles.circleButton}
                    onPress={handleFavourite}    
                >
                    <EmptyHeart style={styles.iconStyle} />
                </TouchableOpacity> */}
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={handleFemaleFilter}
                >
                    <FemaleIcon style={styles.iconStyle} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.circleButton}
                    onPress={handleMaleFilter}
                >
                    <MaleIcon style={styles.iconStyle} />
                </TouchableOpacity>
            </View>
            <View style={styles.doctorsList}>
                <FlatList
                    data={filteredDoctors}
                    keyExtractor={(item) => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <RenderDoctor
                            item={item}
                            onInfoPress={viewInfo}
                            onCalendarPress={(doctor) =>
                                console.log('Calendar', doctor.name)
                            }
                            onDetailsPress={(doctor) =>
                                console.log('Details', doctor.name)
                            }
                            onQuestionPress={(doctor) =>
                                console.log('Question', doctor.name)
                            }
                            onFavoritePress={(doctor) =>
                                console.log('Favorite', doctor.name)
                            }
                        />
                    )}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        fontFamily: Fonts.regular,
        marginTop: verticalScale(35),
        marginBottom: scale(50)
    },
    heading: {
        alignSelf: 'center',
        color: Colors.primary,
        fontFamily: Fonts.semiBold,
        fontSize: scale(24),

    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: scale(20),
        marginBottom: verticalScale(10),
    },

    headerContent: {
        fontSize: moderateScale(14),
        fontFamily: Fonts.medium,
        color: Colors.black,
        marginRight: scale(8),
    },

    sortBtnContainer: {
        width: scale(48),
        height: verticalScale(22),
    },

    sortBtn: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    doctorsList: {
        width: scale(300),
        alignSelf: 'center',
        gap: moderateScale(20),
        marginBottom: verticalScale(50)
    },
    name: {
        width: scale(129),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: scale(14),
    },

    circleButton: {
        width: scale(22),
        height: scale(22),
        borderRadius: scale(11),
        backgroundColor: Colors.socialButtonBackground,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    iconStyle: {
        height: verticalScale(22),
        width: scale(22)
    },
})
export default Doctors