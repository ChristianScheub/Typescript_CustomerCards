import { BarcodeType } from "../../../types/BarcodeTypes";
import { CodeType } from "./CodeType";

export interface CustomerCard {
    id: string; // Eindeutige ID für jede Karte
    shopName: string; // Name des Shops
    cardContent: string; // Inhalt des Codes (z. B. QR-Code-Daten oder Barcode-Wert)
    codeType: CodeType; // Typ des Codes (QR oder Barcode)
    barcodeEncoding: BarcodeType; // Encoding-Typ für Barcodes
    createdAt: Date; // Zeitstempel der Erstellung
    updatedAt: Date; // Zeitstempel der letzten Aktualisierung
  }