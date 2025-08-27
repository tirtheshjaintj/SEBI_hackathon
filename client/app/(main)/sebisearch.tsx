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

// ✅ Animation wrapper component (fixes hook issue)
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
            })),
            ...sebiApps.map((a: any) => ({
                type: "app",
                id: `app-${a.row_id}`,
                name: a.app_product_name || a.app_name || "",
                company: a.company_name || "",
                developer: a.developer_name || "",
                playStore: a.play_store_link || "",
                appStore: a.app_store_link || "",
            }))
        ];
    }, []);

    // ✅ Proper search filtering
    const results = useMemo(() => {
        const q = query.toLowerCase();
        return combinedData.filter(
            (item) =>
                item.name?.toLowerCase().includes(q)
        );
    }, [query, combinedData]);

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
                        <Text style={styles.title}>{item.name}</Text>
                    </View>

                    {item.type === "app" ? (
                        <>
                            <View style={styles.detailRow}>
                                <Ionicons name="business" size={16} color="#007AFF" />
                                <Text style={styles.detailText}>{item.company}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Ionicons name="person" size={16} color="#007AFF" />
                                <Text style={styles.detailText}>{item.developer}</Text>
                            </View>
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
                                <MaterialIcons name="qr-code" size={16} color="#007AFF" />
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
        <AppSafeAreaView style={{ flex: 1, backgroundColor: "#F5F5F5" }}>
            <CommonToolbar title="SEBI Verified Search" />

            {/* ✅ Banner */}
            <Animated.View
                style={[
                    styles.dataSourceBanner,
                    { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
                ]}
            >
                <View style={styles.dataSourceContent}>
                    <Ionicons name="shield-checkmark" size={16} color="#28A745" />
                    <Text style={styles.dataSourceText}>
                        Data sourced in real-time from{" "}
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
                    <Ionicons name="search" size={20} color="#808080" style={styles.searchIcon} />
                    <TextInput
                        placeholder="Search SEBI registered apps or brokers..."
                        placeholderTextColor="#808080"
                        value={query}
                        onChangeText={setQuery}
                        style={styles.input}
                    />
                    {query.length > 0 && (
                        <TouchableOpacity onPress={() => setQuery("")} style={styles.clearButton}>
                            <Ionicons name="close-circle" size={20} color="#808080" />
                        </TouchableOpacity>
                    )}
                </Animated.View>

                {/* ✅ Results */}
                {query.length > 0 && (
                    <Text style={styles.resultsCount}>
                        {results.length} result{results.length !== 1 ? "s" : ""} found
                    </Text>
                )}

                <FlatList
                    data={results}
                    keyExtractor={(item, index) => `${item.id}-${index}`}
                    renderItem={renderItem}
                    ListEmptyComponent={
                        query ? (
                            <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
                                <Ionicons name="search-outline" size={60} color="#C0C0C0" />
                                <Text style={styles.emptyStateText}>No results found</Text>
                                <Text style={styles.emptyStateSubtext}>
                                    Try different keywords or check the official SEBI website
                                </Text>
                            </Animated.View>
                        ) : (
                            <Animated.View style={[styles.emptyState, { opacity: fadeAnim }]}>
                                <Ionicons name="search-outline" size={60} color="#C0C0C0" />
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
