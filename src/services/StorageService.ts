import { Preferences } from '@capacitor/preferences';
import { ShopID } from '../types';

type LoyaltyCard = {
  id: string;
  shopId: ShopID;
  code: string;
  alias: string;
  added: Date;
};

const STORAGE_KEY = 'loyaltyCards';

export const StorageService = {
  async getCards(): Promise<LoyaltyCard[]> {
    const { value } = await Preferences.get({ key: STORAGE_KEY });
    return value ? JSON.parse(value) : [];
  },

  async saveCard(card: Omit<LoyaltyCard, 'id' | 'added'>) {
    const cards = await this.getCards();
    const newCard = { 
      ...card, 
      id: crypto.randomUUID(),
      added: new Date()
    };
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify([...cards, newCard]),
    });
    return newCard;
  },

  async deleteCard(cardId: string) {
    const cards = await this.getCards();
    const filtered = cards.filter(c => c.id !== cardId);
    await Preferences.set({
      key: STORAGE_KEY,
      value: JSON.stringify(filtered),
    });
  },
};