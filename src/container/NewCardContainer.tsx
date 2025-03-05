import React, { useState } from "react";
import NewCardView from "../views/NewCustomerCard/NewCardView";
import sqliteService from "../services/SQLiteService";
import { CustomerCard } from "../services/SQLiteService/types/CustomerCard";
import { CodeType } from "../services/SQLiteService/types/CodeType";
import { BarcodeType } from "../types/BarcodeTypes";
import Logger from "../services/Logger/logger";

interface NewCardContainerProps {
  isPopupOpen: boolean;
  closeAddNewCard: () => void;
}

const NewCardContainer: React.FC<NewCardContainerProps> = ({ isPopupOpen, closeAddNewCard }) => {
  
  const [scannerType, setScannerType] = useState<CodeType.QR_CODE | CodeType.BARCODE | CodeType.NULL >(CodeType.NULL);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [barcodeFormat, setBarcodeFormat] = useState<BarcodeType>(BarcodeType.CODE128);

  const handleShopNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    Logger.info("Shop Name was set to: " + event.target.value);
    setShopName(event.target.value);
  };

  const handleChangeScanCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    Logger.info("Scanned Code was set to: " + event.target.value);
    setScannedCode(event.target.value);
  };

  const handleScan = (data: string | null, format: BarcodeType) => {
    setScannedCode(data);
    setBarcodeFormat(format);
    setScannerType(CodeType.NULL);
  };

  const handleAddCard = async () => {
    if (scannedCode && shopName && scannerType) {
      try {
        const newCard: Omit<CustomerCard, "id" | "createdAt" | "updatedAt"> = {
          shopName,
          cardContent: scannedCode,
          codeType: scannerType,
          barcodeEncoding: barcodeFormat,
        };

        const savedCard = await sqliteService.saveCard(newCard);
        console.log("Kundenkarte gespeichert:", savedCard);

        setScannerType(CodeType.NULL);
        setScannedCode(null);
        setShopName("");

        alert("Kundenkarte erfolgreich hinzugefügt!");
        closeAddNewCard();
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
      barcodeFormat={barcodeFormat}
      onSelectScanner={setScannerType}
      onScan={handleScan}
      onScannedCode={handleChangeScanCode}
      onAddCard={handleAddCard}
      onShopNameChange={handleShopNameChange}
      isPopupOpen={isPopupOpen}
      closePopup={closeAddNewCard}
    />
  );
};

export default NewCardContainer;
