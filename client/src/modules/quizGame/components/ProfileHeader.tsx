import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { FontAwesome6 } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { Circle } from "react-native-svg";
import QuizToolBar from "./QuizToolBar";
import useAuthStore from "@/src/store/authSlice";
import { userAvatar } from "@/src/utils/user/user";
import { useTranslation } from "react-i18next";

const ProfileHeader = ({data}:{data?:any}) => {
  const { user } = useAuthStore((state) => state);
    const { t  } = useTranslation();
  // console.log(user);
  const progress = user?.level/data?.length; // % to next level

  const RADIUS = 50;
  const STROKE_WIDTH = 6;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);

  return (
    <View style={styles.container}>
      <QuizToolBar  />

      {/* Background Icon */}
      <FontAwesome6
        style={styles.icon}
        name="question"
        size={250}
        color={Colors.primaryCyanColor}
      />

      {/* Profile Section with Blur */}
      <View style={styles.profile_section}>
        <BlurView intensity={20} tint="light" style={styles.blur_container}>
          <View style={styles.blur_overlay} />

          {/* Circular Progress + Avatar */}
          <View style={styles.avatar_progress_wrapper}>
            <Svg width={120} height={120}>
              <Circle
                cx={60}
                cy={60}
                r={RADIUS}
                stroke={Colors.primaryCyanColor}
                strokeWidth={STROKE_WIDTH}
                fill="none"
              />
              <Circle
                cx={60}
                cy={60}
                r={RADIUS}
                stroke={"#fb8b24"}
                strokeWidth={STROKE_WIDTH}
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                transform={`rotate(-90 60 60)`}
              />
            </Svg>
            <View style={styles.avatar_inner}>
              <Image
                source={{
                  uri: user?.avatar ?? userAvatar,
                }}
                style={[styles.avatar_image, {}]}
              />
            </View>
          </View>

          <Text
            style={[
              styles.progress_text,
              {
                fontSize: 14,
                fontFamily: "Poppins-SemiBold",
                lineHeight: 20,
                position: "absolute",
                bottom: verticalScale(4),
                left: scale(25),
                // right: 0,
                // textAlign: "center",
              },
            ]}
          >
            {user?.name}
          </Text>

          {/* Level */}
          <Text style={[styles.level_number]}>{user.level}</Text>

          {/* Details */}
          <View>
            <Text style={[styles.level_text]}>{t("Lv")}</Text>
            <View style={styles.points_row}>
              <Image
                source={require("@/assets/images/global/sheild.png")}
                style={{ width: 30, height: 30 }}
                contentFit="cover"
              />
              <Text style={styles.points_text}>{user.points}</Text>
            </View>
            <Text style={styles.progress_text}>
              {t("Score")} {user.level < 10 ? "50%" : "75%"} {t("to next level")}
            </Text>
          </View>
        </BlurView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: verticalScale(300),
  },
  icon: {
    position: "absolute",
    top: verticalScale(0),
    right: moderateScale(16),
    opacity: 0.08,
  },
  profile_section: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  blur_container: {
    width: "88%",
    height: verticalScale(170),
    borderRadius: moderateScale(30),
    overflow: "hidden",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    position: "relative",
  },
  blur_overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: moderateScale(30),
  },
  avatar_progress_wrapper: {
    width: moderateScale(120),
    height: moderateScale(120),
    justifyContent: "center",
    alignItems: "center",
  },
  avatar_inner: {
    position: "absolute",
    width: 90,
    height: 90,
    borderRadius: 45,
    overflow: "hidden",
  },
  avatar_image: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.white,
  },
  level_number: {
    position: "absolute",
    right: moderateScale(100),
    top: verticalScale(18),
    fontSize: moderateScale(40),
    color: Colors.primaryCyanColor,
    fontFamily: "Poppins-Bold",
  },
  level_text: {
    fontSize: moderateScale(18),
    fontFamily: "Quicksand-Bold",
    color: Colors.primaryCyanColor,
    opacity: 0.9,
  },
  points_row: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  points_text: {
    fontSize: moderateScale(16),
    color: Colors.yellow,
    fontFamily: "Quicksand-Bold",
  },
  progress_text: {
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Medium",
    color: Colors.textSecondaryVeryLight,
    marginTop: 2,
  },
});

export default ProfileHeader;
