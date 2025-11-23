import { handleActions } from 'redux-actions';
import { types } from './cart.meta';
import { calculateSalePrice } from 'utils/calculateSalePrice';

const initialState = {
  products: [],
  total: 0,
  totalSalePrice: 0,
  totalOriginalPrice: 0,
  totalTax: 0,
};

const addToCart = (state, action) => {
  const { id, count } = action.payload;
  const products = [...state.products];
  const index = products.findIndex((it) => it?.id === id);
  if (index !== -1) {
    products[index].count = count;
  } else {
    products.push({ ...action.payload });
  }

  const totalSalePrice = Math.round(
    products.reduce(
      (prev, curr) =>
        prev + curr?.count * calculateSalePrice(curr?.price, curr?.discount),
      0
    )
  );

  let totalTax = Math.round(totalSalePrice * 0.1);

  const totalOriginalPricePrice = Math.round(totalSalePrice + totalTax);

  return {
    ...state,
    products: products,
    total: products.reduce((prev, curr) => prev + curr?.count, 0),
    totalSalePrice: +totalSalePrice,
    totalOriginalPrice: +totalOriginalPricePrice,
    totalTax: +totalTax,
  };
};

const removeFromCart = (state, { payload }) => {
  const { productId } = payload;
  const products = [...state.products];
  const index = products.findIndex((it) => it?.id === productId);
  if (index !== -1) {
    products.splice(index, 1);
  }
  const totalSalePrice = Math.round(
    products.reduce(
      (prev, curr) =>
        prev + curr?.count * calculateSalePrice(curr?.price, curr?.discount),
      0
    )
  );

  let totalTax = Math.round(totalSalePrice * 0.1);

  const totalOriginalPricePrice = Math.round(totalSalePrice + totalTax);

  return {
    ...state,
    products: products,
    total: products.reduce((prev, curr) => prev + curr?.count, 0),
    totalSalePrice: +totalSalePrice,
    totalOriginalPrice: +totalOriginalPricePrice,
    totalTax: +totalTax,
  };
};

const cleanCartOrder = (state) => {
  return {
    ...state,
    products: [],
    total: 0,
    totalSalePrice: 0,
    totalOriginalPrice: 0,
  };
};

export default handleActions(
  {
    [types.ADD_TO_CART_SUCCESS]: addToCart,

    [types.REMOVE_FROM_CART_REDUCE]: removeFromCart,

    [types.CLEAN_CART_ORDER]: cleanCartOrder,
  },
  initialState
);
