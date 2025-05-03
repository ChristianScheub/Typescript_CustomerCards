export enum CardTypeEnum {
    CODE128 = "CODE128",
    EAN8 = 'EAN8',
    EAN13 = "EAN13",
    UPC_A = "UPC",
    CODE39 = "CODE39",
    QRCode = "QRCode",
    UPCE = 'UPCE',
    ITF = 'ITF',
    CODABAR = 'codabar'
  }
  
export type BarcodeType =
  | "CODE128"
  | "EAN8"
  | "EAN13"
  | "UPC"
  | "CODE39"
  | "UPCE"
  | "ITF"
  | "codabar";

  export type CardType =
  | "CODE128"
  | "EAN8"
  | "EAN13"
  | "UPC"
  | "CODE39"
  | "UPCE"
  | "ITF"
  | "QRCode"
  | "codabar";