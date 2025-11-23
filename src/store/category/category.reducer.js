import { handleActions } from 'redux-actions';
import { types } from './category.meta';

const initialState = {
  categoryDetail: {},
  categories: [],
  products: [],
};

const getCategories = (state, action) => {
  return {
    ...state,
    categories: [...action.payload],
  };
};

const getCategoryDetail = (state, action) => {
  return {
    ...state,
    categoryDetail: action.payload,
    products: [...action.payload.products],
  };
};

export default handleActions(
  {
    [types.GET_CATEGORY_DETAIL_SUCCESS]: getCategoryDetail,
    [types.GET_CATEGORIES_SUCCESS]: getCategories,
  },
  initialState
);
