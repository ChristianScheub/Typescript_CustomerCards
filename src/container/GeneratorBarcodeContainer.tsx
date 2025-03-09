import React, { useState, useEffect } from "react";
import { validateInput } from "../services/helper/validateInput";
import { BarcodeType } from "../types/BarcodeTypes";
import BarcodeGeneratorView from "../views/BarcodeGeneratorView";

interface BarcodeGeneratorContainerProps {
  value: string;
  type: BarcodeType;
  width: number;
  color?: string;
}

const BarcodeGeneratorContainer: React.FC<BarcodeGeneratorContainerProps> = ({
  value,
  type,
  width,
  color = "#000000",
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      validateInput(value);

      if (type === BarcodeType.EAN13 && ![12, 13].includes(value.length)) {
        throw new Error("EAN-13 needs to have 12 or 13 numbers.");
      }
      if (type === BarcodeType.UPC_A && ![11, 12].includes(value.length)) {
        throw new Error("UPC-A needs to have 11 or 12 numbers.");
      }

      setError(null); // Reset error state on valid input
    } catch (err: any) {
      setError(err.message);
    }
  }, [value, type]);

  return <BarcodeGeneratorView value={value} type={type} width={width} color={color} error={error} />;
};

export default BarcodeGeneratorContainer;
