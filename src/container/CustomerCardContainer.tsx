import React, { useEffect, useState } from "react";
import sqliteService from "../services/SQLiteService";
import { CustomerCard } from "../services/SQLiteService/types/CustomerCard";
import CustomerCardView from "../views/CustomerCardView/CustomerCardView";
import Logger from "../services/Logger/logger";
import Popup from "../ui/Popup/Popup";
import { BarcodeType } from "../types/BarcodeTypes";
import BarcodeGeneratorContainer from "../container/GeneratorBarcodeContainer";
import QRCodeGeneratorContainer from "../container/GeneratorQRCodeContainer";
import NewCardContainer from "./NewCardContainer";
import FloatingBtn, { ButtonAlignment } from "../ui/floatingBtn/floatingBtn";
import { FaTrash } from "react-icons/fa";

interface CustomerCardContainerProps {
  searchQuery: string;
}

const CustomerCardContainer: React.FC<CustomerCardContainerProps> = ({
  searchQuery,
}) => {
  const [cards, setCards] = useState<CustomerCard[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<CustomerCard | null>(null);
  const [isPopupFocusCardOpen, setIsPopupFocusCardOpen] =
    useState<boolean>(false);
  const [isPopupNewCardOpen, setIsPopupNewCardOpen] = useState<boolean>(false);

  const openAddNewCard = () => {
    Logger.info("NEW CARD");
    setIsPopupNewCardOpen(true);
  };

  const closeAddNewCard = () => {
    setIsPopupNewCardOpen(false);
    loadCards();
    Logger.info("Popup geschlossen");
  };

  const openPopup = (card: CustomerCard) => {
    setSelectedCard(card);
    setIsPopupFocusCardOpen(true);
  };

  const deleteCard = () => {
    if (selectedCard) {
      sqliteService.deleteCard(selectedCard?.id);
      loadCards();
      closePopup();
    }
    else{
      Logger.warn("No card there to delete");
    }
  };

  const closePopup = () => {
    setIsPopupFocusCardOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    loadCards();
  }, [searchQuery]);

  const loadCards = async () => {
    try {
      await sqliteService.initialize();
      const cards = await sqliteService.getFilteredCards(searchQuery);
      setCards(cards);
    } catch (err) {
      setError("Fehler beim Laden der Kundenkarten.");
      console.error(err);
    }
  };

  const calculateFontSize = (text: string): string => {
    const baseSize = 10; // Basis-Schriftgröße in vw
    const minSize = 2; // Minimale Schriftgröße in vw
    const maxSize = 10; // Maximale Schriftgröße in vw
    const lengthThreshold = 4; // Anzahl der Zeichen, ab der die Schriftgröße reduziert wird

    if (text.length <= lengthThreshold) {
      return `${maxSize}vw`;
    } else {
      const size = baseSize - (text.length - lengthThreshold) * 0.4;
      return `${Math.max(size, minSize)}vw`;
    }
  };

  const renderPopupContent = () => {
    if (!selectedCard) return null;
    return (
      <div style={{ textAlign: "center", color: "black" }}>
        <h2>{selectedCard.shopName}</h2>
        {selectedCard.barcodeEncoding === BarcodeType.QRCode ? (
          <QRCodeGeneratorContainer
            value={selectedCard.cardContent}
            size={200}
            color="#000000"
          />
        ) : (
          <BarcodeGeneratorContainer
            value={selectedCard.cardContent}
            type={selectedCard.barcodeEncoding}
            width={1}
            color="#000000"
          />
        )}
      </div>
    );
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <CustomerCardView
        cards={cards}
        openAddNewCard={openAddNewCard}
        openPopup={openPopup}
        calculateFontSize={calculateFontSize}
      />
      {isPopupFocusCardOpen && (
        <>
          <Popup onClose={closePopup} content={renderPopupContent()} />
          <FloatingBtn
            alignment={ButtonAlignment.RIGHT}
            icon={FaTrash}
            onClick={deleteCard}
            ariaLabelledBy="Legal Notes Button"
          />
        </>
      )}
      {isPopupNewCardOpen && (
        <NewCardContainer
          isPopupOpen={isPopupNewCardOpen}
          closeAddNewCard={closeAddNewCard}
        />
      )}
    </>
  );
};

export default CustomerCardContainer;
