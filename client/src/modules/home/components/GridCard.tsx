import Colors from "@/src/theme/colors";
import { normalize } from "@/src/utils/responsiveness/responsiveness";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GridCard = ({
  label,
  onPress,
  children,
}: {
  label: string;
  onPress: () => void;
  children: React.ReactNode;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.cardContainer}
    >
      <View style={[styles.imageBox, styles.cardElevation]}>{children}</View>
      <View style={styles.textContainer}>
        <Text style={styles.grid_text} numberOfLines={2}>
          {label}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.white,
  },
  imageBox: {
    width: normalize(65),
    height: normalize(65),
    borderRadius: normalize(16),
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 0.6,
    borderColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  cardElevation: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.12,
    shadowRadius: 2,
    elevation: 3,
  },
  textContainer: {
    marginTop: normalize(6),
    paddingHorizontal: normalize(4),
  },
  grid_text: {
    fontSize: normalize(14),
    fontFamily: "Quicksand-SemiBold",
    textAlign: "center",
    color: Colors.textSecondaryDark,
    lineHeight: normalize(15),
  },
});

export default GridCard;
