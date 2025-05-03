import React from "react";
import Barcode from "react-barcode";
import { BarcodeType, CardTypeEnum } from "../types/BarcodeTypes";

interface BarcodeGeneratorViewProps {
  value: string;
  type: CardTypeEnum;
  width: number;
  color: string;
  error: string | null;
}

const BarcodeGeneratorView: React.FC<BarcodeGeneratorViewProps> = ({ value, type, width, color, error }) => {
  if (error) {
    return <div style={{ color: "red" }}>Error: {error+width}</div>;
  }

  return (
    <Barcode
      value={value}
      format={type as BarcodeType}
      width={2}
      lineColor={color}
      displayValue={true}
    />
  );
};

export default BarcodeGeneratorView;
