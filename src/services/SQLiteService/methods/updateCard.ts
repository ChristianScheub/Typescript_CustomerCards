import Logger from "../../Logger/logger";
import { CustomerCard } from "../types/CustomerCard";
import { getDbConnection } from "./dbConnection";

export const updateCard = async (
  cardId: string,
  updates: Partial<CustomerCard>
): Promise<void> => {
  const db = await getDbConnection();
  Logger.infoService("Update Card ID:" + cardId + " now to " + JSON.stringify(updates));

  const transaction = db.transaction("customer_cards", "readwrite");
  const store = transaction.objectStore("customer_cards");

  const updatedAt = new Date().toISOString();
  const updatedCard = {
    ...updates,
    updatedAt,
  };

  const request = store.get(cardId);
  request.onsuccess = (event) => {
    const existingCard = (event.target as IDBRequest).result;
    if (existingCard) {
      const updatedCardData = {
        ...existingCard,
        ...updatedCard,
      };
      store.put(updatedCardData, cardId);
    } else {
      Logger.error(`Card with ID ${cardId} not found.`);
    }
  };

  request.onerror = (event) => {
    Logger.error("Error updating card:" + (event.target as IDBRequest).error);
  };
};