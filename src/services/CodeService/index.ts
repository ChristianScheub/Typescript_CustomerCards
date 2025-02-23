import { detectBarcode } from './detectors/detectBarcode';
import { detectQrCode } from './detectors/detectQrCode';
import { generateBarcode } from './generators/generateBarcode';
import { generateQrCode } from './generators/generateQr';
import { ICodeService } from './ICodeService';

const CodeService: ICodeService = {
  detectQrCode,
  detectBarcode,
  generateQrCode,
  generateBarcode
};

export default CodeService;