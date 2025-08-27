import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { FontAwesome5, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function LiveStocks() {
    const [gainers, setGainers] = useState<any[]>([]);
    const [losers, setLosers] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState("gainers");
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        fetchStocks();
    }, []);

    const fetchStocks = async () => {
        try {
            setRefreshing(true);
            const [gainersRes, losersRes] = await Promise.all([
                fetch("https://financialmodelingprep.com/stable/biggest-gainers?apikey=HkRHhyCcXLYxdMSrsAZ8PMPttzQI2Jl0"),
                fetch("https://financialmodelingprep.com/stable/biggest-losers?apikey=HkRHhyCcXLYxdMSrsAZ8PMPttzQI2Jl0")
            ]);
            setGainers(await gainersRes.json());
            setLosers(await losersRes.json());
        } catch (err) {
            console.error(err);
        } finally {
            setRefreshing(false);
        }
    };

    const renderItem = ({ item, index }: any) => (
        <View style={[
            styles.item,
            index % 2 === 0 ? styles.itemEven : styles.itemOdd
        ]}>
            <View style={styles.stockInfo}>
                <View style={styles.iconContainer}>
                    <FontAwesome5
                        name={item.changesPercentage > 0 ? "arrow-up" : "arrow-down"}
                        size={16}
                        color={item.changesPercentage > 0 ? "#21BF73" : "#FF2E63"}
                        style={styles.trendIcon}
                    />
                </View>
                <View>
                    <Text style={styles.symbol}>{item.symbol}</Text>
                    <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                </View>
            </View>

            <View style={styles.priceInfo}>
                <Text style={styles.price}>${item.price?.toFixed(2)}</Text>
                <View style={[
                    styles.percentageContainer,
                    item.changesPercentage > 0 ? styles.positiveChange : styles.negativeChange
                ]}>
                    <Ionicons
                        name={item.changesPercentage > 0 ? "caret-up" : "caret-down"}
                        size={14}
                        color={item.changesPercentage > 0 ? "#21BF73" : "#FFFFFF"}
                    />
                    <Text style={[
                        styles.percentage,
                        item.changesPercentage > 0 ? styles.positiveText : styles.negativeText
                    ]}>
                        {parseFloat(Math.abs(item.changesPercentage).toFixed(2)).toString()}%
                    </Text>
                </View>
            </View>
        </View>
    );

    const TabButton = ({ title, isActive, onPress, iconName }: any) => (
        <TouchableOpacity
            style={[styles.tabButton, isActive && styles.activeTab]}
            onPress={onPress}
        >
            <Ionicons
                name={iconName}
                size={20}
                color={isActive ? "#FFFFFF" : "#777"}
            />
            <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <AppSafeAreaView style={styles.safeArea}>
            <CommonToolbar title="Live Stocks" />

            <View style={styles.header}>
                <View style={styles.marketStatus}>
                    <View style={styles.statusIndicator} />
                    <Text style={styles.statusText}>Live Market</Text>
                </View>
            </View>

            <View style={styles.tabContainer}>
                <TabButton
                    title="Top Gainers"
                    isActive={activeTab === "gainers"}
                    onPress={() => setActiveTab("gainers")}
                    iconName="trending-up"
                />
                <TabButton
                    title="Top Losers"
                    isActive={activeTab === "losers"}
                    onPress={() => setActiveTab("losers")}
                    iconName="trending-down"
                />
            </View>

            <View style={styles.listContainer}>
                {activeTab === "gainers" ? (
                    <FlatList
                        data={gainers}
                        keyExtractor={(item) => item.symbol}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={fetchStocks}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <FlatList
                        data={losers}
                        keyExtractor={(item) => item.symbol}
                        renderItem={renderItem}
                        refreshing={refreshing}
                        onRefresh={fetchStocks}
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
        backgroundColor: "#F8FAFF"
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        backgroundColor: '#FFFFFF',
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    marketStatus: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#21BF73',
        marginRight: 8
    },
    statusText: {
        fontSize: 14,
        color: '#555',
        fontWeight: '500'
    },
    refreshButton: {
        padding: 4
    },
    tabContainer: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 16,
        paddingTop: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#F0F0F0'
    },
    tabButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        marginHorizontal: 4,
        borderRadius: 12,
        backgroundColor: '#F5F5F7',
        marginBottom: 8
    },
    activeTab: {
        backgroundColor: '#0084FF'
    },
    tabText: {
        marginLeft: 6,
        fontSize: 14,
        fontWeight: '600',
        color: '#777'
    },
    activeTabText: {
        color: '#FFFFFF'
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 8,
        backgroundColor: '#FFFFFF'
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 14,
        paddingHorizontal: 12,
        borderRadius: 12,
        marginVertical: 4
    },
    itemEven: {
        backgroundColor: '#F8FAFF'
    },
    itemOdd: {
        backgroundColor: '#FFFFFF'
    },
    stockInfo: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: '#F0F7FF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12
    },
    trendIcon: {
        // Additional styling if needed
    },
    symbol: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#222'
    },
    name: {
        fontSize: 12,
        color: '#777',
        maxWidth: 150
    },
    priceInfo: {
        alignItems: 'flex-end'
    },
    price: {
        fontWeight: '600',
        fontSize: 16,
        color: '#222',
        marginBottom: 4
    },
    percentageContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12
    },
    positiveChange: {
        backgroundColor: 'rgba(33, 191, 115, 0.15)'
    },
    negativeChange: {
        backgroundColor: 'rgba(255, 46, 99, 0.15)'
    },
    percentage: {
        fontSize: 13,
        fontWeight: '700',
        marginLeft: 2
    },
    positiveText: {
        color: '#21BF73'
    },
    negativeText: {
        color: '#FF2E63'
    }
});