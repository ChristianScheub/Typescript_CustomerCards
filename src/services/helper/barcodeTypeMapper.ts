import { CardTypeEnum } from "../../types/BarcodeTypes";

export const toBwipType = (type: CardTypeEnum): string => {
  switch (type) {
    case CardTypeEnum.CODE128: return "code128";
    case CardTypeEnum.EAN8:    return "ean8";
    case CardTypeEnum.EAN13:   return "ean13";
    case CardTypeEnum.UPC_A:   return "upca";
    case CardTypeEnum.CODE39:  return "code39";
    case CardTypeEnum.UPCE:    return "upce";
    case CardTypeEnum.ITF:     return "interleaved2of5";
    case CardTypeEnum.CODABAR: return "rationalizedCodabar";
    default:                   return "code128";
  }
};
