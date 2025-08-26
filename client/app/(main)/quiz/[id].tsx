import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import TestScreenShimmer from "@/src/modules/quizGame/components/shimmers/TestScreenShimmer";
import TestScreen from "@/src/modules/quizGame/screens/TestScreen";
import { getSingleLevelQuiz } from "@/src/modules/quizGame/services/quiz";
import { router, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect } from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

const Id = () => {
  const { id: level } = useLocalSearchParams();
  // console.log({ level });

  const [data, setData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getSingleLevelQuiz(level as string);
      // console.log({ res });
      setData(res);
      setLoading(false);
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Sorry, unable to get quiz data",
      });
      setLoading(false);
      router.replace("/quiz");
    }
  }, [level]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (!loading && data)
    return (
      <TestScreen
        quizzes={data?.quizzes}
        // activiyHistory={data?.activityHistory}
      />
    );
  return (
    <AppSafeAreaView>
      <TestScreenShimmer />
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({});

export default Id;
