import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";

export const encodeCode128 = (value: string): number[] => {
  return generateBarcodeBinary(value, "CODE128");
};

export const encodeEAN13 = (value: string): number[] => {
  if (value.length !== 12 && value.length !== 13) {
    throw new Error("EAN-13 muss 12 oder 13 Ziffern haben.");
  }
  return generateBarcodeBinary(value, "EAN13");
};

export const encodeUPCA = (value: string): number[] => {
  if (value.length !== 11 && value.length !== 12) {
    throw new Error("UPC-A muss 11 oder 12 Ziffern haben.");
  }
  return generateBarcodeBinary(value, "UPC");
};

export const encodeCode39 = (value: string): number[] => {
  return generateBarcodeBinary(value, "CODE39");
};

export const encodeSimple = (value: string): number[] =>
  value.split("").flatMap((char) => (char.charCodeAt(0) % 2 === 0 ? [1, 0] : [0, 1]));

const generateBarcodeBinary = (value: string, format: string): number[] => {
  const canvas = createCanvas(1, 1); // Dummy-Canvas für Barcode-Rendering
  JsBarcode(canvas, value, { format });

  const imageData = canvas.getContext("2d")?.getImageData(0, 0, canvas.width, canvas.height);
  if (!imageData) {
    throw new Error(`Barcode-Generierung für ${format} fehlgeschlagen.`);
  }

  return Array.from(imageData.data).map((pixel) => (pixel === 0 ? 1 : 0)); // Schwarz = 1, Weiß = 0
};
