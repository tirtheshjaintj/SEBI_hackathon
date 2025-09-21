import { useNetworkStatus } from "@/src/hooks/useNetworkStatus";
import { useTTSInitializer } from "@/src/hooks/useTTSInitializer";
import NetworkOfflineScreen from "@/src/screens/network/OfflineScreen";
import SplashScreen from "@/src/screens/splash/SplashScreen";
import { checkUserAuth } from "@/src/services/auth/checkAuth";
import { savePushToken } from "@/src/services/notification/notifications";
import useAuthStore from "@/src/store/authSlice";
import { fonts } from "@/src/theme/fonts";
import { languageType } from "@/src/types/constants";
import { getSession } from "@/src/utils/auth/auth";
import {
  notificationSubscription,
  registerNotificationCategories,
} from "@/src/utils/notifications/notification";
import { getSavedItem } from "@/src/utils/storage/async_storage";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { NativeModules } from "react-native";
import Toast from "react-native-toast-message";
import "../src/localization/i18n";

const { DeviceSecurity } = NativeModules;

const RootLayout = () => {
  const [fontsLoaded] = useFonts(fonts);
  const [localeLoaded, setLocaleLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [authCheck, setAuthCheck] = useState(false);
  const [delayDone, setDelayDone] = useState(false);
  const { language, setLanguage } = useAuthStore((state) => state);
  const { isOffline } = useNetworkStatus();
  const [deviceInfo, setDeviceInfo] = useState({
    developerOptionsEnabled: false,
    usbDebuggingEnabled: false,
    wifiName: "",
  });
  const { voiceId, ttsReady } = useTTSInitializer(ready, delayDone);

  const { i18n } = useTranslation();
  // console.log(i18n.language);

  const loadApp = async () => {
    const lang = (await getSavedItem("locale")) as languageType;
    // console.log({ lang });
    if (lang) setLanguage({ language: lang });
    i18n.changeLanguage(lang ?? "en");
    setLocaleLoaded(true);
    const session = await getSession();

    const userAccessToken = session?.accessToken;

    if (!userAccessToken) {
      setUser({ user: null });
      setAuthCheck(true);
      return;
    }

    await checkUserAuth({ userAccessToken })
      .then(async (session) => {
        // console.log({ session });
        setUser({ user: session });
      })
      .catch(() => {
        setUser({ user: null });
      })
      .finally(() => {
        setAuthCheck(true);
      });
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: process.env.EXPO_PUBLIC_GSIGN_IN_WEB_CLIENT,
      offlineAccess: false,
    });

    loadApp();
  }, [i18n, setUser]);
  // console.log(ready)
  const getSecurityData = async () => {
    try {
      const result = await DeviceSecurity.getSecurityStatus();
      setDeviceInfo(JSON.parse(result));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDelayDone(true);
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (!(fontsLoaded && localeLoaded && authCheck)) {
      return;
    }
    setReady(true);
    savePushToken();
  }, [fontsLoaded, localeLoaded, authCheck]);

  useEffect(() => {
    getSecurityData();
    registerNotificationCategories();
    const subscription = notificationSubscription;
    return () => {
      subscription.remove();
    };
  }, []);

  const accessToken = user?.accessToken ?? null;

  if (!ready || !delayDone) {
    return <SplashScreen />;
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{ headerShown: false, animation: "ios_from_right" }}
      >
        <Stack.Protected guard={language === null}>
          <Stack.Screen name="language" />
        </Stack.Protected>
        <Stack.Protected guard={accessToken === null && language !== null}>
          <Stack.Screen name="(onboarding)" />
        </Stack.Protected>

        <Stack.Protected guard={accessToken !== null && language !== null}>
          <Stack.Screen
            name="(main)"
            options={{ headerShown: false, animation: "ios_from_right" }}
          />
        </Stack.Protected>
      </Stack>
      <Toast />
      {isOffline && (
        <NetworkOfflineScreen
          onRetry={() => console.log("Retrying connection...")}
        />
      )}
      {/* 
      <DeveloperOptionsModal deviceInfo={deviceInfo} onClose={() => {
        getSecurityData();
        if (deviceInfo.developerOptionsEnabled) {
          openDeveloperOptions();
        }
      }} /> */}

    </>
  );
};

export default RootLayout;
