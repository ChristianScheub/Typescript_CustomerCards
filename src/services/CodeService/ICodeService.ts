import { BarcodeType } from "./types/BarcodeTypes";

export interface ICodeService {
  detectQrCode(imageData: string): Promise<string>;
  detectBarcode(imageData: string): Promise<string>;
  generateQrCode(value: string): string;
  generateBarcode(value: string, barcodeType: BarcodeType): string;
}