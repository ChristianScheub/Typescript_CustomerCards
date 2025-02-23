import Logger from "../../Logger/logger";
import { encodeCode128, encodeCode39, encodeEAN13, encodeSimple, encodeUPCA } from "../helpers/encodingMethods";
import { BarcodeType } from "../types/BarcodeTypes";

export const generateBarcodeSvg = (
  value: string,
  type: BarcodeType,
  width = 2,
  height = 100,
  color = "#000000"
): string => {
  const encoded = encodeBarcode(value, type);

  const svgContent = encoded
    .map((bar, i) =>
      bar
        ? `<rect x="${i * width}" y="0" width="${width}" height="${height}" fill="${color}" />`
        : ""
    )
    .join("");

  return `<svg width="${encoded.length * width}" height="${height}">${svgContent}</svg>`;
};

const encodeBarcode = (value: string, type: BarcodeType): number[] => {
  switch (type) {
    case BarcodeType.CODE128:
      return encodeCode128(value);
    case BarcodeType.EAN13:
      return encodeEAN13(value);
    case BarcodeType.UPC_A:
      return encodeUPCA(value);
    case BarcodeType.CODE39:
      return encodeCode39(value);
    case BarcodeType.SIMPLE:
      return encodeSimple(value);
    default:
      Logger.error("Unkown Barcode Type!"+type);
      throw new Error(`Unbekannter Barcode-Typ: ${type}`);
  }
};
