import { takeLatest, call, put, all } from 'redux-saga/effects';
import { sagaErrorWrapper } from 'utils/error';

import { getCategoryById, getCategories } from 'api/apiRouter';
import { types, actionCreators } from './category.meta';

function* sagaGetCategoryDetail(action) {
  const { body } = yield call(getCategoryById, action.payload);

  yield put(actionCreators.getCategoryDetailSuccess(body));
}

function* sagaGetCategories(action) {
  const { body } = yield call(getCategories, action.payload);

  yield put(actionCreators.getCategoriesSuccess(body));
}

export default function* categorySaga() {
  yield all([
    takeLatest(
      types.GET_CATEGORY_DETAIL,
      sagaErrorWrapper(sagaGetCategoryDetail)
    ),
    takeLatest(types.GET_CATEGORIES, sagaErrorWrapper(sagaGetCategories)),
  ]);
}
