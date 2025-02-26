import React from "react";
import { QRScanner } from "../../ui/QRScanner";
import { BarcodeScanner } from "../../ui/BarcodeScanner";
import { CodeType } from "../../services/SQLiteService/types/CodeType";

interface NewCardViewProps {
  scannerType: CodeType;
  scannedCode: string | null;
  shopName: string;
  onSelectScanner: (type: CodeType) => void;
  onScan: (data: string | null) => void;
  onAddCard: () => void;
  onShopNameChange: (name: string) => void;
}


const NewCardView: React.FC<NewCardViewProps> = ({
  scannerType,
  scannedCode,
  shopName,
  onSelectScanner,
  onScan,
  onAddCard,
  onShopNameChange,
}) => {
  return (
    <div>
      <h1>Scanner Auswahl</h1>

      {/* Eingabefeld für den Shop-Namen */}
      <div>
        <label htmlFor="shopName">Shop-Name:</label>
        <input
          id="shopName"
          type="text"
          value={shopName}
          onChange={(e) => onShopNameChange(e.target.value)}
          placeholder="Geben Sie den Shop-Namen ein"
        />
      </div>

      {/* Auswahlmöglichkeiten für den Nutzer */}
      <div>
        <button onClick={() => onSelectScanner(CodeType.QR_CODE)}>QR-Code Scanner</button>
        <button onClick={() => onSelectScanner(CodeType.BARCODE)}>Barcode Scanner</button>
      </div>

      {/* Anzeigen des entsprechenden Scanners basierend auf der Auswahl */}
      <div>
        {scannerType === CodeType.QR_CODE && <QRScanner onScan={onScan} />}
        {scannerType === CodeType.BARCODE && <BarcodeScanner onScan={onScan} />}
      </div>

      {/* Anzeige des gescannten Codes */}
      <div>
        {scannedCode && (
          <p>Gescannt: {scannedCode}</p>
        )}
      </div>

      {/* Button zum Hinzufügen der Kundenkarte */}
      <div>
        <button onClick={onAddCard}>Kundenkarte hinzufügen</button>
      </div>
    </div>
  );
};

export default NewCardView;