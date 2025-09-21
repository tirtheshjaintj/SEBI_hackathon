import { getBSEMostActive, getNSEMostActive } from "@/src/apis/indianApi";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Dimensions,
  Easing,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Colors from "@/src/theme/colors";

const { width } = Dimensions.get("window");

export default function LiveStocks() {
  const [data, setData] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState("nseActive");
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const pulseAnim = new Animated.Value(0);

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  // Create pulsing animation for loading state
  useEffect(() => {
    if (loading) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 0,
            duration: 800,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [loading]);

  const fetchData = async (tab: string) => {
    try {
      setRefreshing(true);
      setLoading(true);
      let res: any = [];
      switch (tab) {
        case "nseActive":
          res = await getNSEMostActive();
          break;
        case "bseActive":
          res = await getBSEMostActive();
          break;
        default:
          res = [];
      }
      setData(res);
    } catch (err) {
      console.error(err);
    } finally {
      setRefreshing(false);
      setLoading(false);
    }
  };

  const LoadingSkeleton = () => {
    const opacity = pulseAnim.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 0.8],
    });

    return (
      <Animated.View style={[styles.skeletonItem, { opacity }]}>
        <View style={styles.skeletonLeft}>
          <View style={styles.skeletonIcon} />
          <View>
            <View style={styles.skeletonText} />
            <View style={[styles.skeletonText, { width: 120, marginTop: 6 }]} />
          </View>
        </View>
        <View style={styles.skeletonRight}>
          <View style={[styles.skeletonText, { width: 60 }]} />
          <View style={[styles.skeletonText, { width: 50, marginTop: 6 }]} />
        </View>
      </Animated.View>
    );
  };

  const renderItem = ({ item, index }: any) => (
    <View style={styles.card}>
      {/* Header with company name and trend indicator */}
      <View style={styles.itemHeader}>
        <View style={styles.stockInfo}>
          <LinearGradient
            colors={
              item.net_change >= 0
                ? [Colors.greenDark, "#21BF73"]
                : [Colors.redDark, "#FF2E63"]
            }
            style={styles.iconContainer}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <FontAwesome5
              name={item.net_change >= 0 ? "arrow-up" : "arrow-down"}
              size={14}
              color={Colors.white}
            />
          </LinearGradient>
          <View style={styles.stockDetails}>
            <Text style={styles.symbol}>{item.ticker || item.symbol}</Text>
            <Text style={styles.name} numberOfLines={1}>
              {item.company}
            </Text>
          </View>
        </View>
        <View
          style={[
            styles.trendBadge,
            item.overall_rating === "Bullish"
              ? styles.bullishBadge
              : item.overall_rating === "Bearish"
              ? styles.bearishBadge
              : styles.neutralBadge,
          ]}
        >
          <Text style={styles.trendBadgeText}>{item.overall_rating}</Text>
        </View>
      </View>

      {/* Price and change information */}
      <View style={styles.priceSection}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Current Price</Text>
          <Text style={styles.price}>
            ₹{parseFloat(item.price || item.lastPrice || 0).toFixed(2)}
          </Text>
        </View>

        <View style={styles.changeContainer}>
          <Text style={styles.priceLabel}>Change</Text>
          <View style={styles.changeRow}>
            <Ionicons
              name={item.net_change >= 0 ? "caret-up" : "caret-down"}
              size={16}
              color={item.net_change >= 0 ? Colors.greenDark : Colors.redDark}
            />
            <Text
              style={[
                styles.netChange,
                item.net_change >= 0
                  ? styles.positiveText
                  : styles.negativeText,
              ]}
            >
              {item.net_change >= 0 ? "+" : ""}
              {parseFloat(item.net_change || 0).toFixed(2)}
            </Text>
            <Text
              style={[
                styles.percentChange,
                item.net_change >= 0
                  ? styles.positiveText
                  : styles.negativeText,
              ]}
            >
              ({item.net_change >= 0 ? "+" : ""}
              {parseFloat(item.percent_change || 0).toFixed(2)}%)
            </Text>
          </View>
        </View>
      </View>

      {/* Trading stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Open</Text>
          <Text style={styles.statValue}>
            ₹{parseFloat(item.open || 0).toFixed(2)}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>High</Text>
          <Text style={[styles.statValue, styles.positiveText]}>
            ₹{parseFloat(item.high || 0).toFixed(2)}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Low</Text>
          <Text style={[styles.statValue, styles.negativeText]}>
            ₹{parseFloat(item.low || 0).toFixed(2)}
          </Text>
        </View>

        <View style={styles.statItem}>
          <Text style={styles.statLabel}>Prev Close</Text>
          <Text style={styles.statValue}>
            ₹{parseFloat(item.close || 0).toFixed(2)}
          </Text>
        </View>
      </View>

      {/* Additional information */}
      <View style={styles.additionalInfo}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Volume</Text>
            <Text style={styles.infoValue}>
              {formatVolume(item.volume || 0)}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>52W High</Text>
            <Text style={[styles.infoValue, styles.positiveText]}>
              ₹{parseFloat(item["52_week_high"] || 0).toFixed(2)}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>52W Low</Text>
            <Text style={[styles.infoValue, styles.negativeText]}>
              ₹{parseFloat(item["52_week_low"] || 0).toFixed(2)}
            </Text>
          </View>
        </View>

        <View style={styles.circuitInfo}>
          <View style={styles.circuitItem}>
            <MaterialCommunityIcons
              name="arrow-top-left"
              size={14}
              color={Colors.greenDark}
            />
            <Text style={styles.circuitText}>
              Upper: ₹{parseFloat(item.up_circuit_limit || 0).toFixed(2)}
            </Text>
          </View>
          <View style={styles.circuitItem}>
            <MaterialCommunityIcons
              name="arrow-bottom-left"
              size={14}
              color={Colors.redDark}
            />
            <Text style={styles.circuitText}>
              Lower: ₹{parseFloat(item.low_circuit_limit || 0).toFixed(2)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );

  const formatVolume = (volume: number) => {
    if (volume >= 10000000) {
      return (volume / 10000000).toFixed(2) + "Cr";
    } else if (volume >= 100000) {
      return (volume / 100000).toFixed(2) + "L";
    } else {
      return volume.toLocaleString();
    }
  };

  const TabButton = ({ title, isActive, onPress, iconName }: any) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.activeTab]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <LinearGradient
        colors={
          isActive
            ? [Colors.primaryCyanColor, "#3A8DA8"]
            : [Colors.white, Colors.grayTint]
        }
        style={styles.tabButtonGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <Ionicons
          name={iconName}
          size={18}
          color={isActive ? Colors.white : Colors.textSecondaryLight}
        />
        <Text style={[styles.tabText, isActive && styles.activeTabText]}>
          {title}
        </Text>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <AppSafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <CommonToolbar title="Most Active Stocks" />

      {/* Market Tabs */}
      <View style={styles.tabContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabScroll}
        >
          <TabButton
            title="NSE Active"
            isActive={activeTab === "nseActive"}
            onPress={() => setActiveTab("nseActive")}
            iconName="pulse"
          />
          <TabButton
            title="BSE Active"
            isActive={activeTab === "bseActive"}
            onPress={() => setActiveTab("bseActive")}
            iconName="pulse-outline"
          />
        </ScrollView>
      </View>

      {/* Stats Bar */}
      <LinearGradient
        colors={[Colors.white, Colors.grayTint]}
        style={styles.statsBar}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <View style={styles.statBox}>
          <Text style={styles.statBoxLabel}>Total Stocks</Text>
          <Text style={styles.statBoxValue}>{data.length}</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statBoxLabel}>Advancers</Text>
          <Text style={[styles.statBoxValue, styles.positiveText]}>
            {data.filter((item) => item.net_change > 0).length}
          </Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statBox}>
          <Text style={styles.statBoxLabel}>Decliners</Text>
          <Text style={[styles.statBoxValue, styles.negativeText]}>
            {data.filter((item) => item.net_change < 0).length}
          </Text>
        </View>
      </LinearGradient>

      {/* Data List */}
      <View style={styles.listContainer}>
        {loading ? (
          // Show loading skeletons
          Array.from({ length: 5 }).map((_, index) => (
            <LoadingSkeleton key={index} />
          ))
        ) : (
          <FlatList
            data={data}
            keyExtractor={(item, idx) =>
              item.ticker || item.symbol || idx.toString()
            }
            renderItem={renderItem}
            refreshing={refreshing}
            onRefresh={() => fetchData(activeTab)}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerGradient: {
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  tabContainer: {
    backgroundColor: Colors.white,
    paddingVertical: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  tabScroll: {
    paddingHorizontal: 20,
    flexDirection: "row",
  },
  tabButton: {
    borderRadius: 20,
    overflow: "hidden",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabButtonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  activeTab: {
    shadowColor: Colors.primaryCyanColor,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  tabText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textSecondaryLight,
  },
  activeTabText: {
    color: Colors.white,
  },
  statsBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 16,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: Colors.purpleGrayTint,
  },
  statBox: {
    alignItems: "center",
    flex: 1,
  },
  statBoxLabel: {
    fontSize: 12,
    color: Colors.textSecondaryLight,
    marginBottom: 4,
    fontWeight: "500",
  },
  statBoxValue: {
    fontSize: 18,
    fontWeight: "700",
    color: Colors.textPrimary,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
    backgroundColor: Colors.white,
  },
  card: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  itemHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  stockInfo: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  stockDetails: {
    flexShrink: 1,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
  symbol: {
    fontWeight: "700",
    fontSize: 16,
    color: Colors.textPrimary,
  },
  name: {
    fontSize: 13,
    color: Colors.textSecondaryLight,
    maxWidth: width * 0.5,
    marginTop: 2,
  },
  trendBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  bullishBadge: {
    backgroundColor: "rgba(16, 185, 129, 0.15)",
  },
  bearishBadge: {
    backgroundColor: "rgba(239, 68, 68, 0.15)",
  },
  neutralBadge: {
    backgroundColor: "rgba(156, 163, 175, 0.15)",
  },
  trendBadgeText: {
    fontSize: 11,
    fontWeight: "700",
  },
  priceSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  priceContainer: {
    flex: 1,
  },
  changeContainer: {
    alignItems: "flex-end",
  },
  priceLabel: {
    fontSize: 12,
    color: Colors.textSecondaryLight,
    marginBottom: 4,
    fontWeight: "500",
  },
  price: {
    fontWeight: "800",
    fontSize: 20,
    color: Colors.textPrimary,
  },
  changeRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  netChange: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 4,
  },
  percentChange: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 4,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    flexWrap: "wrap",
  },
  statItem: {
    width: "48%",
    marginBottom: 12,
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondaryLight,
    marginBottom: 4,
    fontWeight: "500",
  },
  statValue: {
    fontSize: 14,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  additionalInfo: {
    borderTopWidth: 1,
    borderTopColor: Colors.purpleGrayTint,
    paddingTop: 16,
  },
  infoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoItem: {
    alignItems: "center",
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.textSecondaryLight,
    marginBottom: 4,
    fontWeight: "500",
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "600",
    color: Colors.textPrimary,
  },
  circuitInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: Colors.grayTint,
    padding: 12,
    borderRadius: 10,
  },
  circuitItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  circuitText: {
    fontSize: 11,
    fontWeight: "600",
    marginLeft: 6,
    color: Colors.textSecondaryDark,
  },
  positiveText: {
    color: Colors.greenDark,
  },
  negativeText: {
    color: Colors.redDark,
  },
  // Skeleton styles
  skeletonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: Colors.grayTint,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
  },
  skeletonLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  skeletonRight: {
    alignItems: "flex-end",
  },
  skeletonIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.textSecondaryVeryLight,
    marginRight: 12,
  },
  skeletonText: {
    height: 14,
    backgroundColor: Colors.textSecondaryVeryLight,
    borderRadius: 4,
    width: 80,
  },
});
