import axiosInstance from "@/src/apis/axiosInstance";
import { registerForPushNotificationsAsync } from "@/src/utils/notifications/notification";
import { getSavedItem, saveItem } from "@/src/utils/storage/async_storage";

export const savePushToken = async () => {
  try {
    const lastToken = await getSavedItem("pushToken");
    const token = await registerForPushNotificationsAsync();
    if (token === lastToken) return;
    saveItem("pushToken", token);
    const res = await axiosInstance.post(`/notification/save`, {
      pushToken: token,
    });
    console.log(res);
  } catch (error) {
    console.log(error, "error");
  }
};
