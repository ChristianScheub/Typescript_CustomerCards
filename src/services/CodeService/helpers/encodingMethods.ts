import JsBarcode from "jsbarcode";
import { createCanvas } from "canvas";
import Logger from "../../Logger/logger";

export const encodeCode128 = (value: string): number[] => {
  return generateBarcodeBinary(value, "CODE128");
};

export const encodeEAN13 = (value: string): number[] => {
  if (value.length !== 12 && value.length !== 13) {
    Logger.error("EAN-13 muss 12 oder 13 Ziffern haben.");
    throw new Error("EAN-13 muss 12 oder 13 Ziffern haben.");
  }
  return generateBarcodeBinary(value, "EAN13");
};

export const encodeUPCA = (value: string): number[] => {
  if (value.length !== 11 && value.length !== 12) {
    Logger.error("UPC-A muss 11 oder 12 Ziffern haben.");
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
  // Schätze eine ausreichende Breite:
  // Wir nehmen hier entweder mindestens 300px oder (value.length * 40), je nachdem, was größer ist.
  const estimatedWidth = Math.max(300, value.length * 40);
  const canvas = createCanvas(estimatedWidth, 120); // Höhe etwas größer als die Barcode-Höhe

  // Barcode zeichnen – hier werden feste Parameter genutzt.
  JsBarcode(canvas, value, {
    format,
    displayValue: false,
    margin: 0,
    width: 2,    // Breite eines Balkens
    height: 100, // Höhe des Barcodes
  });

  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;
  const imageData = ctx.getImageData(0, 0, width, height);

  const binaryPattern: number[] = [];

  // Für jede Spalte: Berechne, wie viele Pixel schwarz sind.
  for (let x = 0; x < width; x++) {
    let blackCount = 0;
    for (let y = 0; y < height; y++) {
      const index = (y * width + x) * 4; // Jeder Pixel hat 4 Werte (RGBA)
      const r = imageData.data[index];
      const g = imageData.data[index + 1];
      const b = imageData.data[index + 2];
      // Heller oder dunkel? Wir verwenden einen einfachen Schwellwert (128)
      const brightness = (r + g + b) / 3;
      if (brightness < 128) {
        blackCount++;
      }
    }
    // Wird mehr als die Hälfte der Pixel in dieser Spalte als schwarz erkannt, gilt die Spalte als schwarz.
    binaryPattern.push(blackCount > height / 2 ? 1 : 0);
  }

  Logger.info(`Barcode (${format}) generiert: Breite ${width}px, Pattern-Länge ${binaryPattern.length}`);
  return binaryPattern;
};
