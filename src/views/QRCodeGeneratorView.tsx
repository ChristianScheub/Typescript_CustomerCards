import React from "react";
import QRCode from "react-qr-code";

interface QRCodeGeneratorViewProps {
  value: string;
  size: number;
  color: string;
  error: string | null;
}

const QRCodeGeneratorView: React.FC<QRCodeGeneratorViewProps> = ({ value, size, color, error }) => {
  if (error) {
    return <div style={{ color: "red" }}>Error: {error}</div>;
  }

  return (
    <QRCode
      value={value}
      size={size}
      fgColor={color}
      level="Q" // Set error correction level to "Q" for better performance
    />
  );
};

export default QRCodeGeneratorView;
