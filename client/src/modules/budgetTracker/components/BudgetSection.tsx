import Colors from "@/src/theme/colors";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { EvilIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Svg, Circle, G } from "react-native-svg";
import { categoriesWithIcons } from "../constants/budget";
import { useTranslation } from "react-i18next";

interface ExpenseItem {
  category: string;
  amount: number | string;
  [key: string]: any;
}

interface BudgetData {
  cycle: string;
  totalIncome: number;
  totalExpenses: number;
  expenses: ExpenseItem[];
}

interface Props {
  data: BudgetData | null;
  handleSetBudget: () => void;
}

interface ChartSegment {
  category: string;
  amount: number;
  color: string;
  percentage: number;
}

const BalanceSection = ({ data, handleSetBudget }: Props) => {
  const {t} = useTranslation()
  const chartData = React.useMemo<ChartSegment[]>(() => {
    if (!data || !data.expenses || data.expenses.length === 0) return [];

    const aggregated = data.expenses.reduce((acc: ChartSegment[], expense) => {
      const amount =
        typeof expense.amount === "string"
          ? parseFloat(expense.amount)
          : expense.amount;

      const existing = acc.find(
        (item) => item.category.toLowerCase() === expense.category.toLowerCase()
      );

      if (existing) {
        existing.amount += amount;
      } else {
        acc.push({
          category: expense.category,
          amount: amount,
          color:
            categoriesWithIcons.find(
              (c) => c.label.toLowerCase() === expense.category.toLowerCase()
            )?.color || "#808080",
          percentage: 0,
        });
      }
      return acc;
    }, []);

    return aggregated
      .map((item) => ({
        ...item,
        percentage: (item.amount / data.totalExpenses) * 100,
      }))
      .sort((a, b) => b.amount - a.amount);
  }, [data]);

  if (!data) return null;

  const spentPercent =
    data.totalIncome > 0
      ? ((data.totalExpenses / data.totalIncome) * 100).toFixed(0)
      : "0";

  const chartSize = moderateScale(150);
  const strokeWidth = moderateScale(12);
  const radius = (chartSize - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const leftLegends = chartData.slice(0, Math.ceil(chartData.length / 2));
  const rightLegends = chartData.slice(Math.ceil(chartData.length / 2));

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={styles.label}>{t("Total")} {t(data?.cycle)} {t("Balance")}</Text>
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
        <Text style={styles.balance}>
          {" "}
          ₹{data.totalIncome.toLocaleString()}
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={handleSetBudget}>
          <EvilIcons name="plus" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.chartWrapper}>
        <View style={styles.legendColumn}>
          {leftLegends.map((item, index) => (
            <View key={`left-${index}`} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText} numberOfLines={1}>
                {t(item.category)}
              </Text>
              <Text style={styles.legendAmount}>
                ₹{item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>

        <View style={styles.chartContainer}>
          {/* Outer Ring - Spending by Category */}
          <Svg width={chartSize} height={chartSize}>
            <G rotation="-90" origin={`${chartSize / 2}, ${chartSize / 2}`}>
              {/* Background circle */}
              <Circle
                cx={chartSize / 2}
                cy={chartSize / 2}
                r={radius}
                stroke={Colors.divider}
                strokeWidth={strokeWidth}
                fill="transparent"
              />

              {/* Segments for each category */}
              {
                chartData.reduce(
                  (acc, item, index) => {
                    const strokeDashoffset =
                      circumference - (circumference * item.percentage) / 100;
                    const startAngle = acc.accumulatedAngle;
                    const angle = (item.percentage / 100) * 360;
                    acc.accumulatedAngle += angle;

                    acc.components.push(
                      <Circle
                        key={index}
                        cx={chartSize / 2}
                        cy={chartSize / 2}
                        r={radius}
                        stroke={item.color}
                        strokeWidth={strokeWidth}
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                        fill="transparent"
                        origin={`${chartSize / 2}, ${chartSize / 2}`}
                        rotation={startAngle}
                      />
                    );
                    return acc;
                  },
                  { accumulatedAngle: 0, components: [] as any }
                ).components
              }
            </G>
          </Svg>

          <Svg
            width={chartSize * 0.7}
            height={chartSize * 0.7}
            style={styles.innerRing}
          >
            <G
              rotation="-90"
              origin={`${chartSize * 0.35}, ${chartSize * 0.35}`}
            >
              <Circle
                cx={chartSize * 0.35}
                cy={chartSize * 0.35}
                r={(chartSize * 0.7 - strokeWidth) / 2}
                stroke={Colors.divider}
                strokeWidth={strokeWidth * 0.8}
                fill="transparent"
              />
              <Circle
                cx={chartSize * 0.35}
                cy={chartSize * 0.35}
                r={(chartSize * 0.7 - strokeWidth) / 2}
                stroke={Colors.primaryCyanColor}
                strokeWidth={strokeWidth * 0.8}
                strokeDasharray={
                  2 * Math.PI * ((chartSize * 0.7 - strokeWidth) / 2)
                }
                strokeDashoffset={
                  2 *
                  Math.PI *
                  ((chartSize * 0.7 - strokeWidth) / 2) *
                  (1 - Number(spentPercent) / 100)
                }
                strokeLinecap="round"
                fill="transparent"
              />
            </G>
          </Svg>

          {/* Center text */}
          <View style={styles.centerText}>
            <Text style={styles.percentText}>{spentPercent}%</Text>
            <Text style={styles.spentText}>{t("Spent")}</Text>
          </View>
        </View>

        {/* Right Legends */}
        <View style={styles.legendColumn}>
          {rightLegends.map((item, index) => (
            <View key={`right-${index}`} style={styles.legendItem}>
              <View
                style={[styles.legendColor, { backgroundColor: item.color }]}
              />
              <Text style={styles.legendText} numberOfLines={1}>
                {t(item.category)}
              </Text>
              <Text style={styles.legendAmount}>
                ₹{item.amount.toLocaleString()}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Total Expenses at Bottom */}
      <Text style={styles.totalExpenses}>
        {t("Total Spent")}: ₹{data.totalExpenses.toLocaleString()}
      </Text>
    </View>
  );
};

export default BalanceSection;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: moderateScale(16),
  },
  label: {
    fontSize: moderateScale(12),
    color: Colors.textSecondaryDark,
    marginBottom: verticalScale(4),
  },
  balance: {
    fontSize: moderateScale(28),
    fontFamily: "Quicksand-Bold",
    color: Colors.textSecondaryDark,
    marginBottom: verticalScale(8),
  },
  chartWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: verticalScale(10),
    width: "100%",
  },
  chartContainer: {
    width: moderateScale(150),
    height: moderateScale(150),
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginHorizontal: moderateScale(8),
  },
  innerRing: {
    position: "absolute",
  },
  centerText: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  percentText: {
    fontSize: moderateScale(24),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
  },
  spentText: {
    fontSize: moderateScale(12),
    color: Colors.textSecondaryLight,
    marginTop: -4,
  },
  legendColumn: {
    flex: 1,
    maxWidth: "30%",
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: verticalScale(4),
    paddingHorizontal: moderateScale(4),
  },
  legendColor: {
    width: moderateScale(12),
    height: moderateScale(12),
    borderRadius: moderateScale(6),
    marginRight: moderateScale(6),
  },
  legendText: {
    flex: 1,
    fontSize: moderateScale(10),
    color: Colors.textSecondaryDark,
    marginRight: moderateScale(4),
  },
  legendAmount: {
    fontSize: moderateScale(10),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
  },
  totalExpenses: {
    fontSize: moderateScale(14),
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-SemiBold",
    marginTop: verticalScale(8),
  },
});
