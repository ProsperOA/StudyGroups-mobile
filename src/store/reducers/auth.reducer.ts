import { Reducer }    from 'redux';
import * as types     from '../actions/types';
import { AuthAction } from '../actions';

export interface AuthState {
  user:    any;
  isAuth:  boolean;
  token:   string;
  loading: boolean;
  error:   any;
}

const initialState: Readonly<AuthState> = {
  user:    null,
  isAuth:  false,
  token:   '',
  loading: false,
  error:   ''
}

const reducer: Reducer = (state: AuthState = initialState, action: AuthAction): AuthState => {
  switch (action.type) {
    case types.AUTH_START:
      return {...state, loading: true};
    case types.LOGIN_SUCCESS || types.SIGNUP_SUCCESS:
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
        isAuth:  true,
        loading: false,
        error:   ''
      };
    case types.LOGIN_FAILED || types.SIGNUP_FAILED:
      return {
        ...state,
        token:   '',
        isAuth:  false,
        loading: false,
        error:   action.payload
      };
    default:
      return state;
  }
};

export default reducer;
