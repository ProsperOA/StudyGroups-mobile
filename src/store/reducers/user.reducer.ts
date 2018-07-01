import { Reducer }     from 'redux';
import * as types      from '../actions/types';
import { UserAction } from '../actions';

export interface UserState {
  currentUser: any;
}

const initialState: Readonly<UserState> = {
  currentUser: null
};

const reducer: Reducer = (state: UserState = initialState, action: UserAction): UserState => {
  switch (action.type) {
    case types.GET_CURRENT_USER_SUCCESS:
      return {...state, currentUser: action.payload};
    case types.GET_CURRENT_USER_FAILED:
      return {...state, currentUser: null};
    default:
      return state;
  }
}

export default reducer;