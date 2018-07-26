
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

    dispatch({ type: SHOP_TYPES.SET_ITEMS, payload: items });
  },
  add: (newItem) => async (dispatch) => {

    const url = `api/SampleData/add`;

    const formData = new FormData();
    Object.keys(newItem).forEach(key => formData.append(key, newItem[key]));

    const response = await fetch(url, {
          method: 'POST',
          body: formData
      });
    const item = await response.json();

    console.log(formData, item);

    if ( item.Result ) {
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
