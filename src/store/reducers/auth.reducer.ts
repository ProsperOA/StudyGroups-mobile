import { Reducer }    from 'redux';
import * as types     from '../actions/types';
import { AuthAction, UserAction } from '../actions';

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

const reducer: Reducer = (state: AuthState = initialState, action: AuthAction | UserAction): AuthState => {
  switch (action.type) {
    case types.AUTH_USER_START:
      return {...state, loading: true};
    case types.AUTH_USER_SUCCESS:
      return {...state, loading: false};
    case types.AUTH_USER_FAILED:
      return {...state, loading: false};
    case types.LOGIN_SUCCESS, types.SIGNUP_SUCCESS:
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
        isAuth:  true,
        loading: false,
        error:   ''
      };
    case types.LOGIN_FAILED, types.SIGNUP_FAILED:
      return {
        ...state,
        token:   '',
        isAuth:  false,
        loading: false,
        error:   action.payload
      };
    case types.UPDATE_ACCOUNT_SUCCESS, types.UPLOAD_AVATAR_SUCCESS:
      return {...state, user: action.payload};
    default:
      return state;
  }
};

export default reducer;
