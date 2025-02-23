import Logger from "../../Logger/logger";
import { CustomerCard } from "../types/CustomerCard";
import { getDbConnection } from "./dbConnection";

export const saveCard = async (
  card: Omit<CustomerCard, "id" | "createdAt" | "updatedAt">
): Promise<CustomerCard> => {
  const db = await getDbConnection();
  Logger.infoService("Try to save new Card"+JSON.stringify(card));


  const newCard = {
    ...card,
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  await db.run(
    `INSERT INTO customer_cards (id, shopName, cardContent, codeType, barcodeEncoding, createdAt, updatedAt)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [
      newCard.id,
      newCard.shopName,
      newCard.cardContent,
      newCard.codeType,
      newCard.barcodeEncoding || null,
      newCard.createdAt,
      newCard.updatedAt,
    ]
  );

  // Convert ISO Strings to Date-Objects
  return {
    ...newCard,
    createdAt: new Date(newCard.createdAt),
    updatedAt: new Date(newCard.updatedAt),
  };
};