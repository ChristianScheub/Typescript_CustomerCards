import { SHOP_CONFIG } from '../config/shops';
import i18n from '../i18n';

export const ShopService = {
  getSupportedShops() {
    return Object.entries(SHOP_CONFIG).map(([id, config]) => ({
      id,
      name: i18n.t(config.nameKey),
      codeType: config.codeType,
      logo: config.logo,
    }));
  },

  getShopById(shopId: keyof typeof SHOP_CONFIG) {
    return SHOP_CONFIG[shopId];
  },

  searchShops(query: string) {
    return this.getSupportedShops().filter(shop =>
      shop.name.toLowerCase().includes(query.toLowerCase())
    );
  },
};