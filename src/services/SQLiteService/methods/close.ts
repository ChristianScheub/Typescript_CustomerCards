import Logger from "../../Logger/logger";
import { getDbConnection } from "./dbConnection";

export const close = async (): Promise<void> => {
    const db = await getDbConnection();
    Logger.infoService("Close DB Connection");
    await db.close();
};