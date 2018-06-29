import { Reducer }    from 'redux';
import * as types     from '../actions/types';
import { AuthAction } from '../actions';

export interface AuthState {
  user:    any;
  isAuth:  boolean;
  token:   string;
}

const initialState: Readonly<AuthState> = {
  user:    null,
  isAuth:  false,
  token:   ''
}

const reducer: Reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.LOGIN_SUCCESS || types.SIGNUP_SUCCESS:
      return {
        ...state,
        user:    action.payload.user,
        token:   action.payload.token,
        isAuth:  true
      };
    case types.LOGIN_FAILED || types.SIGNUP_FAILED:
      return {...state, token:  '', isAuth: false};
    default:
      return state;
  }
};

export default reducer;
