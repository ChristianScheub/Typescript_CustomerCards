import React, { useState, useEffect } from "react";
import QRCodeGeneratorView from "../views/QRCodeGeneratorView";

interface QRCodeGeneratorContainerProps {
  value: string;
  size?: number;
  color?: string;
}

const QRCodeGeneratorContainer: React.FC<QRCodeGeneratorContainerProps> = ({
  value,
  size = 128,
  color = "#000000",
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (value.length === 0) {
        throw new Error("The QR Code shouldn t be 0");
      }
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  }, [value]);

  return <QRCodeGeneratorView value={value} size={size} color={color} error={error} />;
};

export default QRCodeGeneratorContainer;
