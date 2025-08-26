import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { en } from "./translations/english";
import { hi } from "./translations/hindi";
import { pa } from "./translations/punjabi";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    hi: { translation: hi },
    pa: { translation: pa },
  },
  lng: "en", // default language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
