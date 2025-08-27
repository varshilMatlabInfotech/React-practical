import axios from "../../node_modules/axios/index"
import { userEndpoints } from "./endpoints"

export const fetchUsers = async() => {
    const result = await axios.get(userEndpoints.FETCH_USERS);
    return result;
}