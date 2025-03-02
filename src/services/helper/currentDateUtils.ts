import Logger from "../Logger/logger";

export const getCurrentDate = (): string => {
  const today = new Date();
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0");
  const day = today.getDate().toString().padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatDateInEU = (dateString: string) => {
  const date = new Date(dateString);
  
  if (isNaN(date.getTime())) {
    Logger.error(`Invalid date: ${dateString}`);
    return "Invalid Date";
  }

  const currentYear = new Date().getFullYear();
  const isCurrentYear = date.getFullYear() === currentYear;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = isCurrentYear ? "" : `.${date.getFullYear()}`;

  Logger.infoService(dateString);
  Logger.infoService(`${day}.${month}${year}`);

  return `${day}.${month}${year}`;
};


export const formatDateWithTime = (dateString: string) => {
  const date = new Date(dateString);
  const currentYear = new Date().getFullYear();
  const isCurrentYear = date.getFullYear() === currentYear;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = isCurrentYear ? "" : `.${date.getFullYear()}`;

  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${day}.${month}${year} ${hours}:${minutes}`;
};
