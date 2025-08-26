import React from "react";
import { StyleSheet, View } from "react-native";
import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import CustomToolbar from "@/src/components/toolBars/mainToolBar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import Shimmer from "@/src/components/shimmer/Shimmer";
import {
  normalize,
  verticalScale,
  scale,
} from "@/src/utils/responsiveness/responsiveness";

const HomeScreenShimmer = () => {
  return (
    <AppSafeAreaView style={{ flex: 1, paddingTop: 0 }}>
      {/* Background gradient */}
      <AppLinearGradient
        colors={[
          Colors.primaryCyanColor,
          Colors.gradientCyanSecondary,
          Colors.white,
        ]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        locations={[0, 0.2, 0.3]}
        style={StyleSheet.absoluteFill}
      />

      {/* Toolbar */}
      <AppSafeAreaView style={{ paddingBottom: 0 }}>
        <CustomToolbar textColor="white" rightIcon={true} streak={true} />
      </AppSafeAreaView>

      {/* Main Content */}
      <View style={styles.main_container}>
        {/* Two Top Widget boxes shimmer */}
        <View style={styles.topWidgetRow}>
          <Shimmer style={styles.topWidgetBox} />
          <Shimmer style={styles.topWidgetBox} />
        </View>

        {/* Section Title shimmer */}
        <View style={styles.section}>
          <Shimmer style={{ height: 20, width: "50%", borderRadius: 4 }} />
          <Shimmer
            style={{ height: 14, width: "80%", borderRadius: 4, marginTop: 6 }}
          />
        </View>

        {/* Grid Cards shimmer (6 cards) */}
        <View style={styles.grid}>
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <Shimmer
                key={idx}
                style={{
                  width: "30%",
                  height: "100%",
                  aspectRatio: 1,
                  borderRadius: scale(10),
                }}
              />
            ))}
        </View>

        {/* Slider shimmer */}
        <View style={styles.section}>
          <Shimmer
            style={{
              height: verticalScale(160),
              borderRadius: scale(10),
            }}
          />
        </View>

        {/* Another Section Title shimmer */}
        <View style={styles.section}>
          <Shimmer style={{ height: 20, width: "50%", borderRadius: 4 }} />
          <Shimmer
            style={{ height: 14, width: "80%", borderRadius: 4, marginTop: 6 }}
          />
        </View>

        <View style={styles.grid}>
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <Shimmer
                key={idx}
                style={{
                  width: "30%",
                  height: "100%",
                  aspectRatio: 1,
                  borderRadius: scale(10),
                }}
              />
            ))}
        </View>

        <View style={styles.grid}>
          {Array(3)
            .fill(0)
            .map((_, idx) => (
              <Shimmer
                key={idx}
                style={{
                  width: "30%",
                  height: "100%",
                  aspectRatio: 1,
                  borderRadius: scale(10),
                }}
              />
            ))}
        </View>
      </View>
    </AppSafeAreaView>
  );
};

const styles = StyleSheet.create({
  main_container: {
    flex: 1,
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: verticalScale(20),
  },
  topWidgetRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: normalize(16),
    marginBottom: verticalScale(20),
  },
  topWidgetBox: {
    width: "48%",
    height: verticalScale(150),
    borderRadius: scale(10),
  },
  section: {
    paddingHorizontal: normalize(16),
    marginBottom: verticalScale(16),
  },
  grid: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: normalize(16),
    marginBottom: verticalScale(20),
    gap: 8,
  },
});

export default HomeScreenShimmer;
