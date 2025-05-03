import React, { useState } from "react";
import NewCardView from "../views/NewCustomerCard/NewCardView";
import sqliteService from "../services/SQLiteService";
import { CardTypeEnum, CardType } from "../types/BarcodeTypes";
import Logger from "../services/Logger/logger";
import { useTranslation } from "react-i18next";
import { CustomerCard } from "../types/CustomerCard";
import showAdInterstitial from "../services/Ads/AdInterstitial";

interface NewCardContainerProps {
  isPopupOpen: boolean;
  closeAddNewCard: () => void;
}

const NewCardContainer: React.FC<NewCardContainerProps> = ({
  isPopupOpen,
  closeAddNewCard,
}) => {
  const [isScannerActive, setIsScannerActive] = useState<boolean>(false);
  const [scannedCode, setScannedCode] = useState<string | null>(null);
  const [shopName, setShopName] = useState<string>("");
  const [color, setColor] = useState<string>("");
  const { t } = useTranslation();

  const [barcodeFormat, setBarcodeFormat] = useState<CardType>(
    CardTypeEnum.CODE128
  );

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

  const handleScan = (data: string | null, format: CardType) => {
    setScannedCode(data);
    setBarcodeFormat(format);
    setIsScannerActive(false);
    Logger.info("Scanned Code:" + JSON.stringify(data));
    Logger.info("Scanned Code Format"+format);
  };

  const handleAddCard = async () => {
    if (scannedCode && shopName) {
      try {
        const newCard: Omit<CustomerCard, "id" | "createdAt" | "updatedAt"> = {
          shopName,
          cardContent: scannedCode,
          barcodeEncoding: barcodeFormat,
          color: color,
        };

        const savedCard = await sqliteService.saveCard(newCard);
        Logger.info("Customer Card saved:" + JSON.stringify(savedCard));

        setIsScannerActive(false);
        setScannedCode(null);
        setShopName("");

        alert(t("newCard_addedSuccessfully"));
        showAdInterstitial();
        closeAddNewCard();
      } catch (error) {
        Logger.error("Error while saving the new customer card:" + error);
        alert(t("newCard_errorAdding"));
      }
    } else {
      alert(t("newCard_missingInformation"));
    }
  };

  return (
    <NewCardView
      scannerActive={isScannerActive}
      scannedCode={scannedCode}
      shopName={shopName}
      barcodeFormat={barcodeFormat}
      color={color}
      onSetScannerActive={setIsScannerActive}
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
