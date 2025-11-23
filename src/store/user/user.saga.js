import { takeLatest, call, put, all } from 'redux-saga/effects';
import { notification } from 'antd';
import { navigate } from '@reach/router';
import jwtDecode from 'jwt-decode';

import { types, actionCreator } from './user.meta';
import { actionCreator as pageActionCreator } from '../page/page.meta';
import { actionCreators as cartActionCreators } from '../cart/cart.meta';

import {
  register,
  login,
  addWishlist,
  deleteWishlist,
  updateUser,
  getOrders,
  getUser,
  checkout,
} from 'api/apiRouter';
import cookie from 'js-cookie';
import { sleep } from 'utils';
import { sagaErrorWrapper } from 'utils/error';

function* sagaRegister(action) {
  let { email, password } = action.payload;
  const { body } = yield call(register, {
    email,
    password,
  });
  yield call(notification.success, {
    message: body?.message,
  });
  yield call(sleep, 500);

  yield put(actionCreator.login({ email: email, password: password }));
}

function* sagaLogin(action) {
  let { email, password } = action.payload;
  const { body } = yield call(login, {
    email,
    password,
  });

  const { token } = body;
  const { exp } = jwtDecode(token);

  cookie.set('token', token, { expires: exp });

  const { body: user } = yield call(getUser, token);

  yield put(
    actionCreator.loginSuccess({
      user: {
        ...user,
        loginIn: true,
      },
    })
  );
  notification.success({
    message: 'Login success!',
  });
  yield put(pageActionCreator.setLoading(false));

  yield navigate('/');
}

function* sagaLogout(action) {
  cookie.remove('token');
  yield put(actionCreator.logoutSuccess());
  yield call(notification.success, {
    message: 'Logout successful!',
  });
  yield navigate('/');
}

// == wishlist ==
function* sagaAddWishLists(action) {
  const { body } = yield call(addWishlist, {
    ...action.payload,
  });

  yield call(notification.success, {
    message: body?.message,
  });

  const res = yield call(getUser);

  yield put(actionCreator.addWishListsSuccess({ ...res?.body }));
}

function* sagaDeleteWishLists(action) {
  const { body } = yield call(deleteWishlist, {
    ...action.payload,
  });

  yield call(notification.success, {
    message: body?.message,
  });

  const res = yield call(getUser);

  yield put(actionCreator.addWishListsSuccess({ ...res?.body }));
}

// == update user ==
function* sagaUpdateUser(action) {
  const { id, name, phone, gender, birthday } = action.payload;
  const { body } = yield call(updateUser, {
    id,
    name,
    phone,
    gender,
    birthday,
  });

  yield call(notification.success, {
    message: body?.message,
  });

  const res = yield call(getUser);
  yield put(actionCreator.updateUserSuccess({ ...res?.body }));
}

function* sagaGetOrder(action) {
  const { userId } = action.payload;
  const { body } = yield call(getOrders, userId);
  console.log({ body });

  yield put(actionCreator.actGetOrderSuccess(body));
}

function* sagaCheckout(action) {
  const data = action.payload;
  const { body } = yield call(checkout, data);

  yield put(actionCreator.actCheckoutSuccess(body));
  yield call(notification.success, {
    message: 'Checkout success',
  });
  yield put(cartActionCreators.cleanCartOrder());
  navigate('/');
}

export default function* userSaga() {
  yield all([
    takeLatest(types.LOGIN, sagaErrorWrapper(sagaLogin)),

    takeLatest(types.REGISTER, sagaErrorWrapper(sagaRegister)),

    takeLatest(types.LOGOUT, sagaErrorWrapper(sagaLogout)),

    takeLatest(types.ADD_WISHLISTS, sagaErrorWrapper(sagaAddWishLists)),
    takeLatest(types.REMOVE_WISHLISTS, sagaErrorWrapper(sagaDeleteWishLists)),

    takeLatest(types.UPDATE_USER, sagaErrorWrapper(sagaUpdateUser)),

    takeLatest(types.GET_ORDER, sagaErrorWrapper(sagaGetOrder)),
    takeLatest(types.CHECKOUT, sagaErrorWrapper(sagaCheckout)),
  ]);
}
