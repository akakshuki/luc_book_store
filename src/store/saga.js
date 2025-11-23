import { all, fork } from 'redux-saga/effects';

import cart from './cart/cart.saga';
import user from './user/user.saga';
import product from './product/product.saga';
import category from './category/category.saga';

export default function* rootSaga() {
  yield all([fork(cart), fork(user), fork(product), fork(category)]);
}
