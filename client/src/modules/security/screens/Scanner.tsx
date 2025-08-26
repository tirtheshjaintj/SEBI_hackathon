import Colors from "@/src/theme/colors";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Alert,
  NativeModules,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

import AppLinearGradient from "@/src/components/shared/AppLinearGradient";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";

import axiosInstance from "@/src/apis/axiosInstance";
import DeveloperOptionsModal from "@/src/components/modal/DeveloperOptionsModal";
import { formatTimeAgo } from "@/src/utils/datetime/datetime";
import { getSavedItem, saveItem } from "@/src/utils/storage/async_storage";
import { useTranslation } from "react-i18next";
import Toast from "react-native-toast-message";
import { ScanDataType } from "../../home/components/ScannerWidget";
import AppCard from "../components/AppCard";
import FilterTabs from "../components/FilterTabs";
import ScannerButton from "../components/ScannerButton";
import { getAllReports } from "../services/security";
import { getReadablePermissions, getRiskScore } from "../utils/security";
const { InstalledApps, DeviceSecurity } = NativeModules;

export const openDeveloperOptions = () => {
  InstalledApps.openDeveloperOptions();
}

export const openAppOptions = (packageName: string) => {
  InstalledApps.openAppInfo(packageName);
}

export default function AppScanScreen() {
  const {
    i18n: { language: locale },
    t,
  } = useTranslation();
  const [apps, setApps] = useState([]);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState("All");
  const [progressValue, setProgressValue] = useState(0);
  const [scanData, setScanData] = useState<ScanDataType | null>(null);
  const [loading2, setLoading2] = useState(false);
  const [reportData, setReportData] = useState<Record<string, number>>({});
  const [reportedApps, setReportedApps] = useState<string[]>([]);
  const [deviceInfo, setDeviceInfo] = useState({
    developerOptionsEnabled: false,
    usbDebuggingEnabled: false,
    wifiName: "",
  });

  const scanApps = useCallback(async () => {
    setLoading(true);
    setProgressValue(0);
    const interval = setInterval(() => {
      setProgressValue((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 70);

    try {
      const nativeApps = await InstalledApps.getInstalledApps();
      getSecurityData();
      const enriched = nativeApps.map((app: any) => ({
        ...app,
        readablePermissions: getReadablePermissions(app.permissions),
        risk: getRiskScore(app),
      }));
      setApps(enriched);
      const suspiciousApps = enriched.filter(
        (a: any) => a.risk === "Suspicious"
      ).length;
      const riskyApps = enriched.filter((a: any) => a.risk === "Alert").length;
      const safeApps = enriched.filter((a: any) => a.risk === "Safe").length;
      const unknownApps = enriched.filter(
        (a: any) =>
          a.installerPackageName !== "com.android.vending" &&
          a.risk !== "Safe" &&
          a.risk !== "Alert" &&
          a.risk !== "Suspicious"
      ).length;

      const scanPayload: ScanDataType = {
        lastScan: new Date().toISOString(),
        stats: {
          totalApps: enriched.length,
          riskyApps,
          suspiciousApps,
          safeApps,
          unknownApps,
        },
      };

      setScanData(scanPayload);
      saveItem("scanData", JSON.stringify(scanPayload));
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Failed to fetch apps.");
    } finally {
      setTimeout(() => setLoading(false), 1000);
    }
  }, []);


  const toggleExpand = (pkg: any) => {
    setExpanded((prev) => ({ ...prev, [pkg]: !prev[pkg] }));
  };
  const filteredApps = useMemo(() => {
    if (filter === "All") return apps;
    if (filter === "System") return apps.filter((a: any) => a.isSystemApp);
    if (filter === "Play Store") return apps.filter(
      (a: any) => a.installerPackageName === "com.android.vending"
    );

    if (filter === "Unknown") return apps.filter(
      (a: any) => a.installerPackageName !== "com.android.vending"
    );
    if (filter == "Financial") return apps.filter((a: any) => a.category == "upi");

    return apps.filter((a: any) => a.risk === filter);
  },
    [apps, filter]
  );

  const getSecurityData = async () => {
    try {
      const result = await DeviceSecurity.getSecurityStatus();
      console.log(result);
      setDeviceInfo(JSON.parse(result));
    } catch (error) {
      console.log(error);
    }
  };

  const getReportData = async () => {
    try {
      const data = await getAllReports();
      setReportData(data.reportData);
      setReportedApps(data.reportedApps);
    } catch (error) {
      console.log(error);
    }
  };

  const reportApp = async (app_id: string) => {
    if (reportedApps.includes(app_id)) {
      Toast.show({
        type: "success",
        text1: "App Already Reported",
        position: "bottom",
      });
      return;
    }
    try {
      setLoading2(true);
      await axiosInstance.post("/report/add", { app_id });
      setReportedApps([...reportedApps, app_id]);
      getReportData();
      Toast.show({
        type: "success",
        text1: "App Reported Successfully",
        position: "bottom",
      });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Failed to Report App",
        position: "bottom",
      });
      console.log(error);
    } finally {
      setLoading2(false);
    }
  };

  useEffect(() => {
    const getScanData = async () => {
      const scanData = await getSavedItem("scanData");
      if (scanData !== null) setScanData(JSON.parse(scanData));
    };
    scanApps();
    getScanData();
    getReportData();
  }, []);



  return (
    <AppSafeAreaView style={{ flex: 1, backgroundColor: Colors.white }}>
      <CommonToolbar title={t("App Scanner")} />
      <View style={{ flex: 1 }}>
        <AppLinearGradient
          colors={[Colors.primaryCyanColor, Colors.gradientCyanSecondary]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          locations={[0, 0.5]}
          style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
        />

        {/* Scan Circle with Animated Ring */}
        <ScannerButton
          apps={filteredApps}
          scanApps={scanApps}
          loading={loading}
          progressValue={progressValue}
        />

        {scanData && (
          <View style={{ alignItems: "center", marginTop: 8 }}>
            {scanData?.lastScan && (
              <Text
                style={{
                  color: Colors.white,
                  fontSize: 14,
                  fontFamily: "Quicksand-Medium",
                }}
              >
                {t("Last Scanned")} :{" "}
                {formatTimeAgo(new Date(scanData.lastScan), locale)}
              </Text>
            )}
          </View>
        )}

        {apps.length > 0 && (
          <FilterTabs filter={filter} handleFilter={setFilter} />
        )}

        {apps.length > 0 && (
          <ScrollView
            contentContainerStyle={{ paddingBottom: 24, paddingHorizontal: 16 }}
          >
            {filteredApps.map((app: any, index: number) => (
              <AppCard
                openAppOptions={openAppOptions}
                key={app.installerPackageName + index}
                app={app}
                toggleExpand={toggleExpand}
                reportApp={reportApp}
                expanded={expanded}
                reportData={reportData}
                reportedApps={reportedApps || []}
              />
            ))}
          </ScrollView>
        )}
      </View>
      <DeveloperOptionsModal deviceInfo={deviceInfo} onClose={() => {
        getSecurityData();
        if (deviceInfo.developerOptionsEnabled) {
          openDeveloperOptions();
        }
      }} />
    </AppSafeAreaView>
  );
}

const styles = StyleSheet.create({});
