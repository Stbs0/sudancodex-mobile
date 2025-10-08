import Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import your translations
import ar from "./locales/ar.json";
import en from "./locales/en.json";

const resources = {
  en: { translation: en },
  ar: { translation: ar },
};

i18n.use(initReactI18next).init({
  resources,
  lng: (Localization.getLocales()?.[0]?.languageCode ?? "").startsWith("ar")
    ? "ar"
    : "en", // auto-detect
  fallbackLng: "en",
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
});

export default i18n;
