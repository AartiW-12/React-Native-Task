import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';

import {moderateScale, scale, verticalScale} from 'react-native-size-matters';

import Colors from '../style/Colors';
import Fonts from '../style/Fonts';
import Button from '../button/Button';

// SVG
import EmptyHeart from '../../assets/images/svg/EmptyHeart.svg';
import CalenderIcon from '../../assets/images/svg/CalenderIcon.svg';
import InfoIcon from '../../assets/images/svg/InfoIcon.svg';
import QuestionIcon from '../../assets/images/svg/QuestionIcon.svg';

const RenderDoctor = ({
  item,
  onInfoPress,
  onCalendarPress,
  onDetailsPress,
  onQuestionPress,
  onFavoritePress,
}) => {
  return (
    <View style={styles.card}>
      <Image source={item.avatar} style={styles.avatar} />

      <View style={styles.info}>
        <Text style={styles.name}>{item.name}</Text>

        <Text style={styles.specialization}>
          {item.specialization}
        </Text>

        <View style={styles.otherAction}>
          <View style={styles.btnContainer}>
            <Button
              varient="primary"
              text="Info"
              style={styles.infoBtn}
              onPress={() => onInfoPress?.(item)}
            />
          </View>

          <View style={styles.iconContainer}>
            <TouchableOpacity
              style={styles.cardCircleButton}
              onPress={() => onCalendarPress?.(item)}>
              <CalenderIcon style={styles.iconStyle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardCircleButton}
              onPress={() => onDetailsPress?.(item)}>
              <InfoIcon style={styles.iconStyle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardCircleButton}
              onPress={() => onQuestionPress?.(item)}>
              <QuestionIcon style={styles.iconStyle} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cardCircleButton}
              onPress={() => onFavoritePress?.(item)}>
              <EmptyHeart style={styles.iconStyle} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RenderDoctor;

const styles = StyleSheet.create({
  card: {
    minHeight: verticalScale(110),
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(15),
    backgroundColor: Colors.socialButtonBackground,
    borderRadius: scale(13),
    paddingHorizontal: scale(12),
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },

  info: {
    flex: 1,
    marginLeft: scale(12),
    justifyContent: 'center',
  },

  name: {
    width: scale(129),
    color: Colors.primary,
    fontFamily: Fonts.medium,
    fontSize: scale(14),
  },

  specialization: {
    color: Colors.black,
    fontFamily: Fonts.regular,
  },

  otherAction: {
    flexDirection: 'row',
    marginTop: verticalScale(10),
    gap: scale(5),
  },

  btnContainer: {
    width: scale(48),
    height: verticalScale(22),
  },

  infoBtn: {
    width: '100%',
    height: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
  },

  iconContainer: {
    flexDirection: 'row',
  },

  cardCircleButton: {
    width: scale(20),
    height: scale(20),
    borderRadius: scale(11),
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: scale(8),
  },

  iconStyle: {
    width: scale(22),
    height: verticalScale(22),
  },
});