import axiosInstance from "@/src/apis/axiosInstance";
import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import HomeScreenShimmer from "@/src/modules/home/components/shimmers/HomeScreenShimmer";
import HomeScreen from "@/src/modules/home/screens/HomeScreen";
import React, { useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const Index = () => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [data, setData] = React.useState<any>(null);
  const { isOffline } = useNetworkStatus();
  const {
    i18n: { language: locale },
  } = useTranslation() as any;
  const getData = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await axiosInstance.get("/home");
      // console.log({ res });
      setData(res.data);
      setRefreshing(false);
    } catch (error) {}
  }, []);
  const onRefresh = React.useCallback(() => {
    getData();
  }, [getData]);

  useEffect(() => {
    getData();
  }, [getData, locale]);

  if (!refreshing)
    return (
      <HomeScreen data={data} refreshing={refreshing} onRefresh={onRefresh} />
    );

  return <HomeScreenShimmer />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;
