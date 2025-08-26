import React from "react";
import { View, StyleSheet } from "react-native";
import CardShimmer from "./CardShimmer";
import CustomToolbar from "@/src/components/toolBars/mainToolBar";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import Colors from "@/src/theme/colors";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";

const CommunityScreenShimmer = () => {
  return (
    <>
      <AppLinearGradient
        colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.2]}
        style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      />
      <AppSafeAreaView style={{ paddingBottom: 0, paddingTop: 0 }}>
        <CustomToolbar textColor="white" rightIcon={true} streak={true} />
      </AppSafeAreaView>
      <View style={styles.container}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.item}>
            <View style={styles.dateLine} />
            <CardShimmer />
          </View>
        ))}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingTop: 0,
    gap: 20,
  },
  item: {
    gap: 10,
  },
  dateLine: {
    height: 16,
    width: "40%",
    borderRadius: 4,
    backgroundColor: "#e1e1e1",
  },
});

export default CommunityScreenShimmer;
