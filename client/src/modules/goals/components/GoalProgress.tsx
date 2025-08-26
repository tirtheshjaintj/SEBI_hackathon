import Colors from "@/src/theme/colors";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "react-native-paper";

interface GoalProgressProps {
  percent: number;
  color :string
}

export default function GoalProgress({ percent ,color}: GoalProgressProps) {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        {t("Progress")}: {percent.toFixed(1)}%
      </Text>
      <ProgressBar
        progress={percent / 100}
        color={color ??Colors.darkYellow}
        style={styles.bar}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 6,
  },
  label: {
    fontSize: 13,
    marginBottom: 4,
    color: "#555",
  },
  bar: {
    height: 8,
    borderRadius: 8,
    backgroundColor: "#e0e0e0",
  },
});
