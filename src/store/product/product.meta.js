import { createAction } from 'redux-actions';

export const types = {
  GET_PRODUCTS_SHOW_TO_HOMEPAGE: 'GET_PRODUCTS_SHOW_TO_HOMEPAGE',
  GET_PRODUCTS_SHOW_TO_HOMEPAGE_SUCCESS:
    'GET_PRODUCTS_SHOW_TO_HOMEPAGE_SUCCESS',

  GET_PRODUCT_DETAIL_BY_ID: 'GET_PRODUCT_DETAIL_BY_ID',
  GET_PRODUCT_DETAIL_BY_ID_SUCCESS: 'GET_PRODUCT_DETAIL_BY_ID_SUCCESS',
};

export const actionCreators = {
  getProductShowToHomepage: createAction(types.GET_PRODUCTS_SHOW_TO_HOMEPAGE),
  getProductShowToHomepageSuccess: createAction(
    types.GET_PRODUCTS_SHOW_TO_HOMEPAGE_SUCCESS
  ),

  getProductDetailById: createAction(types.GET_PRODUCT_DETAIL_BY_ID),
  getProductDetailByIdSuccess: createAction(
    types.GET_PRODUCT_DETAIL_BY_ID_SUCCESS
  ),
};
