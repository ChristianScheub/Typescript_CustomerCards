import { ShopConfig } from "../types";

export const SHOP_CONFIG: Record<string, ShopConfig> = {
  ikea: {
    codeType: 'qr',
    nameKey: 'shops.ikea',
    validationPattern: /^IK\d{15}$/,
    logo: 'ikea-logo.png',
  },
  mediamarkt: {
    codeType: 'barcode',
    nameKey: 'shops.mediamarkt',
    validationPattern: /^MM-\d{4}-\d{8}$/,
    logo: 'mediamarkt-logo.png',
  },
  // ... 50+ weitere Shops
};

export type ShopID = keyof typeof SHOP_CONFIG;