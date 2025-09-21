import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import Colors from "@/src/theme/colors";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Shimmer from "@/src/components/shimmer/Shimmer";

// Define TypeScript interfaces
interface StockData {
  symbol: string;
  price: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  volume: string;
}

interface StockWidgetProps {
  symbol?: string;
  compact?: boolean;
}

// Static stock data
const stockDataMap: Record<string, StockData> = {
  AAPL: {
    symbol: "AAPL",
    price: 178.72,
    change: 2.35,
    changePercent: 1.33,
    high: 179.5,
    low: 175.2,
    volume: "45.2M",
  },
  MSFT: {
    symbol: "MSFT",
    price: 337.69,
    change: -1.25,
    changePercent: -0.37,
    high: 340.2,
    low: 336.5,
    volume: "28.7M",
  },
  GOOGL: {
    symbol: "GOOGL",
    price: 139.93,
    change: 0.87,
    changePercent: 0.63,
    high: 140.5,
    low: 138.2,
    volume: "22.4M",
  },
};

const StockWidget: React.FC<StockWidgetProps> = ({
  symbol = "AAPL",
  compact = false,
}) => {
  const { t } = useTranslation();
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const data = stockDataMap[symbol] || stockDataMap.AAPL;
      setStockData(data);
      setLoading(false);
    }, 1200); // simulate network

    return () => clearTimeout(timer);
  }, [symbol]);

  if (loading || !stockData) {
    return (
      <AppLinearGradient
        colors={[Colors.white, Colors.white]}
        style={[styles.widgetContainer, compact && styles.compactContainer]}
      >
        {/* Shimmer placeholders */}
        <View style={styles.header}>
          <View>
            <Shimmer style={{ width: 50, height: 14, borderRadius: 4 }} />
            <Shimmer
              style={{
                width: 70,
                height: 16,
                marginTop: 6,
                borderRadius: 4,
              }}
            />
          </View>
          <Shimmer style={{ width: 80, height: 14, borderRadius: 4 }} />
        </View>

        {!compact && (
          <View style={styles.additionalInfo}>
            <Shimmer style={{ width: "60%", height: 12, marginBottom: 6 }} />
            <Shimmer style={{ width: "40%", height: 12, marginBottom: 6 }} />
            <Shimmer style={{ width: "50%", height: 12, marginBottom: 6 }} />
          </View>
        )}
      </AppLinearGradient>
    );
  }

  const isPositive = stockData.change >= 0;

  return (
    <AppLinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.white, Colors.white]}
      style={[styles.widgetContainer, compact && styles.compactContainer]}
    >
      {/* Header with stock info */}
      <View style={[styles.header, compact && styles.compactHeader]}>
        <View>
          <Text style={styles.symbolText}>{stockData.symbol}</Text>
          <Text style={styles.priceText}>₹{stockData.price.toFixed(2)}</Text>
        </View>
        <View style={styles.changeContainer}>
          <Ionicons
            name={isPositive ? "caret-up" : "caret-down"}
            size={moderateScale(compact ? 10 : 10)}
            color={isPositive ? Colors.green : Colors.redDark}
          />
          <Text
            style={[
              styles.changeText,
              { color: isPositive ? Colors.green : Colors.redDark },
              compact && styles.compactChangeText,
            ]}
          >
            {stockData.change.toFixed(2)} ({stockData.changePercent.toFixed(2)}
            %)
          </Text>
        </View>
      </View>

      {/* Additional info */}
      {!compact && (
        <View style={styles.additionalInfo}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>High:</Text>
            <Text style={styles.infoValue}>₹{stockData.high.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Low:</Text>
            <Text style={styles.infoValue}>₹{stockData.low.toFixed(2)}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Volume:</Text>
            <Text style={styles.infoValue}>{stockData.volume}</Text>
          </View>
        </View>
      )}
    </AppLinearGradient>
  );
};

const styles = StyleSheet.create({
  widgetContainer: {
    flex: 1,
    borderRadius: moderateScale(16),
    padding: moderateScale(12),
    overflow: "hidden",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  compactContainer: {
    minHeight: verticalScale(80),
    padding: moderateScale(10),
  },
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: verticalScale(8),
  },
  compactHeader: {
    marginBottom: 0,
  },
  symbolText: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(14),
    fontFamily: "Poppins-SemiBold",
  },
  priceText: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(14),
    fontFamily: "Poppins-Bold",
    marginTop: verticalScale(2),
  },
  changeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: moderateScale(10),
    fontFamily: "Quicksand-SemiBold",
    marginLeft: moderateScale(4),
  },
  compactChangeText: {
    fontSize: moderateScale(10),
  },
  additionalInfo: {
    borderTopWidth: 0.5,
    borderTopColor: Colors.divider,
    paddingTop: verticalScale(8),
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(4),
  },
  infoLabel: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(10),
    fontFamily: "Quicksand-Regular",
  },
  infoValue: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(10),
    fontFamily: "Quicksand-SemiBold",
  },
  centerContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    color: Colors.textSecondaryDark,
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Regular",
  },
});

export default StockWidget;
