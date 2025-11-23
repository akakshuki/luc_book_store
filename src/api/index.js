import cookie from 'js-cookie';
import axios from 'axios';
require('dotenv').config();

const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const baseHeader = {
  'Content-Type': 'application/json',
};

export function buildRequest(url, requestConfig = {}) {
  const instance = axios.create({
    baseURL: BASE_URL + url,
    ...requestConfig,
    headers: {
      ...baseHeader,
      ...requestConfig.headers,
    },
    timeout: 30000,
  });

  // TO-DO: Intercept token expire error and retry
  instance.interceptors.response.use(
    (res) => res,
    (error) => {
      console.log('Axios capture error and retry', error.message);
      throw error;
    }
  );

  return {
    instance,
    request: async function (payload = {}) {
      payload.headers = payload.headers ?? {};

      if (cookie.get('token')) {
        payload.headers = {
          Authorization: `Bearer ${cookie.get('token')}`,
          ...(payload?.headers ?? {}),
        };
      }

      const res = await instance(payload);
      const { data: body, status: httpStatus } = res;

      if (body?.status === 500) {
        throw body;
      }

      return { body, httpStatus };
    },
  };
}
