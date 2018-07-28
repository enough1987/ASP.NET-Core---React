

const ITEM_TYPES = Object.freeze({
  REQUEST_ITEM : 'REQUEST_ITEM',
  REQUEST_ITEM_UPDATE : 'REQUEST_ITEM_UPDATE',
  REQUEST_ITEM_DELETE: 'REQUEST_ITEM_DELETE',
  SET_ITEM : 'SET_ITEM'
});


const initialState = { 
  item: {},
  isLoading: false 
};

export const actionCreators = {
  fetchItem: (id) => async (dispatch) => {

    dispatch({ type: ITEM_TYPES.REQUEST_ITEM });

    const url = `api/Items/GetItem?Id=${id}`;
    const response = await fetch(url);
    const item = await response.json();

    dispatch({ type: ITEM_TYPES.SET_ITEM, payload: item });

  },
  update: (newItem) => async (dispatch) => {
      console.log(newItem);
      if ( !newItem.Name || !newItem.Price) {
          return false;
      }

      dispatch({ type: ITEM_TYPES.REQUEST_ITEM_UPDATE });

      const url = `api/Items/Update`;

      const formData = new FormData();
      Object.keys(newItem).forEach(key => formData.append(key, newItem[key]));

      const response = await fetch(url, {
          method: 'POST',
          body: formData
      });

      console.log(formData, response);

      if ( response.ok ) {
          return true;
      }
      return false
  },
  delete: (id) => async (dispatch) => {
      console.log(id);
      dispatch({ type: ITEM_TYPES.REQUEST_ITEM_DELETE });

      const url = `api/Items/Delete?id=`+id;

      const response = await fetch(url);

      if ( response.ok ) {
          return true;
      }
      return false
  }
};

export const reducer = (state = initialState, action = {}) => {

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
