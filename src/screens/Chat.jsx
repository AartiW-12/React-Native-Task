import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Colors from "../components/style/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

import ScheduleCall from '../assets/images/svg/CallIcon.svg'
import ScheduleVideoCall from '../assets/images/svg/VideoCallIcon.svg'
import FileSelector from '../assets/images/svg/FileSelector.svg'
import MikeIcon from '../assets/images/svg/MikeIcon.svg'
import SendIcon from '../assets/images/svg/SendIcon.svg'
import Fonts from "../components/style/Fonts";
import FontSizes from "../components/style/FontSize";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useNavigation, useRoute } from "@react-navigation/native";
import Spacing from "../components/style/Spacing";

const initialMessages = [
  {
    id: 1,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sender: "doctor",
    time: "09:00",
  },
  {
    id: 2,
    text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    sender: "user",
    time: "09:30",
  },
  {
    id : 3,
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sit suscipit consectetur quam repudiandae asperiores tenetur consequuntur quaerat explicabo qui.",
    sender: "doctor",
    time:"10:00"
  },
  {
    id : 4,
    text:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Error sit suscipit consectetur quam repudiandae asperiores tenetur consequuntur quaerat explicabo qui.",
    sender: "user",
    time:"11:30"
  }
];


export default function Chat() {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");

  const navigation = useNavigation()
  const route = useRoute()

  const doctor = route?.params?.doctor

  const sendMessage = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setMessage("");

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, amet?",
          sender: "doctor",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === "user"
          ? styles.userContainer
          : styles.doctorContainer,
      ]}
    >
      <View
        style={[
          styles.bubble,
          item.sender === "user"
            ? styles.userBubble
            : styles.doctorBubble,
        ]}
      >
        <Text style={styles.message}>{item.text}</Text>
      </View>

      <Text
        style={[
          styles.time,
          item.sender === "user"
            ? { alignSelf: "flex-end" }
            : { alignSelf: "flex-start" },
        ]}
      >
        {item.time}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backArrow}>{'‹'}</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{doctor.name}</Text>

        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerIcon}>
            <ScheduleCall
              width={18}
              height={18}
              stroke={Colors.primary}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.headerIcon}>
            <ScheduleVideoCall
              width={18}
              height={18}
              stroke={Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ padding: 20 }}
      />

      <View style={styles.bottomContainer}>

        <TouchableOpacity style={styles.socialCircleButton}>
          <FileSelector
            width={20}
            height={20}
            stroke={Colors.primary}
          />
        </TouchableOpacity>

        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Write Here..."
            placeholderTextColor={Colors.inputBackground}
            value={message}
            onChangeText={setMessage}
            style={styles.input}
          />

          <TouchableOpacity style={styles.micButton}>
            <MikeIcon
              width={13}
              height={21}
              stroke={Colors.primary}
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.sendButton}
          onPress={sendMessage}
        >
          <SendIcon
            width={17}
            height={17}
            stroke={Colors.white}
          />
        </TouchableOpacity>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.screenBackground,
  },
  messageContainer: {
    marginBottom: Spacing.vlg,
  },
  doctorContainer: {
    alignItems: "flex-start",
  },
  userContainer: {
    alignItems: "flex-end",
  },
  bubble: {
    maxWidth: "75%",
    padding: scale(12),
    borderRadius: moderateScale(16),
  },
  doctorBubble: {
    backgroundColor: Colors.inputBackground,
    borderTopLeftRadius: 0,
  },
  userBubble: {
    backgroundColor: Colors.socialButtonBackground,
    borderTopRightRadius: 0,
  },
  message: {
    fontSize: FontSizes.md,
    color: Colors.black,
    fontFamily:Fonts.medium
  },
  time: {
    marginTop: moderateScale(4),
    fontSize: FontSizes.sm,
    fontFamily:Fonts.regular,
    color: Colors.paymentText,
  },
  textInput: {
    flex: 1,
    height: verticalScale(42),
    color: Colors.black,
  },
  micButton: {
    paddingLeft: scale(8),
  },
  blueCircleButton: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    height: verticalScale(78),
    backgroundColor: Colors.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 18,
  },

  backArrow: {
    color: Colors.white,
    fontSize: FontSizes.arrowSize,
  },

  headerTitle: {
    flex: 1,
    marginLeft: scale(20),
    color: Colors.white,
    fontSize: FontSizes.xl,
    fontFamily:Fonts.semiBold,
    fontSize:FontSizes.xxl
  },

  headerActions: {
    flexDirection: "row",
  },

  headerIcon: {
    width: scale(34),
    height: verticalScale(34),
    borderRadius: moderateScale(17),
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: scale(10),
  },

  bottomContainer: {
    height:verticalScale(72),
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.socialButtonBackground,
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(10),
    marginBottom:scale(20)
  },

  socialCircleButton: {
    width: scale(40),
    height: verticalScale(40),
    borderRadius: moderateScale(20),
    backgroundColor: Colors.inputBackground,
    justifyContent: "center",
    alignItems: "center",
  },

  inputWrapper: {
    flex: 1,
    height: verticalScale(42),
    marginHorizontal: scale(10),
    borderRadius: moderateScale(22),
    backgroundColor: Colors.white,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: scale(15),
  },

  input: {
    flex: 1,
    color: Colors.black,
  },

  micButton: {
    paddingHorizontal: scale(12),
  },

  sendButton: {
    width: scale(42),
    height: verticalScale(42),
    borderRadius: moderateScale(21),
    backgroundColor: Colors.primary,
    justifyContent: "center",
    alignItems: "center",
  },
});