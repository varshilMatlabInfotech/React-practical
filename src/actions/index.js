import { DELETE_BOOKMARK } from "constants";
import { ADD_BOOKMARK } from "constants";


export const addBookmark = ({ title, url, id }) => ({
  type: ADD_BOOKMARK,
  payload: {
    id: id,
    title,
    url
  }
});

export const deleteBookmark = () => ({
  type: DELETE_BOOKMARK,
  payload: []
});