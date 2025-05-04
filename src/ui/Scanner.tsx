import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import Logger from "../services/Logger/logger";
import { CardTypeEnum, CardType } from "../types/BarcodeTypes";
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';

interface ScannerProps {
  onScan: (data: string | null, format: CardType) => void;
}

export const ScannerComponent: React.FC<ScannerProps> = ({ onScan }) => {
  const { t } = useTranslation();


  const requestPermissions = async (): Promise<boolean> => {
    try {
      const { camera } = await BarcodeScanner.requestPermissions();
      return camera === "granted" || camera === "limited";
    } catch (error) {
      Logger.error("Fehler bei der Berechtigungsanfrage: " + error);
      return false;
    }
  };

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
          onScan(null, CardTypeEnum.CODE128);
          return;
        }

        // Berechtigungen anfordern
        const granted = await requestPermissions();
        if (!granted) {
          await presentAlert();
          onScan(null, CardTypeEnum.CODE128);
          return;
        }

        Logger.info("Starte MLKit BarcodeScanning Scan...");
        // Scan durchführen
        const { barcodes } = await BarcodeScanner.scan();

        if (barcodes.length > 0) {
          const barcode: Barcode = barcodes[0];
          const format = barcode.format as CardType;
          Logger.info("Scan Photo from camera:"+ JSON.stringify(barcode));
          onScan(barcode.rawValue, format);
        } else {
          onScan(null, CardTypeEnum.CODE128);
        }
      } catch (error) {
        Logger.error("Scan-Fehler: " + error);
        onScan(null, CardTypeEnum.CODE128);
      }
    };

    startScan();

    return () => {
    };
  }, [onScan, t]);

  return (
    <div className="scanner-overlay">
    </div>
  );
};
