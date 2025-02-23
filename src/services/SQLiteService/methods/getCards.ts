import { CustomerCard } from "../types/CustomerCard";
import { getDbConnection } from "./dbConnection";

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
      const error = (event.target as IDBRequest).error;
      reject(error);
    };
  });
};