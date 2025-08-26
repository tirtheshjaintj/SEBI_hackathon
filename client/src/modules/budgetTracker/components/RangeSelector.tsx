import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const ranges: ("1D" | "1M" | "6M" | "1Y")[] = ["1D", "1M", "6M", "1Y"];

const RangeSelector = ({ range, setRange }: { range: string; setRange: (r: any) => void }) => (
  <View style={styles.rangeSelector}>
    {ranges.map((r) => (
      <TouchableOpacity
        key={r}
        onPress={() => setRange(r)}
        style={[styles.rangeBtn, range === r && styles.activeRangeBtn]}
      >
        <Text style={[styles.rangeText, range === r && styles.activeRangeText]}>
          {r === "1D" ? "1 Day" : r === "1M" ? "1 Month" : r === "6M" ? "6 Months" : "1 Year"}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

const styles = StyleSheet.create({
  rangeSelector: {
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 24,
  },
  rangeBtn: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#007AFF",
    marginHorizontal: 4,
    marginVertical: 4,
  },
  activeRangeBtn: {
    backgroundColor: "#007AFF",
  },
  rangeText: {
    color: "#007AFF",
    fontWeight: "500",
  },
  activeRangeText: {
    color: "#fff",
  },
});

export default RangeSelector;
