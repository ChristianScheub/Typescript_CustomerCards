import React, { useEffect, useState } from "react";
import sqliteService from "../services/SQLiteService";
import { CustomerCard } from "../services/SQLiteService/types/CustomerCard";
import CustomerCardView from "../views/CustomerCardView/CustomerCardView";
import Logger from "../services/Logger/logger";
import { useNavigate } from "react-router-dom";

const CustomerCardContainer: React.FC = () => {
  const [cards, setCards] = useState<CustomerCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();


  const openAddNewCard = () => {
    Logger.info("NEW CARD");
    navigate("/newCard");
  }

  // Get Cards from SQL Connection
  useEffect(() => {
    const loadCards = async () => {
      try {
        await sqliteService.initialize();
        const cards = await sqliteService.getCards();
        setCards(cards);
      } catch (err) {
        setError("Fehler beim Laden der Kundenkarten.");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadCards();
  }, []);

  if (isLoading) {
    return <div>Lade Kundenkarten...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return <CustomerCardView cards={cards} openAddNewCard={openAddNewCard} />;
};

export default CustomerCardContainer;