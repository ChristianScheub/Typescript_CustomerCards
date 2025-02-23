import Logger from "../../Logger/logger";
import { CustomerCard } from "../types/CustomerCard";
import { getDbConnection } from "./dbConnection";

export const getCards = async (): Promise<CustomerCard[]> => {
  const db = await getDbConnection();
  Logger.infoService("Get Cards from DB");
  const result = await db.query("SELECT * FROM customer_cards");
  Logger.infoService(JSON.stringify(result));

  return (result.values || []).map((card: CustomerCard) => ({
    ...card,
    createdAt: new Date(card.createdAt),
    updatedAt: new Date(card.updatedAt),
  }));
};