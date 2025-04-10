import { ActionType } from "./actionType";

export const fetchAllData = () => ({
    type: ActionType.ALL_BOOKMARK,
})

export const fetchBookmarkedData = (error) => ({
    type: ActionType.ADD_BOOKMARK,
    error,
})

export const fetchUnbookmarkedData = (todos) => ({
    type: ActionType.DELETE_BOOKMARK,
    todos,
})
