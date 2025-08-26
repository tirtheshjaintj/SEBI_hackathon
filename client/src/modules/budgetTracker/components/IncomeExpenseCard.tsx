// components/Budget/IncomeExpenseCards.tsx
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Colors from "@/src/theme/colors";
import { moderateScale } from "@/src/utils/responsiveness/responsiveness";
import { useTranslation } from "react-i18next";

interface Props {
  income: number;
  expenses: number;
}

const IncomeExpenseCards = ({ income, expenses }: Props) => {
  const {t} = useTranslation()
  return (
    <View style={styles.row}>
      <View style={[styles.card, { backgroundColor: Colors.greenLight }]}>
        <Ionicons
          name="arrow-up-circle-outline"
          size={24}
          color={Colors.green}
        />
        <Text style={styles.label}>{t("Income")}</Text>
        <Text style={styles.amount}>₹{income}</Text>
      </View>

      <View style={[styles.card, { backgroundColor: Colors.lightPink }]}>
        <Ionicons
          name="arrow-down-circle-outline"
          size={24}
          color={Colors.redLight}
        />
        <Text style={[styles.label, { color: Colors.redLight }]}>{t("Expenses")}</Text>
        <Text style={[styles.amount, { color: Colors.redLight }]}>₹{expenses}</Text>
      </View>
    </View>
  );
};

export default IncomeExpenseCards;

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: moderateScale(12),
    marginBottom: moderateScale(16),
    paddingHorizontal: moderateScale(16),
  },
  card: {
    flex: 1,
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    alignItems: "center",
  },
  label: {
    color: Colors.green,
    fontSize: moderateScale(12),
    marginTop: 4,
  },
  amount: {
    color: Colors.green,
    fontSize: moderateScale(18),
    fontWeight: "700",
    marginTop: 4,
  },
});
