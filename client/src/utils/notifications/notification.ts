import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

import Constants from "expo-constants";
import { Platform } from "react-native";
import { handleFunctionalActions, handleRouteActions } from "./actions";
import { ActionIds, notificationCategories } from "./constants";
import { getSavedItem } from "../storage/async_storage";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: true,
    shouldSetBadge: true,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const registerNotificationCategories = async () => {
  await Promise.all(
    Object.entries(notificationCategories).map(([categoryId, actions]) =>
      Notifications.setNotificationCategoryAsync(categoryId, actions)
    )
  );
};

export const sendAtExpoEndPoint = async ({ message }: { message: any }) => {
  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Accept-encoding": "gzip, deflate",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });
};

function handleRegistrationError(errorMessage: string) {
  alert(errorMessage);
  throw new Error(errorMessage);
}

type payload = {
  title: string;
  body: string;
  data: any;
};

export async function sendPushNotification({
  expoPushToken,
  payload,
}: {
  expoPushToken?: string;
  payload: payload;
}) {
  let token: string | null = (await getSavedItem("pushToken")) ?? null;
  if (!token) {
    const regToken = await registerForPushNotificationsAsync();
    token = regToken ?? null;
  }

  if (!token && !expoPushToken) return;

  const message = {
    to: token || expoPushToken,
    sound: "default",
    icon: "icon",
    ...payload,
  };

  await sendAtExpoEndPoint({ message });
}

type ActionPayload = {
  title: string;
  body: string;
  data?: Record<string, any>;
  actionId: ActionIds;
};

export async function sendActionNotification({
  expoPushToken,
  payload,
}: {
  expoPushToken?: string;
  payload: ActionPayload;
}) {
  let token: string | null = (await getSavedItem("pushToken")) ?? null;
  if (!token) {
    const regToken = await registerForPushNotificationsAsync();
    token = regToken ?? null;
  }

  if (!token && !expoPushToken) return;
  const message = {
    to: token || expoPushToken,
    sound: "default",
    title: payload.title,
    icon: "icon",
    body: payload.body,
    data: payload.data || {},
    categoryId: payload.actionId,
  };

  await sendAtExpoEndPoint({ message });
}

export async function registerForPushNotificationsAsync() {
  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      handleRegistrationError(
        "Permission not granted to get push token for push notification!"
      );
      return;
    }
    const projectId =
      Constants?.expoConfig?.extra?.eas?.projectId ??
      Constants?.easConfig?.projectId;
    // console.log(projectId);
    if (!projectId) {
      handleRegistrationError("Project ID not found");
    }
    try {
      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({
          projectId,
        })
      ).data;
      // console.log(pushTokenString);
      return pushTokenString;
    } catch (e: unknown) {
      handleRegistrationError(`${e}`);
    }
  } else {
    handleRegistrationError("Must use physical device for push notifications");
  }
}

export const notificationSubscription =
  Notifications.addNotificationResponseReceivedListener((response) => {
    const actionId = response.actionIdentifier;
    const notificationId = response.notification.request.identifier;

    const data = response.notification.request.content.data ?? {};
    const { screen, params }: { screen?: string; params?: any } = data;
    if (screen) {
      handleRouteActions({ screen, params });
    }
    if (actionId) {
      handleFunctionalActions({ actionId, data, notificationId });
    }
  });
