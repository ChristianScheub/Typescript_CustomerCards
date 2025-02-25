import { generateBarcodeSvg } from './generateBarcodeSvg';
import { validateInput } from '../helpers/validateInput';
import Logger from '../../Logger/logger';
import { BarcodeType } from '../types/BarcodeTypes';

export const generateBarcode = (value: string, barcodeType: BarcodeType) => {
  Logger.infoService("Generate Barcode called");
  validateInput(value);
  const svg = generateBarcodeSvg(value, barcodeType,);
  Logger.infoService(svg);
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};