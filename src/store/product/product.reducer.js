import { handleActions } from 'redux-actions';
import { types } from './product.meta';

const initialState = {
  products: [],
  productDetail: null,
};

const getProductsShowToHome = (state, action) => {
  return {
    ...state,
    products: [...action.payload],
  };
};

const getProductDetailById = (state, action) => {
  return {
    ...state,
    productDetail: action.payload,
  };
};

export default handleActions(
  {
    [types.GET_PRODUCTS_SHOW_TO_HOMEPAGE_SUCCESS]: getProductsShowToHome,

    [types.GET_PRODUCT_DETAIL_BY_ID_SUCCESS]: getProductDetailById,
  },
  initialState
);
