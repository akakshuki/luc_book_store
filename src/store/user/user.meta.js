import { createAction } from 'redux-actions';

export const types = {
  REGISTER: 'REGISTER',

  LOGIN: 'LOGIN',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  SET_TOKEN: 'SET_TOKEN',

  LOGOUT: 'LOGOUT',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',

  // == orders
  CHECKOUT: 'CHECKOUT',
  CHECKOUT_SUCCESS: 'CHECKOUT_SUCCESS',
  GET_ORDER: 'GET_ORDER',
  GET_ORDER_SUCCESS: 'GET_ORDER_SUCCESS',

  // == wishlist
  ADD_WISHLISTS: 'ADD_WISHLISTS',
  ADD_WISHLISTS_SUCCESS: 'ADD_WISHLISTS_SUCCESS',

  REMOVE_WISHLISTS: 'REMOVE_WISHLISTS',
  REMOVE_WISHLISTS_SUCCESS: 'REMOVE_WISHLISTS_SUCCESS',

  UPDATE_USER: 'UPDATE_USER',
  UPDATE_USER_SUCCESS: 'UPDATE_USER_SUCCESS',

  // == addresses
  GET_ADDRESSES: 'GET_ADDRESSES',
  GET_ADDRESSES_SUCCESS: 'GET_ADDRESSES_SUCCESS',

  ADD_ADDRESS: 'ADD_ADDRESS',
  REMOVE_ADDRESS: 'REMOVE_ADDRESS',

  ADD_ADDRESS_SUCCESS: 'ADD_ADDRESS_SUCCESS',
  REMOVE_ADDRESS_SUCCESS: 'REMOVE_ADDRESS_SUCCESS',
};

export const actionCreator = {
  register: createAction(types.REGISTER),

  login: createAction(types.LOGIN),
  loginSuccess: createAction(types.LOGIN_SUCCESS),

  setToken: createAction(types.SET_TOKEN),

  logout: createAction(types.LOGOUT),
  logoutSuccess: createAction(types.LOGOUT_SUCCESS),

  addWishLists: createAction(types.ADD_WISHLISTS),
  addWishListsSuccess: createAction(types.ADD_WISHLISTS_SUCCESS),

  removeWishLists: createAction(types.REMOVE_WISHLISTS),
  removeWishListsSuccess: createAction(types.REMOVE_WISHLISTS_SUCCESS),

  updateUser: createAction(types.UPDATE_USER),
  updateUserSuccess: createAction(types.UPDATE_USER_SUCCESS),

  actGetOrder: createAction(types.GET_ORDER),
  actGetOrderSuccess: createAction(types.GET_ORDER_SUCCESS),
  actCheckout: createAction(types.CHECKOUT),
  actCheckoutSuccess: createAction(types.CHECKOUT_SUCCESS),
};
