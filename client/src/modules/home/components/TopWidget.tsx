import { moderateScale } from "@/src/utils/responsiveness/responsiveness";
import { router } from "expo-router";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import BudgetWidget from "./BudgetWidget";
import ScannerWidget from "./ScannerWidget";

const TopWidget = ({ data }: any) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          router.push("/security");
        }}
      >
        <ScannerWidget />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          router.push({
            pathname: "/livestocks",
          });
        }}
      >
        <BudgetWidget />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: moderateScale(16),
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: moderateScale(16),
    gap: moderateScale(8),
  },
});

export default TopWidget;
