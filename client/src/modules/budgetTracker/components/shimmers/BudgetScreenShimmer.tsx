import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import CustomToolbar from "@/src/components/toolBars/mainToolBar";
import {
  moderateScale,
  scale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import Shimmer from "@/src/components/shimmer/Shimmer";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";

const BudgetScreenShimmer = () => {
  return (
    <>
      <AppLinearGradient
        colors={[
          Colors.primaryCyanColor,
          Colors.gradientCyanSecondary,
          Colors.white,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.2, 0.3]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />

      <AppSafeAreaView style={{ paddingBottom: 0 }}>
        <CustomToolbar textColor="white" rightIcon={true} streak={true} />
      </AppSafeAreaView>
      <AppSafeAreaView style={styles.container}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          style={styles.scrollView}
        >
          {/* Balance Section */}
          <Shimmer style={[styles.card, styles.balance]} />

          {/* Income/Expense Cards */}
          <View style={styles.row}>
            <Shimmer style={[styles.card, styles.halfCard]} />
            <Shimmer style={[styles.card, styles.halfCard]} />
          </View>

          {/* Spend Frequency Graph */}
          <Shimmer style={[styles.card, styles.graph]} />

          {/* Recent Transactions */}
          <View style={{ marginTop: 16 }}>
            <Shimmer style={[styles.transactionRow]} />
            <Shimmer style={[styles.transactionRow]} />
            <Shimmer style={[styles.transactionRow]} />
          </View>
        </ScrollView>
      </AppSafeAreaView>
    </>
  );
};

export default BudgetScreenShimmer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
  },
  scrollView: {
    flex: 1,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    backgroundColor: Colors.white,
    paddingHorizontal: moderateScale(16),
    paddingTop: 12,
  },
  card: {
    height: 100,
    borderRadius: 12,
    marginBottom: 16,
  },
  balance: {
    height: 120,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfCard: {
    height: 80,
    width: "48%",
    borderRadius: 10,
  },
  graph: {
    height: 180,
  },
  transactionRow: {
    height: 60,
    borderRadius: 10,
    marginBottom: 12,
  },
});
