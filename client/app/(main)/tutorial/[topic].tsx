import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import { useLocalSearchParams } from "expo-router";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Videos = () => {
  const { topic } = useLocalSearchParams();
  return (
    <View>
      <AppSafeAreaView>
        <CommonToolbar title="Fraud Awareness" />
        <Text>Videos Cards list</Text>
      </AppSafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({});

export default Videos;
