import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CHECK_TOKEN,
  AuthActionTypes,
} from './types';
import history from '../history';
import { config, authorizeUser } from '../utils';
import { AppThunk } from '../store/store';

export const loginSuccess = (): AuthActionTypes => ({
  type: LOGIN_SUCCESS,
  isLoggedIn: true,
  accessTokenValid: true,
});

export const loginFailure = (): AuthActionTypes => ({
  type: LOGIN_FAILURE,
  isLoggedIn: false,
  accessTokenValid: false,
});

export const login = (): void => {
  authorizeUser();
};

export const logout = (): AuthActionTypes => {
  if (localStorage.getItem('accessToken')) localStorage.removeItem('accessToken');
  history.replace('/');
  return {
    type: LOGOUT,
    isLoggedIn: false,
    accessTokenValid: false,
  };
};

const validToken = (payload: boolean): AuthActionTypes => ({
  type: CHECK_TOKEN,
  payload,
});

export const checkToken = (): AppThunk => async (dispatch): Promise<AuthActionTypes> => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    return dispatch(logout());
  }
  const url = config.API_URL + '/me';
  const headers = new Headers({
    Authorization: 'Bearer ' + accessToken,
  });
  const response = await fetch(url, { headers });
  if (response.status >= 400) {
    return dispatch(logout());
  }
  return dispatch(validToken(true));
};
