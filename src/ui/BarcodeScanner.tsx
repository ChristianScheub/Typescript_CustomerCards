import React, { useEffect, useRef, useState } from "react";
import { BarcodeFormat, BrowserMultiFormatReader } from '@zxing/library';
import { useTranslation } from "react-i18next";
import Logger from "../services/Logger/logger";
import { BarcodeType } from "../types/BarcodeTypes";

interface BarcodeScannerProps {
  onScan: (data: string | null) => void;
}

export const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const barcodeReader = useRef<BrowserMultiFormatReader | null>(null);
  const formatMapping: { [key in BarcodeFormat]?: BarcodeType } = {
    [BarcodeFormat.EAN_13]: BarcodeType.EAN13,
    [BarcodeFormat.CODE_128]: BarcodeType.CODE128,
    [BarcodeFormat.UPC_A]: BarcodeType.UPC_A,
    [BarcodeFormat.CODE_39]: BarcodeType.CODE39,
  };
  
  useEffect(() => {
    if (videoRef.current) {
      barcodeReader.current = new BrowserMultiFormatReader();

      barcodeReader.current
        .listVideoInputDevices()
        .then((devices) => {
          const videoDevice = devices[0]?.deviceId;
          if (videoDevice) {
            barcodeReader.current?.decodeFromVideoDevice(
              videoDevice,
              videoRef.current,
              (result, error) => {
                if (result) {
                  const format = formatMapping[result.getBarcodeFormat()];
                  Logger.info("Barcode detected: " + result.getText());
                  Logger.info("Format was"+format);
                  onScan(result.getText());
                }
                if (error) {
                  Logger.error("Error scanning barcode: " + error);
                }
              }
            );
            setIsCameraReady(true);
          }
        })
        .catch((err) => {
          Logger.error("Error initializing video device: " + err);
          setIsCameraReady(false);
        });
    }

    return () => {
      if (barcodeReader.current) {
        barcodeReader.current.reset();
      }
    };
  }, [onScan]);

  const { t } = useTranslation();

  return (
    <>
      <div style={{ display: isCameraReady ? "block" : "none" }}>
        <video
          ref={videoRef}
          style={{ width: "100%", height: "auto", paddingTop: "5vh" }}
        />
      </div>
      <p style={{ display: isCameraReady ? "none" : "block" }}>
        {t("barcodeScanner_waitingCamera")}
      </p>
    </>
  );
};
