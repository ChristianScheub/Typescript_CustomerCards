import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Logger from "../services/Logger/logger";
import { BarcodeType } from "../types/BarcodeTypes";
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerTypeHint } from "@capacitor/barcode-scanner";

interface BarcodeScannerProps {
  onScan: (data: string | null, format: BarcodeType) => void;
}

export const BarcodeScannerComponent: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const { t } = useTranslation();

  useEffect(() => {
    const scanBarcode = async () => {
      try {
        Logger.info("Starting CapacitorBarcodeScanner scan...");
        const result = await CapacitorBarcodeScanner.scanBarcode({
          hint: CapacitorBarcodeScannerTypeHint.ALL,
        });

        // Das Plugin liefert keinen Barcode-Typ; daher wird ein Default-Typ verwendet.
        if (result.ScanResult) {
          onScan(result.ScanResult, BarcodeType.CODE128);
        } else {
          onScan(null, BarcodeType.CODE128);
        }
      } catch (error) {
        Logger.error("Scan error: " + error);
        onScan(null, BarcodeType.CODE128);
      }
    };

    scanBarcode();

    return () => {
      // Falls das Plugin eine Methode zum Stoppen des Scans bereitstellt, kann diese hier aufgerufen werden.
    };
  }, [onScan, t]);

  return (
    <div className="scanner-overlay">
      {/* Optionale UI-Elemente können hier ergänzt werden */}
    </div>
  );
};
