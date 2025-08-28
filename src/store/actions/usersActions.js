import axios from "axios";
import { SET_ERROR, SET_USERS } from "../../reducers/userReducer";
import { BASE_URL } from "../../../config";

export const fetchUsers = ({ page = 1, perPage = 10, query = "" }) => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/search/users?q=${query || "type:user"}&per_page=${perPage}&page=${page}`);
        const res = response.data;
        dispatch({
            type: SET_USERS,
            payload: res?.items || [],
            TotalDataLength: res?.total_count || [],
        });
    } catch (err) {
        dispatch({
            type: SET_ERROR,
            payload: err?.message || [],
        });
    }
};
