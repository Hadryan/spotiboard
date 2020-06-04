export interface AuthState {
  isLoggedIn: boolean;
  accessTokenValid: boolean;
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGOUT = 'LOGOUT';
export const CHECK_TOKEN = 'CHECK_TOKEN';

interface LoginSuccessAction {
  type: typeof LOGIN_SUCCESS;
  isLoggedIn: boolean;
  accessTokenValid: boolean;
}

interface LoginFailureAction {
  type: typeof LOGIN_FAILURE;
  isLoggedIn: boolean;
  accessTokenValid: boolean;
}

interface LogoutAction {
  type: typeof LOGOUT;
  isLoggedIn: boolean;
  accessTokenValid: boolean;
}

interface CheckTokenAction {
  type: typeof CHECK_TOKEN;
  payload: boolean;
}

export type AuthActionTypes = (LoginSuccessAction
  | LoginFailureAction
  | LogoutAction
  | CheckTokenAction
);
