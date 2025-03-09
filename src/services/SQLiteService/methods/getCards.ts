import { CustomerCard } from "../../../types/CustomerCard";
import Logger from "../../Logger/logger";
import { getDbConnection } from "./dbConnection";
import { handleIndexedDBError } from "./handleError";

export const getCards = async (): Promise<CustomerCard[]> => {
  const db = await getDbConnection();

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("customer_cards", "readonly");
    const store = transaction.objectStore("customer_cards");
    const request = store.getAll();

    request.onsuccess = (event) => {
      const cards = (event.target as IDBRequest).result as CustomerCard[];
      resolve(cards);
    };

    request.onerror = (event) => {
      handleIndexedDBError(reject, event);
    };
  });
};

export const getFilteredCards = async (searchQuery: string): Promise<CustomerCard[]> => {
  const db = await getDbConnection();
  Logger.infoService("Get Filtered Cards for"+searchQuery)

  return new Promise((resolve, reject) => {
    const transaction = db.transaction("customer_cards", "readonly");
    const store = transaction.objectStore("customer_cards");
    const request = store.getAll();

    request.onsuccess = (event) => {
      const cards = (event.target as IDBRequest).result as CustomerCard[];
      const filteredCards = cards.filter(card => 
        card.shopName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      resolve(filteredCards);
    };

    request.onerror = (event) => {
      handleIndexedDBError(reject, event);
    };
  });
};
