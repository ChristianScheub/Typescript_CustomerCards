import React from "react";
import "./CustomerCardView.css";
import Card from "../../ui/Card/Card";
import { CustomerCard } from "../../services/SQLiteService/types/CustomerCard";
import FloatingBtn, { ButtonAlignment } from "../../ui/floatingBtn/floatingBtn";
import { IoAddOutline } from "react-icons/io5";

interface CustomerCardViewProps {
  cards: CustomerCard[];
  openAddNewCard: () => void;
  calculateFontSize: (text: string) => string;
  openPopup: (card: CustomerCard) => void;
}

const CustomerCardView: React.FC<CustomerCardViewProps> = ({
  cards,
  openAddNewCard,
  calculateFontSize,
  openPopup,
}) => {
  return (
    <div className="customer-card-view">
      <h1>Meine Kundenkarten</h1>
      <div className="card-list">
        {cards.map((card) => (
          <Card
            key={card.id}
            className="customer-card backgroundColorHighlight"
            onClick={() => openPopup(card)}
          >
            <div>
              <h3 style={{ fontSize: calculateFontSize(card.shopName) }}>
                {card.shopName}
              </h3>
            </div>
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
