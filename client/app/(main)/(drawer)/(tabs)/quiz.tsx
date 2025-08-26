import QuizScreen from "@/src/modules/quizGame/screens/QuizScreen";
import { getAllLevelsData } from "@/src/modules/quizGame/services/quiz";
import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

const Quiz = () => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const {
    i18n: { language: locale },
  } = useTranslation() as any;

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getAllLevelsData();
      // console.log({ res });
      if (res) {
        setData(res.levels);
      }
      setLoading(false);
    } catch (error) {
      setError(true);
      console.error(error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData, locale]);

  return (
    <QuizScreen loading={loading} data={data} refreshHanlder={fetchData} />
  );
};

const styles = StyleSheet.create({});

export default Quiz;
