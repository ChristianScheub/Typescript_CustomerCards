import React from "react";
import "./CustomerCardView.css";
import Card from "../../ui/Card/Card";
import FloatingBtn, { ButtonAlignment } from "../../ui/floatingBtn/floatingBtn";
import { IoAddOutline } from "react-icons/io5";
import { CustomerCard } from "../../types/CustomerCard";
import { useTranslation } from "react-i18next";
import { FaArrowDownLong } from "react-icons/fa6";

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
  const { t } = useTranslation();

  return (
    <div className="customer-card-view">
      {cards.length > 0 ? (
        <div className="card-list">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="customer-card backgroundColorHighlight"
              style={{ backgroundColor: card.color, color: "white" }}
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
      ) : (
        <div>
          <div style={{paddingTop: "15vh"}}>
            <center>
              <p style={{ fontSize: "8vw" }}>
                {" "}
                <br /> {t("noCardsThere")}<br /><br /><br /><br />
              </p>
              <FaArrowDownLong
                style={{
                  fontSize: "14vw",
                  transform: "rotate(330deg)",
                  display: "inline-block",
                }}
              />{" "}
            </center>
          </div>
        </div>
      )}

      <FloatingBtn
        alignment={ButtonAlignment.RIGHT}
        icon={IoAddOutline}
        onClick={openAddNewCard}
        ariaLabelledBy="Open Add new Card Dialog"
      />
    </div>
  );
};

export default CustomerCardView;
