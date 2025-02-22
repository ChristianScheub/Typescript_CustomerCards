import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Importieren der Übersetzungsdateien
import translationEN from "./locales/en/translation.json";
import translationDE from "./locales/de/translation.json";

const resources = {
  en: { translation: translationEN },
  de: { translation: translationDE },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: {
      "de-AT": ["de"], // Deutsch (Österreich) auf Deutsch
      "de-CH": ["de"], // Deutsch (Schweiz) auf Deutsch
      "de-DE": ["de"], // Deutsch (Deutschland) auf Deutsch
      "de-LI": ["de"], // Deutsch (Liechtenstein) auf Deutsch
      "de-LU": ["de"], // Deutsch (Luxemburg) auf Deutsch

      default: ["en"], // Allgemeiner Fallback
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator"],
    },
  });

export default i18n;