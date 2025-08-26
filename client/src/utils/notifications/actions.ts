import { router } from "expo-router";
import * as Notifications from "expo-notifications";
import { NativeModules } from "react-native";
const { InstalledApps } = NativeModules;
export const handleRouteActions = ({
  screen,
  params,
}: {
  screen: string;
  params?: any;
}) => {
  router.push({ pathname: `/${screen}` as any, params: params as any });
};

const actionHandlers: Record<
  string,
  (data: any, notificationId?: string) => void
> = {
  TURN_OFF_DEV_MODE: (data, notificationId) => {
    InstalledApps.openDeveloperOptions();
    if (notificationId) {
      Notifications.dismissNotificationAsync(notificationId);
    }
  },
};

export const handleFunctionalActions = ({
  actionId,
  data,
  notificationId,
}: {
  actionId: string;
  data: any;
  notificationId?: string;
}) => {
  const action = actionHandlers[actionId];
  if (action) {
    action(data, notificationId);
  } else {
    // console.warn("No handler defined for:", actionId);
  }
};
