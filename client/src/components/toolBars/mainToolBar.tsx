import useAuthStore from "@/src/store/authSlice";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  normalize,
  scale,
} from "@/src/utils/responsiveness/responsiveness";
import { userAvatar } from "@/src/utils/user/user";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { ParamListBase } from "@react-navigation/native";
import { router, useNavigation } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface Props {
  rightIcon?: any;
  backgroundColor?: string;
  textColor?: string;
  streak?: boolean;
}

const CustomToolbar = ({
  backgroundColor,
  textColor,
  rightIcon = false,
  streak = true,
}: Props) => {
  const { t } = useTranslation();
  const navigation = useNavigation<DrawerNavigationProp<ParamListBase>>();
  const user = useAuthStore((state) => state.user);
  if (!user) {
    router.replace("/(onboarding)");
    return null;
  }

  const handleHamburgerPress = () => {
    navigation.openDrawer();
  };

  // console.log({user})
  return (
    <View style={[styles.toolbarContainer, { backgroundColor }]}>
      <TouchableOpacity onPress={handleHamburgerPress}>
        <Image
          source={{
            uri: user?.avatar || userAvatar,
          }} // Replace with your actual icon
          style={styles.iconImage}
          resizeMode="cover"
        />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={[styles.salutation, { color: textColor }]}>
          {t("Welcome")}
        </Text>
        <Text style={[styles.title, { color: textColor }]}>
          {(user && user?.name) || ""}
        </Text>
      </View>

      {streak && user?.streak && (
        <View style={styles.rightIconContainer}>
          <Image
            source={require("@/assets/images/global/streakFlame.png")}
            style={styles.rightIcon}
          />
          <Text
            style={{
              color: textColor,
              fontSize: 14,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {user.streak}
          </Text>
        </View>
      )}
      {rightIcon && (
        <TouchableOpacity
          onPress={() => router.push("/merchandise")}
          style={styles.rightIconContainer}
        >
          <Image
            source={require("@/assets/images/global/sheild.png")}
            style={styles.rightIcon}
          />
          <Text
            style={{
              color: textColor,
              fontSize: 14,
              fontFamily: "Poppins-SemiBold",
            }}
          >
            {user.points}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  toolbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    paddingHorizontal: moderateScale(16),
    flexShrink: 1,
    overflow: "hidden",
    gap: 10,
  },

  iconImage: {
    width: scale(40),
    height: scale(40),
    borderRadius: normalize(20),
    resizeMode: "contain",
    backgroundColor: Colors.white,
  },
  titleContainer: {
    flex: 1,
    justifyContent: "center",
  },
  salutation: {
    fontSize: 12,
    color: "#555",
  },
  title: {
    fontSize: 14,
    fontWeight: "600",
    color: "#000",
  },
  rightIconContainer: {
    alignItems: "center",
    flexDirection: "row",
    gap: 2,
  },
  rightIcon: {
    width: 25,
    height: 25,
    resizeMode: "cover",
  },
});

export default CustomToolbar;
