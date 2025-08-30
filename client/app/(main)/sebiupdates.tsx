import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { styles as styles2 } from "@/src/modules/sebisearch/styles";
import updates from "@/src/modules/security/SEBI_DATA/press.json";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import {
    Animated,
    FlatList,
    Linking,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

interface Update {
    date: string;
    type: string;
    title: string;
    link: string;
}

export default function SebiUpdates() {
    const [search, setSearch] = useState("");
    const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
    const [filter, setFilter] = useState<string>("all");

    const data = updates as Update[];

    // ✅ Extract categories dynamically
    const categories = useMemo(() => {
        const unique = Array.from(new Set(data.map((d) => d.type)));
        return ["all", ...unique];
    }, [data]);

    const filteredData = useMemo(() => {
        let result = data;

        if (search.trim()) {
            result = result.filter((item) =>
                item.title.toLowerCase().includes(search.toLowerCase())
            );
        }

        if (filter !== "all") {
            result = result.filter((item) => item.type === filter);
        }

        result = [...result].sort((a, b) => {
            const da = new Date(a.date).getTime();
            const db = new Date(b.date).getTime();
            return sortBy === "newest" ? db - da : da - db;
        });

        return result;
    }, [search, sortBy, filter, data]);

    const renderItem = ({ item }: { item: Update }) => (
        <View style={styles.card}>
            {/* Title */}
            <View style={styles.row}>
                <MaterialIcons name="article" size={22} color="#007AFF" />
                <Text style={styles.title}>{item.title}</Text>
            </View>

            {/* Date & Type */}
            <View style={styles.metaRow}>
                <View style={styles.row}>
                    <Feather name="calendar" size={14} color="#555" />
                    <Text style={styles.date}>{item.date}</Text>
                </View>
                <View style={styles.badge}>
                    <Text style={styles.badgeText}>{item.type}</Text>
                </View>
            </View>

            {/* Link */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => Linking.openURL(item.link)}
            >
                <Text style={styles.buttonText}>Read More</Text>
                <Feather name="external-link" size={16} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <AppSafeAreaView style={{ flex: 1 }}>
            <CommonToolbar title="SEBI NEWS" />
            <View
                style={{
                    flexDirection: "row",
                    gap: 16,
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Image
                    source={require("@/assets/images/SEBI_LOGO.png")}
                    contentFit="contain"
                    style={{ width: 100, height: 100, borderRadius: 60 }}
                    priority={"high"}
                />
            </View>
            {/* ✅ Banner */}
            <Animated.View
                style={[
                    styles2.dataSourceBanner,
                ]}
            >
                <View style={styles2.dataSourceContent}>
                    <Ionicons name="shield-checkmark" size={16} color="#0284C7" />
                    <Text style={styles2.dataSourceText}>
                        Verified data sourced from{" "}
                        <Text
                            style={styles2.link}
                            onPress={() => Linking.openURL("https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&sid=6&ssid=0&smid=0")}
                        >
                            sebi.gov.in
                        </Text>
                    </Text>
                </View>
            </Animated.View>
            <View>
                {/* Search */}
                <View style={styles.searchBar}>
                    <Feather name="search" size={18} color="#888" />
                    <TextInput
                        style={styles.input}
                        placeholder="Search updates..."
                        value={search}
                        onChangeText={setSearch}
                    />
                </View>

                {/* Filters */}
                <View style={styles.filterRow}>
                    {categories.map((cat) => (
                        <TouchableOpacity
                            key={cat}
                            style={[styles.filterBtn, filter === cat && styles.filterActive]}
                            onPress={() => setFilter(cat)}
                        >
                            <Text
                                style={[
                                    styles.filterText,
                                    filter === cat && styles.filterTextActive,
                                ]}
                            >
                                {cat}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {/* Sort Toggle */}
                <TouchableOpacity
                    style={styles.sortBtn}
                    onPress={() =>
                        setSortBy((prev) => (prev === "newest" ? "oldest" : "newest"))
                    }
                >
                    <Feather
                        name={sortBy === "newest" ? "arrow-down" : "arrow-up"}
                        size={16}
                        color="#007AFF"
                    />
                    <Text style={styles.sortText}>
                        {sortBy === "newest" ? "Newest First" : "Oldest First"}
                    </Text>
                </TouchableOpacity>

                {/* List */}
                <FlatList
                    data={filteredData}
                    keyExtractor={(_, i) => i.toString()}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: 40 }}
                />
            </View>
        </AppSafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#f8f9fb", paddingTop: 12 },
    searchBar: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        margin: 12,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 12,
        shadowColor: "#000",
        shadowOpacity: 0.05,
        shadowRadius: 4,
        elevation: 2,
    },
    input: { flex: 1, marginLeft: 8, fontSize: 14 },
    filterRow: {
        flexDirection: "row",
        flexWrap: "wrap",
        paddingHorizontal: 12,
        marginBottom: 6,
    },
    filterBtn: {
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: "#ddd",
        marginRight: 8,
        marginBottom: 6,
    },
    filterActive: { backgroundColor: "#007AFF22", borderColor: "#007AFF" },
    filterText: { fontSize: 13, color: "#333" },
    filterTextActive: { color: "#007AFF", fontWeight: "600" },
    sortBtn: {
        flexDirection: "row",
        alignItems: "center",
        marginHorizontal: 12,
        marginBottom: 8,
    },
    sortText: { marginLeft: 6, fontSize: 13, color: "#007AFF" },
    card: {
        backgroundColor: "#fff",
        marginHorizontal: 12,
        marginVertical: 8,
        padding: 16,
        borderRadius: 16,
        shadowColor: "#000",
        shadowOpacity: 0.06,
        shadowRadius: 6,
        elevation: 3,
    },
    row: { flexDirection: "row", alignItems: "center" },
    metaRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 12,
    },
    title: { fontSize: 15, fontWeight: "600", marginLeft: 8, flex: 1 },
    date: { marginLeft: 6, fontSize: 12, color: "#555" },
    badge: {
        backgroundColor: "#007AFF22",
        borderRadius: 12,
        paddingHorizontal: 10,
        paddingVertical: 4,
    },
    badgeText: { fontSize: 12, color: "#007AFF", fontWeight: "500" },
    button: {
        marginTop: 14,
        flexDirection: "row",
        backgroundColor: "#007AFF",
        padding: 10,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
    },
    buttonText: { color: "#fff", fontSize: 14, marginRight: 6 },
});
