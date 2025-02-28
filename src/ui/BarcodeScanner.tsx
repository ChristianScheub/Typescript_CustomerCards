import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Logger from "../services/Logger/logger";
import { BarcodeType } from "../types/BarcodeTypes";
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

interface BarcodeScannerProps {
  onScan: (data: string | null, format: BarcodeType) => void;
}

export const BarcodeScannerComponent: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const { t } = useTranslation();

  // Mapping von ML Kit Format-Strings auf den internen BarcodeType
  const formatMapping: { [key: string]: BarcodeType } = {
    EAN_13: BarcodeType.EAN13,
    CODE_128: BarcodeType.CODE128,
    UPC_A: BarcodeType.UPC_A,
    CODE_39: BarcodeType.CODE39,
    QR_CODE: BarcodeType.QRCode,
  };

  // Anfrage der Kameraberechtigung
  const requestPermissions = async (): Promise<boolean> => {
    try {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === "granted" || camera === "limited";
    } catch (error) {
      Logger.error("Fehler bei der Berechtigungsanfrage: " + error);
      return false;
    }
  };

  // Alert anzeigen, wenn keine Berechtigung erteilt wurde
  const presentAlert = async () => {
    window.alert(
      t("barcodeScanner_permissionDenied") ||
        "Bitte erteile die Kameraberechtigung, um den Barcode-Scanner zu verwenden."
    );
  };

  useEffect(() => {
    const startScan = async () => {
      try {
        // Prüfe, ob Barcode-Scanning unterstützt wird
        const supportResult = await BarcodeScanner.isSupported();
        if (!supportResult.supported) {
          Logger.error("Barcode-Scanning wird auf diesem Gerät nicht unterstützt.");
          onScan(null, BarcodeType.CODE128);
          return;
        }

        // Berechtigungen anfordern
        const granted = await requestPermissions();
        if (!granted) {
          await presentAlert();
          onScan(null, BarcodeType.CODE128);
          return;
        }

        Logger.info("Starte MLKit BarcodeScanning Scan...");
        // Scan durchführen
        const { barcodes } = await BarcodeScanner.scan();

        if (barcodes.length > 0) {
          const barcode: Barcode = barcodes[0];
          const mappedFormat = formatMapping[barcode.format] || BarcodeType.CODE128;
          onScan(barcode.rawValue, mappedFormat);
        } else {
          onScan(null, BarcodeType.CODE128);
        }
      } catch (error) {
        Logger.error("Scan-Fehler: " + error);
        onScan(null, BarcodeType.CODE128);
      }
    };

    startScan();

    return () => {
      // Falls @capacitor-mlkit/barcode-scanning eine Methode zum Stoppen des Scans bereitstellt, kann diese hier aufgerufen werden.
    };
  }, [onScan, t]);

  return (
    <div className="scanner-overlay">
      {/* Hier können zusätzliche UI-Elemente ergänzt werden */}
    </div>
  );
};
