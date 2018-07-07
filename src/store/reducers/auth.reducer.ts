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
    case types.AUTH_USER_FAILED:
    case types.AUTH_USER_STOP:
      return {...state, loading: false};
    case types.LOGIN_SUCCESS:
    case types.SIGNUP_SUCCESS:
      const { user, token } = action.payload;
      return {
        ...state,
        user,
        token,
        isAuth:  true,
        loading: false,
        error:   ''
      };
    case types.LOGIN_FAILED:
    case types.SIGNUP_FAILED:
      return {
        ...state,
        token:   '',
        isAuth:  false,
        loading: false,
        error:   action.payload
      };
    case types.UPDATE_PROFILE_SUCCESS:
    case types.UPLOAD_AVATAR_SUCCESS:
      return {...state, user: action.payload};
    case types.LOGOUT:
    case types.DELETE_ACCOUNT_SUCCESS:
      return initialState;
    case types.UPDATE_COURSES_SUCCESS:
    default:
      return state;
  }
};

export default reducer;
