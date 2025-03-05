import React, { useState } from "react";
import { BarcodeScannerComponent } from "../../ui/BarcodeScanner";
import { CodeType } from "../../services/SQLiteService/types/CodeType";
import MaterialInput from "../../ui/MaterialInput";
import FloatingBtn, { ButtonAlignment } from "../../ui/floatingBtn/floatingBtn";
import { FaRegSave } from "react-icons/fa";
import { BarcodeType } from "../../types/BarcodeTypes";
import { featureFlag_Debug_View } from "../../config/featureFlags";
import FileUploadScanner from "../../ui/FileUpload";
import Button from "react-bootstrap/Button";
import { CiCamera } from "react-icons/ci";
import { FaRegFileImage } from "react-icons/fa6";
import Popup from "../../ui/Popup/Popup";

interface NewCardViewProps {
  scannerType: CodeType;
  scannedCode: string | null;
  shopName: string;
  barcodeFormat: string;
  isPopupOpen: boolean;
  closePopup: () => void;
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
  isPopupOpen,
  closePopup,
  onSelectScanner,
  onScan,
  onScannedCode,
  onAddCard,
  onShopNameChange,
}) => {
  const [showFileUpload, setShowFileUpload] = useState(false);

  return (
    <div>
      {isPopupOpen && (
        <Popup
          onClose={closePopup}
          className="newCustomerCard backgroundColorHighlight"
          content={
            <div>
              <h1 style={{ color: "white" }}>Scanner Auswahl</h1>

              <div>
                <MaterialInput
                  value={shopName}
                  onChange={(e) => onShopNameChange(e)}
                  type="text"
                  label="Geben Sie den Shop-Namen ein"
                  inWhite={true}
                />
              </div>
              <br />

              <div>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          style={{ width: "30vw", border: "0" }}
                          className="backgroundColorNotFocused"
                          onClick={() => onSelectScanner(CodeType.BARCODE)}
                        >
                          <CiCamera size="10vw" />
                        </Button>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <Button
                          style={{ width: "30vw", border: "0" }}
                          className="backgroundColorNotFocused"
                          onClick={() => setShowFileUpload(true)}
                        >
                          <FaRegFileImage size="10vw" />
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                {scannerType === CodeType.BARCODE && (
                  <BarcodeScannerComponent onScan={onScan} />
                )}
                {showFileUpload && <FileUploadScanner onScan={onScan} />}
              </div>

              <div>
                {featureFlag_Debug_View && barcodeFormat && (
                  <MaterialInput
                    value={scannedCode}
                    onChange={(e) => onScannedCode(e)}
                    type="text"
                    label="Barcode Name"
                  />
                )}
              </div>

              <div>{scannedCode && <p>Gescannt: {scannedCode}</p>}</div>
              <div>
                {featureFlag_Debug_View && barcodeFormat && (
                  <p>Format: {barcodeFormat}</p>
                )}
              </div>
            </div>
          }
        />
      )}

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