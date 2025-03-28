import React, { useEffect, useState } from "react";
import sqliteService from "../services/SQLiteService";
import CustomerCardView from "../views/CustomerCardView/CustomerCardView";
import Logger from "../services/Logger/logger";
import NewCardContainer from "./NewCardContainer";
import CustomerCardFocusView from "../views/CustomerCardView/CustomerCardFocusView";
import { CustomerCard } from "../types/CustomerCard";

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
    } else {
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

      {isPopupFocusCardOpen && selectedCard && (
        <CustomerCardFocusView
          card={selectedCard}
          onClose={closePopup}
          onDelete={deleteCard}
        />
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
