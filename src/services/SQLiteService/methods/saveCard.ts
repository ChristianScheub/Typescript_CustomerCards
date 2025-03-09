import Logger from "../../Logger/logger";
import { CustomerCard } from "../types/CustomerCard";
import { getDbConnection } from "./dbConnection";
import { handleIndexedDBError } from "./handleError";

export const saveCard = async (
  card: Omit<CustomerCard, "id" | "createdAt" | "updatedAt">
): Promise<CustomerCard> => {
  const db = await getDbConnection();
  Logger.infoService("Try to save new Card: " + JSON.stringify(card));

  const newCard = {
    ...card,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(), 
    updatedAt: new Date().toISOString(),
  };

  const transaction = db.transaction("customer_cards", "readwrite");
  const store = transaction.objectStore("customer_cards");

  const request = store.add(newCard);

  return new Promise((resolve, reject) => {
    request.onsuccess = () => {
      Logger.infoService("Card successfully saved with ID: " + newCard.id);
      // Convert ISO-Strings back to Date-Objects
      resolve({
        ...newCard,
        createdAt: new Date(newCard.createdAt),
        updatedAt: new Date(newCard.updatedAt),
      });
    };

    request.onerror = (event) => {
      handleIndexedDBError(reject, event);
    };
  });
};