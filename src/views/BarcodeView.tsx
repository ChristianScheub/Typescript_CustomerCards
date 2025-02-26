import React from "react";
import Barcode from "react-barcode";
import { BarcodeType } from "../types/BarcodeTypes";

interface BarcodeGeneratorViewProps {
  value: string;
  type: BarcodeType;
  width: number;
  height: number;
  color: string;
  error: string | null;
}

const formatMap: Record<BarcodeType, "CODE128" | "EAN13" | "UPC" | "CODE39"> = {
  [BarcodeType.CODE128]: "CODE128",
  [BarcodeType.EAN13]: "EAN13",
  [BarcodeType.UPC_A]: "UPC",
  [BarcodeType.CODE39]: "CODE39",
};

const BarcodeGeneratorView: React.FC<BarcodeGeneratorViewProps> = ({ value, type, width, height, color, error }) => {
  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <Barcode
      value={value}
      format={formatMap[type]}
      width={width}
      height={height}
      lineColor={color}
      margin={10 * width}
      displayValue={false}
    />
  );
};

export default BarcodeGeneratorView;
