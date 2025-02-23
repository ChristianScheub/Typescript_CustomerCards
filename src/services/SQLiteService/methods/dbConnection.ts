import { CapacitorSQLite, SQLiteConnection, SQLiteDBConnection } from "@capacitor-community/sqlite";

const DB_NAME = "customer_cards_db";

let db: SQLiteDBConnection | null = null;

export const getDbConnection = async (): Promise<SQLiteDBConnection> => {
  if (!db) {
    const sqlite = new SQLiteConnection(CapacitorSQLite);
    db = await sqlite.createConnection(DB_NAME, false, "no-encryption", 1, false);
    await db.open();
  }
  return db;
};