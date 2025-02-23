import Logger from "../../Logger/logger";

export const validateInput = (value: string) => {
  Logger.infoService("validate Input:"+value);
  if (!value || value.trim().length === 0) {
    Logger.error("Invalid empty value!");
  }
};