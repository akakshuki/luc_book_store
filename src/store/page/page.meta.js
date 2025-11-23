import { createAction } from 'redux-actions';

export const types = {
  SET_LOADING: 'SET_LOADING',
  SET_SHOW_LOGOUT_MODAL: 'SET_SHOW_LOGOUT_MODAL',
};

export const actionCreator = {
  setLoading: createAction(types.SET_LOADING),
  setShowLogoutModal: createAction(types.SET_SHOW_LOGOUT_MODAL),
};
