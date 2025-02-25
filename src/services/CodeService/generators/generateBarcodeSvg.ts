import React from "react";
import ReactDOMServer from "react-dom/server";
import Barcode from "react-barcode";
import Logger from "../../Logger/logger";
import { BarcodeType } from "../types/BarcodeTypes";

export const generateBarcodeSvg = (
  value: string,
  type: BarcodeType,
  width = 2,
  height = 100,
  color = "#000000"
): string => {
  // Validierungen für bestimmte Barcode-Typen
  if (type === BarcodeType.EAN13 && ![12, 13].includes(value.length)) {
    Logger.error("EAN-13 muss 12 oder 13 Ziffern haben.");
    throw new Error("EAN-13 muss 12 oder 13 Ziffern haben.");
  }

  if (type === BarcodeType.UPC_A && ![11, 12].includes(value.length)) {
    Logger.error("UPC-A muss 11 oder 12 Ziffern haben.");
    throw new Error("UPC-A muss 11 oder 12 Ziffern haben.");
  }

  // Mapping der Barcode-Typen
  const formatMap = {
    [BarcodeType.CODE128]: "CODE128",
    [BarcodeType.EAN13]: "EAN13",
    [BarcodeType.UPC_A]: "UPC",
    [BarcodeType.CODE39]: "CODE39",
  } as const;

  // React Element ohne JSX-Syntax erstellen
  const barcodeElement = React.createElement(
    Barcode as unknown as React.ComponentType<any>, // Type Assertion für die Bibliothek
    {
      value: value,
      format: formatMap[type],
      width: width,
      height: height,
      lineColor: color,
      margin: 10 * width, // Quiet Zone
      displayValue: false,
    }
  );

  return ReactDOMServer.renderToString(barcodeElement);
};