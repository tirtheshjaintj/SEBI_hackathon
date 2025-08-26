import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import Colors from "@/src/theme/colors";
import { formatTimeAgo } from "@/src/utils/datetime/datetime";
import {
  moderateScale,
  verticalScale,
} from "@/src/utils/responsiveness/responsiveness";
import { getSavedItem } from "@/src/utils/storage/async_storage";
import { BlurView } from "expo-blur";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export type ScanDataType = {
  lastScan: string;
  stats: {
    totalApps: number;
    riskyApps: number;
    safeApps: number;
    unknownApps: number;
    suspiciousApps: number;
  };
};
const ScannerWidget = () => {
  const [scanData, setScanData] = React.useState<ScanDataType | null>(null);
  const { i18n, t } = useTranslation();
  const locale = i18n.language;
  useFocusEffect(
    useCallback(() => {
      const getScanData = async () => {
        const scanData = await getSavedItem("scanData");
        if (scanData !== null) setScanData(JSON.parse(scanData));
      };
      getScanData();
    }, [])
  );
  return (
    <AppLinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
      style={styles.outerGradient}
    >
      <View style={styles.widgetContainer}>
        {/* Scan Section */}
        <View style={styles.scanSection}>
          <View style={styles.ripple} />
          <BlurView intensity={50} tint="light" style={styles.blurWrapper}>
            <View style={styles.scanButton}>
              <Text style={styles.scanText}>{t("Scan")}</Text>
            </View>
          </BlurView>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <View style={styles.progressRow}>
            {/* <Ionicons name="warning-outline" size={16} color="#FFD700" /> */}
            <View
              style={[styles.progressBar, { backgroundColor: "#FFD700" }]}
            />
            <Text style={styles.statCount}>
              {scanData?.stats.suspiciousApps ?? "--"}
            </Text>
          </View>

          <View style={styles.progressRow}>
            {/* <FontAwesome5
                name="exclamation"
                style={{ marginRight: 10 }}
                size={16}
                color="#FF4C4C"
              /> */}
            <View
              style={[styles.progressBar, { backgroundColor: "#FF4C4C" }]}
            />
            <Text style={styles.statCount}>
              {scanData?.stats.riskyApps ?? "--"}
            </Text>
          </View>

          <View style={styles.progressRow}>
            {/* <Ionicons
                name="checkmark-done-outline"
                size={16}
                color="#4CAF50"
              /> */}
            <View
              style={[
                styles.progressBar,
                { width: "80%", backgroundColor: "#4CAF50" },
              ]}
            />
            <Text style={styles.statCount}>
              {scanData?.stats.safeApps ?? "--"}
            </Text>
          </View>
        </View>
      </View>

      {/* Last Scanned Text */}
      <View>
        {scanData?.lastScan ? (
          <>
            <Text style={[styles.lastScanned, { fontSize: moderateScale(10) }]}>
              {t("Last Scanned")}
            </Text>

            <Text style={styles.lastScanned}>
              {formatTimeAgo(new Date(scanData?.lastScan), locale)}
            </Text>
          </>
        ) : (
          <Text style={[styles.lastScanned, { fontSize: moderateScale(10) }]}>
            {t("Quick System & Apps scan")}
          </Text>
        )}
      </View>
    </AppLinearGradient>
  );
};

const styles = StyleSheet.create({
  outerGradient: {
    padding: moderateScale(16),
    borderRadius: moderateScale(16),
    height: verticalScale(170),
    gap: moderateScale(16),
    overflow: "hidden",
    justifyContent: "space-between",
  },
  widgetContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: moderateScale(30),
    paddingHorizontal: moderateScale(8),
    paddingRight: 0,
  },
  scanSection: {
    justifyContent: "center",
    alignItems: "center",
    width: "40%",
    position: "relative",
  },
  ripple: {
    position: "absolute",
    width: moderateScale(100),
    height: moderateScale(100),
    borderRadius: moderateScale(50),
    backgroundColor: Colors.secondaryCyanColor,
    opacity: 0.15,
    zIndex: 0,
  },
  blurWrapper: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(40),
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 2,
  },
  scanButton: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  scanText: {
    fontFamily: "Quicksand-Bold",
    fontSize: moderateScale(16),
    color: Colors.white,
  },
  statsSection: {
    flex: 1,
    maxWidth: "60%",
    gap: verticalScale(4),
  },
  progressRow: {
    // flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: moderateScale(2),
  },
  progressBar: {
    height: 6,
    width: "100%",
    borderRadius: 3,
    // backgroundColor: "#999",
    flexShrink: 1,
  },
  statCount: {
    color: Colors.white,
    fontSize: moderateScale(12),
    fontFamily: "Quicksand-Bold",
    width: moderateScale(17),
    textAlign: "right",
  },
  lastScanned: {
    color: Colors.white,
    fontSize: moderateScale(12),
    // marginTop: verticalScale(12),
    fontFamily: "Quicksand-Medium",
  },
});

export default ScannerWidget;
