import Logger from "../../Logger/logger";

export const handleIndexedDBError = (reject: (reason?: any) => void, event: Event) => {
    const error = (event.target as IDBRequest).error;
    if (error instanceof Error) {
      Logger.error("IndexedDB error: " + error.message);
      reject(error);
    } else {
      const errorMessage = "Unknown IndexedDB error occurred";
      Logger.error(errorMessage);
      reject(new Error(errorMessage));
    }
};