import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import Colors from "../style/Colors";
import Fonts from "../style/Fonts";
import FontSizes from "../style/FontSize";
import Spacing from "../style/Spacing";

const { StyleSheet } = require("react-native");

const CommonStyles = StyleSheet.create({
    flex1: {
        flex: 1
    },
    paddBottom: {
        paddingBottom: Spacing.vspb30
    },
    flexGrow1: {
        flexGrow: 1
    },
    centerContainer: {
        flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    emptyList : {
        justifyContent:'center', 
        alignSelf:'center',
        paddingVertical:150, 
        fontFamily:Fonts.medium, 
        fontSize:FontSizes.xl, 
        color:Colors.danger
    },
    emptyListText : {
        fontFamily:Fonts.medium,
        fontSize:FontSizes.md,
        color:Colors.danger,
        alignSelf:'center',
        paddingVertical:Spacing.xxl
    }
})

export default CommonStyles