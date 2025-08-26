import { getSavedItem } from "../utils/storage/async_storage";

export const getSavedLanguage = async () => {
  try {
    const savedLang = (await getSavedItem("locale")) ?? "en";
    return savedLang;
  } catch (error) {
    console.error("Error getting saved language:", error);
    return "en";
  }
};
