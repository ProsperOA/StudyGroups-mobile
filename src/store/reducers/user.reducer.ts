import { Reducer }    from 'redux';
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

const reducer: Reducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case types.UPDATE_ACCOUNT_START:
      return {...state, loading: true};
    case types.UPDATE_ACCOUNT_SUCCESS:
      return {...state, loading: false, error: ''};
    case types.UPDATE_ACCOUNT_FAILED:
      return {...state, loading: false, error: action.payload};
    default:
      return state;
  }
}

export default reducer;