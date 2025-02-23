import Logger from '../../Logger/logger';
import { validateInput } from '../helpers/validateInput';
import { generateQrSvg } from './generateQrSvg';

export const generateQrCode = (value: string) => {
  Logger.infoService("Generate QR called");
  validateInput(value);
  const svg = generateQrSvg(value);
  return `data:image/svg+xml;base64,${btoa(svg)}`;
};