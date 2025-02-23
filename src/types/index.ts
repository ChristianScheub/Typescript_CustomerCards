import { SHOP_CONFIG } from "../config/shops";

export type ShopConfig = {
    codeType: 'barcode' | 'qr';
    nameKey: string;
    validationPattern: RegExp;
    logo: string;
    // Optional: Weitere shop-spezifische Eigenschaften
    formatHint?: string;
    scanInstructions?: string;
  };
  
  export type LoyaltyCard = {
    id: string;
    shopId: keyof typeof SHOP_CONFIG;
    code: string;
    alias: string;
    added: Date;
    lastUsed?: Date;
  };
  
  export type ShopID = keyof typeof SHOP_CONFIG;
  
  // Für die Barcode-Generierung
  export type BarcodeOptions = {
    width?: number;
    height?: number;
    color?: string;
    bgColor?: string;
  };
  
  export type ScanResult = {
    shopId: ShopID;
    code: string;
    format: string;
    timestamp: Date;
  };