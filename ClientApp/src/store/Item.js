
const ITEM_TYPES = Object.freeze({
  REQUEST_ITEM : 'REQUEST_ITEM',
  SET_ITEM : 'SET_ITEM'
});


const initialState = { 
  item: {},
  isLoading: false 
};

export const actionCreators = {
  fetchItem: (id) => async (dispatch) => {

    dispatch({ type: ITEM_TYPES.REQUEST_ITEM });

    const url = `api/SampleData/GetItem?Id=${id}`;
    const response = await fetch(url);
    const item = await response.json();

    setTimeout(() => {
      dispatch({ type: ITEM_TYPES.SET_ITEM, payload: item });
    }, 1000);
  }
};

export const reducer = (state, action) => {
  state = state || initialState;

  if (action.type === ITEM_TYPES.REQUEST_ITEM) {
    return { 
      ...state,
      item: {},
      isLoading: true
    };
  }

  if (action.type === ITEM_TYPES.SET_ITEM) {
    return { 
      ...state,
      item: action.payload,
      isLoading: false
    };
  }

  return state;
};
