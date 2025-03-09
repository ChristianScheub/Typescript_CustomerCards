import { CustomerCard } from "../../types/CustomerCard";

export interface ISQLiteService {
  /**
   * Initializes the database and creates the table if it doesn't exist.
   */
  initialize(): Promise<void>;

  /**
   * Saves a new customer card to the database.
   * @param card - The customer card without `id`, `createdAt`, and `updatedAt`.
   * @returns The saved customer card with generated ID and timestamps.
   */
  saveCard(
    card: Omit<CustomerCard, "id" | "createdAt" | "updatedAt">
  ): Promise<CustomerCard>;

  /**
   * Loads all saved customer cards from the database.
   * @returns An array of customer cards.
   */
  getCards(): Promise<CustomerCard[]>;

  /**
   * Loads filtered customer cards based on search query.
   * @param searchQuery - The search term to filter customer cards by shop name.
   * @returns An array of filtered customer cards.
   */
  getFilteredCards(searchQuery: string): Promise<CustomerCard[]>;

  /**
   * Updates an existing customer card.
   * @param cardId - The ID of the card to update.
   * @param updates - The fields to update.
   */
  updateCard(cardId: string, updates: Partial<CustomerCard>): Promise<void>;

  /**
   * Deletes a customer card from the database.
   * @param cardId - The ID of the card to delete.
   */
  deleteCard(cardId: string): Promise<void>;

  /**
   * Closes the database connection.
   */
  close(): Promise<void>;
}
