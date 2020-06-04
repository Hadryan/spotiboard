import {
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT,
  CHECK_TOKEN,
  AuthActionTypes,
  AuthState,
} from './types';

const initialState: AuthState = {
  isLoggedIn: false,
  accessTokenValid: null,
};

export default function AuthReducer(state = initialState, action: AuthActionTypes): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        isLoggedIn: true,
        accessTokenValid: true,
      };
    case LOGIN_FAILURE:
      return {
        isLoggedIn: false,
        accessTokenValid: false,
      };
    case LOGOUT:
      return {
        isLoggedIn: false,
        accessTokenValid: false,
      };
    case CHECK_TOKEN:
      return {
        isLoggedIn: action.payload,
        accessTokenValid: action.payload,
      };
    default: return state;
  }
}
