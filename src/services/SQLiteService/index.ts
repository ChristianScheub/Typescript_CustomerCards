import { ISQLiteService } from "./ISQLiteService";
import { initialize } from "./methods/initialize";
import { saveCard } from "./methods/saveCard";
import { getCards, getFilteredCards } from "./methods/getCards";
import { updateCard } from "./methods/updateCard";
import { deleteCard } from "./methods/deleteCard";
import { close } from "./methods/close";

const sqliteService: ISQLiteService = {
  initialize,
  saveCard,
  getCards,
  getFilteredCards,
  updateCard,
  deleteCard,
  close,
};

export default sqliteService;