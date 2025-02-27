import Logger from "../../Logger/logger";

const DB_NAME = "customer_cards_db";
const STORE_NAME = "customer_cards";

export const initialize = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, 1);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
        Logger.infoService("Datenbank und ObjectStore wurden erstellt.");
      }
    };

    request.onsuccess = () => {
      request.result;
      Logger.infoService("Datenbank erfolgreich initialisiert.");
      resolve();
    };

    request.onerror = () => {
      Logger.error("Fehler beim Initialisieren der Datenbank."+ request.error);
      reject(request.error);
    };
  });
};