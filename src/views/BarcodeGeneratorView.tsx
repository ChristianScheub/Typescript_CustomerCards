import React, { useEffect, useRef } from "react";
import bwipjs from "bwip-js/browser";
import { CardTypeEnum } from "../types/BarcodeTypes";
import { toBwipType } from "../services/helper/barcodeTypeMapper";

interface BarcodeGeneratorViewProps {
  value: string;
  type: CardTypeEnum;
  width: number;
  color: string;
  error: string | null;
}

const BarcodeGeneratorView: React.FC<BarcodeGeneratorViewProps> = ({ value, type, width, color, error }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (error || !canvasRef.current || !value) return;

    try {
      bwipjs.toCanvas(canvasRef.current, {
        bcid: toBwipType(type),
        text: value,
        scale: width + 1,
        height: 12,
        includetext: true,
        textxalign: "center",
        barcolor: color.replace("#", ""),
        textcolor: color.replace("#", ""),
      });
    } catch (e) {
      console.error("bwip-js render error:", e);
    }
  }, [value, type, width, color, error]);

  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return <canvas ref={canvasRef} />;
};

export default BarcodeGeneratorView;
