const initialState = {
    list: [],
    bookmarks: [],
    perPage: 10,
    TotalDataLength: 0
};

export const RESET_USERS = "RESET_USERS";
export const TOGGLE_BOOKMARK = "TOGGLE_BOOKMARK";
export const SET_USERS = "SET_USERS";
export const SET_ERROR = "SET_ERROR";

export const usersReducer = (state = initialState, action) => {
    switch (action.type) {
        case RESET_USERS:
            return { ...state, list: [] };

        case TOGGLE_BOOKMARK:
            const exists = state.bookmarks.some((u) => u.id === action.payload.id);
            return {
                ...state,
                bookmarks: exists
                    ? state.bookmarks.filter((u) => u.id !== action.payload.id)
                    : [...state.bookmarks, action.payload],
            };

        case SET_USERS:
            return { ...state, list: action.payload, TotalDataLength: action.TotalDataLength };

        case SET_ERROR:
            return { ...state, error: action.payload };

        default:
            return state;
    }
}

export const resetUsers = () => ({ type: RESET_USERS });
export const toggleBookmark = (user) => ({
    type: TOGGLE_BOOKMARK,
    payload: user,
});
export const setUsers = (users) => ({ type: SET_USERS, payload: users });