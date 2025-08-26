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
// import { MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import {
  moderateScale,
  normalize,
  // scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import { useTranslation } from "react-i18next";

const LoanEmiScreen = () => {
  const { t } = useTranslation();
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTenure, setLoanTenure] = useState(20);

  const [showAllYears, setShowAllYears] = useState(false);
  // EMI calculation function
  const calculateEMI = () => {
    const monthlyRate = interestRate / 12 / 100;
    const months = loanTenure * 12;
    const emi =
      (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1);
    return isFinite(emi) ? emi : 0;
  };

  // Total interest calculation
  const calculateTotalInterest = () => {
    const emi = calculateEMI();
    const totalPayment = emi * loanTenure * 12;
    return totalPayment - loanAmount;
  };

  // Total payment calculation
  const calculateTotalPayment = () => {
    return loanAmount + calculateTotalInterest();
  };
  // Generate yearly breakdown data
  const generateYearlyBreakdown = () => {
    const breakdown = [];
    let remainingPrincipal = loanAmount;
    const monthlyRate = interestRate / 12 / 100;
    // const months = loanTenure * 12;
    const emi = calculateEMI();

    for (let year = 1; year <= loanTenure; year++) {
      let yearlyPrincipal = 0;
      let yearlyInterest = 0;

      for (let month = 1; month <= 12; month++) {
        const monthlyInterest = remainingPrincipal * monthlyRate;
        const monthlyPrincipal = emi - monthlyInterest;

        yearlyInterest += monthlyInterest;
        yearlyPrincipal += monthlyPrincipal;
        remainingPrincipal -= monthlyPrincipal;
      }

      breakdown.push({
        year,
        principal: yearlyPrincipal,
        interest: yearlyInterest,
        balance: remainingPrincipal > 0 ? remainingPrincipal : 0, // Ensure no negative values
      });
    }

    return breakdown;
  };

  const yearlyBreakdown = generateYearlyBreakdown();

  // Generate data for the chart (principal vs interest over time)
  const generateChartData = () => {
    const labels: string[] = [];
    const principalData: number[] = [];
    const interestData: number[] = [];

    // Show only 5 points for the chart (start, 25%, 50%, 75%, end)
    const intervals = [0, 0.25, 0.5, 0.75, 1];

    intervals.forEach((percent) => {
      const year = Math.floor(percent * loanTenure);
      labels.push(
        year === 0
          ? t("Start")
          : year === loanTenure
          ? t("End")
          : `${t("Year")} ${year}`
      );

      // Calculate values for this point
      let remainingPrincipal = loanAmount;
      const monthlyRate = interestRate / 12 / 100;
      // const months = loanTenure * 12;
      const emi = calculateEMI();
      let totalInterest = 0;

      for (let m = 1; m <= year * 12; m++) {
        const monthlyInterest = remainingPrincipal * monthlyRate;
        const monthlyPrincipal = emi - monthlyInterest;

        totalInterest += monthlyInterest;
        remainingPrincipal -= monthlyPrincipal;
      }

      principalData.push(loanAmount - remainingPrincipal);
      interestData.push(totalInterest);
    });

    return {
      labels,
      datasets: [
        {
          data: principalData,
          color: () => Colors.primaryCyanColor,
        },
        {
          data: interestData,
          color: () => "#e0eb9bff",
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
  const [activeDataset, setActiveDataset] = useState("");

  const chartData = generateChartData();

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  };

  const emi = calculateEMI();
  const totalInterest = calculateTotalInterest();
  const totalPayment = calculateTotalPayment();

  return (
    <LinearGradient
      colors={["#ffffffff", "#ffffffff"]}
      style={styles.container}
    >
      <AppSafeAreaView style={{ flex: 1 }}>
        <CommonToolbar title={t("Loan EMI Calculator")} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Line Chart */}
          <View style={[styles.chartCard]}>
            <LineChart
              data={chartData}
              width={Dimensions.get("window").width - 40}
              height={220}
              yAxisLabel="₹"
              yAxisSuffix=""
              yAxisInterval={2}
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
                const isFirstDataset = data.index === 0;
                setTooltipPos({
                  x: data.x,
                  y: data.y,
                  value: data.value,
                  label: isFirstDataset ? t("Principal") : t("Interest"),
                  visible: true,
                });
                setActiveDataset(
                  isFirstDataset ? t("principal") : t("interest")
                );
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
                  ₹{Math.round(tooltipPos.value).toLocaleString()}
                </Text>
              </View>
            )}

            {/* Legend */}
            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View
                  style={[
                    styles.legendColor,
                    { backgroundColor: Colors.primaryCyanColor },
                  ]}
                />
                <Text style={styles.legendText}>{t("Principal")}</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendColor, { backgroundColor: "#e0eb9bff" }]}
                />
                <Text style={styles.legendText}>{t("Interest")}</Text>
              </View>
            </View>
          </View>

          <View style={styles.card}>
            {/* Loan Amount */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Loan Amount")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={loanAmount.toString()}
                  onChangeText={(text) => setLoanAmount(Number(text) || 0)}
                />
                <Text style={styles.currency}>₹</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={100000}
                maximumValue={5000000}
                step={50000}
                value={loanAmount}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(value) =>
                  setLoanAmount(Math.round(value / 50000) * 50000)
                }
              />
            </View>

            {/* Interest Rate */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Interest Rate (p.a)")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={interestRate.toString()}
                  onChangeText={(text) => setInterestRate(Number(text) || 0)}
                />
                <Text style={styles.currency}>%</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={5}
                maximumValue={20}
                step={0.1}
                value={interestRate}
                // onValueChange={setInterestRate}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(val) => setInterestRate(val)}
              />
            </View>

            {/* Loan Tenure */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Loan Tenure")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={loanTenure.toString()}
                  onChangeText={(text) => setLoanTenure(Number(text) || 0)}
                />
                <Text style={styles.currency}>{t("Yr")}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={30}
                step={1}
                value={loanTenure}
                // onValueChange={setLoanTenure}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(value) => setLoanTenure(value)}
              />
            </View>
          </View>

          {/* Results Card */}
          <AppLinearGradient
            colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
            style={[styles.card, styles.resultsCard]}
          >
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t("Monthly EMI")}</Text>
              <Text style={styles.resultValue}>{formatCurrency(emi)}</Text>
            </View>

            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t("Total Interest")}</Text>
              <Text style={styles.resultValue}>
                {formatCurrency(totalInterest)}
              </Text>
            </View>

            <View style={[styles.resultRow, styles.totalRow]}>
              <Text style={[styles.resultLabel, styles.totalLabel]}>
                {t("Total Payment")}
              </Text>
              <Text style={[styles.resultValue, styles.totalValue]}>
                {formatCurrency(totalPayment)}
              </Text>
            </View>
          </AppLinearGradient>

          {/* Yearly Breakdown */}
          <View style={styles.card}>
            <Text style={styles.breakdownTitle}>{t("Yearly Breakdown")}</Text>
            <View style={styles.breakdownHeader}>
              <Text style={styles.breakdownHeaderText}>{t("Year")}</Text>
              <Text style={styles.breakdownHeaderText}>{t("Principal")}</Text>
              <Text style={styles.breakdownHeaderText}>{t("Interest")}</Text>
              <Text style={styles.breakdownHeaderText}>{t("Balance")}</Text>
            </View>

            {(showAllYears ? yearlyBreakdown : yearlyBreakdown.slice(0, 5)).map(
              (item) => (
                <View key={item.year} style={styles.breakdownRow}>
                  <Text style={styles.breakdownCell}>{item.year}</Text>
                  <Text style={styles.breakdownCell}>
                    {formatCurrency(item.principal)}
                  </Text>
                  <Text style={styles.breakdownCell}>
                    {formatCurrency(item.interest)}
                  </Text>
                  <Text style={styles.breakdownCell}>
                    {formatCurrency(item.balance)}
                  </Text>
                </View>
              )
            )}

            {loanTenure > 5 && !showAllYears && (
              <TouchableOpacity
                onPress={() => setShowAllYears(true)}
                style={styles.moreYearsButton}
              >
                <Text style={styles.moreYearsText}>
                  + {loanTenure - 5} {t("more years")}
                </Text>
              </TouchableOpacity>
            )}

            {showAllYears && (
              <TouchableOpacity
                onPress={() => setShowAllYears(false)}
                style={styles.moreYearsButton}
              >
                <Text style={styles.moreYearsText}>{t("Show less")}</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </AppSafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: moderateScale(16),
    gap: verticalScale(16),
  },
  chartContainer: {
    margin: 20,
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 10,
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
  legendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: Colors.textSecondaryDark,
    fontFamily: "Quicksand-Medium",
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
  moreYearsButton: {
    padding: 8,
    alignItems: "center",
  },
  // moreYearsText: {
  //   fontSize: moderateScale(12),
  //   fontFamily: "Quicksand-Medium",
  //   color: Colors.primaryCyanColor,
  //   textAlign: "center",
  // },
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
  chartCard: {
    // alignItems: "center",
  },
  breakdownTitle: {
    fontSize: moderateScale(16),
    fontFamily: "Poppins-SemiBold",
    color: Colors.textSecondaryDark,
    marginBottom: verticalScale(12),
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
    textAlign: "center",
  },
  moreYearsText: {
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Medium",
    color: Colors.primaryCyanColor,
    textAlign: "center",
    marginTop: verticalScale(4),
  },
});

export default LoanEmiScreen;
