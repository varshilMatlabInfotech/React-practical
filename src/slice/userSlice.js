// import API from "helper/axiosHelp";
// import { createAsyncThunk, createSlice } from "../../node_modules/@reduxjs/toolkit/dist/index";
import API from "helper/axiosHelp"




// const getUsers = createAsyncThunk('users/getUsers', async(data, {dispatch}) => {
//     const res = API.get('/users')
//     return res
// })

// const usersReducer = createSlice({
//     initialState: {
//         users: []
//     },
//     name: "users",
//     extraReducers: builder => {
//         builder.addCase(getUsers.fulfilled, (state, action) => {
//             state.users = action.payload
//         })
//     }
// })

// export default usersReducer.reducer



export const getAllUser = (data) => async (dispatch) => {
    const res = await API.get('/users')
    dispatch({type: 'FETCH_USERS', payload: res?.data || []})
}