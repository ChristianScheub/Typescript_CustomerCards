import Logger from "../../Logger/logger";
import { STORE_NAME } from "../configDB";
import { getDbConnection } from "./dbConnection";

export const deleteCard = async (cardId: string): Promise<void> => {
  const db = await getDbConnection();
  Logger.infoService("Delete Card"+cardId);


  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(cardId);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};