import React from "react";
import "./CustomerCardView.css"; 
import Card from "../ui/Card/Card";
import { CustomerCard } from "../services/SQLiteService/types/CustomerCard";

interface CustomerCardViewProps {
  cards: CustomerCard[];
}

const CustomerCardView: React.FC<CustomerCardViewProps> = ({ cards }) => {
  return (
    <div className="customer-card-view">
      <h1>Meine Kundenkarten</h1>
      <div className="card-list">
        {cards.map((card) => (
          <Card key={card.id} className="customer-card">
            <h2>{card.shopName}</h2>
            <p>{card.cardContent}</p>
            <p>Typ: {card.codeType}</p>
            {card.barcodeEncoding && <p>Encoding: {card.barcodeEncoding}</p>}
            <p>Erstellt am: {new Date(card.createdAt).toLocaleDateString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CustomerCardView;