import * as types     from '../actions/types';
import { UserAction } from '../actions';

export interface UserState {
  loading: boolean;
  error:   string;
}

const initialState: Readonly<UserState> = {
  loading: false,
  error: ''
};

export default (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
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
}