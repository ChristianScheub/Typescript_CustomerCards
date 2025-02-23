import Logger from "../../Logger/logger";
import { getDbConnection } from "./dbConnection";

export const deleteCard = async (cardId: string): Promise<void> => {
  const db = await getDbConnection();
  Logger.infoService("Delete Card"+cardId);
  await db.run("DELETE FROM customer_cards WHERE id = ?", [cardId]);
};