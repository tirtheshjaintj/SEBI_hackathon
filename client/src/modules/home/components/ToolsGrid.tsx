import Colors from "@/src/theme/colors";
import { normalize } from "@/src/utils/responsiveness/responsiveness";
import {
  AntDesign,
  MaterialIcons,
  FontAwesome5,
  Octicons,
} from "@expo/vector-icons";
import React from "react";
import { StyleSheet, View } from "react-native";
import GridCard from "./GridCard";
import { router } from "expo-router";
import { t } from "i18next";

const toolsData = [
  {
    label: "Fraud Detect",
    icon: (size: number, color: string) => (
      <AntDesign name="scan1" size={size} color={color} />
    ),
    onPress: () => router.push("/spamdetect"),
  },
  {
    label: "Report Fraud",
    icon: (size: number, color: string) => (
      <MaterialIcons name="report-problem" size={size} color={color} />
    ),
    onPress: () => router.push("/calllogs"),
  },
  {
    label: "SEBI News",
    icon: (size: number, color: string) => (
      <MaterialIcons name="article" size={size} color={color} />
    ),
    onPress: () => router.push("/sebiupdates"),
  },
  {
    label: "Stocks",
    icon: (size: number, color: string) => (
      <Octicons name="graph" size={size} color={color} />
    ),
    onPress: () => router.push("/livestocks"),
  },
  {
    label: "Calculators",
    icon: (size: number, color: string) => (
      <AntDesign name="calculator" size={size} color={color} />
    ),
    onPress: () => router.push("/calculators/all"),
  },

  {
    label: "Tutorials",
    icon: (size: number, color: string) => (
      <AntDesign name="playcircleo" size={size} color={color} />
    ),
    onPress: () => router.push("/tutorial/topics"),
  },

  {
    label: "Dictionary",
    icon: (size: number, color: string) => (
      <FontAwesome5 name="book" size={size} color={color} />
    ),
    onPress: () => router.push("/dictionary"),
  },
];

export default function ToolsGrid() {
  return (
    <View style={styles.container}>
      {toolsData.map((item, index) => (
        <View key={index} style={styles.itemWrapper}>
          <GridCard label={t(item.label)} onPress={item.onPress}>
            {item.icon(normalize(26), Colors.primaryCyanColor)}
          </GridCard>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: normalize(8),
    // marginTop: normalize(12),
  },
  itemWrapper: {
    width: "32%",
    marginBottom: normalize(12),
    alignItems: "center",
  },
});
