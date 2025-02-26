import React, { useState, useEffect } from "react";
import QRCodeGeneratorView from "../views/QRCodeGeneratorView";

interface QRCodeGeneratorContainerProps {
  value: string;
  size?: number;
  color?: string;
}

const QRCodeGeneratorContainer: React.FC<QRCodeGeneratorContainerProps> = ({
  value,
  size = 128, // Standardgröße des QR-Codes
  color = "#000000", // Standardfarbe Schwarz
}) => {
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Beispielhafte Validierung für QR-Codes
      if (value.length === 0) {
        throw new Error("Der QR-Code-Wert darf nicht leer sein.");
      }
      setError(null); // Reset error state on valid input
    } catch (err: any) {
      setError(err.message);
    }
  }, [value]);

  return <QRCodeGeneratorView value={value} size={size} color={color} error={error} />;
};

export default QRCodeGeneratorContainer;
