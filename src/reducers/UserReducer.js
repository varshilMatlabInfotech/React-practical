const initialState = {
  data: null,
  isLoading: false,
  error: null,
  favData:JSON.parse(localStorage.getItem('bookMarkedData'))||[]
};

const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA_REQUEST':
      return { ...state, isLoading: true, error: null };
    case 'FETCH_DATA_SUCCESS':
      return { ...state, data: action?.payload?.users, isLoading: false };
    case 'FETCH_DATA_FAILURE':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_FAV_DATA':
    const updatedData=[...state.favData,action.payload];
     localStorage.setItem('bookMarkedData', JSON.stringify(updatedData));
      return { ...state, favData: updatedData, isLoading: false };
      case 'SET_UNFAV_DATA':
    const filteredPeople = state.favData?.filter((item) => item.id !== action.payload.id);
    localStorage.setItem('bookMarkedData', JSON.stringify(filteredPeople));

      return { ...state, favData: filteredPeople, isLoading: false };
    default:
      return state;
  }
};

export default UserReducer;
