import Logger from "../../Logger/logger";
import { getDbConnection } from "./dbConnection";

export const initialize = async (): Promise<void> => {
  const db = await getDbConnection();
  Logger.infoService("Init DB new");

  await db.execute(`
    CREATE TABLE IF NOT EXISTS customer_cards (
      id TEXT PRIMARY KEY,
      shopName TEXT NOT NULL,
      cardContent TEXT NOT NULL,
      codeType TEXT NOT NULL,
      barcodeEncoding TEXT,
      createdAt TEXT NOT NULL,
      updatedAt TEXT NOT NULL
    );
  `);
};