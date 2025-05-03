import React from "react";
import Logger from "../services/Logger/logger";
import { Barcode, BarcodeScanner } from "@capacitor-mlkit/barcode-scanning";
import { CardType } from "../types/BarcodeTypes";
import { Filesystem, Directory } from "@capacitor/filesystem";
import Button from "react-bootstrap/esm/Button";
import { FaRegFileImage } from "react-icons/fa";

interface FileUploadScannerProps {
  onScan: (data: string | null, format: CardType) => void;
}

const FileUploadScanner: React.FC<FileUploadScannerProps> = ({ onScan }) => {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const result = reader.result as string;
          const base64Data = result.includes(",") ? result.split(",")[1] : result;
          const filename = `barcode-upload-${Date.now()}.png`;

          const writeResult = await Filesystem.writeFile({
            path: filename,
            data: base64Data,
            directory: Directory.Cache,
          });
          const filePath = writeResult.uri;

          Logger.info("Barcode-Scan aus hochgeladenem Bild starten mit Pfad: " + filePath);
          const { barcodes } = await BarcodeScanner.readBarcodesFromImage({ path: filePath });

          if (barcodes.length > 0) {
            const barcode: Barcode = barcodes[0];
            const format = barcode.format as CardType;
            Logger.info("Scan File Upload: " + JSON.stringify(barcode));
            onScan(barcode.rawValue, format);
          } else {
            onScan(null, "CODE128"); // Fallback für leere Scans
          }
        } catch (error) {
          Logger.error("Error while scanning image: " + error);
          onScan(null, "CODE128");
        }
      };

      reader.onerror = (event) => {
        const error = (event.target as FileReader).error;
        const errorMessage = error instanceof DOMException ? error.message : "Unbekannter Fehler";
        Logger.error("Fehler beim Lesen der Datei: " + errorMessage);
        onScan(null, "CODE128");
      };

      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="file-upload-scanner">
      <label htmlFor="file-input" data-testid="settings-notes-import2">
        <input
          accept="image/*"
          id="file-input"
          multiple
          type="file"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
        <Button
          style={{ width: "30vw", border: "0" }}
          className="backgroundColorNotFocused"
          onClick={() => document.getElementById("file-input")?.click()}
        >
          <FaRegFileImage size="10vw" />
        </Button>
      </label>
    </div>
  );
};

export default FileUploadScanner;