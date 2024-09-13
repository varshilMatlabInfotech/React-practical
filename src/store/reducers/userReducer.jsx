import { GET_USER_INFO_FAILED, GET_USER_INFO_INIT, GET_USER_INFO_SUCCESS, TOGGLE_BOOKMARD_FAILED, TOGGLE_BOOKMARD_INIT, TOGGLE_BOOKMARD_SUCCESS } from "../actionType/userActionType.jsx"
const initState = {
    loading: false,
    user: [],
}
export const userReducer = (state = initState, action) => {
    console.log("action", action, state)
    switch (action.type) {
        case GET_USER_INFO_INIT:
            return { ...state, loading: true };
        case GET_USER_INFO_SUCCESS:
            return { ...state, loading: false, user: action.payload };
        case GET_USER_INFO_FAILED:
            return { ...state, loading: false, user: [] };
        case TOGGLE_BOOKMARD_INIT:
            return { ...state, loading: true };
        case TOGGLE_BOOKMARD_SUCCESS:
            {
                const { userId, status } = action.payload;
                const updateUsers = state.user.map((item) => item?.id == userId ? { ...item, bookmark: status } : item);
                return { ...state, loading: false,user:updateUsers };
            }

        case TOGGLE_BOOKMARD_FAILED:
            return { ...state, loading: false };
        default:
            return state;
    }
}