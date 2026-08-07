import { moderateScale, scale, verticalScale } from "react-native-size-matters";

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
    vxxl:verticalScale(24),
    vxxxl:verticalScale(32),
    vxxxxl:verticalScale(54),

    mxs: moderateScale(4),
    msm: moderateScale(8),
    mmd: moderateScale(12),
    mlg: moderateScale(16),
    mxl: moderateScale(20),
    mxxl:moderateScale(24),
    mxxxl:moderateScale(32),
    mxxxxl:moderateScale(54),

    //padding
    vspb30:verticalScale(30),

    //margin

    //border width
    bw1p5:1.5,


    // height values
    cardHeight:210,
    h42 : verticalScale(42),
    h40:verticalScale(40),
    h78:verticalScale(78),
    h72 : verticalScale(72),
    h60:verticalScale(60),


    //width values
    w10:scale(10),
    w40:scale(40),
    w42:scale(42),
    w60:scale(60),

    //percentage values
    fullWidth:'100%',
    cardChipWidth:scale(38),
    cardInputWidth:'47%',

    //zero values
    zero:0
};

export default Spacing;