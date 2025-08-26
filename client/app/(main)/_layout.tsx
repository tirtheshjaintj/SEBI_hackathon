import BioMetricModal from "@/src/components/main/biometricModal";
import { getBiometricPreference } from "@/src/services/auth/biometricAuth";
import { router, Stack } from "expo-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  BackHandler,
  DeviceEventEmitter,
  NativeModules,
  StyleSheet,
} from "react-native";
import ReactNativeBiometrics from "react-native-biometrics";

const { DeviceSecurity } = NativeModules;

export default function Layout() {
  const [authenticated, setAuthenticated] = useState(false);
  const [showBiometricModal, setShowBiometricModal] = useState(false);
  const { t } = useTranslation();
  const handleAppStart = async () => {
    const allowBiometric = await getBiometricPreference();
    if (allowBiometric) {
      const rnBiometrics = new ReactNativeBiometrics();
      const { available } = await rnBiometrics.isSensorAvailable();
      if (available) {
        try {
          const result = await rnBiometrics.simplePrompt({
            promptMessage: t("Login To DhanRakshak") + " ₹",
          });
          if (!result.success) throw new Error(t("User canceled or failed auth"));
        } catch (err) {
          setShowBiometricModal(true);
          return;
        }
      }
    }
    setAuthenticated(true);
  };

  useEffect(() => {
    handleAppStart();
    const sub = DeviceEventEmitter.addListener("NewCallerIntent", (event) => {
      const callerNumber = event?.callerNumber;
      if (callerNumber) {
        router.push({
          pathname: "/(main)/callerdetailscreen",
          params: { callerNumber },
        });
      }
    });
    return () => sub.remove();
  }, []);

  useEffect(() => {
    if (!authenticated) return;

    DeviceSecurity.getInitialIntent().then((intent: any) => {
      const callerNumber = intent?.callerNumber;
      if (callerNumber) {
        router.push({
          pathname: "/callerdetailscreen",
          params: { callerNumber },
        });
      }
    });
  }, [authenticated]);

  if (!authenticated) {
    return (
      <>
         <BioMetricModal
          visible={showBiometricModal}
          onRetry={() => {
            setShowBiometricModal(false);
            handleAppStart();
          }}
          onExit={() => BackHandler.exitApp()}
        />
      </>
    );
  }

  return (
    <Stack screenOptions={{ headerShown: false, animation: "ios_from_right" }}>
      <Stack.Screen
        name="(drawer)"
        options={{ headerShown: false, animation: "ios_from_right" }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 24,
    width: "80%",
    elevation: 6,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    textAlign: "center",
  },
  modalMessage: {
    fontSize: 15,
    color: "#444",
    textAlign: "center",
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    marginHorizontal: 5,
    borderRadius: 8,
    alignItems: "center",
  },
  retryButton: {
    backgroundColor: "#4CAF50",
  },
  exitButton: {
    backgroundColor: "#F44336",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
});
