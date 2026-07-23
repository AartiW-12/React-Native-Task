import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'

//import all SVG's 
import HomeIcon from '../../assets/images/svg/Home.svg'
import ChatIcon from '../../assets/images/svg/ChatIcon.svg'
import ProfileIcon from '../../assets/images/svg/ProfileIcon'
import CalenderIcon from '../../assets/images/svg/CalenderIcon.svg'

const BottomNavigation = () => {
    return (
        <View style={styles.bottomBar}>
            <TouchableOpacity style={styles.bottomIconButton}>
                <HomeIcon style={styles.iconStyle}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomIconButton}>
                <ChatIcon style={styles.iconStyle}/>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.bottomIconButton,
                    styles.activeBottomIcon,
                ]}>
                <ProfileIcon style={styles.iconStyle}/>
            </TouchableOpacity>

            <TouchableOpacity style={styles.bottomIconButton}>
                <CalenderIcon style={styles.iconStyle} />
            </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    bottomBar : {
        
    },

})
export default BottomNavigation