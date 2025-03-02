import React from "react";
import { BarcodeScannerComponent } from "../../ui/BarcodeScanner";
import { CodeType } from "../../services/SQLiteService/types/CodeType";
import Card from "../../ui/Card/Card";
import MaterialInput from "../../ui/MaterialInput";
import FloatingBtn, { ButtonAlignment } from "../../ui/floatingBtn/floatingBtn";
import { FaRegSave } from "react-icons/fa";
import { BarcodeType } from "../../types/BarcodeTypes";
import { featureFlag_Debug_View } from "../../config/featureFlags";

interface NewCardViewProps {
  scannerType: CodeType;
  scannedCode: string | null;
  shopName: string;
  barcodeFormat: string;
  onSelectScanner: (type: CodeType) => void;
  onScan: (data: string | null, format: BarcodeType) => void;
  onScannedCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddCard: () => void;
  onShopNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewCardView: React.FC<NewCardViewProps> = ({
  scannerType,
  scannedCode,
  shopName,
  barcodeFormat,
  onSelectScanner,
  onScan,
  onScannedCode,
  onAddCard,
  onShopNameChange,
}) => {
  return (
    <div>
      <Card className="customer-card backgroundColorHighlight">
        <h1>Scanner Auswahl</h1>

        <div>
          <MaterialInput
            value={shopName}
            onChange={(e) => onShopNameChange(e)}
            type="text"
            label="Geben Sie den Shop-Namen ein"
          />
        </div>
        <br />

        <div>
          <button onClick={() => onSelectScanner(CodeType.BARCODE)}>
            Scanner
          </button>
        </div>

        <div>
          {scannerType === CodeType.BARCODE && (
            <BarcodeScannerComponent onScan={onScan} />
          )}
        </div>
        <div>{featureFlag_Debug_View && barcodeFormat && <MaterialInput
            value={scannedCode}
            onChange={(e) => onScannedCode(e)}
            type="text"
            label="Barcode Name"
          />}</div>


        <div>{scannedCode && <p>Gescannt: {scannedCode}</p>}</div>
        <div>{featureFlag_Debug_View && barcodeFormat && <p>Format: {barcodeFormat}</p>}</div>
      </Card>
      <FloatingBtn
        alignment={ButtonAlignment.RIGHT}
        icon={FaRegSave}
        onClick={onAddCard}
        ariaLabelledBy="Legal Notes Button"
      />
    </div>
  );
};

export default NewCardView;
