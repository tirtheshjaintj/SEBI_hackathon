import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import CommunityScreenShimmer from "@/src/modules/community/components/shimmers/CommunityShimmer";
import CommunityScreen from "@/src/modules/community/screens/CommunityScreen";
import { getAllPosts } from "@/src/modules/community/services/community";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";

const Community = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    i18n: { language: locale },
  } = useTranslation() as any;
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllPosts({
        page: 0,
      });

      if (res) {
        setData(res.posts);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData,locale]);

  if (!loading) return <CommunityScreen data={data} refreshHanlder={fetchData} />;

  return (
    <AppSafeAreaView style={{ flex: 1 }}>
      <CommunityScreenShimmer />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Community;
