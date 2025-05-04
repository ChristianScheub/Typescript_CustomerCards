import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import sqliteService from "../SQLiteService";
import Logger from "../Logger/logger";

const STORAGE_KEY = "DataPrivacyUpdate2025_5";

const useDataPrivacyUpdateAlert = () => {
  const { t } = useTranslation();

  useEffect(() => {
    const checkPrivacyUpdate = async () => {
      Logger.info("Checking for privacy update alert");
      const hasSeenUpdate = localStorage.getItem(STORAGE_KEY);
      localStorage.setItem(STORAGE_KEY, "true");
      Logger.info("Has seen update:" + hasSeenUpdate);
      if (hasSeenUpdate === "true") return; // User has already seen the message

      try {
        const cards = await sqliteService.getCards();
        Logger.info("getting cards");
        if (cards.length > 0) {
          Logger.info("EMPTY");
          alert(t("privacy.update_2025_05"));
        }
        // New users do not need to see this notice.
        // This is because we only perform technically necessary local data processing,
        // which does not require explicit consent.
        // Any data processing by Google (e.g. through AdMob) is handled via Google’s own
        // consent banner, which is shown to users once the Ad SDK is loaded and ready.
      } catch (err) {
        console.error("Error checking cards from DB:", err);
      }
    };

    checkPrivacyUpdate();
  }, []);
};

export default useDataPrivacyUpdateAlert;
