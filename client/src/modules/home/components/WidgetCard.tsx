import { scale } from "@/src/utils/responsiveness/responsiveness";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

const WidgetCard = ({
  label,
  icon,
  img,
  backgroundColor,
  onPress,
}: {
  label: string;
  icon?: any;
  backgroundColor?: string;
  img?: any;
  onPress?: () => void;
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={styles.container}
    >
      <Image
        source={img}
        contentFit="cover"
        style={[styles.iconContainer, { backgroundColor }]}
      />

      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  iconContainer: {
    height: scale(65),
    width: scale(65),
    borderRadius: 12, // smaller radius like screenshot
    justifyContent: "center",
    alignItems: "center",
    aspectRatio: 1,
    // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  label: {
    fontSize: 12,
    color: "#222",
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
  },
});

export default WidgetCard;
