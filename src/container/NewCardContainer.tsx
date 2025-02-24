import React, { useState } from "react";
import NewCardView from "../views/NewCardView";
import sqliteService from "../services/SQLiteService";
import { CustomerCard } from "../services/SQLiteService/types/CustomerCard";
import { CodeType } from "../services/SQLiteService/types/CodeType";
import { BarcodeType } from "../services/CodeService/types/BarcodeTypes";

const NewCardContainer: React.FC = () => {
  const [scannerType, setScannerType] = useState<CodeType.QR_CODE | CodeType.BARCODE | CodeType.NULL >(CodeType.NULL );
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string>("");

  // Callback für beide Scanner, der den gescannten Code anzeigt
  const handleScan = (data: string | null) => {
    setScannedCode(data);
  };

  // Funktion zum Hinzufügen der Kundenkarte
  const handleAddCard = async () => {
    // Zusätzlich prüfen wir, dass scannerType nicht null ist
    if (scannedCode && shopName && scannerType) {
      try {
        // Erstelle ein neues Kartenobjekt mit Omit, sodass id, createdAt und updatedAt
        // automatisch generiert werden
        const newCard: Omit<CustomerCard, "id" | "createdAt" | "updatedAt"> = {
          shopName,
          cardContent: scannedCode,
          codeType: scannerType,
          // Wenn Barcode ausgewählt wurde, setze das Encoding, ansonsten undefined
          barcodeEncoding: scannerType === CodeType.BARCODE ? BarcodeType.CODE128 : undefined,
        };

        // Speichere die Karte in der Datenbank
        const savedCard = await sqliteService.saveCard(newCard);
        console.log("Kundenkarte gespeichert:", savedCard);

        // Zurücksetzen des Zustands
        setScannerType(CodeType.NULL);
        setScannedCode(null);
        setShopName("");

        alert("Kundenkarte erfolgreich hinzugefügt!");
      } catch (error) {
        console.error("Fehler beim Speichern der Karte:", error);
        alert("Fehler beim Speichern der Karte.");
      }
    } else {
      alert("Bitte geben Sie einen Shop-Namen ein, wählen Sie einen Scanner-Typ aus und scannen Sie einen Code.");
    }
  };

  return (
    <NewCardView
      scannerType={scannerType}
      scannedCode={scannedCode}
      shopName={shopName}
      onSelectScanner={setScannerType}
      onScan={handleScan}
      onAddCard={handleAddCard}
      onShopNameChange={setShopName}
    />
  );
};

export default NewCardContainer;
