import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/theme/colors";
import { useTranslation } from "react-i18next";

const StreakModal = ({
  visible,
  currentStreak,
}: {
  visible: boolean;
  currentStreak: number;
}) => {
  const { t } = useTranslation();
  if (!visible) return null;

  return (
    <View style={styles.container}>
      {/* Header with Flame Icon */}
      <View style={styles.header}>
        <Ionicons name="flame" size={36} color="#FF9500" />
        <Text style={styles.title}>{t("Streak Updated")}!</Text>
      </View>

      {/* Streak Count */}
      <View style={styles.streakContainer}>
        <Text style={styles.streakNumber}>{currentStreak}</Text>
        <Text style={styles.streakLabel}>
          {currentStreak === 1 ? t("Day") : t("Days")} {t("streak")}
        </Text>
      </View>

      {/* Motivational Message */}
      <Text style={styles.message}>
        {currentStreak > 1
          ? t("You're on a {{count}}-day streak! Keep it going!", {
              count: currentStreak,
            })
          : t("Great start! Come back tomorrow to continue your streak.")}
      </Text>

      {/* Progress Bar */}
      <View style={styles.progressBarBackground}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${Math.min(100, (currentStreak / 7) * 100)}%`,
            },
          ]}
        />
      </View>

      {/* Next Milestone */}
      <Text style={styles.milestoneText}>
        {currentStreak < 7
          ? t("{{count}} more days until weekly milestone", {
              count: 7 - currentStreak,
            })
          : t("Weekly milestone achieved! 🎉")}
      </Text>
    </View>
  );
};

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  overlay: {},
  container: {
    width: width * 0.85,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontFamily: "Quicksand-Bold",
    color: "#FF9500",
    marginLeft: 6,
  },
  streakContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    marginBottom: 16,
  },
  streakNumber: {
    fontSize: 52,
    fontWeight: "900",
    color: "#FF5E00",
    marginRight: 8,
  },
  streakLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#6B6B6B",
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    fontFamily: "Quicksand-Medium",
    color: Colors.textSecondaryDark,
    marginBottom: 24,
    lineHeight: 20,
  },
  progressBarBackground: {
    height: 8,
    width: "100%",
    backgroundColor: "#F0F0F0",
    borderRadius: 4,
    marginBottom: 16,
    overflow: "hidden",
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#FF9500",
    borderRadius: 4,
  },
  milestoneText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF5E00",
    textAlign: "center",
  },
});

export default StreakModal;
