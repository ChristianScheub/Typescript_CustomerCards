import React from "react";
import Barcode from "react-barcode";
import { BarcodeType } from "../types/BarcodeTypes";

interface BarcodeGeneratorViewProps {
  value: string;
  type: BarcodeType;
  width: number;
  color: string;
  error: string | null;
}

const formatMap: Record<BarcodeType, "CODE128" | "EAN13" | "UPC" | "CODE39"> = {
  [BarcodeType.CODE128]: "CODE128",
  [BarcodeType.EAN13]: "EAN13",
  [BarcodeType.UPC_A]: "UPC",
  [BarcodeType.CODE39]: "CODE39",
  [BarcodeType.QRCode]: "CODE128",
};

const BarcodeGeneratorView: React.FC<BarcodeGeneratorViewProps> = ({ value, type, width, color, error }) => {
  if (error) {
    return <div style={{ color: "red" }}>Error: {error+width}</div>;
  }

  return (
    <Barcode
      value={value}
      format={formatMap[type]}
      width={2}
      lineColor={color}
      displayValue={true}
    />
  );
};

export default BarcodeGeneratorView;
