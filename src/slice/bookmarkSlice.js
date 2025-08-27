
export const addBookmark = (data) => async (dispatch) => {
    dispatch({type: 'FETCH_BOOKMARK', payload: data})
}


export const removeBookmark = (data) => async (dispatch) => {
    dispatch({type: 'REMOVE_BOOKMARK', payload: data})
}