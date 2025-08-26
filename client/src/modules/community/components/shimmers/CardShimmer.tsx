 import Shimmer from "@/src/components/shimmer/Shimmer";
import React from "react";
import { StyleSheet, View } from "react-native";
 
const CardShimmer = () => {
  return (
    <View style={styles.container}>
      <Shimmer style={styles.video} />
      <View style={styles.textWrapper}>
        <Shimmer style={styles.title} />
        <Shimmer style={styles.subtitle} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 10,
  },
  video: {
    height: 200,
    borderRadius: 8,
  },
  textWrapper: {
    gap: 6,
  },
  title: {
    height: 16,
    width: "70%",
    borderRadius: 4,
  },
  subtitle: {
    height: 12,
    width: "50%",
    borderRadius: 4,
  },
});

export default CardShimmer;
