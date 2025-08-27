import Colors from "@/src/theme/colors";
import {
  moderateScale,
  scale,
} from "@/src/utils/responsiveness/responsiveness";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import React from "react";
import { useTranslation } from "react-i18next";
import { Linking, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp } from "react-native-reanimated";

interface AppCardProps {
  app: any;
  toggleExpand: (packageName: string) => void;
  expanded: any;
  reportApp: (packageName: string) => void;
  reportData: any;
  reportedApps: string[];
  openAppOptions: (packageName: string) => void;
}

const AppCard = ({
  app,
  toggleExpand,
  expanded,
  reportApp,
  reportData,
  reportedApps,
  openAppOptions
}: AppCardProps) => {
  const isReported = reportedApps.includes(app.packageName);
  const { t } = useTranslation();
  return (
    <TouchableOpacity
      activeOpacity={0.95}
      key={app.packageName}
      style={styles.appRow}
      onPress={() => toggleExpand(app.packageName)}
    >
      <View
        style={[styles.iconWrapper, { backgroundColor: app.riskColor + "22" }]}
      >
        <Image
          source={{
            uri: app.icon
              ? `data:image/png;base64,${app.icon}`
              : "https://img.icons8.com/ios-filled/50/000000/android-os.png",
          }}
          style={styles.icon}
        />
        <View style={styles.details}>
          <Text style={styles.label}>{app.appName}</Text>
          {(() => {
            let badgeStyle;
            if (app.risk === "Alert") badgeStyle = styles.alertBadge;
            else if (app.risk === "Suspicious")
              badgeStyle = styles.suspiciousBadge;
            else if (app.risk === "Safe") badgeStyle = styles.safeBadge;
            else if (app.risk === "System") badgeStyle = styles.systemBadge;
            else if (app.risk === "Play Store")
              badgeStyle = styles.playStoreBadge;
            else badgeStyle = styles.unknownBadge;

            return (
              <View style={[badgeStyle, { width: 100 }]}>
                <Text
                  style={{
                    color: Colors.white,
                    fontFamily: "Quicksand-Medium",
                    fontSize: 12,
                  }}
                >
                  {t(app.risk)}
                </Text>
              </View>
            );
          })()}
        </View>
        {app.sebiVerified && (
          <View
            style={{
              backgroundColor: "#2E8B57",
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 16,
              marginTop: 4,
              alignSelf: "flex-start",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontSize: 12,
                fontFamily: "Quicksand-Bold",
              }}
            >
              SEBI Verified
            </Text>
          </View>
        )}
      </View>

      <View style={styles.meta}>
        <Ionicons
          name={expanded[app.packageName] ? "chevron-up" : "chevron-down"}
          size={20}
          color="#888"
        />
      </View>

      {expanded[app.packageName] && (
        <Animated.View
          entering={FadeInDown}
          exiting={FadeOutUp}
          style={styles.expandedDetails}
        >
          <Text style={styles.detailText}>
            {t("Package")}: <Text style={styles.boldText}>{app.packageName}</Text>
          </Text>
          <Text style={styles.detailText}>
            {t("Category")}: <Text style={styles.boldText}>{app.category.toUpperCase()}</Text>
          </Text>
          <Text style={styles.detailText}>
            ⚠️ {t("Total Reports")}: {reportData?.[app.packageName] || 0}
          </Text>

          <Text style={styles.detailText}>{t("Permissions")}:</Text>
          <View style={styles.badgesWrapper}>
            {app.readablePermissions.length ? (
              app.readablePermissions.map((p: any) => (
                <View key={p} style={styles.permissionBadge}>
                  <Text style={styles.badgeText}>{t(p)}</Text>
                </View>
              ))
            ) : (
              <Text style={styles.detailText}>None</Text>
            )}
          </View>

          <Text style={styles.detailText}>
            {t("Installer")}:{" "}
            <Text style={styles.boldText}>
              {app.installerPackageName === "com.android.vending"
                ? "Play Store"
                : "Unknown"}
            </Text>
          </Text>
          {app.sebiVerified && app.sebiDetails && (
            <View style={{ marginTop: 10 }}>
              <Text style={styles.detailText}>
                🏦 {t("Company")}:{" "}
                <Text style={styles.boldText}>{app.sebiDetails.company_name}</Text>
              </Text>
              <Text style={styles.detailText}>
                👨‍💻 {t("Developer")}:{" "}
                <Text style={styles.boldText}>{app.sebiDetails.developer_name}</Text>
              </Text>

              <View style={{ flexDirection: "row", marginTop: 6 }}>
                {app.sebiDetails.play_store_link && (
                  <TouchableOpacity
                    style={[styles.reportButton, { backgroundColor: "#007AFF", marginRight: 8 }]}
                    onPress={() => Linking.openURL(app.sebiDetails.play_store_link)}
                  >
                    <Text style={styles.reportButtonText}>Play Store</Text>
                  </TouchableOpacity>
                )}
                {app.sebiDetails.app_store_link && (
                  <TouchableOpacity
                    style={[styles.reportButton, { backgroundColor: "#34C759" }]}
                    onPress={() => Linking.openURL(app.sebiDetails.app_store_link)}
                  >
                    <Text style={styles.reportButtonText}>App Store</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          )}
          <TouchableOpacity
            style={[
              styles.reportButton,
              isReported && { opacity: 0.7 },
            ]}
            activeOpacity={0.8}
            onPress={() => reportApp(app.packageName)}
          >
            <Text style={[styles.reportButtonText,]}>
              {isReported ? "🚨" + t("Reported By You") : "🚨" + t("Report App")}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.reportButton,
            ]}
            onPress={() => openAppOptions(app.packageName)}
          >
            <Text style={[styles.reportButtonText,]}>
              👁️ {t("View App Details")}
            </Text>
          </TouchableOpacity>

        </Animated.View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  appRow: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },
  iconWrapper: {
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 8,
    flexDirection: "row",
    gap: scale(10),
  },
  icon: {
    width: scale(40),
    height: scale(40),
    resizeMode: "contain",
  },
  details: {
    flexDirection: "column",
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    marginBottom: 4,
    fontFamily: "Quicksand-SemiBold",
  },
  meta: {
    position: "absolute",
    right: 12,
    top: 16,
  },
  expandedDetails: {
    marginTop: 10,
    borderTopWidth: 0.5,
    borderTopColor: "#ddd",
    paddingTop: 10,
  },
  detailText: {
    fontSize: 13,
    color: "#444",
    fontFamily: "Quicksand-Bold",
  },
  boldText: {
    fontWeight: "600",
  },
  badgesWrapper: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6,
    marginVertical: 6,
  },
  permissionBadge: {
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginRight: 6,
    marginBottom: 6,
  },
  badgeText: {
    fontSize: 11,
    color: "#333",
  },
  reportButton: {
    marginTop: 14,
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    alignSelf: "flex-end",
    shadowColor: "#FF3B30",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  reportButtonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Quicksand-Bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  alertBadge: {
    backgroundColor: "#FF3B30",
    paddingHorizontal: 8,
    paddingVertical: 4,
    maxWidth: moderateScale(90),
    alignItems: "center",
    borderRadius: moderateScale(16),
  },
  suspiciousBadge: {
    backgroundColor: "#FFA500",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: moderateScale(16),
    maxWidth: moderateScale(90),
    alignItems: "center",
  },
  safeBadge: {
    backgroundColor: "#4CD964",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: moderateScale(16),
    maxWidth: moderateScale(90),
    alignItems: "center",
  },
  systemBadge: {
    backgroundColor: "#007AFF",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: moderateScale(16),
    maxWidth: moderateScale(90),
    alignItems: "center",
  },
  playStoreBadge: {
    backgroundColor: "#5856D6",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: moderateScale(16),
    maxWidth: moderateScale(90),
    alignItems: "center",
  },
  unknownBadge: {
    backgroundColor: "#8E8E93",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: moderateScale(16),
    maxWidth: moderateScale(90),
    alignItems: "center",
  },
});

export default AppCard;
