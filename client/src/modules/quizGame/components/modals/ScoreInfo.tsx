import React from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import Colors from "@/src/theme/colors"; // adjust path if needed
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { useTranslation } from "react-i18next";

interface Props {
  correct: number;
  total: number;
  points: number;
  levelUp: boolean;
}

const ScoreInfo = ({ correct, total, points, levelUp }: Props) => {
  const percent = parseInt(((correct / total) * 100).toFixed(0));
  const {t} = useTranslation()

  return (
    <View style={styles.wrapper}>
      {/* Header */}
      <Text style={styles.title}>🎉 {t("Quiz Completed!")}</Text>

      {/* Score Section */}
      <View style={styles.scoreBox}>
        <Text style={styles.scoreText}>{t("Correct Answers")}</Text>
        <Text style={styles.scoreValue}>
          {correct}/{total}
        </Text>
        <Text style={styles.percentText}>{percent}% {t("Accuracy")}</Text>
      </View>

      {/* Points Earned */}
      <View style={styles.pointsBox}>
        <Text style={styles.pointsLabel}>{t("Points Earned")}</Text>
        <Text style={styles.pointsValue}>+{points}</Text>
      </View>

      {/* Level Up */}
      {levelUp && (
        <View style={styles.levelUpBox}>
          <Text style={styles.levelUpText}>🚀 {t("You Leveled Up!")}</Text>
        </View>
      )}

      {/* Footer */}
      <Text style={styles.footerText}>
        {t("Reattempted questions will not affect your points.")}
        {percent >= 80
          ? t("Awesome work! You're mastering this topic.")
          : percent >= 50
          ? t("Good job! Keep practicing to improve.")
          : t("Don't worry, try again and you'll do better!")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: "#fff",
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(18),
    fontFamily: "Poppins-Bold",
    color: Colors.primaryCyanColor,
    marginBottom: verticalScale(12),
  },
  scoreBox: {
    alignItems: "center",
    marginBottom: verticalScale(16),
  },
  scoreText: {
    fontSize: 14,
    color: Colors.textSecondaryDark,
    fontFamily: "Poppins-Medium",
  },
  scoreValue: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: Colors.primaryCyanColor,
  },
  percentText: {
    fontSize: 14,
    color: Colors.green,
    fontFamily: "Poppins-Medium",
  },
  pointsBox: {
    backgroundColor: Colors.primaryCyanColor,
    padding: moderateScale(10),
    borderRadius: 12,
    marginBottom: verticalScale(12),
    width: "60%",
    alignItems: "center",
  },
  pointsLabel: {
    fontSize: 12,
    color: "#fff",
    fontFamily: "Quicksand-Regular",
  },
  pointsValue: {
    fontSize: 20,
    fontFamily: "Poppins-Bold",
    color: "#fff",
  },
  levelUpBox: {
    backgroundColor: Colors.darkYellow,
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 16,
    marginBottom: verticalScale(10),
  },
  levelUpText: {
    color: "#fff",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },
  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Medium",
    marginTop: verticalScale(10),
  },
});

export default ScoreInfo;
