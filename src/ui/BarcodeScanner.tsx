import React, { useEffect } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import { useTranslation } from "react-i18next";
import Logger from "../services/Logger/logger";
import { BarcodeType } from "../types/BarcodeTypes";

interface BarcodeScannerProps {
  onScan: (data: string | null, format: BarcodeType) => void; // Format ist nie null
}

export const BarcodeScannerComponent: React.FC<BarcodeScannerProps> = ({
  onScan,
}) => {
  const { t } = useTranslation();

  const formatMapping: { [key: string]: BarcodeType } = {
    EAN_13: BarcodeType.EAN13,
    CODE_128: BarcodeType.CODE128,
    UPC_A: BarcodeType.UPC_A,
    CODE_39: BarcodeType.CODE39,
    QR_CODE: BarcodeType.QRCode,
  };

  useEffect(() => {
    const prepareAndScan = async () => {
      try {
        // 1. Prepare the UI
        await BarcodeScanner.hideBackground();
        document.body.classList.add("barcode-scanner-active");

        // 2. Check permissions
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (!status.granted) {
          Logger.error(t("barcodeScanner_permissionDenied"));
          onScan(null, BarcodeType.CODE128);
          return;
        }

        // 3. Start scanning
        Logger.info("Starting barcode scanner...");
        const result = await BarcodeScanner.startScan();

        // 4. Handle result
        if (result.hasContent) {
          const mappedFormat =
            formatMapping[result.format] || BarcodeType.CODE128;
          onScan(result.content, mappedFormat);
        } else {
          onScan(null, BarcodeType.CODE128);
        }
      } catch (error) {
        Logger.error("Scan error: " + error);
        onScan(null, BarcodeType.CODE128);
      } finally {
        // 5. Cleanup
        document.body.classList.remove("barcode-scanner-active");
        await BarcodeScanner.showBackground();
        await BarcodeScanner.stopScan();
      }
    };

    prepareAndScan();

    return () => {
      BarcodeScanner.stopScan();
      BarcodeScanner.showBackground();
    };
  }, [onScan, t]);

  return (
    <div className="scanner-overlay">
      {/* Optional: Add custom UI elements here */}
    </div>
  );
};
