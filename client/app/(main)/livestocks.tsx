import {
    getBSEMostActive,
    getNSEMostActive,
} from "@/src/apis/indianApi";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { FontAwesome5, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
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
    View
} from "react-native";

const { width } = Dimensions.get('window');

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
                        useNativeDriver: true
                    }),
                    Animated.timing(pulseAnim, {
                        toValue: 0,
                        duration: 800,
                        easing: Easing.inOut(Easing.quad),
                        useNativeDriver: true
                    })
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
            outputRange: [0.4, 0.8]
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
        <View style={[
            styles.item,
            styles.itemShadow,
        ]}>
            {/* Header with company name and trend indicator */}
            <View style={styles.itemHeader}>
                <View style={styles.stockInfo}>
                    <View style={[
                        styles.iconContainer,
                        item.net_change >= 0 ? styles.iconPositive : styles.iconNegative
                    ]}>
                        <FontAwesome5
                            name={item.net_change >= 0 ? "arrow-up" : "arrow-down"}
                            size={14}
                            color="#FFF"
                        />
                    </View>
                    <View style={styles.stockDetails}>
                        <Text style={styles.symbol}>{item.ticker || item.symbol}</Text>
                        <Text style={styles.name} numberOfLines={1}>
                            {item.company}
                        </Text>
                    </View>
                </View>
                <View style={[
                    styles.trendBadge,
                    item.overall_rating === "Bullish" ? styles.bullishBadge :
                        item.overall_rating === "Bearish" ? styles.bearishBadge : styles.neutralBadge
                ]}>
                    <Text style={styles.trendBadgeText}>
                        {item.overall_rating}
                    </Text>
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
                            color={item.net_change >= 0 ? "#21BF73" : "#FF2E63"}
                        />
                        <Text style={[
                            styles.netChange,
                            item.net_change >= 0 ? styles.positiveText : styles.negativeText
                        ]}>
                            {item.net_change >= 0 ? '+' : ''}{parseFloat(item.net_change || 0).toFixed(2)}
                        </Text>
                        <Text style={[
                            styles.percentChange,
                            item.net_change >= 0 ? styles.positiveText : styles.negativeText
                        ]}>
                            ({item.net_change >= 0 ? '+' : ''}{parseFloat(item.percent_change || 0).toFixed(2)}%)
                        </Text>
                    </View>
                </View>
            </View>

            {/* Trading stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Open</Text>
                    <Text style={styles.statValue}>₹{parseFloat(item.open || 0).toFixed(2)}</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>High</Text>
                    <Text style={[styles.statValue, styles.positiveText]}>₹{parseFloat(item.high || 0).toFixed(2)}</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Low</Text>
                    <Text style={[styles.statValue, styles.negativeText]}>₹{parseFloat(item.low || 0).toFixed(2)}</Text>
                </View>

                <View style={styles.statItem}>
                    <Text style={styles.statLabel}>Prev Close</Text>
                    <Text style={styles.statValue}>₹{parseFloat(item.close || 0).toFixed(2)}</Text>
                </View>
            </View>

            {/* Additional information */}
            <View style={styles.additionalInfo}>
                <View style={styles.infoRow}>
                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>Volume</Text>
                        <Text style={styles.infoValue}>{formatVolume(item.volume || 0)}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>52W High</Text>
                        <Text style={[styles.infoValue, styles.positiveText]}>₹{parseFloat(item["52_week_high"] || 0).toFixed(2)}</Text>
                    </View>

                    <View style={styles.infoItem}>
                        <Text style={styles.infoLabel}>52W Low</Text>
                        <Text style={[styles.infoValue, styles.negativeText]}>₹{parseFloat(item["52_week_low"] || 0).toFixed(2)}</Text>
                    </View>
                </View>

                <View style={styles.circuitInfo}>
                    <View style={styles.circuitItem}>
                        <MaterialCommunityIcons name="arrow-top-left" size={14} color="#21BF73" />
                        <Text style={styles.circuitText}>Upper: ₹{parseFloat(item.up_circuit_limit || 0).toFixed(2)}</Text>
                    </View>
                    <View style={styles.circuitItem}>
                        <MaterialCommunityIcons name="arrow-bottom-left" size={14} color="#FF2E63" />
                        <Text style={styles.circuitText}>Lower: ₹{parseFloat(item.low_circuit_limit || 0).toFixed(2)}</Text>
                    </View>
                </View>
            </View>
        </View>
    );

    const formatVolume = (volume: number) => {
        if (volume >= 10000000) {
            return (volume / 10000000).toFixed(2) + 'Cr';
        } else if (volume >= 100000) {
            return (volume / 100000).toFixed(2) + 'L';
        } else {
            return volume.toLocaleString();
        }
    };

    const TabButton = ({ title, isActive, onPress, iconName }: any) => (
        <TouchableOpacity
            style={[styles.tabButton, isActive && styles.activeTab]}
            onPress={onPress}
        >
            <Ionicons
                name={iconName}
                size={18}
                color={isActive ? "#FFFFFF" : "#6B7280"}
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <AppSafeAreaView style={styles.safeArea}>
            <CommonToolbar title="Most Active Stocks" />

            {/* Market Tabs */}
            <View style={styles.tabContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.tabScroll}>
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
            <View style={styles.statsBar}>
                <View style={styles.statBox}>
                    <Text style={styles.statBoxLabel}>Total Stocks</Text>
                    <Text style={styles.statBoxValue}>{data.length}</Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statBoxLabel}>Advancers</Text>
                    <Text style={[styles.statBoxValue, styles.positiveText]}>
                        {data.filter(item => item.net_change > 0).length}
                    </Text>
                </View>
                <View style={styles.statBox}>
                    <Text style={styles.statBoxLabel}>Decliners</Text>
                    <Text style={[styles.statBoxValue, styles.negativeText]}>
                        {data.filter(item => item.net_change < 0).length}
                    </Text>
                </View>
            </View>

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
                        keyExtractor={(item, idx) => item.ticker || item.symbol || idx.toString()}
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
        backgroundColor: "#F9FAFB"
    },
    tabContainer: {
        backgroundColor: "#FFFFFF",
        paddingVertical: 12,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 3,
        elevation: 2,
    },
    tabScroll: {
        paddingHorizontal: 16,
        flexDirection: 'row',
    },
    tabButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        marginRight: 12,
        borderRadius: 20,
        backgroundColor: "#F3F4F6",
    },
    activeTab: {
        backgroundColor: "#2563EB",
        shadowColor: "#2563EB",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 3,
    },
    tabText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: "600",
        color: "#6B7280"
    },
    activeTabText: {
        color: "#FFF"
    },
    statsBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        marginBottom: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 1,
    },
    statBox: {
        alignItems: 'center',
    },
    statBoxLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
    statBoxValue: {
        fontSize: 18,
        fontWeight: '700',
        color: '#111827',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 8,
        backgroundColor: "#F9FAFB",
    },
    item: {
        backgroundColor: "#FFFFFF",
        borderRadius: 16,
        padding: 16,
        marginBottom: 12,
    },
    itemShadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.08,
        shadowRadius: 6,
        elevation: 3,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
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
    },
    iconPositive: {
        backgroundColor: "#10B981",
    },
    iconNegative: {
        backgroundColor: "#EF4444",
    },
    symbol: {
        fontWeight: "700",
        fontSize: 16,
        color: "#111827"
    },
    name: {
        fontSize: 13,
        color: "#6B7280",
        maxWidth: width * 0.5,
        marginTop: 2
    },
    trendBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    bullishBadge: {
        backgroundColor: 'rgba(16, 185, 129, 0.15)',
    },
    bearishBadge: {
        backgroundColor: 'rgba(239, 68, 68, 0.15)',
    },
    neutralBadge: {
        backgroundColor: 'rgba(156, 163, 175, 0.15)',
    },
    trendBadgeText: {
        fontSize: 11,
        fontWeight: '700',
    },
    priceSection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
    },
    priceContainer: {
        flex: 1,
    },
    changeContainer: {
        alignItems: 'flex-end',
    },
    priceLabel: {
        fontSize: 12,
        color: '#6B7280',
        marginBottom: 4,
    },
    price: {
        fontWeight: "800",
        fontSize: 20,
        color: "#111827",
    },
    changeRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    netChange: {
        fontSize: 16,
        fontWeight: '700',
        marginLeft: 4,
    },
    percentChange: {
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 16,
        flexWrap: 'wrap',
    },
    statItem: {
        width: '48%',
        marginBottom: 8,
    },
    statLabel: {
        fontSize: 11,
        color: '#6B7280',
        marginBottom: 2,
    },
    statValue: {
        fontSize: 14,
        fontWeight: '600',
        color: '#111827',
    },
    additionalInfo: {
        borderTopWidth: 1,
        borderTopColor: '#F3F4F6',
        paddingTop: 12,
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    infoItem: {
        alignItems: 'center',
    },
    infoLabel: {
        fontSize: 11,
        color: '#6B7280',
        marginBottom: 2,
    },
    infoValue: {
        fontSize: 12,
        fontWeight: '600',
        color: '#111827',
    },
    circuitInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: '#F9FAFB',
        padding: 10,
        borderRadius: 8,
    },
    circuitItem: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    circuitText: {
        fontSize: 11,
        fontWeight: '600',
        marginLeft: 4,
        color: '#4B5563',
    },
    positiveText: {
        color: "#10B981"
    },
    negativeText: {
        color: "#EF4444"
    },
    // Skeleton styles
    skeletonItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 16,
        paddingHorizontal: 16,
        borderRadius: 16,
        marginBottom: 12,
        backgroundColor: "#E5E7EB",
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
        backgroundColor: "#D1D5DB",
        marginRight: 12,
    },
    skeletonText: {
        height: 14,
        backgroundColor: "#D1D5DB",
        borderRadius: 4,
        width: 80,
    },
});