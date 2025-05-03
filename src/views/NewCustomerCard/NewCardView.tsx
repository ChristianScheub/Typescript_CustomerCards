import React from "react";
import { ScannerComponent } from "../../ui/Scanner";
import MaterialInput from "../../ui/MaterialInput";
import FloatingBtn, { ButtonAlignment } from "../../ui/floatingBtn/floatingBtn";
import { FaRegSave } from "react-icons/fa";
import { CardType } from "../../types/BarcodeTypes";
import { featureFlag_Debug_View } from "../../config/featureFlags";
import FileUploadScanner from "../../ui/FileUpload";
import Button from "react-bootstrap/Button";
import { CiCamera } from "react-icons/ci";
import Popup from "../../ui/Popup/Popup";
import ColorPicker from "../../ui/ColorPicker";
import { useTranslation } from "react-i18next";

interface NewCardViewProps {
  scannerActive: boolean;
  scannedCode: string | null;
  shopName: string;
  barcodeFormat: string;
  isPopupOpen: boolean;
  color: string;
  closePopup: () => void;
  onSetScannerActive: (active: boolean) => void;
  onScan: (data: string | null, format: CardType) => void;
  onScannedCode: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onAddCard: () => void;
  onColorChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onShopNameChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const NewCardView: React.FC<NewCardViewProps> = ({
  scannerActive,
  scannedCode,
  shopName,
  barcodeFormat,
  isPopupOpen,
  color,
  closePopup,
  onSetScannerActive,
  onScan,
  onScannedCode,
  onAddCard,
  onColorChange,
  onShopNameChange,
}) => {
  const handleColorChange = (selectedColor: string) => {
    const syntheticEvent = {
      target: { value: selectedColor },
    } as React.ChangeEvent<HTMLInputElement>;
    onColorChange(syntheticEvent);
  };
  const { t } = useTranslation();


  return (
    <div>
      {isPopupOpen && (
        <Popup
          onClose={closePopup}
          className="newCustomerCard backgroundColorHighlight"
          content={
            <div>
              <h1 style={{ color: "white" }}>{t("newCard_Title")}</h1>

              <div>
                <MaterialInput
                  value={shopName}
                  onChange={(e) => onShopNameChange(e)}
                  type="text"
                  label={t("newCard_shopForm")}
                  inWhite={true}
                />
              </div>
              <br />
              <div>
                <h3 style={{ color: "white" }}>{t("newCard_selectColor")}</h3>
                <ColorPicker onColorSelect={handleColorChange} />
              </div>
              <center>
                <div style={{ color: "white" }}>{scannedCode && <b>{t("newCard_scannedSuccessfully")} {scannedCode}</b>}</div>
              </center>

              <div>
                <table style={{ width: "100%" }}>
                  <tbody>
                    <tr>
                      <td>
                        <Button
                          style={{ width: "30vw", border: "0" }}
                          className="backgroundColorNotFocused"
                          onClick={() => onSetScannerActive(true)}
                        >
                          <CiCamera size="10vw" />
                        </Button>
                      </td>
                      <td style={{ textAlign: "right" }}>
                        <FileUploadScanner onScan={onScan} />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                {scannerActive && (
                  <ScannerComponent onScan={onScan} />
                )}
              </div>

              <div>
                {featureFlag_Debug_View && (
                  <>
                    <MaterialInput
                      value={scannedCode}
                      onChange={(e) => onScannedCode(e)}
                      type="text"
                      label="Barcode Code"
                    />
                    <MaterialInput
                      value={color}
                      onChange={(e) => onColorChange(e)}
                      type="text"
                      label="Color"
                    />
                  </>
                )}
              </div>

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
        ariaLabelledBy="Add Customer Card"
      />
    </div>
  );
};

export default NewCardView;