import React from "react";
import { useTranslation } from "react-i18next";
import { Text, View, StyleSheet, Dimensions, ActivityIndicator } from "react-native";
import { LineChart } from "react-native-chart-kit";

const ExpenseChart = ({
  labels,
  data,
  loading,
  total,
}: {
  labels: string[];
  data: number[];
  loading: boolean;
  total: number;
}) => {
  const {t} = useTranslation()
  if (loading) return <ActivityIndicator size="large" color="#007AFF" style={{ marginTop: 24 }} />;

  if (!labels.length || !data.length)
    return <Text style={styles.noData}>{t("No data available to display.")}</Text>;

  return (
    <View style={{ marginTop: 24 }}>
      <Text style={styles.total}>{t("Total Expense")}: ₹{total}</Text>
      <LineChart
        data={{ labels, datasets: [{ data }] }}
        width={Dimensions.get("window").width - 32}
        height={220}
        yAxisLabel="₹"
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: () => "#333",
          propsForDots: {
            r: "6",
            strokeWidth: "2",
            stroke: "#007AFF",
          },
        }}
        bezier
        style={{ borderRadius: 16, marginTop: 8 }}
        renderDotContent={({ x, y, index }) => (
          <Text
            key={index}
            style={{
              position: "absolute",
              top: y - 24,
              left: x - 10,
              fontSize: 10,
              color: "#333",
              fontWeight: "500",
            }}
          >
            ₹{data[index]}
          </Text>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  total: {
    fontSize: 16,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 8,
  },
  noData: {
    textAlign: "center",
    marginTop: 24,
    color: "#666",
  },
});

export default ExpenseChart;
