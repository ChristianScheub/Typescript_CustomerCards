import React, { useState } from "react";
import NewCardView from "../views/NewCustomerCard/NewCardView";
import sqliteService from "../services/SQLiteService";
import { CustomerCard } from "../services/SQLiteService/types/CustomerCard";
import { CodeType } from "../services/SQLiteService/types/CodeType";
import { BarcodeType } from "../types/BarcodeTypes";
import Logger from "../services/Logger/logger";
import { useTranslation } from "react-i18next";

interface NewCardContainerProps {
  isPopupOpen: boolean;
  closeAddNewCard: () => void;
}

const NewCardContainer: React.FC<NewCardContainerProps> = ({ isPopupOpen, closeAddNewCard }) => {
  
  const [scannerType, setScannerType] = useState<CodeType.QR_CODE | CodeType.BARCODE | CodeType.NULL >(CodeType.NULL);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const { t } = useTranslation();

  const [barcodeFormat, setBarcodeFormat] = useState<BarcodeType>(BarcodeType.CODE128);

  const handleShopNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    Logger.info("Shop Name was set to: " + event.target.value);
    setShopName(event.target.value);
  };

  const handleChangeScanCode = (event: React.ChangeEvent<HTMLInputElement>) => {
    Logger.info("Scan Code was set to: " + event.target.value);
    setScannedCode(event.target.value);
  };

  const handeColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    Logger.info("Color Code was set to: " + event.target.value);
    setColor(event.target.value);
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
          color: color
        };

        const savedCard = await sqliteService.saveCard(newCard);
        Logger.info("Customer Card saved:"+ JSON.stringify(savedCard));

        setScannerType(CodeType.NULL);
        setScannedCode(null);
        setShopName("");

        alert(t("newCard_addedSuccessfully"));
        closeAddNewCard();
      } catch (error) {
        Logger.error("Error while saving the new customer card:"+ error);
        alert(t("newCard_errorAdding"));
      }
    } else {
      alert(t("newCard_missingInformation"));
    }
  };

  return (
    <NewCardView
      scannerType={scannerType}
      scannedCode={scannedCode}
      shopName={shopName}
      barcodeFormat={barcodeFormat}
      color={color}
      onSelectScanner={setScannerType}
      onScan={handleScan}
      onScannedCode={handleChangeScanCode}
      onAddCard={handleAddCard}
      onShopNameChange={handleShopNameChange}
      isPopupOpen={isPopupOpen}
      closePopup={closeAddNewCard}
      onColorChange={handeColorChange}
    />
  );
};

export default NewCardContainer;
