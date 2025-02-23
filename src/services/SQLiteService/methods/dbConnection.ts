import Logger from "../../Logger/logger";
import { DB_NAME, STORE_NAME } from "../configDB";

export const getDbConnection = async (): Promise<IDBDatabase> => {
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
      const db = request.result;
      Logger.infoService("Datenbank erfolgreich initialisiert.");
      resolve(db);
    };

    request.onerror = () => {
      Logger.error("Fehler beim Initialisieren der Datenbank."+ request.error);
      reject(request.error);
    };
  });
};