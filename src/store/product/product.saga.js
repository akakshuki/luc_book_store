import { takeLatest, call, put, all } from 'redux-saga/effects';
import { sagaErrorWrapper } from 'utils/error';

import { getProductsToHomepage, getProductById } from 'api/apiRouter';
import { types, actionCreators } from './product.meta';

function* sagaGetProductsShowToHome(action) {
  const { body } = yield call(getProductsToHomepage);

  yield put(actionCreators.getProductShowToHomepageSuccess(body));
}

function* sagaGetProductDetailById(action) {
  const { body } = yield call(getProductById, action.payload);

  yield put(actionCreators.getProductDetailByIdSuccess(body));
}

export default function* productSaga() {
  yield all([
    takeLatest(
      types.GET_PRODUCTS_SHOW_TO_HOMEPAGE,
      sagaErrorWrapper(sagaGetProductsShowToHome)
    ),

    takeLatest(
      types.GET_PRODUCT_DETAIL_BY_ID,
      sagaErrorWrapper(sagaGetProductDetailById)
    ),
  ]);
}
