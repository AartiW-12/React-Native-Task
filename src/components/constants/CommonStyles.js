import { verticalScale } from "react-native-size-matters";

const { StyleSheet } = require("react-native");

const CommonStyles = StyleSheet.create({
    flex1 : {
        flex: 1
    },
    paddBottom : {
        paddingBottom:verticalScale(30)
    },
    flexGrow1 : {
        flexGrow: 1
    }
})

export default CommonStyles