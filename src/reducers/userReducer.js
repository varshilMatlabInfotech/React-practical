import { FETCH_USERS_SUCCESS, FETCH_USERS_ERROR, ADD_BOOKMARK, REMOVE_BOOKMARK } from '../actions/actionTypes';

const initialState = {
    users: [],
    bookmarkedUsers: [],
    error: null,
};

export const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USERS_SUCCESS:
            return { ...state, users: action.payload, error: null };
        case FETCH_USERS_ERROR:
            return { ...state, error: action.payload };
        case ADD_BOOKMARK:
            return { ...state, bookmarkedUsers: [...state.bookmarkedUsers, action.payload] };
        case REMOVE_BOOKMARK:
            return {
                ...state,
                bookmarkedUsers: state.bookmarkedUsers.filter(user => user.id !== action.payload),
            };
        default:
            return state;
    }
};
