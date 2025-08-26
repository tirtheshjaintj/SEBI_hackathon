import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "@/src/theme/colors";
import { moderateScale } from "@/src/utils/responsiveness/responsiveness";
import { useTranslation } from "react-i18next";

const OrDivider = () => {
  const {t} = useTranslation()
  return (
    <View style={styles.orContainer}>
      <View style={styles.dividerLine} />
      <View style={styles.orBadge}>
        <Text style={styles.orText}>{t("OR")}</Text>
      </View>
      <View style={styles.dividerLine} />
    </View>
  );
};

const styles = StyleSheet.create({
  orContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dividerLine: {
    flex: 1,
    borderWidth: 0.3,
    borderColor: Colors.divider,
  },
  orBadge: {
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
  },
  orText: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Medium",
  },
});

export default OrDivider;
