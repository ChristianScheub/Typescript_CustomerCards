import Logger from "../../Logger/logger";
import { CustomerCard } from "../types/CustomerCard";
import { getDbConnection } from "./dbConnection";

export const updateCard = async (
  cardId: string,
  updates: Partial<CustomerCard>
): Promise<void> => {
  const db = await getDbConnection();
  Logger.infoService("Update Card ID:"+cardId+" now to"+JSON.stringify(updates))

  const updatedAt = new Date().toISOString();
  await db.run(
    `UPDATE customer_cards
     SET shopName = ?, cardContent = ?, codeType = ?, barcodeEncoding = ?, updatedAt = ?
     WHERE id = ?`,
    [
      updates.shopName,
      updates.cardContent,
      updates.codeType,
      updates.barcodeEncoding || null,
      updatedAt,
      cardId,
    ]
  );
};
