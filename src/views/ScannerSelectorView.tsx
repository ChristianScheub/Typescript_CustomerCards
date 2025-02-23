import React, { useState } from "react";
import { QRScanner } from "../ui/QRScanner";
import { BarcodeScanner } from "../ui/BarcodeScanner";

const ScannerSelector: React.FC = () => {
  const [scannerType, setScannerType] = useState<"QR" | "Barcode" | null>(null);
  const [scannedCode, setScannedCode] = useState<string | null>(null);

  // Callback für beide Scanner, der den gescannten Code anzeigt
  const handleScan = (data: string | null) => {
    setScannedCode(data);
  };

  return (
    <div>
      <h1>Scanner Auswahl</h1>
      
      {/* Auswahlmöglichkeiten für den Nutzer */}
      <div>
        <button onClick={() => setScannerType("QR")}>QR-Code Scanner</button>
        <button onClick={() => setScannerType("Barcode")}>Barcode Scanner</button>
      </div>

      {/* Anzeigen des entsprechenden Scanners basierend auf der Auswahl */}
      <div>
        {scannerType === "QR" && <QRScanner onScan={handleScan} />}
        {scannerType === "Barcode" && <BarcodeScanner onScan={handleScan} />}
      </div>

      {/* Anzeige des gescannten Codes */}
      <div>
        {scannedCode && (
          <p>Gescannt: {scannedCode}</p>
        )}
      </div>
    </div>
  );
};

export default ScannerSelector;
