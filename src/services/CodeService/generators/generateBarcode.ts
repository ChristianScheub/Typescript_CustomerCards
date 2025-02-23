import { generateBarcodeSvg } from './generateBarcodeSvg';
import { validateInput } from '../helpers/validateInput';
import Logger from '../../Logger/logger';
import { BarcodeType } from '../types/BarcodeTypes';

export const generateBarcode = (value: string, barcodeType: BarcodeType) => {
  Logger.infoService("Generate Barcode called");
  validateInput(value);
  const svg = generateBarcodeSvg(value, barcodeType,);
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};