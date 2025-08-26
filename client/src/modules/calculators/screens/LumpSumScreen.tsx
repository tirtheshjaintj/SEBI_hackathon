import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { LineChart } from "react-native-chart-kit";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import {
  moderateScale,
  normalize,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import { useTranslation } from "react-i18next";

const LumpSumScreen = () => {
  const { t } = useTranslation();
  const [investmentAmount, setInvestmentAmount] = useState(100000);
  const [expectedReturn, setExpectedReturn] = useState(12);
  const [investmentPeriod, setInvestmentPeriod] = useState(10);
  const [showAllYears, setShowAllYears] = useState(false);

  // Calculate future value
  const calculateFutureValue = () => {
    const futureValue =
      investmentAmount * Math.pow(1 + expectedReturn / 100, investmentPeriod);
    return isFinite(futureValue) ? futureValue : 0;
  };

  const calculateTotalReturns = () => {
    return calculateFutureValue() - investmentAmount;
  };

  const generateChartData = () => {
    const labels = [];
    const data = [];

    const screenWidth = Dimensions.get("window").width - 40;
    const minLabelWidth = 40;
    const maxLabels = Math.floor(screenWidth / minLabelWidth);

    let labelInterval = Math.ceil(investmentPeriod / maxLabels);
    if (labelInterval < 1) labelInterval = 1;

    for (let year = 0; year <= investmentPeriod; year++) {
      const value = investmentAmount * Math.pow(1 + expectedReturn / 100, year);
      data.push(value);

      if (
        year === 0 ||
        year === investmentPeriod ||
        year % labelInterval === 0
      ) {
        labels.push(
          year === 0
            ? t("Start")
            : year === investmentPeriod
            ? t("End")
            : `${t("Year")} ${year}`
        );
      } else {
        labels.push("");
      }
    }

    return {
      labels,
      datasets: [
        {
          data,
          color: () => Colors.primaryCyanColor,
        },
      ],
    };
  };

  const [tooltipPos, setTooltipPos] = useState({
    x: 0,
    y: 0,
    visible: false,
    value: 0,
    label: "",
  });

  const chartData = generateChartData();
  const futureValue = calculateFutureValue();
  const totalReturns = calculateTotalReturns();

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  };

  return (
    <LinearGradient
      colors={["#ffffffff", "#ffffffff"]}
      style={styles.container}
    >
      <AppSafeAreaView style={{ flex: 1 }}>
        <CommonToolbar title={t("Lump Sum Calculator")} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Growth Chart */}
          <View style={styles.chartCard}>
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 40}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              yAxisInterval={investmentPeriod > 10 ? 2 : 1}
              chartConfig={{
                backgroundColor: "#ffffff",
                backgroundGradientFrom: "#f9f9f9",
                backgroundGradientTo: "#f9f9f9",
                decimalPlaces: 0,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                propsForDots: {
                  r: "4",
                  strokeWidth: "2",
                },
                propsForLabels: {
                  fontSize: 10,
                },
              }}
              bezier
              style={styles.chart}
              withHorizontalLabels={true}
              withVerticalLabels={true}
              segments={4}
              onDataPointClick={(data) => {
                setTooltipPos({
                  x: data.x,
                  y: data.y,
                  value: data.value,
                  label:
                    data.index === 0
                      ? t("Invested")
                      : `${t("Year")} ${data.index}`,
                  visible: true,
                });
                setTimeout(
                  () => setTooltipPos((prev) => ({ ...prev, visible: false })),
                  1000
                );
              }}
            />

            {/* Tooltip */}
            {tooltipPos.visible && (
              <View
                style={[
                  styles.tooltip,
                  { left: tooltipPos.x - 50, top: tooltipPos.y - 60 },
                ]}
              >
                <Text style={styles.tooltipText}>{t(tooltipPos.label)}</Text>
                <Text style={styles.tooltipValue}>
                  {formatCurrency(tooltipPos.value)}
                </Text>
              </View>
            )}
          </View>
          {/* Input Card */}
          <View style={styles.card}>
            {/* Investment Amount */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Investment Amount")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={investmentAmount.toString()}
                  onChangeText={(text) =>
                    setInvestmentAmount(Number(text) || 0)
                  }
                />
                <Text style={styles.currency}>₹</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={10000000}
                step={1000}
                value={investmentAmount}
                // onValueChange={setInvestmentAmount}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(val) => setInvestmentAmount(val)}
              />
            </View>

            {/* Expected Return */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Expected Return (p.a)")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={expectedReturn.toString()}
                  onChangeText={(text) => setExpectedReturn(Number(text) || 0)}
                />
                <Text style={styles.currency}>%</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={30}
                step={0.5}
                value={expectedReturn}
                // onValueChange={setExpectedReturn}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(val) => setExpectedReturn(val)}
              />
            </View>

            {/* Investment Period */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Investment Period")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={investmentPeriod.toString()}
                  onChangeText={(text) =>
                    setInvestmentPeriod(Number(text) || 0)
                  }
                />
                <Text style={styles.currency}>{t("Yr")}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={30}
                step={1}
                value={investmentPeriod}
                // onValueChange={setInvestmentPeriod}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(val) => setInvestmentPeriod(val)}
              />
            </View>
          </View>
          {/* Results Card */}
          <AppLinearGradient
            colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
            style={[styles.card, styles.resultsCard]}
          >
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t("Invested Amount")}</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(investmentAmount)}
              </Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t("Estimated Returns")}</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(totalReturns)}
              </Text>
            </View>

            <View style={[styles.resultRow, styles.totalRow]}>
              <Text style={[styles.resultLabel, styles.totalLabel]}>
                {t("Total Value")}
              </Text>
              <Text style={[styles.resultValue, styles.totalValue]}>
                {formatCurrency(futureValue)}
              </Text>
            </View>
          </AppLinearGradient>
          {/* Yearly Breakdown */}

          <View style={styles.card}>
            <Text style={styles.breakdownTitle}>{t("Yearly Growth")}</Text>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownHeaderText}>{t("Year")}</Text>
              <Text style={styles.breakdownHeaderText}>{t("Value")}</Text>
              <Text style={styles.breakdownHeaderText}>{t("Returns")}</Text>
            </View>

            {showAllYears
              ? [...Array(investmentPeriod)].map((_, index) => {
                  const year = index + 1;
                  const value =
                    investmentAmount * Math.pow(1 + expectedReturn / 100, year);
                  const returns = value - investmentAmount;

                  return (
                    <View key={year} style={styles.breakdownRow}>
                      <Text style={styles.breakdownCell}>
                        {t("Year")} {year}
                      </Text>
                      <Text style={styles.breakdownCell}>
                        {formatCurrency(value)}
                      </Text>
                      <Text
                        style={[
                          styles.breakdownCell,
                          { color: Colors.primaryCyanColor },
                        ]}
                      >
                        +{formatCurrency(returns)}
                      </Text>
                    </View>
                  );
                })
              : [...Array(Math.min(5, investmentPeriod))].map((_, index) => {
                  const year = index + 1;
                  const value =
                    investmentAmount * Math.pow(1 + expectedReturn / 100, year);
                  const returns = value - investmentAmount;

                  return (
                    <View key={year} style={styles.breakdownRow}>
                      <Text style={styles.breakdownCell}>
                        {t("Year")} {year}
                      </Text>
                      <Text style={styles.breakdownCell}>
                        {formatCurrency(value)}
                      </Text>
                      <Text
                        style={[
                          styles.breakdownCell,
                          { color: Colors.primaryCyanColor },
                        ]}
                      >
                        +{formatCurrency(returns)}
                      </Text>
                    </View>
                  );
                })}

            {investmentPeriod > 5 && (
              <TouchableOpacity
                onPress={() => setShowAllYears(!showAllYears)}
                style={styles.moreYearsButton}
              >
                <Text style={styles.moreYearsText}>
                  {showAllYears
                    ? t("Show less")
                    : `+ ${investmentPeriod - 5} ${t("more years")}`}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </AppSafeAreaView>
    </LinearGradient>
  );
};

// Reuse the same styles from LoanEmiScreen
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: moderateScale(16),
    gap: verticalScale(16),
  },
  chartCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(8),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: verticalScale(3),
  },
  chart: {
    borderRadius: 16,
    marginVertical: 8,
  },
  tooltip: {
    position: "absolute",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 100,
    alignItems: "center",
  },
  tooltipText: {
    fontSize: 12,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Medium",
  },
  tooltipValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Bold",
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
    marginBottom: verticalScale(8),
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: verticalScale(3),
  },
  inputGroup: {
    marginBottom: verticalScale(8),
    gap: verticalScale(8),
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    fontFamily: "Poppins-SemiBold",
    color: Colors.textSecondaryDark,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: moderateScale(10),
    paddingHorizontal: moderateScale(16),
  },
  input: {
    flex: 1,
    height: verticalScale(45),
    fontSize: normalize(16),
    fontFamily: "Quicksand-Medium",
    color: Colors.textSecondaryDark,
  },
  currency: {
    fontSize: moderateScale(15),
    fontFamily: "Quicksand-Medium",
    color: Colors.textSecondaryDark,
  },
  slider: {
    width: "100%",
    height: verticalScale(40),
  },
  resultsCard: {},
  resultRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(12),
    paddingBottom: verticalScale(12),
    borderBottomWidth: 0.5,
    borderBottomColor: Colors.divider,
  },
  totalRow: {
    borderBottomWidth: 0,
    marginBottom: 0,
    paddingBottom: 0,
  },
  resultLabel: {
    fontSize: moderateScale(16),
    fontFamily: "Quicksand-Medium",
    color: "white",
  },
  resultValue: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    fontFamily: "Quicksand-Bold",
    color: "white",
  },
  totalLabel: {
    fontSize: moderateScale(17),
    fontFamily: "Quicksand-Medium",
    color: "white",
  },
  totalValue: {
    fontSize: moderateScale(17),
    fontFamily: "Quicksand-Bold",
    color: Colors.darkYellow,
  },
  breakdownTitle: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    color: Colors.textSecondaryDark,
    marginBottom: verticalScale(12),
  },
  breakdownRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  breakdownCell: {
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Medium",
    color: Colors.textSecondaryDark,
    flex: 1,
    textAlign:"center"
  },
  moreYearsButton: {
    padding: 8,
    alignItems: "center",
  },
  moreYearsText: {
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Medium",
    color: Colors.primaryCyanColor,
    textAlign: "center",
  },
  breakdownHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
    paddingBottom: verticalScale(8),
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  breakdownHeaderText: {
    fontSize: moderateScale(12),
    fontFamily: "Poppins-SemiBold",
    color: Colors.textSecondaryDark,
    flex: 1,
    textAlign: "center",
  },
});

export default LumpSumScreen;
