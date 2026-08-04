import React from 'react';

import { View, Text, TouchableOpacity, SectionList, StyleSheet, } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import Header from '../components/header/Header';

import Colors from '../components/style/Colors';
import Fonts from '../components/style/Fonts';
import FontSizes from '../components/style/FontSize';

// SVG
import CalenderIcon from '../assets/images/svg/CalenderIconWhite.svg';
import NotesIcon from '../assets/images/svg/NotesIcon';
import HistoryIcon from '../assets/images/svg/HistoryIcon';
import { moderateScale, verticalScale } from 'react-native-size-matters';


// Data

const notificationSections = [
  {
    title: 'Today',
    data: [
      {
        id: '1',
        title: 'Scheduled Appointment',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        time: '2 M',
        icon: CalenderIcon,
        highlighted: false,
      },
      {
        id: '2',
        title: 'Scheduled Change',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        time: '2 H',
        icon: CalenderIcon,
        highlighted: true,
      },
      {
        id: '3',
        title: 'Medical Notes',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        time: '3 H',
        icon: NotesIcon,
        highlighted: false,
      },
      {
        id: '6',
        title: 'Prescription Reminder',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore.',
        time: '5 H',
        icon: NotesIcon,
        highlighted: false,
      },
    ],
  },
  {
    title: 'Yesterday',
    data: [
      {
        id: '4',
        title: 'Scheduled Appointment',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '1 D',
        icon: CalenderIcon,
        highlighted: false,
      },
      {
        id: '7',
        title: 'Lab Report Available',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '1 D',
        icon: HistoryIcon,
        highlighted: true,
      },
    ],
  },
  {
    title: '15 April',
    data: [
      {
        id: '5',
        title: 'Medical History Update',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '5 D',
        icon: HistoryIcon,
        highlighted: false,
      },
      {
        id: '8',
        title: 'Follow-up Reminder',
        description:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        time: '5 D',
        icon: CalenderIcon,
        highlighted: false,
      },
    ],
  },
];
const Notifications = () => {
  const renderNotification = ({ item }) => {
    const Icon = item.icon;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        style={[
          styles.notificationCard,
          item.highlighted && styles.highlightedCard,
        ]}
      >
        <View style={styles.iconContainer}>
          <Icon width={20} height={20} />
        </View>
        <View style={styles.contentContainer}>
          <Text
            numberOfLines={1}
            style={styles.notificationTitle}
          >
            {item.title}
          </Text>
          <Text
            numberOfLines={2}
            style={styles.description}
          >
            {item.description}
          </Text>
        </View>
        <Text style={styles.time}>
          {item.time}
        </Text>
      </TouchableOpacity>
    );
  };
  const renderSectionHeader = ({ section }) => (
    <View style={styles.sectionTitleContainer}>
      <Text style={styles.sectionTitle}>
        {section.title}
      </Text>
    </View>
  );
  return (
    <SafeAreaView style={styles.container}>
      <Header
        text="Notification"
        titleStyle={{ color: Colors.primary }}
        rightComponent={
          <View style={styles.newsContainer}>
            <Text style={styles.newsText}>News</Text>
            <View style={styles.dot} />
          </View>
        }
      />
      <View style={styles.markContainer}>
        <Text style={styles.markText}>
          Mark all
        </Text>
      </View>
      <SectionList
        sections={notificationSections}
        keyExtractor={(item) => item.id}
        renderItem={renderNotification}
        renderSectionHeader={renderSectionHeader}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>

  );
};
export default Notifications;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(12),
  },
  newsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(6),
    gap: moderateScale(6),
  },
  newsText: {
    fontFamily: Fonts.regular,
    fontSize: FontSizes.md,
    color: Colors.black,
  },
  dot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: 999,
    backgroundColor: Colors.primary,
  },


  markContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: moderateScale(20),
    paddingVertical:verticalScale(10)
  },

  markText: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.md,
    color: Colors.primary,
  },


  listContainer: {
    paddingHorizontal: moderateScale(20),
    paddingBottom: moderateScale(20),
  },


  sectionTitleContainer: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    borderRadius: 999,
    paddingHorizontal: moderateScale(14),
    paddingVertical: moderateScale(6),
    marginBottom: moderateScale(12),
    marginTop: moderateScale(10),
  },

  sectionTitle: {
    fontFamily: Fonts.medium,
    fontSize: FontSizes.xxl,
    color: Colors.primary,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.backgroundColor,
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: moderateScale(10),
  },
  highlightedCard: {
    backgroundColor: Colors.primaryLight,
  },
  iconContainer: {
    width: moderateScale(42),
    height: moderateScale(42),
    borderRadius: 999,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  contentContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontFamily: Fonts.semiBold,
    fontSize: FontSizes.xl,
    color: Colors.black,
    marginBottom: moderateScale(4),
  },
  description: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    lineHeight: FontSizes.sm * 1.4,
  },
  time: {
    fontFamily: Fonts.light,
    fontSize: FontSizes.sm,
    color: Colors.textSecondary,
    marginLeft: moderateScale(8),
  },
});