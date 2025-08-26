import Colors from "@/src/theme/colors";
import { normalize } from "@/src/utils/responsiveness/responsiveness";
import { Image } from "expo-image";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const GridCard = ({
  label,
  imageSrc,
  onPress,
}: {
  label: string;
  imageSrc: any;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.cardContainer}
    >
      <View style={[styles.imageBox, styles.cardElevation]}>
        <Image 
          source={imageSrc} 
          contentFit="cover" 
          style={styles.grid_image} 
        />
        <View style={styles.imageOverlay} />
      </View>
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
    flex: 1,
    alignItems: 'center',
    gap: normalize(6),
  },
  imageBox: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: normalize(16),
    overflow: "hidden",
    position: 'relative',
    borderWidth: 0.5,
    borderColor: Colors.divider,
    backgroundColor: Colors.white,
  },
  cardElevation: {
    boxShadow: "1px 1px 10px rgba(226, 226, 226, 0.4)",
  },
  grid_image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  textContainer: {
    width: '100%',
    paddingHorizontal: normalize(8),
  },
  grid_text: {
    fontSize: normalize(14),
    fontFamily: "Poppins-SemiBold",
    textAlign: "center",
    color: Colors.textSecondaryDark,
    lineHeight: normalize(18),
  },
});

export default GridCard;