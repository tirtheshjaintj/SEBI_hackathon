import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { verticalScale } from "@/src/utils/responsiveness/responsiveness";
import { router } from "expo-router";
import { useTranslation } from "react-i18next";
import { StatusBar } from "expo-status-bar";

const { width } = Dimensions.get("window");
const CARD_WIDTH = width / 2 - 20;
const CARD_HEIGHT = verticalScale(300);

const CARD_COLORS = [
  ["#6366F1", "#8B5CF6"],
  ["#10B981", "#34D399"],
  ["#3B82F6", "#60A5FA"],
  ["#F59E0B", "#FBBF24"],
];

const calculatorData = [
  {
    title: "SIP Calculator",
    description: "Calculate Systematic Investment Plan returns & growth",
    link: "/calculators/sipcalculator",
    icon: "trending-up",
  },
  {
    title: "Loan EMI",
    description: "Estimate monthly loan payments and interest breakdown",
    link: "/calculators/loanemi",
    icon: "credit-card",
  },
  {
    title: "Simple Interest",
    description: "Calculate interest on principal amount over time",
    link: "/calculators/simpleinterest",
    icon: "calculate",
  },
  {
    title: "Lump Sum",
    description: "Estimate returns on one-time investments with compounding",
    link: "/calculators/lumpsum",
    icon: "currency-rupee",
  },
];

const CalculatorsScreen = () => {
  const { t } = useTranslation();
  const renderItem = ({ item, index }: { item: any; index: number }) => (
    <TouchableOpacity
      activeOpacity={0.9}
      style={styles.cardContainer}
      onPress={() => router.push(item.link)}
    >
      <LinearGradient
        colors={CARD_COLORS[index % CARD_COLORS.length] as any}
        style={styles.card}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.iconContainer}>
          <MaterialIcons name={item.icon} size={28} color="white" />
        </View>
        <Text style={styles.title}>{t(item.title)}</Text>
        <Text style={styles.description}>{t(item.description)}</Text>
        <View style={styles.arrowContainer}>
          <MaterialIcons name="arrow-forward" size={20} color="white" />
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <CommonToolbar title={t("Financial Calculators")} />
      <FlatList
        data={calculatorData}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  list: {
    padding: 16,
    paddingVertical: verticalScale(24),
  },
  row: {
    justifyContent: "space-between",
    marginBottom: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    marginBottom: 8,
  },
  card: {
    flex: 1,
    padding: 20,
    borderRadius: 16,
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "white",
    marginBottom: 8,
    lineHeight: 24,
  },
  description: {
    fontSize: 14,
    color: "rgba(255,255,255,0.9)",
    lineHeight: 20,
    marginBottom: 16,
  },
  arrowContainer: {
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CalculatorsScreen;
