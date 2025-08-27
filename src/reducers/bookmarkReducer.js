

const bookmarkReducer = (state = [], action) => {
    switch (action.type) {
        case 'FETCH_BOOKMARK':
            return [...state, action.payload ]
        case 'REMOVE_BOOKMARK':
            return state?.filter((items) => items?.id !== action?.payload?.id)
        default:
            return state;
    }
}

export default bookmarkReducer