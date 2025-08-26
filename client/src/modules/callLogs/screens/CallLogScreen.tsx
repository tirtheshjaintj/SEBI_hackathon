import axiosInstance from "@/src/apis/axiosInstance";
import CommonToolbar from "@/src/components/toolBars/commonToolbar";
import AppSafeAreaView from "@/src/components/viewWrappers/AppSafeAreaView";
import Colors from "@/src/theme/colors";
import { formatTimeAgo } from "@/src/utils/datetime/datetime";
import { Feather, FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  FlatList,
  NativeModules,
  PermissionsAndroid,
  Platform,
  RefreshControl,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import NewsShimmer from "../../news/NewsShimmer";
import ReportModal from "../components/reportModal";
import styles from "../styles";
const { DeviceSecurity } = NativeModules;

const CallLogsScreen = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [reportedNumbers, setReportedNumbers] = useState<string[]>([]);
  const [reportData, setReportData] = useState<Record<string, number>>({});
  const [isReportModalVisible, setIsReportModalVisible] = useState(false);
  const [reportMessage, setReportMessage] = useState("");
  const [selectedNumber, setSelectedNumber] = useState("");
  const [isReporting, setIsReporting] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const getCallLogs = async () => {
    setLoading(true);
    setError("");
    setLogs([]);

    if (Platform.OS === "android") {
      try {
        const grantedCallLog = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
          {
            title: "Call Log Permission",
            message: "App needs access to your call logs.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        const grantedContacts = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          {
            title: "Contacts Permission",
            message:
              "App needs access to your contacts to display caller names.",
            buttonNeutral: "Ask Me Later",
            buttonNegative: "Cancel",
            buttonPositive: "OK",
          }
        );

        if (
          grantedCallLog === PermissionsAndroid.RESULTS.GRANTED &&
          grantedContacts === PermissionsAndroid.RESULTS.GRANTED
        ) {
          try {
            const data = await DeviceSecurity.getCallLogs();
            if (data.length > 0) {
              setLogs(data);
            } else {
              setError("No call records found.");
            }
          } catch (e) {
            console.warn("Error fetching logs:", e);
            setError("Error fetching call logs.");
          }
        } else {
          setError("Required permissions denied.");
        }
      } catch (err) {
        console.warn(err);
        setError("Permission request failed.");
      }
    }

    setLoading(false);
  };

  useEffect(() => {
    getCallLogs();
  }, []);
  const SCAM_THRESHOLD = 3; // if a number is reported >= 3 times, treat it as scam
  const isSpamByPattern = (number: string): boolean => {
    const patterns = [
      /^140\d{7}$/, // Telemarketing numbers (TRAI)
      /^\d{5,7}$/, // Short code numbers (e.g., banks, promo)
      /^(\d)\1{9}$/, // Same digit repeated (e.g., 9999999999)
      /^(?:\+91)?(666|888|999)\d{7}$/, // Common spam prefixes
      /unknown|private|withheld/i, // No number visible
    ];

    return patterns.some((regex) => regex.test(number));
  };

  const filteredLogs = useMemo(() => {
    const query = searchQuery.toLowerCase();

    return logs.filter((log: any) => {
      const number = log.number || "";
      const name = log.name || "";
      const isReported = (reportData?.[number] ?? 0) >= SCAM_THRESHOLD;
      const isPatternSpam = isSpamByPattern(number);

      const matchSearch =
        number.toLowerCase().includes(query) ||
        name.toLowerCase().includes(query);

      if (filterType === "SPAM") {
        return (
          (isReported ||
            isPatternSpam ||
            reportData?.[log.number] >= SCAM_THRESHOLD) &&
          matchSearch
        );
      }

      const matchType = filterType === "ALL" || log.type.includes(filterType);
      return matchType && matchSearch;
    });
  }, [logs, filterType, searchQuery, reportData]);

  const handleReport = async () => {
    setIsReporting(true);
    try {
      await axiosInstance.post("/report/add/call", {
        phone_number: selectedNumber,
        message: reportMessage,
      });
      setReportedNumbers((prev) => [...prev, selectedNumber]);
      await getReportData();
      setIsReporting(false);
      setReportSuccess(true);
      setTimeout(() => {
        setIsReportModalVisible(false);
      }, 1500);
    } catch (error) {
      setIsReporting(false);
      Toast.show({
        type: "error",
        text1: t("The Number cannot be Reported"),
        position: "bottom",
      });
    }
  };

  const getReportData = async () => {
    try {
      const response = await axiosInstance.get("/report/view/call");
      setReportData(response.data.reportData);
      setReportedNumbers(response.data.reportedNumbers);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReportData();
  }, []);

  const renderItem = ({ item }: any) => {
    const date = new Date(item.timestamp);
    const isSpam = (reportData?.[item.number] || 0) >= SCAM_THRESHOLD;
    const color = isSpam
      ? "#ff4757"
      : item.type.includes("MISSED") || item.type.includes("REJECTED")
        ? "#e74c3c"
        : item.type.includes("INCOMING")
          ? "#2ecc71"
          : item.type.includes("OUTGOING")
            ? "#3498db"
            : "#95a5a6";

    return (
      <LinearGradient
        colors={["#ffffff", "#f8f9fa"]}
        start={[0, 0]}
        end={[1, 1]}
        style={[styles.card, { borderLeftColor: color }]}
      >
        <TouchableOpacity
          onPress={() => {
            router.push({
              pathname: "/callerdetailscreen",
              params: { callerNumber: item.number },
            });
          }}
          style={styles.cardHeader}
        >
          <View style={styles.contactInfo}>
            <View
              style={[styles.iconContainer, { backgroundColor: `${color}20` }]}
            >
              <MaterialIcons
                name={
                  item.type.includes("INCOMING")
                    ? "call-received"
                    : item.type.includes("OUTGOING")
                      ? "call-made"
                      : "call-missed"
                }
                size={20}
                color={color}
              />
            </View>
            <View>
              <Text style={styles.name} numberOfLines={1}>
                {item.name || t("Unknown")}
              </Text>
              <Text style={styles.number}>
                {item.number || t("Private number")}
              </Text>
            </View>
          </View>
          <Text
            style={[styles.time, { color: isSpam ? "#ff4757" : "#6c757d" }]}
          >
            {formatTimeAgo(date, locale)}
          </Text>
        </TouchableOpacity>

        <View style={styles.cardDetails}>
          <View style={styles.detailRow}>
            <Feather name="clock" size={16} color="#6c757d" />
            <Text style={styles.detailText}>
              {t("Duration")}: {item.duration}s
            </Text>
          </View>

          {isSpam && (
            <View style={styles.spamWarning}>
              <MaterialIcons name="warning" size={16} color="#ff4757" />
              <Text style={styles.spamText}>{t("Likely Spam")}</Text>
            </View>
          )}

          <View style={styles.reportContainer}>
            <TouchableOpacity
              onPress={() => {
                router.push({
                  pathname: "/callerdetailscreen",
                  params: { callerNumber: item.number },
                });
              }}
              style={styles.reportCount}
            >
              <MaterialIcons name="report" size={20} color="#6c757d" />
              <Text style={styles.reportCountText}>
                {reportData?.[item.number] || 0} {t("Reports")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.reportButton,
                reportedNumbers.includes(item.number) && styles.reportedButton,
              ]}
              onPress={() => {
                setSelectedNumber(item.number);
                setReportMessage("");
                setReportSuccess(false);
                if (reportedNumbers.includes(item.number)) {
                  Toast.show({
                    type: "success",
                    text1: "Already Reported by you",
                  });
                  return;
                } else {
                  setIsReportModalVisible(true);
                }
              }}
            >
              <Text style={styles.reportButtonText}>
                {reportedNumbers.includes(item.number)
                  ? t("Reported")
                  : t("Report")}
              </Text>
              <MaterialIcons
                name={
                  reportedNumbers.includes(item.number)
                    ? "check-circle"
                    : "report"
                }
                size={16}
                color={
                  reportedNumbers.includes(item.number) ? "#2ecc71" : "#c2185b"
                }
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    );
  };
  const { i18n, t } = useTranslation();
  const locale = i18n.language;

  const filterButtons = ["ALL", "INCOMING", "OUTGOING", "MISSED", "SPAM"];

  return (
    <>
      <AppSafeAreaView style={styles.container}>
        <CommonToolbar
          title={t("Call Logs Security")}
          backgroundColor={"transparent"}
        />
        {loading ? (
          <NewsShimmer />
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                tintColor={Colors.primaryCyanColor}
                colors={[Colors.primaryCyanColor]}
                progressViewOffset={20}
                progressBackgroundColor={Colors.white}
                refreshing={loading}
                onRefresh={getCallLogs}
              />
            }
            style={styles.contentContainer}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <Feather
                name="search"
                size={20}
                color="#6c757d"
                style={styles.searchIcon}
              />
              <TextInput
                placeholder={t("Search calls...")}
                placeholderTextColor="#adb5bd"
                value={searchQuery}
                onChangeText={setSearchQuery}
                style={styles.searchInput}
                clearButtonMode="while-editing"
              />
            </View>

            {/* Filter Chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterContainer}
            >
              {filterButtons.map((type) => (
                <TouchableOpacity
                  key={type}
                  style={[
                    styles.filterButton,
                    filterType === type && styles.filterButtonActive,
                  ]}
                  onPress={() => setFilterType(type)}
                >
                  <Text
                    style={[
                      styles.filterText,
                      filterType === type && styles.filterTextActive,
                    ]}
                  >
                    {t(type.charAt(0) + type.slice(1).toLowerCase())}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Content */}
            {error ? (
              <View style={styles.errorContainer}>
                <MaterialIcons name="error-outline" size={40} color="#e74c3c" />
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity
                  style={styles.retryButton}
                  onPress={getCallLogs}
                >
                  <Text style={styles.retryButtonText}>{t("Try Again")}</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <FlatList
                data={filteredLogs}
                keyExtractor={(_, index) => index.toString()}
                renderItem={renderItem}
                contentContainerStyle={styles.listContent}
                initialNumToRender={10} // render only a few at start
                maxToRenderPerBatch={10} // batch size while scrolling
                windowSize={10} // how many screens worth of items to render
                ListEmptyComponent={
                  <View style={styles.emptyContainer}>
                    <FontAwesome5
                      name="phone-slash"
                      size={50}
                      color="#adb5bd"
                    />
                    <Text style={styles.emptyText}>
                      {t("No calls match your criteria")}
                    </Text>
                  </View>
                }
                scrollEnabled={false}
              />
            )}

            {/* Refresh Button */}
            {/* <TouchableOpacity style={styles.refreshButton} onPress={getCallLogs}>
            <LinearGradient
              colors={["#007bff", "#0056b3"]}
              style={styles.refreshGradient}
              start={[0, 0]}
              end={[1, 1]}
            >
              <Feather name="refresh-cw" size={20} color="white" />
              <Text style={styles.refreshText}>{t("Refresh Logs")}</Text>
            </LinearGradient>
          </TouchableOpacity> */}
          </ScrollView>
        )}
      </AppSafeAreaView>

      <ReportModal
        isReportModalVisible={isReportModalVisible}
        isReporting={isReporting}
        handleReport={handleReport}
        selectedNumber={selectedNumber}
        reportMessage={reportMessage}
        reportSuccess={reportSuccess}
        setReportMessage={setReportMessage}
        setIsReportModalVisible={setIsReportModalVisible}
      />
    </>
  );
};

export default CallLogsScreen;
