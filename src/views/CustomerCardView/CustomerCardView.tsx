// src/components/CustomerCardView.tsx
import React from "react";
import "./CustomerCardView.css";
import Card from "../../ui/Card/Card";
import { CustomerCard } from "../../services/SQLiteService/types/CustomerCard";
import FloatingBtn, { ButtonAlignment } from "../../ui/floatingBtn/floatingBtn";
import { IoAddOutline } from "react-icons/io5";
import { BarcodeType } from "../../types/BarcodeTypes";
import BarcodeGeneratorContainer from "../../container/GeneratorBarcodeContainer";
import QRCodeGeneratorContainer from "../../container/GeneratorQRCodeContainer";

interface CustomerCardViewProps {
  cards: CustomerCard[];
  openAddNewCard: () => void;
}

const CustomerCardView: React.FC<CustomerCardViewProps> = ({
  cards,
  openAddNewCard,
}) => {


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
            <p>Encoding: {card.barcodeEncoding}</p>


            {card.barcodeEncoding === BarcodeType.QRCode ? (
              <QRCodeGeneratorContainer
                value={card.cardContent}
                size={128}
                color="#000000"
              />
            ) : (
              <BarcodeGeneratorContainer
                value={card.cardContent}
                type={BarcodeType.CODE128}
                width={2}
                height={100}
                color="#000000"
              />
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
