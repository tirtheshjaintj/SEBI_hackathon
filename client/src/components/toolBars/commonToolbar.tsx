import Colors from "@/src/theme/colors";
import { normalize } from "@/src/utils/responsiveness/responsiveness";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
  ColorValue,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface Props {
  title: string;
  onBackPress?: () => void;
  backgroundColor?: ColorValue;
  textColor?: ColorValue;
  shadow?: boolean;
}

const CommonToolbar = ({
  title,
  onBackPress,
  backgroundColor = Colors.white,
  textColor = Colors.darkBlack,
  shadow = true,
}: Props) => {
  const handleBack = () => {
    if (onBackPress) {
      onBackPress();
    } else {
      router.back();
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          boxShadow: shadow ? "2px 3px 20px rgba(226, 226, 226, 0.5)" : "none",
        },
      ]}
    >
      <View style={[styles.toolbar, { backgroundColor }]}>
        <TouchableOpacity onPress={handleBack}>
          <Feather name="arrow-left" size={24} color={textColor ?? "black"} />
        </TouchableOpacity>

        <Text style={[styles.title, { color: textColor }]} numberOfLines={1}>
          {title ?? ""}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: normalize(16),
    boxShadow: "2px 3px 20px rgba(226, 226, 226, 0.5)",
    zIndex: 10,
  },
  toolbar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    backgroundColor: Colors.white,
  },

  title: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Poppins-SemiBold",
  },
});

export default CommonToolbar;
