import React, { useMemo, useState } from 'react'
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, ActivityIndicator } from 'react-native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'

import Colors from '../components/style/Colors'
import Fonts from '../components/style/Fonts'
import Button from '../components/button/Button'
import Header from '../components/header/Header'

// import doctorsList from './doctorsList'

import TabSwitcher from '../components/tab-switcher/TabSwitcher'

// SVG Icons
import EmptyStar from '../assets/images/svg/EmptyStar.svg'
import FilledStar from '../assets/images/svg/FilledStar.svg'
import EmptyHeart from '../assets/images/svg/EmptyHeart.svg'
import FilledHeart from '../assets/images/svg/FilledHeart.svg'
import FemaleIcon from '../assets/images/svg/FemaleIcon.svg'
import MaleIcon from '../assets/images/svg/MaleIcon.svg'
import StarIconWhite from '../assets/images/svg/StarIconWhite.svg'
import CalenderIcon from '../assets/images/svg/CalenderIcon.svg'
import InfoIcon from '../assets/images/svg/InfoIcon.svg'
import QuestionIcon from '../assets/images/svg/QuestionIcon.svg'
import HeartWhite from '../assets/images/svg/HeartWhite.svg'
import DownIcon from '../assets/images/svg/DownIcon.svg'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'

import { getDoctors, toggleFavorite} from '../redux/doctors/doctorSlice'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontSizes from '../components/style/FontSize'


const filterIndex = {
    ALL: 0,
    AZ: 1,
    RATING: 2,
    FAVORITE: 3,
    MALE: 4,
    FEMALE: 5,
}

const favTab = {
    DOCTORS: 0,
    SERVICES: 1,
}

const favoriteTabs = [
    { label: 'Doctors', value: favTab.DOCTORS },
    { label: 'Services', value: favTab.SERVICES },
];

const Doctors = () => {

    const [activeFilter, setActiveFilter] = useState(filterIndex.ALL)
    const [favoriteTab, setFavoriteTab] = useState(favTab.DOCTORS)
    const [openServiceId, setOpenServiceId] = useState(null)

    const dispatch = useDispatch()
    const navigation = useNavigation()

    const {
        doctors,
        loading,
        error
    } = useSelector(state => state.doctors)


    const setFilter = (filterValue) => {
        setActiveFilter(filterValue)
    }

    const handleSortAZ = () => setFilter(filterIndex.AZ)

    const handleRatingSort = () => setFilter(filterIndex.RATING)

    const handleFavoriteFilter = () => {
        setActiveFilter(filterIndex.FAVORITE)
        setFavoriteTab(favTab.DOCTORS)
    }

    const handleMaleFilter = () => setFilter(filterIndex.MALE)

    const handleFemaleFilter = () => setFilter(filterIndex.FEMALE)

    const handleOpenService = (id) => {
        setOpenServiceId(prev => (prev === id ? null : id))
    }

    const viewInfo = (doctor) => {
        navigation.navigate("DoctorInfo", { doctor })
    }

    const bookAppointment = (doctor) => {
        navigation.navigate("DoctorInfo", { doctor, openSchedule : true})
    }

    const handleFavoriteDoctor = (id) => {
        dispatch(toggleFavorite(id))
    }

    const filteredDoctors = useMemo(() => {
        switch (activeFilter) {
            case filterIndex.AZ:
                return [...doctors].sort((a, b) => a.name.localeCompare(b.name))
            case filterIndex.RATING:
                return [...doctors].sort((a, b) => b.rating - a.rating)
            case filterIndex.FAVORITE:
                return doctors.filter(doctor => doctor.favorite)
            case filterIndex.MALE:
                return doctors.filter(doctor => doctor.gender.toLowerCase() === 'male')
            case filterIndex.FEMALE:
                return doctors.filter(doctor => doctor.gender.toLowerCase() === 'female')
            case filterIndex.ALL:
            default:
                return [...doctors]
        }
    }, [activeFilter, doctors])


    const renderDefaultCard = (item) => (
        <View style={styles.defaultCard}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.defaultAvatar}
            />
            <View style={styles.defaultInfo}>
                <Text style={styles.defaultName}>{item.name}</Text>
                <Text style={styles.defaultSpecialization}>{item.specialization}</Text>
                <View style={styles.defaultOtherAction}>
                    <View style={styles.defaultBtnContainer}>
                        <Button
                            varient="primary"
                            text="Info"
                            style={styles.defaultInfoBtn}
                            onPress={() => viewInfo(item)}
                            textStyle={styles.buttonText}
                        />
                    </View>
                    <View style={styles.defaultIconContainer}>
                        <TouchableOpacity style={styles.defaultCardCircleButton}>
                            <CalenderIcon style={styles.defaultIconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.defaultCardCircleButton}>
                            <InfoIcon style={styles.defaultIconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.defaultCardCircleButton}>
                            <QuestionIcon style={styles.defaultIconStyle} />
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.defaultCardCircleButton}
                            onPress={() => handleFavoriteDoctor(item.id)}    
                        >
                            {item.favorite ? <FilledHeart style={styles.defaultIconStyle} /> : <EmptyHeart style={styles.defaultIconStyle} />}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )

    const renderRatingCard = (item) => (
        <View style={styles.ratingCard}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.ratingAvatar}
            />
            <View style={styles.ratingDetailsContainer}>
                <View style={styles.ratingRatingContainer}>
                    <View style={styles.ratingBlueCircleButton}>
                        <StarIconWhite height={10} width={10} />
                    </View>
                    <Text style={styles.ratingInfoText}>Professional Doctor</Text>
                    <View style={styles.ratingInfoChipRating}>
                        {item.rating === 5 ? (
                            <FilledStar height={12} width={12} />
                        ) : (
                            <EmptyStar height={12} width={12} />
                        )}
                        <Text style={styles.ratingInfoText}>{' '}{item.rating}</Text>
                    </View>
                </View>
                <View style={styles.ratingNameContainer}>
                    <Text numberOfLines={1} style={styles.ratingName}>{item.name}</Text>
                    <Text style={styles.ratingSpecialization}>{item.specialization}</Text>
                </View>
                <View style={styles.ratingBottomRow}>
                    <View style={styles.ratingBtnContainer}>
                        <Button
                            varient="primary"
                            text="Info"
                            style={styles.ratingInfoBtn}
                            onPress={() => viewInfo(item)}
                            textStyle={styles.buttonText}
                        />
                    </View>
                    <View style={styles.ratingIconContainer}>
                        <View style={styles.ratingCardCircleButton}>
                            <CalenderIcon />
                        </View>
                        <View style={styles.ratingCardCircleButton}>
                            <InfoIcon />
                        </View>
                        <View style={styles.ratingCardCircleButton}>
                            <QuestionIcon />
                        </View>
                        <View style={styles.ratingCardCircleButton}>
                            {item.favorite ? <FilledHeart /> : <EmptyHeart />}
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )

    const renderFavoriteDoctorCard = (item) => (
        <View style={styles.favoriteCard}>
            <Image
                source={{ uri: item.avatar }}
                style={styles.favoriteAvatar}
            />
            <View style={styles.favoriteDetailsContainer}>
                <View style={styles.favoriteRatingContainer}>
                    <View style={styles.favoriteBlueCircleButton}>
                        <StarIconWhite height={10} width={10} />
                    </View>
                    <Text style={styles.favoriteInfoText}>Professional Doctor</Text>
                </View>
                <View style={styles.favoriteNameContainer}>
                    <View style={styles.favoriteNameSection}>
                        <Text numberOfLines={1} style={styles.favoriteName}>{item.name}</Text>
                        <Text style={styles.favoriteSpecialization}>{item.specialization}</Text>
                    </View>
                    <View style={styles.favoriteFavoriteSection}>
                        <FilledHeart height={16} width={18} />
                    </View>
                </View>
                <View style={styles.favoriteBottomRow}>
                    <Button
                        varient="primary"
                        text="Make Appointment"
                        style={styles.favoriteBtnMakeAppointment}
                        onPress={() => bookAppointment(item)}
                        textStyle={styles.buttonText}
                    />
                </View>
            </View>
        </View>
    )

    const renderFavoriteServiceCard = (item) => (
        <View>
            <View style={styles.serviceBar}>
                <View style={styles.serviceFavoriteIcon}>
                    <HeartWhite width={20} height={20} />
                </View>
                <View style={styles.service}>
                    <Text style={styles.serviceSpecialization}>{item.specialization}</Text>
                </View>
                <TouchableOpacity
                    style={styles.serviceDownBtn}
                    onPress={() => handleOpenService(item.id)}
                >
                    <DownIcon width={14} height={8} />
                </TouchableOpacity>
            </View>
            {openServiceId === item.id && (
                <View>
                    <View style={styles.serviceDropdown}>
                        <Text style={styles.serviceText}>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam rerum veritatis quos.
                            Excepturi voluptates est maiores perspiciatis perferendis ex voluptatum, ea laborum,
                            aliquam quibusdam, eos eaque? Sequi corrupti praesentium harum ducimus.
                        </Text>
                    </View>
                    <View style={styles.serviceDropdownBtn}>
                        <Text style={styles.serviceBtnText}>Looking Doctors</Text>
                    </View>
                </View>
            )}
        </View>
    )

    const renderItem = ({ item }) => {
        switch (activeFilter) {
            case filterIndex.RATING:
                return renderRatingCard(item)
            case filterIndex.FAVORITE:
                return favoriteTab === favTab.SERVICES
                    ? renderFavoriteServiceCard(item)
                    : renderFavoriteDoctorCard(item)
            case filterIndex.ALL:
            case filterIndex.AZ:
            case filterIndex.MALE:
            case filterIndex.FEMALE:
            default:
                return renderDefaultCard(item)
        }
    }
    if (loading) {
        return (
            <View style={styles.centerContainer}>
                <ActivityIndicator
                    size="large"
                    color={Colors.primary}
                />
                <Text style={styles.loadingText}>
                    Loading doctors...
                </Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centerContainer}>
                <Text style={styles.errorText}>
                    {error}
                </Text>
                <View style={styles.retryBtnContainer}>
                    <Button
                        text="Retry"
                        varient="primary"
                        onPress={() => dispatch(getDoctors())}
                        style={{ marginTop: 20 }}
                        textStyle={styles.buttonText}
                    />
                </View>

            </View>
        );
    }
    return (
        <SafeAreaView style={styles.parentContainer}>
            <View style={styles.container}>
                <Header
                    text={
                        activeFilter === filterIndex.RATING
                            ? "Rating"
                            : activeFilter === filterIndex.FAVORITE
                                ? "Favorite"
                                : activeFilter === filterIndex.MALE
                                    ? "Male"
                                    : activeFilter === filterIndex.FEMALE
                                        ? "Female"
                                        : "Doctor"
                    }
                />

                <View style={styles.headerRow}>
                    <Text style={styles.headerContent}>Sort By</Text>

                    <View style={styles.sortBtnContainer}>
                        <Button
                            varient="primary"
                            text="A→Z"
                            onPress={handleSortAZ}
                            style={styles.sortBtn}
                            textStyle={styles.buttonText}
                        />
                    </View>

                    <TouchableOpacity
                        style={[
                            styles.circleButton,
                            activeFilter === filterIndex.RATING && styles.activeCircleButton,
                        ]}
                        onPress={handleRatingSort}
                    >
                        <EmptyStar
                            width={activeFilter === filterIndex.RATING ? 35 : 14}
                            height={activeFilter === filterIndex.RATING ? 20 : 14}
                            color={activeFilter === filterIndex.RATING ? Colors.white : Colors.primary}
                            fill={activeFilter === filterIndex.RATING ? Colors.white : Colors.primary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.circleButton,
                            activeFilter === filterIndex.FAVORITE && styles.activeCircleButton,
                        ]}
                        onPress={handleFavoriteFilter}
                    >
                        <EmptyHeart
                            width={activeFilter === filterIndex.FAVORITE ? 20 : 12}
                            height={activeFilter === filterIndex.FAVORITE ? 18 : 12}
                            color={activeFilter === filterIndex.FAVORITE ? Colors.white : Colors.primary}
                            fill={activeFilter === filterIndex.FAVORITE ? Colors.white : Colors.primary}

                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.circleButton,
                            activeFilter === filterIndex.FEMALE && styles.activeCircleButton,
                        ]}
                        onPress={handleFemaleFilter}>
                        <FemaleIcon
                            width={activeFilter === filterIndex.FEMALE ? 35 : 14}
                            height={activeFilter === filterIndex.FEMALE ? 20 : 14}
                            color={activeFilter === filterIndex.FEMALE ? Colors.white : Colors.primary}
                            fill={activeFilter === filterIndex.FEMALE ? Colors.white : Colors.primary}
                        />
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.circleButton,
                            activeFilter === filterIndex.MALE && styles.activeCircleButton,
                        ]} onPress={handleMaleFilter}>
                        <MaleIcon
                            width={activeFilter === filterIndex.MALE ? 35 : 14}
                            height={activeFilter === filterIndex.MALE ? 20 : 14}
                            color={activeFilter === filterIndex.MALE ? Colors.white : Colors.primary}
                            fill={activeFilter === filterIndex.MALE ? Colors.white : Colors.primary}
                        />
                    </TouchableOpacity>
                </View>

                {activeFilter === filterIndex.FAVORITE && (
                    <TabSwitcher
                        tabs={favoriteTabs}
                        activeTab={favoriteTab}
                        onTabPress={setFavoriteTab}
                        containerStyle={styles.favoriteTabContainer}
                        buttonStyle={styles.favoriteTabButton}
                        buttonTextStyle={styles.favoriteTabText}
                    />
                )}

                <View style={styles.doctorsList}>
                    <FlatList
                        data={filteredDoctors}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={styles.listContainer}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Doctors

const styles = StyleSheet.create({
    parentContainer: {
        flex: 1
    },
    container: {
        backgroundColor: Colors.backgroundColor,
        flex: 1,
        fontFamily: Fonts.regular,
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
        width: scale(22),
    },
    doctorsList: {
        flex: 1,
        marginTop: verticalScale(10),
    },
    listContainer: {
        paddingHorizontal: scale(20),
        paddingTop: verticalScale(15),
        paddingBottom: verticalScale(30),
    },

    favoriteTabContainer: {
        marginHorizontal: scale(20),
        marginTop: verticalScale(15),
        marginBottom: verticalScale(12),
        width: 'auto',
    },

    defaultCard: {
        minHeight: verticalScale(110),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: verticalScale(15),
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: scale(13),
        paddingHorizontal: scale(12),
    },
    defaultAvatar: {
        width: 120,
        height: 120,
        borderRadius: 60,
        alignSelf: 'center',
    },
    defaultInfo: {
        flex: 1,
        marginLeft: scale(12),
        justifyContent: 'center',
    },
    defaultName: {
        width: scale(129),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: scale(14),
    },
    defaultSpecialization: {
        color: Colors.black,
        fontFamily: Fonts.regular,
    },
    defaultOtherAction: {
        flexDirection: 'row',
        marginTop: verticalScale(10),
        gap: scale(5),
    },
    defaultBtnContainer: {
        width: scale(48),
        height: verticalScale(22),
    },
    defaultInfoBtn: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    defaultIconContainer: {
        flexDirection: 'row',
    },
    defaultCardCircleButton: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(11),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    defaultIconStyle: {
        width: scale(22),
        height: verticalScale(22),
    },

    ratingCard: {
        flexDirection: 'row',
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: moderateScale(18),
        marginBottom: verticalScale(14),
        alignItems: 'center',
    },
    ratingAvatar: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(29),
        marginLeft: scale(10),
    },
    ratingDetailsContainer: {
        flex: 1,
        borderRadius: moderateScale(14),
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        marginLeft: scale(5),
    },
    ratingRatingContainer: {
        flexDirection: 'row',
        gap: scale(5),
        paddingVertical: verticalScale(2),
    },
    ratingBlueCircleButton: {
        height: scale(18),
        width: scale(18),
        borderRadius: scale(9),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    ratingInfoText: {
        fontSize: moderateScale(12),
        color: Colors.primary,
        fontFamily: Fonts.regular,
    },
    ratingInfoChipRating: {
        backgroundColor: Colors.white,
        borderRadius: moderateScale(12),
        paddingHorizontal: scale(8),
        paddingVertical: verticalScale(2),
        marginLeft: scale(40),
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingNameContainer: {
        backgroundColor: Colors.white,
        padding: scale(10),
        borderRadius: 13,
    },
    ratingName: {
        flex: 1,
        fontSize: moderateScale(14),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontWeight: '500',
    },
    ratingSpecialization: {
        marginTop: verticalScale(2),
        fontSize: moderateScale(11),
        color: Colors.black,
        fontFamily: Fonts.regular,
    },
    ratingBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(8),
    },
    ratingBtnContainer: {
        width: scale(48),
        height: verticalScale(22),
    },
    ratingInfoBtn: {
        width: '100%',
        height: '100%',
        paddingHorizontal: 0,
        paddingVertical: 0,
    },
    ratingIconContainer: {
        flexDirection: 'row',
        marginLeft: scale(40),
    },
    ratingCardCircleButton: {
        width: scale(20),
        height: scale(20),
        borderRadius: scale(11),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    favoriteCard: {
        flexDirection: 'row',
        backgroundColor: Colors.socialButtonBackground,
        borderRadius: moderateScale(18),
        marginBottom: verticalScale(14),
        alignItems: 'center',
    },
    favoriteAvatar: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(29),
        marginLeft: scale(10),
    },
    favoriteDetailsContainer: {
        flex: 1,
        borderRadius: moderateScale(14),
        paddingHorizontal: scale(12),
        paddingVertical: verticalScale(8),
        marginLeft: scale(5),
    },
    favoriteRatingContainer: {
        flexDirection: 'row',
        gap: scale(5),
        paddingVertical: verticalScale(2),
    },
    favoriteBlueCircleButton: {
        height: scale(18),
        width: scale(18),
        borderRadius: scale(9),
        backgroundColor: Colors.primary,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(8),
    },
    favoriteInfoText: {
        fontSize: moderateScale(12),
        color: Colors.primary,
        fontFamily: Fonts.regular,
    },
    favoriteNameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: Colors.white,
        padding: scale(10),
        borderRadius: 13,
    },
    favoriteNameSection: {
        flex: 1,
    },
    favoriteFavoriteSection: {
        justifyContent: 'center',
        marginLeft: scale(20),
    },
    favoriteName: {
        flex: 1,
        fontSize: moderateScale(14),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontWeight: '500',
    },
    favoriteSpecialization: {
        marginTop: verticalScale(2),
        fontSize: moderateScale(11),
        color: Colors.black,
        fontFamily: Fonts.regular,
    },
    favoriteBottomRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: verticalScale(8),
    },
    favoriteBtnMakeAppointment: {
        height: verticalScale(20),
    },
    serviceBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.primary,
        borderRadius: moderateScale(22),
        paddingHorizontal: scale(16),
        paddingVertical: verticalScale(12),
        marginBottom: verticalScale(14),
    },
    serviceFavoriteIcon: {
        marginRight: scale(12),
        justifyContent: 'center',
        alignItems: 'center',
    },
    service: {
        flex: 1,
        justifyContent: 'center',
    },
    serviceSpecialization: {
        color: Colors.white,
        fontSize: moderateScale(16),
        fontFamily: Fonts.semiBold,
    },
    serviceDownBtn: {
        width: scale(28),
        height: scale(28),
        borderRadius: scale(14),
        backgroundColor: Colors.white,
        justifyContent: 'center',
        alignItems: 'center',
    },
    serviceDropdown: {
        backgroundColor: Colors.socialButtonBackground,
        marginHorizontal: scale(10),
        marginTop: verticalScale(10),
        marginBottom: verticalScale(8),
        padding: moderateScale(25),
        borderRadius: moderateScale(18),
    },
    serviceDropdownBtn: {
        backgroundColor: Colors.socialButtonBackground,
        marginHorizontal: scale(10),
        marginTop: verticalScale(5),
        marginBottom: verticalScale(22),
        padding: moderateScale(10),
        borderRadius: moderateScale(21),
    },
    serviceText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.regular,
        color: Colors.black,
        marginBottom: verticalScale(5),
    },
    serviceBtnText: {
        alignSelf: 'center',
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: moderateScale(20),
    },
    activeCircleButton: {
        backgroundColor: Colors.primary
    },
    centerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.backgroundColor,
    },

    loadingText: {
        marginTop: verticalScale(12),
        color: Colors.primary,
        fontFamily: Fonts.medium,
        fontSize: moderateScale(15),
    },
    retryBtnContainer: {
        width: scale(100),
        height: verticalScale(20)
    },
    errorText: {
        color: 'red',
        fontSize: moderateScale(16),
        fontFamily: Fonts.medium,
        textAlign: 'center',
        paddingHorizontal: scale(20),
    },
    buttonText: {
        fontSize: FontSizes.sm,
        fontFamily: Fonts.regular
    },
    favoriteTabButton: {
        height: verticalScale(36),
        borderRadius: moderateScale(20),
    },

    favoriteTabText: {
        fontSize: moderateScale(13),
        fontFamily: Fonts.medium,
    }
})