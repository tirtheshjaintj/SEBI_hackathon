import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { AnimatedCircularProgress } from "react-native-circular-progress";

const BudgetWidget = ({ data }: any) => {
  const { t } = useTranslation();

  const totalBudget = data?.totalBudget ?? 0;
  const spent = data?.totalSpent ?? 0;
  const remaining = totalBudget - spent;
  const fill = (spent / totalBudget) * 100;

  return (
    <AppLinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.white, Colors.white]}
      style={styles.widgetContainer}
    >
      {/* Title */}
      <Text style={styles.balanceText}>{t("Balance")}</Text>

      {/* Circular Progress */}
      <AnimatedCircularProgress
        size={moderateScale(100)}
        width={10}
        fill={fill}
        tintColor={remaining > 1000 ? Colors.primaryCyanColor : Colors.redDark}
        backgroundColor="#ccc"
        backgroundWidth={6}
        arcSweepAngle={240}
        rotation={240}
        lineCap="round"
        style={styles.graph}
      >
        {() => (
          <View style={{ alignItems: "center" }}>
            <Text style={styles.amountText}>
              ₹ {remaining.toLocaleString()}
            </Text>
            <Text style={styles.spentText}>
              {t("Spent")} ₹ {spent.toLocaleString()}
            </Text>
          </View>
        )}
      </AnimatedCircularProgress>

      {/* Footer Label */}
      <Text style={styles.label}>{t("Monthly Budget")}</Text>
    </AppLinearGradient>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    flex: 1,
    height: verticalScale(170),
    borderRadius: moderateScale(16),
    padding: moderateScale(16),
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  balanceText: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(14),
    fontFamily: "Quicksand-SemiBold",
  },
  graph: {
    marginTop: verticalScale(4),
  },
  amountText: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(16),
    fontFamily: "Poppins-Bold",
  },
  spentText: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(10),
    fontFamily: "Quicksand-Regular",
    marginTop: 2,
  },
  label: {
    fontSize: moderateScale(12),
    position: "absolute",
    bottom: verticalScale(10),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
  },
});

export default BudgetWidget;
