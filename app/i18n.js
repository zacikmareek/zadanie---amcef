import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import sk from "./sk";
import en from "./en";
import { getCookie } from "cookies-next";

const language = getCookie("lang") || "en";
console.warn(language);
i18n.use(initReactI18next).init({
  lng: language,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources: {
    en: {
      translation: en,
    },
    sk: {
      translation: sk,
    },
  },
});

export default i18n;
