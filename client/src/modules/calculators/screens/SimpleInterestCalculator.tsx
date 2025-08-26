import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import { PieChart } from "react-native-chart-kit";
import Slider from "@react-native-community/slider";
import { LinearGradient } from "expo-linear-gradient";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import {
  moderateScale,
  normalize,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import { useTranslation } from "react-i18next";

const SimpleInterestCalculator = () => {
  const { t } = useTranslation();
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(5.5);
  const [time, setTime] = useState(5);

  const interest = (principal * rate * time) / 100;
  const totalAmount = principal + interest;

  const pieData = [
    {
      name: t("Principal"),
      amount: principal,
      color: Colors.primaryCyanColor,
      legendFontColor: "#6B7280",
      legendFontSize: 14,
    },
    {
      name: t("Interest"),
      amount: interest,
      color: "#e0eb9bff",
      legendFontColor: "#6B7280",
      legendFontSize: 14,
    },
  ];

  const formatCurrency = (value: number) => {
    return `₹${value.toLocaleString("en-IN", { maximumFractionDigits: 0 })}`;
  };

  return (
    <LinearGradient
      colors={["#ffffffff", "#ffffffff"]}
      style={styles.container}
    >
      <AppSafeAreaView style={{ flex: 1 }}>
        <CommonToolbar title={t("Simple Interest Calculator")} />
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {/* Pie Chart */}
          <View style={[styles.chartCard]}>
            <PieChart
              data={pieData}
              width={Dimensions.get("window").width - scale(60)}
              height={140}
              chartConfig={{
                color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              //   absolute
              //   hasLegend
            />
          </View>
          <View style={styles.card}>
            {/* Principal Amount */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Principal Amount")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={principal.toString()}
                  onChangeText={(text) => setPrincipal(Number(text) || 0)}
                />
                <Text style={styles.currency}>₹</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={10000}
                maximumValue={1000000}
                step={10000}
                value={principal}
                // onValueChange={setPrincipal}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(val)=>setPrincipal(val)}
              />
            </View>

            {/* Interest Rate */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Rate of Interest (p.a)")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={rate.toString()}
                  onChangeText={(text) => setRate(Number(text) || 0)}
                />
                <Text style={styles.currency}>%</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={20}
                step={0.1}
                value={rate}
                // onValueChange={setRate}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(val)=>setRate(val)}

              />
            </View>

            {/* Time Period */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>{t("Time Period")}</Text>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={time.toString()}
                  onChangeText={(text) => setTime(Number(text) || 0)}
                />
                <Text style={styles.currency}>{t("Yr")}</Text>
              </View>
              <Slider
                style={styles.slider}
                minimumValue={1}
                maximumValue={30}
                step={1}
                value={time}
                onValueChange={setTime}
                minimumTrackTintColor={Colors.primaryCyanColor}
                maximumTrackTintColor="#E5E7EB"
                thumbTintColor={Colors.primaryCyanColor}
                onSlidingComplete={(val)=>setTime(val)}

              />
            </View>
          </View>

          {/* Results Card */}
          <AppLinearGradient
            colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
            style={[styles.card, styles.resultsCard]}
          >
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>{t("Total interest")}</Text>
              <Text style={styles.resultValue}>{formatCurrency(interest)}</Text>
            </View>

            <View style={[styles.resultRow, styles.totalRow]}>
              <Text style={[styles.resultLabel, styles.totalLabel]}>
                {t("Total amount")}
              </Text>
              <Text style={[styles.resultValue, styles.totalValue]}>
                {formatCurrency(totalAmount)}
              </Text>
            </View>
          </AppLinearGradient>
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
  resultsTitle: {
    fontSize: moderateScale(18),
    fontFamily: "Quicksand-Bold",
    marginBottom: verticalScale(12),
  },
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
  chartTitle: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#111827",
    marginBottom: verticalScale(12),
    alignSelf: "flex-start",
  },
});

export default SimpleInterestCalculator;
