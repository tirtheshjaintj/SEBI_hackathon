import { saveItem } from "@/src/utils/storage/expo_storage";

export const setUserInSession = async ({ user }: { user: any }) => {
  const serializedUserData = JSON.stringify(user);

  await saveItem("session", serializedUserData);
};
