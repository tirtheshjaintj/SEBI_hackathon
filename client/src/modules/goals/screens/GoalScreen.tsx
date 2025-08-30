import axiosInstance from "@/src/apis/axiosInstance";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { FAB } from "react-native-paper";
import NewsShimmer from "../../news/NewsShimmer";
import AddGoalModal from "../components/AddGoalModal";
import GoalCard from "../components/GoalCard";
import GoalFilters from "../components/GoalFilters";
import Colors from "@/src/theme/colors";
import { StatusBar } from "expo-status-bar";

const { height } = Dimensions.get("window");

export interface Filter {
  status: string;
  category: string;
  type: string;
}

export default function GoalScreen() {
  const [allGoals, setAllGoals] = useState([]);
  const [filteredGoals, setFilteredGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [filters, setFilters] = useState<Filter>({
    status: "",
    category: "",
    type: "",
  });

  const fetchGoals = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/goal");
      setAllGoals(res.data);
      setFilteredGoals(res.data); // default = unfiltered
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };
  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchGoals();
    setRefreshing(false);
  };

  useEffect(() => {
    fetchGoals();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [filters, allGoals]);

  const applyFilters = () => {
    let result = [...allGoals];

    if (filters.status) {
      result = result.filter((goal: any) => goal.status === filters.status);
    }

    if (filters.category) {
      result = result.filter((goal: any) => goal.category === filters.category);
    }

    if (filters.type) {
      result = result.filter((goal: any) => goal.type === filters.type);
      console.log(filters.type);
    }
    setFilteredGoals(result);
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  const { t } = useTranslation();

  return (
    <AppSafeAreaView style={styles.container}>
      <StatusBar style="dark" translucent />

      <CommonToolbar title={t("Your Goals")} />
      <GoalFilters onFilterChange={handleFilterChange} />

      <View style={styles.contentWrapper}>
        {loading ? (
          <NewsShimmer />
        ) : filteredGoals.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons
              name="trophy-outline"
              size={64}
              color={Colors.primaryCyanColor}
              style={{ marginBottom: 16 }}
            />
            <Text style={styles.emptyTitle}>{t("No goals yet")} !</Text>
            <Text style={styles.emptyText}>
              {t("Start your journey by adding a goal now")}.
            </Text>
            <TouchableOpacity
              style={styles.emptyBtn}
              onPress={() => setShowAddModal(true)}
            >
              <Text style={styles.emptyBtnText}>
                + {t("Create Your First Goal")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            style={styles.container}
            data={filteredGoals}
            keyExtractor={(item: any) => item._id}
            renderItem={({ item }) => (
              <GoalCard goal={item} onUpdate={fetchGoals} />
            )}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            refreshing={refreshing}
            onRefresh={handleRefresh}
          />
        )}
      </View>

      <FAB
        icon="plus"
        style={styles.fab}
        onPress={() => setShowAddModal(true)}
        color="#fff"
      />

      <AddGoalModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={fetchGoals}
      />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({
  emptyTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#2E2E2E",
    marginBottom: 6,
  },
  emptyText: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  emptyBtn: {
    backgroundColor: Colors.primaryCyanColor,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  emptyBtnText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    position: "relative",
  },
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 12,
  },
  listContent: {
    paddingVertical: 12,
    gap: 12,
  },
  emptyState: {
    height: height * 0.4,
    justifyContent: "center",
    alignItems: "center",
  },
  fab: {
    position: "absolute",
    right: 20,
    bottom: 24,
    backgroundColor: Colors.primaryCyanColor,
    elevation: 6,
  },
});
