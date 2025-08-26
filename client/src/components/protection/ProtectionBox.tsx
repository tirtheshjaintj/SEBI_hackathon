import {
  getBiometricPreference,
  saveBiometricPreference,
} from "@/src/services/auth/biometricAuth";
import Colors from "@/src/theme/colors";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  NativeModules,
  PermissionsAndroid,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import DisclaimerModal from "./DiscalimerModal";
const { DeviceSecurity, InstalledApps } = NativeModules;
export default function ProtectionBox() {
  const [protectCalls, setProtectCalls] = useState(false);
  const [protectSMS, setProtectSMS] = useState(false);
  const [displayOverlay, setDisplayOverlay] = useState(false);
  const [biometricEnabled, setBiometricEnabled] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalConfig, setModalConfig] = useState({
    iconName: "alert-circle-outline",
    iconType: "ionicons" as "ionicons" | "material",
    title: "",
    message: "",
    onAccept: () => { },
    onReject: () => { },
  });

  const openDisclaimer = (
    iconName: string,
    title: string,
    message: string,
    onAccept: () => void,
    iconType: "ionicons" | "material" = "ionicons"
  ) => {
    setModalConfig({
      iconName,
      iconType,
      title,
      message,
      onAccept: () => {
        setShowModal(false);
        onAccept();
      },
      onReject: () => {
        setShowModal(false);
      },
    });
    setShowModal(true);
  };

  const {
    i18n: { language: locale },
    t,
  } = useTranslation();

  useEffect(() => {
    const checkPermissions = async () => {
      // Check CALL permissions
      const callLogGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_CALL_LOG
      );
      const phoneStateGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE
      );
      if (callLogGranted && phoneStateGranted) {
        setProtectCalls(true);
      }

      // Check SMS permissions
      const receiveSmsGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.RECEIVE_SMS
      );
      const readSmsGranted = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.READ_SMS
      );
      if (receiveSmsGranted && readSmsGranted) {
        setProtectSMS(true);
      }

      // Check overlay permission via native module
      const overlayGranted = await DeviceSecurity.canDrawOverlays();
      if (overlayGranted) {
        setDisplayOverlay(true);
      }
    };

    checkPermissions();
    (async () => {
      const value = await getBiometricPreference();
      setBiometricEnabled(value);
    })();
  }, []);

  const handleProtectCallsToggle = (value: boolean) => {
    if (value) {
      openDisclaimer(
        "call-outline",
        t("Protect Calls"),
        t("We need access to call logs and phone state to block fraud calls."),
        () => requestCallPermissions()
      );
    } else setProtectCalls(false);
  };

  const requestCallPermissions = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,
      PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
    ]);
    const allGranted = Object.values(granted).every(
      (res) => res === PermissionsAndroid.RESULTS.GRANTED
    );
    if (allGranted) setProtectCalls(true);
    else {
      const deniedPermanently = Object.values(granted).some(
        (res) => res === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      );
      if (deniedPermanently) InstalledApps.openAppInfo("com.dhanrakshak");
    }
  };


  const handleProtectSMSToggle = (value: boolean) => {
    if (value) {
      openDisclaimer(
        "chatbox-outline",
        t("Protect SMS"),
        t("We need SMS access to block frauds. We strictly do NOT read transaction messages."),
        () => requestSmsPermissions()
      );
    } else setProtectSMS(false);
  };

  const requestSmsPermissions = async () => {
    const granted = await PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.READ_SMS,
    ]);
    const allGranted = Object.values(granted).every(
      (res) => res === PermissionsAndroid.RESULTS.GRANTED
    );
    if (allGranted) setProtectSMS(true);
    else {
      const deniedPermanently = Object.values(granted).some(
        (res) => res === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
      );
      if (deniedPermanently) InstalledApps.openAppInfo("com.dhanrakshak");
    }
  };

  const handleOverlayToggle = (value: boolean) => {
    if (value) {
      openDisclaimer(
        "notifications-outline",
        t("Allow Overlay Alert"),
        t("We use overlay to instantly warn you about fraud risks."),
        async () => {
          const allowed = await DeviceSecurity.canDrawOverlays();
          if (!allowed) await DeviceSecurity.openOverlayPermission();
          else setDisplayOverlay(true);
        }
      );
    } else setDisplayOverlay(false);
  };


  const toggleBiometric = (value: boolean) => {
    if (value) {
      openDisclaimer(
        "fingerprint",
        t("Enable Biometric"),
        t("Biometric login secures your data with your fingerprint/face."),
        async () => {
          setBiometricEnabled(true);
          await saveBiometricPreference(true);
        },
        "material"
      );
    } else {
      setBiometricEnabled(false);
      saveBiometricPreference(false);
    }
  };

  const ProtectionItem = ({
    iconName,
    iconType = "ionicons",
    title,
    value,
    onToggle,
    iconColor = Colors.primaryCyanColor,
  }: {
    iconName: string;
    iconType?: "ionicons" | "material";
    title: string;
    value: boolean;
    onToggle: (value: boolean) => void;
    iconColor?: string;
  }) => {
    const IconComponent =
      iconType === "ionicons" ? Ionicons : MaterialCommunityIcons;

    return (
      <View style={styles.permissionItem}>
        <View style={styles.iconTextContainer}>
          <View
            style={[
              styles.iconContainer,
              { backgroundColor: iconColor + "20" },
            ]}
          >
            <IconComponent
              name={iconName as any}
              size={20}
              color={iconColor}
              style={styles.icon}
            />
          </View>
          <Text style={styles.permissionText}>{title}</Text>
        </View>
        <Switch
          value={value}
          onValueChange={onToggle}
          thumbColor={value ? Colors.white : "#f4f3f4"}
          trackColor={{ false: "#e0e0e0", true: iconColor }}
          ios_backgroundColor="#e0e0e0"
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.permissionContainer}>
        <ProtectionItem
          iconName="call-outline"
          title={t("Protect Calls")}
          value={protectCalls}
          onToggle={handleProtectCallsToggle}
          iconColor="#4CAF50"
        />

        <View style={styles.divider} />

        <ProtectionItem
          iconName="chatbox-outline"
          title={t("Protect SMS")}
          value={protectSMS}
          onToggle={handleProtectSMSToggle}
          iconColor="#2196F3"
        />

        <View style={styles.divider} />

        <ProtectionItem
          iconName="notifications-outline"
          title={t("Allow Overlay Alert")}
          value={displayOverlay}
          onToggle={handleOverlayToggle}
          iconColor="#FF9800"
        />

        <View style={styles.divider} />

        <ProtectionItem
          iconName="fingerprint"
          iconType="material"
          title={t("Enable Biometric")}
          value={biometricEnabled}
          onToggle={toggleBiometric}
          iconColor="#9C27B0"
        />
      </View>
      <DisclaimerModal
        visible={showModal}
        iconName={modalConfig.iconName}
        iconType={modalConfig.iconType}
        title={modalConfig.title}
        message={modalConfig.message}
        onAccept={modalConfig.onAccept}
        onReject={modalConfig.onReject}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},

  permissionContainer: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: Colors.divider,
  },
  permissionItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
  },
  iconTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  icon: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  permissionText: {
    fontSize: 15,
    color: Colors.textSecondaryDark,
    fontFamily: "Poppins-Medium",
  },
  divider: {
    height: 1,
    backgroundColor: "rgba(0,0,0,0.05)",
    marginVertical: 2,
  },
});
