import { takeLatest, put } from 'redux-saga/effects';
import { notification } from 'antd';

import { types, actionCreators } from './cart.meta';

function* handleAddToCart(action) {
  yield put(actionCreators.addToCartSuccess(action.payload));

  notification.success({
    message: action.payload?.message ?? 'Updated success',
    top: 100,
  });
}

function* handleRemoveFromCart(action) {
  yield put(actionCreators.removeFromCardReduce(action.payload));
  notification.success({
    message: action.payload?.message ?? 'Remove success',
    top: 100,
  });
}

export default function* cartSaga() {
  yield takeLatest(types.ADD_TO_CART, handleAddToCart);
  yield takeLatest(types.REMOVE_FROM_CART, handleRemoveFromCart);
}
