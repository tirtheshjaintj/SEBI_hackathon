import BudgetScreenShimmer from "@/src/modules/budgetTracker/components/shimmers/BudgetScreenShimmer";
import BudgetScreen from "@/src/modules/budgetTracker/screens/HomeBudgetScreen";
import { fetchBudgetData } from "@/src/modules/budgetTracker/services/budget";
import { getSavedItem } from "@/src/utils/storage/async_storage";
import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const Budget = () => {
  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  const fetchData = useCallback(async () => {
    try {
      console.log("⏳ fetchData started");
      setLoading(true);

      const startTime = Date.now();

      let range = (await getSavedItem("budgetRange")) as string | null;
      console.log("✅ Got range:", range);
      if (!range) range = "monthly";

      if (range !== "monthly" && range !== "daily" && range !== "weekly") {
        range = "monthly";
      }

      console.log("📡 Fetching budget data...");
      const res = await fetchBudgetData({
        range: range as "monthly" | "daily" | "weekly",
      });

      console.log("✅ Budget data fetched in", Date.now() - startTime, "ms");

      if (res) {
        setData(res);
      }
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, unable to get budget data",
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    fetchData();
  }, []);
  // console.log(data);

  if (!loading) return <BudgetScreen data={data} fetchData={fetchData} />;
  // if (!loading) return <FallbackScreen />;
  return <BudgetScreenShimmer />;
};

const styles = StyleSheet.create({});

export default Budget;
