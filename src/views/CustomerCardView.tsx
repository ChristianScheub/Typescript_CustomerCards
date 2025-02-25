import React, { useEffect, useState } from "react";
import "./CustomerCardView.css";
import Card from "../ui/Card/Card";
import { CustomerCard } from "../services/SQLiteService/types/CustomerCard";
import FloatingBtn, { ButtonAlignment } from "../ui/floatingBtn/floatingBtn";
import { IoAddOutline } from "react-icons/io5";
import CodeService from "../services/CodeService";

interface CustomerCardViewProps {
  cards: CustomerCard[];
  openAddNewCard: () => void;
}
const CustomerCardView: React.FC<CustomerCardViewProps> = ({
  cards,
  openAddNewCard,
}) => {
  // Zustand für Barcodes
  const [barcodes, setBarcodes] = useState<Record<string, string>>({});

  // Barcodes bei Mount generieren
  useEffect(() => {
    const newBarcodes: Record<string, string> = {};
    cards.forEach((card: CustomerCard) => {
      // Expliziter Typ für card
      try {
        // Type Assertion für card.id falls nötig
        newBarcodes[card.id as string] = CodeService.generateBarcode(
          card.cardContent,
          card.barcodeEncoding!
        );
      } catch (error) {
        console.error("Barcode generation failed:", error);
      }
    });
    setBarcodes(newBarcodes);
  }, [cards]);

  return (
    <div className="customer-card-view">
      <h1>Meine Kundenkarten</h1>
      <div className="card-list">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="customer-card backgroundColorHighlight"
          >
            <h2>{card.shopName}</h2>
            <p>{card.cardContent}</p>
            <p>Typ: {card.codeType}</p>

            {/* Barcode mit Fallback */}
            {barcodes[card.id] ? (
              <img
                src={barcodes[card.id]}
                alt={`Barcode für ${card.shopName}`}
                className="barcode-image"
                style={{
                  width: "100%",
                  height: "100px",
                  background: "white",
                  padding: "5px",
                }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            ) : (
              <div className="barcode-error">
                Barcode konnte nicht generiert werden
              </div>
            )}

            <p>Erstellt am: {new Date(card.createdAt).toLocaleDateString()}</p>
          </Card>
        ))}
      </div>
      <FloatingBtn
        alignment={ButtonAlignment.RIGHT}
        icon={IoAddOutline}
        onClick={openAddNewCard}
        ariaLabelledBy="Legal Notes Button"
      />
    </div>
  );
};

export default CustomerCardView;
