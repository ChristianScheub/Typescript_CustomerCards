import { SHOP_CONFIG } from './shops';

export const BARCODE_DEFAULTS = {
  qr: {
    size: 200,
    color: '#000000',
    bgColor: '#ffffff',
  },
  barcode: {
    width: 2,
    height: 100,
    format: 'CODE128' as const,
  },
};

export const validateBarcodeFormat = (
  shopId: keyof typeof SHOP_CONFIG,
  code: string
) => {
  const pattern = SHOP_CONFIG[shopId].validationPattern;
  return pattern.test(code);
};