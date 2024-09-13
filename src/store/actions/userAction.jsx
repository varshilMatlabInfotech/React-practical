import { GET_USER_INFO_INIT, GET_USER_INFO_FAILED, GET_USER_INFO_SUCCESS,TOGGLE_BOOKMARD_INIT,TOGGLE_BOOKMARD_SUCCESS,TOGGLE_BOOKMARD_FAILED } from "store/actionType/userActionType"
import axios from "axios";
export const GetUserAction = () => {
    return async (dispatch) => {
        try {
            dispatch({ type: GET_USER_INFO_INIT });
            const usersInfo = await axios.get("https://api.github.com/users");
            dispatch({ type: GET_USER_INFO_SUCCESS, payload: usersInfo?.data.map((item)=>({...item,bookmark:false})) })
        }
        catch (e) {
            dispatch({ type: GET_USER_INFO_FAILED, payload: e })
        }
    }

}

export const ToggleBookmarkAction = (userId,status) => {
    return async (dispatch) => {
        try {
            dispatch({ type: TOGGLE_BOOKMARD_INIT });
            dispatch({ type: TOGGLE_BOOKMARD_SUCCESS, payload: {userId,status}})
        }
        catch (e) {
            dispatch({ type: TOGGLE_BOOKMARD_FAILED, payload: e })
        }
    }

}