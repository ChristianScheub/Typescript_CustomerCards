import React from "react";
import QRCodeGeneratorContainer from "../../container/GeneratorQRCodeContainer";
import BarcodeGeneratorContainer from "../../container/GeneratorBarcodeContainer";
import { CardTypeEnum } from "../../types/BarcodeTypes";
import { FaTrash } from "react-icons/fa";
import Popup from "../../ui/Popup/Popup";
import FloatingBtn, { ButtonAlignment } from "../../ui/floatingBtn/floatingBtn";
import { CustomerCard } from "../../types/CustomerCard";
import { featureFlag_Debug_View } from "../../config/featureFlags";

interface CustomerCardFocusViewProps {
  card: CustomerCard;
  onClose: () => void;
  onDelete: () => void;
}

const CustomerCardFocusView: React.FC<CustomerCardFocusViewProps> = ({
  card,
  onClose,
  onDelete,
}) => {
  return (
    <>
      <Popup
        onClose={onClose}
        content={
          <div style={{ textAlign: "center", color: "black" }}>
            <h2>{card.shopName}</h2>
            {featureFlag_Debug_View && <i>Format: {card.barcodeEncoding}</i>}
            {card.barcodeEncoding === CardTypeEnum.QRCode ? (
              <QRCodeGeneratorContainer
                value={card.cardContent as CardTypeEnum}
                size={200}
                color="#000000"
              />
            ) : (
              <BarcodeGeneratorContainer
                value={card.cardContent}
                type={card.barcodeEncoding as CardTypeEnum}
                width={1}
                color="#000000"
              />
            )}
          </div>
        }
      />

      <FloatingBtn
        alignment={ButtonAlignment.RIGHT}
        icon={FaTrash}
        onClick={onDelete}
        ariaLabelledBy="Delete Card Button"
      />
    </>
  );
};

export default CustomerCardFocusView;
