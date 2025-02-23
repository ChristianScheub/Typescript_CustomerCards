//import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

export const detectQrCode = async (imageData: string) => {
  return imageData;
 /*const result = await BarcodeScanner.scan({
    formats: ['QR_CODE'],
    checkInverted: true
  });
  
  if (!result.rawContent) throw new Error('QR Code detection failed');
  return result.rawContent;*/
};