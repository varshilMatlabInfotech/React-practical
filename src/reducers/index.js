import { DELETE_BOOKMARK } from "constants";
import { ADD_BOOKMARK } from "constants";

export default function bookmarksReducer(state = [], action) {
  switch (action.type) {
    case ADD_BOOKMARK:
      return [...state, action.payload];
    case DELETE_BOOKMARK:
      return [];
    default:
      return state;
  }
}