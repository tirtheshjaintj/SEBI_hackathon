import {
  getSavedItem,
  removeSavedItem,
  saveItem,
} from "../storage/expo_storage";
import { router } from "expo-router";

export async function getSession() {
  const session = await getSavedItem("session");
  const parsedSession = session ? JSON.parse(session) : null;
  return parsedSession;
}

export async function logout() {
  await removeSavedItem("session");
}

export async function login({ user, userAuth, userAddress }: any) {
  const userData = {
    name: user.name,
    uid: user.uid,
    accessToken: userAuth.accessToken,
  };

  const serializedUserData = JSON.stringify(userData);
  await saveItem("session", serializedUserData);
}
