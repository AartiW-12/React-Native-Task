import { scale, verticalScale } from "react-native-size-matters";

const Spacing = {
    xs: scale(4),
    sm: scale(8),
    md: scale(12),
    lg: scale(16),
    xl: scale(20),
    xxl: scale(24),
    xxxl: scale(32),
    xxxxl:scale(54),


    vxs: verticalScale(4),
    vsm: verticalScale(8),
    vmd: verticalScale(12),
    vlg: verticalScale(16),
    vxl: verticalScale(20),

    cardHeight:210,

    //percentage values
    fullWidth:'100%',
    cardChipWidth:scale(38),
    cardInputWidth:'47%',

    //zero values
    zero:0
};

export default Spacing;