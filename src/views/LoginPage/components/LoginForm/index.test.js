import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { notification } from 'antd';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import LoginForm from './index';

jest.mock('antd', () => ({
  ...jest.requireActual('antd'),
  notification: {
    error: jest.fn(),
  },
}));

jest.mock('@reach/router', () => ({
  Link: jest.fn().mockImplementation(({ children }) => children),
}));

const mockStore = configureStore([]);

describe('LoginForm', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
    store.dispatch = jest.fn();
    notification.error.mockClear();
  });

  it('should call notification.error when "Login with Keycloak" button is clicked', () => {
    const { getByText } = render(
      <Provider store={store}>
        <LoginForm />
      </Provider>
    );

    const ssoButton = getByText('Login with Keycloak');
    fireEvent.click(ssoButton);

    expect(notification.error).toHaveBeenCalledWith({
      message: 'SSO Connection Failed',
      description:
        'Could not connect to the Keycloak server. Please try again later.',
    });
  });
});
