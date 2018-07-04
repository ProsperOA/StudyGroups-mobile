import { Reducer }    from 'redux';
import * as types     from '../actions/types';
import { UserAction } from '../actions';

export interface PasswordModalState {
  message: string;
}

const initialState: Readonly<PasswordModalState> = {
  message: ''
};

const reducer: Reducer = (state: PasswordModalState = initialState, action: UserAction): PasswordModalState => {
  switch (action.type) {
    case types.CHANGE_PASSWORD_SUCCESS:
    case types.CHANGE_PASSWORD_FAILED:
      return {...state, message: action.payload};
    default:
      return state;
  }
}

export default reducer;