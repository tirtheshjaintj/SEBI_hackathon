import Shimmer from "@/src/components/shimmer/Shimmer";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");
const BOX_WIDTH = (width - moderateScale(16 * 3)) / 2;

const QuizLevelShimmerCard = () => {
  return (
    <View style={styles.cardWrapper}>
      <View style={styles.card}>
        <Shimmer style={styles.badge} />
        <Shimmer style={styles.text} />
        <Shimmer style={styles.questionBar} />
        <Shimmer style={styles.progressBar} />
        <Shimmer style={styles.progressLabel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: BOX_WIDTH,
    height: verticalScale(180),
    position: "relative",
    marginBottom: moderateScale(20),
  },
  card: {
    flex: 1,
    backgroundColor: "#f0f0f0",
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    gap: moderateScale(8),
    justifyContent: "space-between",
  },
  badge: {
    width: scale(55),
    height: scale(55),
    borderRadius: scale(28),
    alignSelf: "center",
    marginBottom: moderateScale(10),
  },
  text: {
    height: moderateScale(14),
    borderRadius: 4,
    backgroundColor: "#ccc",
  },
  questionBar: {
    width: "60%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
  },
  progressBar: {
    height: moderateScale(6),
    backgroundColor: "#ccc",
    borderRadius: 3,
    width: "100%",
  },
  progressLabel: {
    width: "50%",
    height: 10,
    borderRadius: 5,
    backgroundColor: "#ccc",
    alignSelf: "center",
  },
});

export default QuizLevelShimmerCard;
