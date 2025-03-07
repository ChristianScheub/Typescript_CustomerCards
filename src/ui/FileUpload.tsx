import React from "react";
import Logger from "../services/Logger/logger";
import { Barcode, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { BarcodeType } from "../types/BarcodeTypes";
import { Filesystem, Directory } from "@capacitor/filesystem";

interface FileUploadScannerProps {
  onScan: (data: string | null, format: BarcodeType) => void;
}

const FileUploadScanner: React.FC<FileUploadScannerProps> = ({ onScan }) => {
  // Mapping von Plugin-Format-Strings auf den internen BarcodeType
  const formatMapping: { [key: string]: BarcodeType } = {
    EAN_13: BarcodeType.EAN13,
    CODE_128: BarcodeType.CODE128,
    UPC_A: BarcodeType.UPC_A,
    CODE_39: BarcodeType.CODE39,
    QR_CODE: BarcodeType.QRCode,
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Lese die Datei als Base64
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const result = reader.result as string;
          // Entferne den Data-URL-Header, falls vorhanden
          const base64Data = result.includes(",") ? result.split(",")[1] : result;
          const filename = `barcode-upload-${Date.now()}.png`;

          // Schreibe die Datei in das Cache-Verzeichnis
          const writeResult = await Filesystem.writeFile({
            path: filename,
            data: base64Data,
            directory: Directory.Cache,
          });
          const filePath = writeResult.uri; // Dieser Pfad wird vom nativen Layer genutzt

          Logger.info("Barcode-Scan aus hochgeladenem Bild starten mit Pfad: " + filePath);
          const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
            path: filePath,
          });

          if (barcodes.length > 0) {
            const barcode: Barcode = barcodes[0];
            const mappedFormat = formatMapping[barcode.format] || BarcodeType.CODE128;
            onScan(barcode.rawValue, mappedFormat);
          } else {
            onScan(null, BarcodeType.CODE128);
          }
        } catch (error) {
          Logger.error("Fehler beim Scannen des Bildes: " + error);
          onScan(null, BarcodeType.CODE128);
        }
      };

      reader.onerror = (error) => {
        Logger.error("Fehler beim Lesen der Datei: " + error);
        onScan(null, BarcodeType.CODE128);
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="file-upload-scanner">
      <label htmlFor="file-upload">
        Wähle ein Bild aus deiner Bibliothek zum Scannen:
      </label>
      <input
        id="file-upload"
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
      />
    </div>
  );
};

export default FileUploadScanner;
