import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import Colors from "@/src/theme/colors";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";


const SpendFrequencyGraph = ({ expenses }: { expenses: any[] }) => {
  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    value: 0,
    visible: false,
  });
  const {t} = useTranslation()
  const days = [t("Sun"), t("Mon"), t("Tue"), t("Wed"), t("Thu"), t("Fri"), t("Sat")];

  const [chartData, setChartData] = useState<number[]>([0, 0, 0, 0, 0, 0, 0]);

  useEffect(() => {
    if (!expenses || expenses.length === 0) return;

    const weeklySpend: number[] = [0, 0, 0, 0, 0, 0, 0]; // Sun to Sat

    expenses.forEach((expense) => {
      const dayIndex = dayjs(expense.createdAt).day(); // 0 (Sun) - 6 (Sat)
      weeklySpend[dayIndex] += expense.amount || 0;
    });

    setChartData(weeklySpend);
  }, [expenses]);

  if (!expenses || expenses.length === 0) return null;

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.label}>{t("Spend Frequency")}</Text>
      </View>

      <LineChart
        data={{
          labels: days,
          datasets: [
            {
              data: chartData,
              color: () => Colors.greyBg,
            },
          ],
        }}
        width={Dimensions.get("window").width - scale(16)}
        height={180}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(104, 93, 250, ${opacity})`,
          labelColor: () => "#333",
          propsForDots: {
            r: "3.5",
            stroke: Colors.primaryCyanColor,
            fill: Colors.primaryCyanColor,
          },
          fillShadowGradientFrom: "#86baa1",
          fillShadowGradientTo: "#86baa1",
          fillShadowGradientFromOpacity: 1,
        }}
        withShadow={true}
        bezier
        style={{
          marginVertical: verticalScale(12),
          borderRadius: 16,
        }}
        onDataPointClick={(data) => {
          let isSamePoint = tooltipPos.x === data.x && tooltipPos.y === data.y;

          setTooltipPos((prev) => ({
            x: data.x,
            y: data.y,
            value: data.value,
            visible: !isSamePoint || !prev.visible,
          }));
        }}
        decorator={() => {
          return tooltipPos.visible ? (
            <View
              style={{
                position: "absolute",
                top: tooltipPos.y - 30,
                left: tooltipPos.x - 40,
                backgroundColor: "#fff",
                paddingHorizontal: 6,
                paddingVertical: 2,
                borderRadius: 6,
                borderWidth: 1,
                borderColor: Colors.divider,
              }}
            >
              <Text style={{ fontSize: 12, color: Colors.textSecondaryDark }}>
                ₹{tooltipPos.value}
              </Text>
            </View>
          ) : null;
        }}
      />
    </View>
  );
};

export default SpendFrequencyGraph;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
  },
  label: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    marginBottom: verticalScale(8),
    color: Colors.textSecondaryDark,
  },
});
