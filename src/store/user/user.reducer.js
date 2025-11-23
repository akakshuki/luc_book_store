import { handleActions } from 'redux-actions';
import { types } from './user.meta';

const initialState = {
  user: null,
  orders: [],
};

const checkoutSuccess = (state, { payload }) => ({
  ...state,
});

const loginSuccess = (state, { payload }) => ({
  ...state,
  user: payload.user,
});

const logoutSuccess = (state) => ({
  user: null,
  addresses: [],
  orders: [],
});

const getOrdersSuccess = (state, action) => ({
  ...state,
  orders: action.payload,
});

const addWishListsSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

const removeWishListsSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

const updateUserSuccess = (state, action) => ({
  ...state,
  user: action.payload,
});

export default handleActions(
  {
    [types.LOGIN_SUCCESS]: loginSuccess,

    [types.LOGOUT_SUCCESS]: logoutSuccess,

    [types.ADD_WISHLISTS_SUCCESS]: addWishListsSuccess,
    [types.REMOVE_WISHLISTS_SUCCESS]: removeWishListsSuccess,

    [types.UPDATE_USER_SUCCESS]: updateUserSuccess,

    [types.GET_ORDER_SUCCESS]: getOrdersSuccess,
    [types.CHECKOUT_SUCCESS]: checkoutSuccess,
  },
  initialState
);
