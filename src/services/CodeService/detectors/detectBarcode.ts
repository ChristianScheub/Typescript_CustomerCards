//import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

export const detectBarcode = async (imageData: string) => {
  return imageData;
 /* const result = await BarcodeScanner.scan({
    formats: ['CODE_128', 'EAN_13'],
    checkInverted: true
  });

  if (!result.rawContent) throw new Error('Barcode detection failed');
  return result.rawContent;'/ */
};