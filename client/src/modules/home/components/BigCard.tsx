import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";

interface BigCardProps {
  title: string;
  duration: string;
  bgColor: string;
  image: string;
  onPress?: () => void;
}

const BigCard: React.FC<BigCardProps> = ({
  title,
  duration,
  bgColor,
  image,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: bgColor }]}
      activeOpacity={0.8}
      onPress={onPress}
    >
      <Image
        source={{ uri: image }}
        style={styles.image}
        resizeMode="contain"
      />

      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    borderRadius: 16,
    padding: 12,
    marginRight: 16,
  },
  image: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  footerText: {
    marginLeft: 4,
    fontSize: 13,
    color: "#000",
  },
});

export default BigCard;
