import axios from '../../../../node_modules/axios/index';

export const FETCH_DATA_REQUEST = 'FETCH_DATA_REQUEST';
export const FETCH_DATA_SUCCESS = 'FETCH_DATA_SUCCESS';
export const FETCH_DATA_FAILURE = 'FETCH_DATA_FAILURE';

// Action creators

export const fetchDataRequest = () => ({
  type: FETCH_DATA_REQUEST,
});

export const fetchDataSuccess = (data) => ({
  type: FETCH_DATA_SUCCESS,
  payload: data,
});

export const fetchDataFailure = (error) => ({
  type: FETCH_DATA_FAILURE,
  payload: error,
});

export const fetchData = () => {
  const apiEndPoint = process.env.REACT_APP_API_URL;

  return async (dispatch) => {
    dispatch(fetchDataRequest());
    try {
      const response = await axios.get(`${apiEndPoint}/users`);
      dispatch(fetchDataSuccess(response.data));
    } catch (error) {
      dispatch(fetchDataFailure(error.message));
    }
  };
};

export const SET_FAV_DATA=(payload)=>{
    return{
        type:"SET_FAV_DATA",
        payload
    }   
}
export const SET_UNFAV_DATA=(payload)=>{
    return{
        type:"SET_UNFAV_DATA",
        payload
    }   
}