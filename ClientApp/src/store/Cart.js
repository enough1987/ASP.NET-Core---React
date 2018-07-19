
const SHOP_TYPES = Object.freeze({
  SET_ITEMS : 'SET_ITEMS'
});

const initialState = { 
  items: [], 
  isLoading: false 
};

export const actionCreators = {
  fetchItems: () => async (dispatch) => {    

    const url = `api/SampleData/GetItems`;
    const response = await fetch(url);
    const items = await response.json();
    console.log(items);

    setTimeout(() => {
      dispatch({ type: SHOP_TYPES.SET_ITEMS, payload: items });
    }, 100);
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === SHOP_TYPES.SET_ITEMS) {
    return {
      ...state,
      items: action.payload,
      isLoading: false
    };
  }

  return state;
};
