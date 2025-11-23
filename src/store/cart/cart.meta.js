import { createAction } from 'redux-actions';

export const types = {
  ADD_TO_CART: 'ADD_TO_CART',
  ADD_TO_CART_SUCCESS: 'ADD_TO_CART_SUCCESS',

  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  REMOVE_FROM_CART_REDUCE: 'REMOVE_FROM_CART_REDUCE',

  CLEAN_CART_ORDER: 'CLEAN_CART_ORDER',
};

export const actionCreators = {
  addToCart: createAction(types.ADD_TO_CART),
  addToCartSuccess: createAction(types.ADD_TO_CART_SUCCESS),

  removeFromCart: createAction(types.REMOVE_FROM_CART),
  removeFromCardReduce: createAction(types.REMOVE_FROM_CART_REDUCE),

  cleanCartOrder: createAction(types.CLEAN_CART_ORDER),
};
