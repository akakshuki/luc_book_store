import { createAction } from 'redux-actions';

export const types = {
  GET_CATEGORY_DETAIL: 'GET_CATEGORY_DETAIL',
  GET_CATEGORY_DETAIL_SUCCESS: 'GET_CATEGORY_DETAIL_SUCCESS',

  GET_CATEGORIES: 'GET_CATEGORIES',
  GET_CATEGORIES_SUCCESS: 'GET_CATEGORIES_SUCCESS',
};

export const actionCreators = {
  getCategoryDetail: createAction(types.GET_CATEGORY_DETAIL),
  getCategoryDetailSuccess: createAction(types.GET_CATEGORY_DETAIL_SUCCESS),
  getCategories: createAction(types.GET_CATEGORIES),
  getCategoriesSuccess: createAction(types.GET_CATEGORIES_SUCCESS),
};
