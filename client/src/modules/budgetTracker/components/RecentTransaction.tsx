import { moderateScale, verticalScale } from "@/src/utils/responsiveness/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { categoriesWithIcons } from "../constants/budget";
import { formatTime } from "@/src/utils/datetime/datetime";
import Colors from "@/src/theme/colors";
import { useTranslation } from "react-i18next";

interface Props {
  expenses: {
    category: string;
    description: string;
    amount: string;
    createdAt: string;
  }[];
}

const RecentTransactions = ({ expenses }: Props) => {
  const {t} = useTranslation()
  // Calculate total expenses
  const totalExpenses = React.useMemo(() => {
    return expenses.reduce((total, expense) => {
      return total + parseFloat(expense.amount || '0');
    }, 0);
  }, [expenses]);


  return (
    <View style={styles.container}>
      {expenses && expenses.length > 0 && (
        <Text style={styles.heading}>{t("Recent Transactions")}</Text>
      )}
      {expenses && expenses.length > 0 && expenses.map((item, index) => {
        const match = categoriesWithIcons.find(
          (cat) => cat.label.toLowerCase() === item.category.toLowerCase()
        );
        const icon = match?.icon || "apps-outline";
        const color = match?.color || "#808080";
        const amount = parseFloat(item.amount || '0');
        const percentage = totalExpenses > 0 ? (amount / totalExpenses) * 100 : 0;

        return (
          <View key={index}>
            <View style={styles.row}>
              <View style={[styles.iconWrapper, { backgroundColor: color + "22", borderRadius: moderateScale(8) }]}>
                <Ionicons name={icon as any} size={20} color={color} />
              </View>
              <View style={styles.details}>
                <Text style={styles.label}>
                  {t(item.category.charAt(0).toUpperCase() + item.category.slice(1))}
                </Text>
                <Text style={styles.desc}>{item.description}</Text>
              </View>
              <View style={styles.meta}>
                <Text style={styles.amount}>₹{item.amount}</Text>
                <Text style={styles.time}>
                  {formatTime({ date: new Date(item.createdAt) })}
                </Text>
              </View>
            </View>
            {/* Progress line */}
            <View style={styles.progressContainer}>
              <View 
                style={[
                  styles.progressBar,
                  { 
                    width: `${percentage}%`,
                    backgroundColor: Colors.darkYellow 
                  }
                ]}
              />
            </View>
          </View>
        );
      })}
      {expenses && expenses.length === 0 && (
        <Text
          style={[
            styles.heading,
            { textAlign: "center", color: Colors.textSecondaryLight },
          ]}
        >
          {t("No recent transactions")}
        </Text>
      )}
    </View>
  );
};

export default RecentTransactions;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    paddingBottom: 24,
  },
  heading: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    marginVertical: 12,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 0.5,
    borderBottomColor: "#ddd",
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  details: {
    flex: 1,
  },
  label: {
    fontWeight: "600",
    fontSize: moderateScale(14),
  },
  desc: {
    color: "#777",
    fontSize: 12,
  },
  meta: {
    alignItems: "flex-end",
  },
  amount: {
    fontWeight: "700",
    color: "#FF4C4C",
  },
  time: {
    color: "#999",
    fontSize: 12,
  },
  progressContainer: {
    height: verticalScale(5),
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    borderRadius: 3,
  },
});