import { FontAwesome5, Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
    Animated,
    FlatList,
    Linking,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";

import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { styles } from "@/src/modules/sebisearch/styles";
import sebiApps from "@/src/modules/security/SEBI_DATA/apps.json";
import socialData from "@/src/modules/security/SEBI_DATA/socials.json";

// ✅ Animation wrapper component
const AnimatedCard = ({ index, children }: { index: number; children: React.ReactNode }) => {
    const anim = React.useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.spring(anim, {
            toValue: 1,
            delay: index * 100,
            friction: 8,
            useNativeDriver: true,
        }).start();
    }, [anim, index]);

    return (
        <Animated.View
            style={{
                opacity: anim,
                transform: [
                    {
                        translateY: anim.interpolate({
                            inputRange: [0, 1],
                            outputRange: [50, 0],
                        }),
                    },
                ],
            }}
        >
            {children}
        </Animated.View>
    );
};

export default function SearchScreen() {
    const [query, setQuery] = useState("");
    const [fadeAnim] = useState(new Animated.Value(1));
    const [slideAnim] = useState(new Animated.Value(0));
    const [activeFilter, setActiveFilter] = useState("all");

    // ✅ Prepare combined data once
    const combinedData = useMemo(() => {
        return [
            ...socialData.map((s: any) => ({
                type: "social",
                id: `social-${s["Member Code"]}`,
                name: s["Member Name"] || "",
                memberCode: s["Member Code"] || "",
                facebook: s["Facebook"] || "",
                instagram: s["Instagram"] || "",
                twitter: s["X (formerly Twitter)"] || s["Twitter"] || "",
                youtube: s["Youtube"] || "",
                linkedin: s["LinkedIn"] || "",
                searchableText: `${s["Member Name"]} ${s["Member Code"]} ${s["Facebook"]} ${s["Instagram"]} ${s["X (formerly Twitter)"] || s["Twitter"] || ""} ${s["Youtube"]} ${s["LinkedIn"]}`.toLowerCase(),
            })),
            ...sebiApps.map((a: any) => ({
                type: "app",
                id: `app-${a.row_id}`,
                name: a.app_product_name || a.app_name || "",
                company: a.company_name || "",
                developer: a.developer_name || "",
                playStore: a.play_store_link || "",
                appStore: a.app_store_link || "",
                searchableText: `${a.app_product_name || a.app_name || ""} ${a.company_name || ""} ${a.developer_name || ""}`.toLowerCase(),
            }))
        ];
    }, []);

    // ✅ Proper search filtering across all attributes
    const results = useMemo(() => {
        const q = query.toLowerCase().trim();

        let filteredResults = combinedData.filter(item =>
            item.searchableText.includes(q)
        );

        // Apply type filter if needed
        if (activeFilter !== "all") {
            filteredResults = filteredResults.filter(item => item.type === activeFilter);
        }

        return filteredResults;
    }, [query, combinedData, activeFilter]);

    const renderItem = ({ item, index }: { item: any; index: number }) => {
        return (
            <AnimatedCard index={index}>
                <View style={styles.card}>
                    <View style={styles.cardHeader}>
                        <View style={item.type === "app" ? styles.appIcon : styles.socialIcon}>
                            <Ionicons
                                name={item.type === "app" ? "phone-portrait" : "people"}
                                size={20}
                                color="#fff"
                            />
                        </View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.title}>{item.name}</Text>
                            <View style={[styles.typeBadge, item.type === "app" ? styles.appBadge : styles.socialBadge]}>
                                <Text style={[styles.badgeText, item.type === "app" ? styles.appBadgeText : styles.socialBadgeText]}>
                                    {item.type === "app" ? "APP" : "BROKER"}
                                </Text>
                            </View>
                        </View>
                    </View>

                    {item.type === "app" ? (
                        <>
                            {item.company && (
                                <View style={styles.detailRow}>
                                    <Ionicons name="business" size={16} color="#3B82F6" />
                                    <Text style={styles.detailText}>{item.company}</Text>
                                </View>
                            )}
                            {item.developer && (
                                <View style={styles.detailRow}>
                                    <Ionicons name="person" size={16} color="#3B82F6" />
                                    <Text style={styles.detailText}>{item.developer}</Text>
                                </View>
                            )}
                            <View style={styles.linkContainer}>
                                {!!item.playStore && (
                                    <TouchableOpacity
                                        style={styles.linkButton}
                                        onPress={() => Linking.openURL(item.playStore)}
                                    >
                                        <FontAwesome5 name="google-play" size={14} color="#fff" />
                                        <Text style={styles.linkButtonText}>Play Store</Text>
                                    </TouchableOpacity>
                                )}
                                {!!item.appStore && (
                                    <TouchableOpacity
                                        style={[styles.linkButton, { backgroundColor: "#34C759" }]}
                                        onPress={() => Linking.openURL(item.appStore)}
                                    >
                                        <Ionicons name="logo-apple" size={16} color="#fff" />
                                        <Text style={styles.linkButtonText}>App Store</Text>
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    ) : (
                        <>
                            <View style={styles.detailRow}>
                                <MaterialIcons name="qr-code" size={16} color="#8B5CF6" />
                                <Text style={styles.detailText}>
                                    Member Code: {item.memberCode}
                                </Text>
                            </View>
                            <View style={styles.linkContainer}>
                                {item.facebook && item.facebook !== "NIL" && (
                                    <TouchableOpacity
                                        style={[styles.socialButton, { backgroundColor: "#3b5998" }]}
                                        onPress={() => Linking.openURL(item.facebook)}
                                    >
                                        <FontAwesome5 name="facebook" size={14} color="#fff" />
                                    </TouchableOpacity>
                                )}
                                {item.instagram && item.instagram !== "NIL" && (
                                    <TouchableOpacity
                                        style={[styles.socialButton, { backgroundColor: "#E1306C" }]}
                                        onPress={() => Linking.openURL(item.instagram)}
                                    >
                                        <FontAwesome5 name="instagram" size={14} color="#fff" />
                                    </TouchableOpacity>
                                )}
                                {item.twitter && item.twitter !== "NIL" && (
                                    <TouchableOpacity
                                        style={[styles.socialButton, { backgroundColor: "#1DA1F2" }]}
                                        onPress={() => Linking.openURL(item.twitter)}
                                    >
                                        <FontAwesome5 name="twitter" size={14} color="#fff" />
                                    </TouchableOpacity>
                                )}
                                {item.youtube && item.youtube !== "NIL" && (
                                    <TouchableOpacity
                                        style={[styles.socialButton, { backgroundColor: "#FF0000" }]}
                                        onPress={() => Linking.openURL(item.youtube)}
                                    >
                                        <FontAwesome5 name="youtube" size={14} color="#fff" />
                                    </TouchableOpacity>
                                )}
                                {item.linkedin && item.linkedin !== "NIL" && (
                                    <TouchableOpacity
                                        style={[styles.socialButton, { backgroundColor: "#0077B5" }]}
                                        onPress={() => Linking.openURL(item.linkedin)}
                                    >
                                        <FontAwesome5 name="linkedin" size={14} color="#fff" />
                                    </TouchableOpacity>
                                )}
                            </View>
                        </>
                    )}
                </View>
            </AnimatedCard>
        );
    };

    return (
        <AppSafeAreaView style={{ flex: 1, backgroundColor: "#F8FAFF" }}>
            <CommonToolbar title="SEBI Verified Search" />

            {/* ✅ Banner */}
            <Animated.View
                style={[
                    styles.dataSourceBanner,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                <View style={styles.dataSourceContent}>
                    <Ionicons name="shield-checkmark" size={16} color="#0284C7" />
                    <Text style={styles.dataSourceText}>
                        Verified data sourced from{" "}
                        <Text
                            style={styles.link}
                            onPress={() => Linking.openURL("https://investor.sebi.gov.in")}
                        >
                            investor.sebi.gov.in
                        </Text>
                    </Text>
                </View>
            </Animated.View>

            <View style={styles.container}>
                {/* ✅ Search box */}
                <Animated.View
                    style={[
                        styles.searchContainer,
                        { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                    ]}
                >
                    <Ionicons name="search" size={20} color="#64748B" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search SEBI registered apps or brokers..."
                        placeholderTextColor="#94A3B8"
                        value={query}
                        onChangeText={setQuery}
                        style={styles.input}
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={20} color="#94A3B8" />
                        </TouchableOpacity>
                    )}
                </Animated.View>

                {/* ✅ Filter buttons */}

                <>
                    <Text style={styles.sectionTitle}>Filter Results</Text>
                    <View style={styles.filterContainer}>
                        <TouchableOpacity
                            style={[styles.filterButton, activeFilter === "all" && styles.activeFilter]}
                            onPress={() => setActiveFilter("all")}
                        >
                            <Text style={[styles.filterText, activeFilter === "all" && styles.activeFilterText]}>
                                All
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, activeFilter === "app" && styles.activeFilter]}
                            onPress={() => setActiveFilter("app")}
                        >
                            <Text style={[styles.filterText, activeFilter === "app" && styles.activeFilterText]}>
                                Apps
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.filterButton, activeFilter === "social" && styles.activeFilter]}
                            onPress={() => setActiveFilter("social")}
                        >
                            <Text style={[styles.filterText, activeFilter === "social" && styles.activeFilterText]}>
                                Brokers
                            </Text>
                        </TouchableOpacity>
                    </View>
                </>


                {/* ✅ Results count */}
                {query.length > 0 && (
                    <Text style={styles.resultsCount}>
                        {results.length} result{results.length !== 1 ? "s" : ""} found
                        {activeFilter !== "all" && ` in ${activeFilter === "app" ? "Apps" : "Brokers"}`}
                    </Text>
                )}

                <FlatList
                    data={results}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        query ? (
                            <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
                                <Ionicons name="search-outline" size={60} color="#CBD5E1" />
                                <Text style={styles.emptyStateText}>No results found</Text>
                                <Text style={styles.emptyStateSubtext}>
                                    Try different keywords or check the official SEBI website
                                </Text>
                            </Animated.View>
                        ) : (
                            <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
                                <Ionicons name="search-outline" size={60} color="#CBD5E1" />
                                <Text style={styles.emptyStateText}>Search SEBI Database</Text>
                                <Text style={styles.emptyStateSubtext}>
                                    Enter keywords to find SEBI registered apps and brokers
                                </Text>
                            </Animated.View>
                        )
                    }
                />
            </View>
        </AppSafeAreaView>
    );
}