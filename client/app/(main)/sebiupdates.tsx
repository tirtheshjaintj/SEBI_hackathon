import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import updates from "@/src/modules/security/SEBI_DATA/press.json";
import { Feather, Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";
import Colors from "@/src/theme/colors";
import { prettyDate } from "@/src/utils/datetime/datetime";

interface Update {
  date: string;
  type: string;
  title: string;
  link: string;
}

const { width } = Dimensions.get("window");

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
        <View style={styles.iconContainer}>
          <MaterialIcons name="article" size={20} color={Colors.white} />
        </View>
        <Text style={styles.title}>{item.title}</Text>
      </View>

      {/* Date & Type */}
      <View style={styles.metaRow}>
        <View style={styles.row}>
          <Feather
            name="calendar"
            size={14}
            color={Colors.textSecondaryLight}
          />
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View
          style={[
            styles.badge,
            { backgroundColor: getCategoryColor(item.type) },
          ]}
        >
          <Text style={styles.badgeText}>{item.type}</Text>
        </View>
      </View>

      {/* Link */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(item.link)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={[Colors.primaryCyanColor, Colors.gradientCyanPrimary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.buttonGradient}
        >
          <Text style={styles.buttonText}>Read Full Release</Text>
          <Feather name="external-link" size={16} color={Colors.white} />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const getCategoryColor = (type: string) => {
    const colors: { [key: string]: string } = {
      "Press Release": Colors.primaryCyanColor,
      Circular: Colors.pink,
      Order: Colors.bluePurple,
      Notice: Colors.themeSecondary,
      default: Colors.primaryCyanColor,
    };
    return colors[type] || colors.default;
  };

  return (
    <AppSafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      {/* Header with gradient */}
      <StatusBar style="dark" />
      <CommonToolbar title="SEBI Updates" />

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Verified Banner */}
        <View style={styles.dataSourceBanner}>
          <View style={styles.bannerContent}>
            <Ionicons
              name="shield-checkmark"
              size={18}
              color={Colors.primaryCyanColor}
            />
            <Text style={styles.dataSourceText}>
              Verified data sourced from{" "}
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL(
                    "https://www.sebi.gov.in/sebiweb/home/HomeAction.do?doListingAll=yes&sid=6&ssid=0&smid=0"
                  )
                }
              >
                sebi.gov.in
              </Text>
            </Text>
          </View>
        </View>

        {/* Search and Sort Container */}
        <View style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Feather
              name="search"
              size={20}
              color={Colors.textSecondaryLight}
            />
            <TextInput
              style={styles.input}
              placeholder="Search updates..."
              placeholderTextColor={Colors.textSecondaryLight}
              value={search}
              onChangeText={setSearch}
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch("")}>
                <Feather
                  name="x-circle"
                  size={20}
                  color={Colors.textSecondaryLight}
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
        {/* Sort Toggle */}

        {/* Category Filters */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryContainer}
          contentContainerStyle={styles.categoryContent}
        >
          <TouchableOpacity
            style={styles.sortBtn}
            onPress={() =>
              setSortBy((prev) => (prev === "newest" ? "oldest" : "newest"))
            }
            activeOpacity={0.7}
          >
            <Feather
              name={sortBy === "newest" ? "arrow-down" : "arrow-up"}
              size={16}
              color={Colors.primaryCyanColor}
            />
            {/* <Text style={styles.sortText}>
            {sortBy === "newest" ? "Newest First" : "Oldest First"}
          </Text> */}
          </TouchableOpacity>
          {categories.map((cat) => (
            <TouchableOpacity
              key={cat}
              onPress={() => setFilter(cat)}
              activeOpacity={0.8}
            >
              <View
                style={[
                  styles.categoryPill,
                  filter === cat && styles.categoryPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.categoryText,
                    filter === cat && styles.categoryTextActive,
                  ]}
                >
                  {cat}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Results Count */}
        <View style={styles.resultsContainer}>
          <Text style={styles.resultsText}>
            {filteredData.length}{" "}
            {filteredData.length === 1 ? "result" : "results"} found
          </Text>
        </View>

        {/* List */}
        {filteredData.length > 0 ? (
          <FlatList
            data={filteredData}
            keyExtractor={(_, i) => i.toString()}
            renderItem={renderItem}
            scrollEnabled={false}
            contentContainerStyle={styles.listContainer}
          />
        ) : (
          <View style={styles.emptyState}>
            <Feather
              name="search"
              size={48}
              color={Colors.textSecondaryVeryLight}
            />
            <Text style={styles.emptyStateTitle}>No results found</Text>
            <Text style={styles.emptyStateText}>
              Try adjusting your search or filter criteria
            </Text>
          </View>
        )}
      </ScrollView>
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  headerGradient: {
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 5,
  },
  logoContainer: {
    alignItems: "center",
    paddingHorizontal: 20,
    marginTop: 10,
  },
  logoBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    padding: 12,
    borderWidth: 2,
    borderColor: "rgba(255, 255, 255, 0.3)",
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  headerSubtitle: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: "500",
    marginTop: 12,
    textAlign: "center",
  },
  dataSourceBanner: {
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    backgroundColor: Colors.grayTint,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
  },
  bannerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderRadius: 16,
  },
  dataSourceText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.textSecondaryDark,
    fontWeight: "500",
  },
  link: {
    color: Colors.primaryCyanColor,
    fontWeight: "600",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    // height: 60,
    marginTop: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  input: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: Colors.textPrimary,
    fontWeight: "500",
  },
  sortBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    // paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sortText: {
    marginLeft: 6,
    fontSize: 14,
    color: Colors.primaryCyanColor,
    fontWeight: "600",
  },
  categoryContainer: {
    marginTop: 20,
  },
  categoryContent: {
    paddingHorizontal: 20,
    gap: 8,
  },
  categoryPill: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
  },
  categoryPillActive: {
    backgroundColor: Colors.primaryCyanColor,
    borderColor: Colors.primaryCyanColor,
  },
  categoryText: {
    fontSize: 14,
    color: Colors.textSecondaryDark,
    fontWeight: "500",
  },
  categoryTextActive: {
    color: Colors.white,
    fontWeight: "600",
  },
  resultsContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 8,
  },
  resultsText: {
    fontSize: 14,
    color: Colors.textSecondaryLight,
    fontWeight: "500",
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: Colors.white,
    marginVertical: 8,
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryCyanColor,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.textPrimary,
    lineHeight: 22,
  },
  metaRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },
  date: {
    marginLeft: 6,
    fontSize: 13,
    color: Colors.textSecondaryLight,
  },
  badge: {
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  badgeText: {
    fontSize: 12,
    color: Colors.white,
    fontWeight: "500",
  },
  button: {
    marginTop: 16,
    borderRadius: 12,
    overflow: "hidden",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 14,
    paddingVertical: 12,
    borderRadius: 12,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: "600",
    marginRight: 8,
  },
  emptyState: {
    alignItems: "center",
    justifyContent: "center",
    padding: 40,
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: Colors.grayTint,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: Colors.purpleGrayTint,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary,
    marginTop: 16,
  },
  emptyStateText: {
    fontSize: 14,
    color: Colors.textSecondaryLight,
    marginTop: 8,
    textAlign: "center",
  },
});
