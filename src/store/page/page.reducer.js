import { handleActions } from 'redux-actions';
import { types } from './page.meta';

const initialState = {
  loading: false,
  isShowLogoutModal: false,
};

const setLoading = (state, action) => ({
  ...state,
  loading: !!action.payload,
});

const setShowLogoutModal = (state, action) => ({
  ...state,
  isShowLogoutModal: action?.payload ?? !state.isShowLogoutModal,
});

export default handleActions(
  {
    [types.SET_LOADING]: setLoading,
    [types.SET_SHOW_LOGOUT_MODAL]: setShowLogoutModal,
  },
  initialState
);
