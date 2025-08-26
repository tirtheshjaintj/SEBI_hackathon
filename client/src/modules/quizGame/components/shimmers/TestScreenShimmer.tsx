import React from "react";
import { StyleSheet, View } from "react-native";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import Shimmer from "@/src/components/shimmer/Shimmer";

const TestScreenShimmer = () => {
  return (
    <View style={styles.container}>
      {/* Top navigation (Prev - Index - Next) */}
      <View style={styles.topNav}>
        <Shimmer style={styles.circle} />
        <Shimmer style={styles.indexBar} />
        <Shimmer style={styles.circle} />
      </View>

      {/* Question box */}
      <Shimmer style={styles.questionBox} />

      {/* Option placeholders */}
      {[...Array(4)].map((_, index) => (
        <Shimmer key={index} style={styles.optionBox} />
      ))}

      {/* Question navigation dots */}
      <View style={styles.dotRow}>
        {[...Array(6)].map((_, index) => (
          <Shimmer key={index} style={styles.dot} />
        ))}
      </View>

      {/* Submit button */}
      <Shimmer style={styles.submitBtn} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: moderateScale(16),
    flex: 1,
    gap: 8,
    justifyContent: "space-between",
  },
  topNav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  circle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginBottom: verticalScale(16),
  },
  indexBar: {
    width: 60,
    height: 16,
    borderRadius: 8,
  },
  questionBox: {
    height: verticalScale(80),
    borderRadius: 12,
    marginBottom: verticalScale(20),
  },
  optionBox: {
    height: verticalScale(48),
    borderRadius: 10,
    marginBottom: verticalScale(12),
  },
  dotRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
    marginTop: verticalScale(20),
    marginBottom: verticalScale(16),
  },
  dot: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  submitBtn: {
    marginTop: verticalScale(50),
    height: verticalScale(48),
    borderRadius: 12,
  },
});

export default TestScreenShimmer;
