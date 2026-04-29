import axios, {AxiosError} from 'axios';
import {API_URL} from 'env';
import {getToken, removeAllSession} from 'utils/auth';

axios.defaults.timeout = 180000;
axios.defaults.baseURL = `${API_URL}/api`;
axios.interceptors.request.use(
  async config => {
    if (config.url?.includes('/auth')) return config;
    const token = await getToken();
    config.headers = config.headers ?? {};
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error: AxiosError) {
    return Promise.reject(error);
  },
);
axios.interceptors.response.use(
  response => response,
  async err => {
    const {status} = err.response || {};
    if (status === 401) {
      await removeAllSession();
    }
    return Promise.reject(err);
  },
);
