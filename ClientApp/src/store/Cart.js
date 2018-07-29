import axios from '../interceptors/interceptors';

const SHOP_TYPES = Object.freeze({
  SET_ITEMS : 'SET_ITEMS'
});

const initialState = { 
  items: [], 
  isLoading: false 
};

export const actionCreators = {
  fetchItems: () => async (dispatch) => {    

    const url = `api/Items/GetAll`;
    const response = await axios.get(url);

    const items = response.data;

    console.log(' -- ', items);

    dispatch({ type: SHOP_TYPES.SET_ITEMS, payload: items });
  },
  add: (newItem) => async (dispatch) => {

    const url = `api/Items/add`;

    const formData = new FormData();
    Object.keys(newItem).forEach(key => formData.append(key, newItem[key]));

    const response = await axios.post(url,
        formData
    );

    console.log(formData, response.data);

    if ( response.data ) {
      return true;
    }
    return false

  }

};

export const reducer = (state = initialState, action = {}) => {

  if (action.type === SHOP_TYPES.SET_ITEMS) {
    return {
      ...state,
      items: action.payload,
      isLoading: false
    };
  }

  return state;
};
