import * as types     from '../actions/types';
import { UserAction } from '../actions';

export interface UserState {
  user:    any;
  loading: boolean;
  error:   string;
}

const initialState: Readonly<UserState> = {
  user:    null,
  loading: false,
  error:   ''
};

export default (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case types.GET_USER_SUCCESS:
      return {...state, user: action.payload};
    case types.GET_USER_FAILED:
      return {...state, user: null};
    case types.UPDATE_PROFILE_START:
      return {...state, loading: true};
    case types.UPDATE_PROFILE_SUCCESS:
      return {...state, loading: false, error: ''};
    case types.UPDATE_PROFILE_FAILED:
      return {...state, loading: false, error: action.payload};
    case types.DELETE_ACCOUNT_SUCCESS:
      return initialState;
    default:
      return state;
  }
};