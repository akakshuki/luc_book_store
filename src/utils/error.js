import { actionCreator } from 'store/page/page.meta';
import { call, put } from 'redux-saga/effects';
import { notification } from 'antd';

const messageReg = {
  USER_NOT_FOUND: /user is not found/g,
  WRONG_PASSWORD: /wrong password/g,
  EMAIL_IS_EXISTS: /email is already exist/g,
  WRONG_EMAIL_OR_PASSWORD: /wrong email or password/g,
  FILE_DELETE: /Could not delete the file!/g,
  FILE_UPLOAD: /Could not upload the file!/g,
  FIND_CATEGORY: /can't find category/g,
  DELETE_CATEGORY: /can not delete category/g,
  SAVE_CATEGORY: /can not save or update category/g,
  FIND_ORDER: /can't find order/g,
  DELETE_ORDER: /can not delete order/g,
  SAVE_ORDER: /can not save or update order/g,
  FIND_PRODUCT: /can't find product/g,
  DELETE_PRODUCT: /can not delete product/g,
  SAVE_PRODUCT: /can not save or update product/g,
  FIND_SIZE: /can't find size/g,
  DELETE_SIZE: /can not delete size/g,
  UPDATE_SIZE: /can not save or update size/g,
  DELETE_BANNER: /can not delete banner/g,
  SAVE_BANNER: /can not save or update banner/g,
  PERMISSION_DENIED: /permission denied/g,
  EMAIL_IS_INVALID: /email is invalid/g,
  PHONE_IS_INVALID: /phone is invalid/g,
  EMAIL_IS_BLANK: /Email không được bỏ trống/g,
  PASSWORD_IS_BLANK: /Password không được bỏ trống/g,
};

export const errorMessages = {
  DEFAULT: 'The unexpected error has occur, Please try again!',
  USER_NOT_FOUND: 'Invalid user. Please try again!',
  WRONG_PASSWORD: 'Wrong password. Please try again!',
  EMAIL_IS_EXISTS: 'Email is already exist!',
  WRONG_EMAIL_OR_PASSWORD: 'Wrong email or password!',
  FILE_DELETE: 'Không thể xóa file!',
  FILE_UPLOAD: 'Không thể upload file!',
  FIND_CATEGORY: 'Không tìm thấy danh mục sản phẩm!',
  DELETE_CATEGORY: 'Không thể xóa danh mục sản phẩm!',
  SAVE_CATEGORY: 'Không thể thêm / cập nhật danh mục sản phẩm!',
  FIND_ORDER: 'Không tìm thấy đơn hàng!',
  DELETE_ORDER: 'Không thể xóa đơn hàng!',
  SAVE_ORDER: 'Không thể thêm / cập nhật đơn hàng!',
  FIND_PRODUCT: 'Không tìm thấy sản phẩm!',
  DELETE_PRODUCT: 'Không thể xóa sản phẩm!',
  SAVE_PRODUCT: 'Không thể thêm / cập nhật sản phẩm!',
  FIND_SIZE: 'Không tìm thấy size!',
  DELETE_SIZE: 'Không thể xóa size!',
  UPDATE_SIZE: 'Không thể thêm / cập nhật size!',
  DELETE_BANNER: 'Không thể xoá banner!',
  SAVE_BANNER: 'Không thể thêm / cập nhật banner!',
  PERMISSION_DENIED: 'Permission denied!',
  EMAIL_IS_INVALID: 'Invalid email!',
  PHONE_IS_INVALID: 'Invalid phone!',
  EMAIL_IS_BLANK: 'Email can not be blank!',
  PASSWORD_IS_BLANK: 'Password can not be blank!',
};

const errorMessageKeys = Object.keys(messageReg);

export const parseError = (message) => {
  const errorKey = errorMessageKeys.find((key) =>
    message.match(messageReg[key])
  );
  if (errorKey) return errorMessages[errorKey];

  return errorMessages['DEFAULT'];
};

export function sagaErrorWrapper(executor, customErrorHandling) {
  return function* (action) {
    try {
      yield put(actionCreator.setLoading(true));
      yield executor(action);
    } catch (error) {
      const { status } = error?.response ?? error;
      const { message } = error?.response?.data ?? error;

      if (customErrorHandling) {
        yield call(customErrorHandling, error);
        return;
      }

      if (status === 500) {
        const errorMessage = parseError(message);
        notification.error({
          message: errorMessage,
        });

        return;
      }

      if (status === 401) {
        const errorMessage = parseError(message);
        notification.error({
          message: errorMessage,
        });

        return;
      }

      if (status === 400) {
        const errorMessage = parseError(message);
        notification.error({
          message: errorMessage,
        });

        return;
      }

      notification.error({
        message: errorMessages['DEFAULT'],
      });
    } finally {
      yield put(actionCreator.setLoading(false));
    }
  };
}
